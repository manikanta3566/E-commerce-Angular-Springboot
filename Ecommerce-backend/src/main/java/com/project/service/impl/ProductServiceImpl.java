package com.project.service.impl;

import com.project.Exception.GlobalException;
import com.project.dto.PaginatedResponse;
import com.project.dto.ProductDto;
import com.project.entity.Product;
import com.project.entity.Role;
import com.project.entity.User;
import com.project.enums.ErrorCode;
import com.project.enums.RoleType;
import com.project.repository.ProductRepository;
import com.project.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Base64;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl  implements ProductService {

    private final ProductRepository productRepository;

    @Override
    public ProductDto addProduct(ProductDto productDTO, User user) {
        try {
            Product product = new Product();
            product.setName(productDTO.getName());
            product.setPrice(productDTO.getPrice());
            product.setDescription(productDTO.getDescription());
            product.setCategory(productDTO.getCategory());
            product.setImageFileName(productDTO.getImageFileName());
            product.setImageFileSize(productDTO.getImageFileSize());
            // Decode Base64 string to byte[]
            if (productDTO.getBase64Image() != null && !productDTO.getBase64Image().isEmpty()) {
                byte[] imageBytes = Base64.getDecoder().decode(productDTO.getBase64Image());
                product.setImageData(imageBytes);
            }
            product.setCreatedById(user.getId());
            productRepository.save(product);
            return productDTO;
        } catch (Exception e) {
            throw new GlobalException(ErrorCode.ERROR_WHILE_SAVING_PRODUCT);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public PaginatedResponse<ProductDto> getProducts(int pageNumber, int pageSize, User user) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        Page<Product> productsPage;
        if(Objects.nonNull(user) && user.getRoles().stream().map(Role::getName).collect(Collectors.toSet()).contains(RoleType.SELLER)) {
            productsPage = productRepository.findAllByCreatedById(user.getId(),pageable);
        }else{
            productsPage = productRepository.findAll(pageable);
        }
        PaginatedResponse<ProductDto> response = new PaginatedResponse<>();
        response.setContent(productsPage.map(this::convertToDto).getContent());
        response.setPageNumber(productsPage.getNumber());
        response.setPageSize(productsPage.getSize());
        response.setTotalElements(productsPage.getTotalElements());
        response.setTotalPages(productsPage.getTotalPages());
        response.setFirst(productsPage.isFirst());
        response.setLast(productsPage.isLast());
        return response;
    }

    @Override
    public String deleteProduct(String productId, User user) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new GlobalException(ErrorCode.PRODUCT_NOT_FOUND));
        if (!product.getCreatedById().equals(user.getId())) {
            throw new GlobalException(ErrorCode.UNAUTHORIZED_ACTION);
        }
        productRepository.deleteById(productId);
        return productId;
    }

    @Override
    public ProductDto updateProduct(String productId, ProductDto productDTO, User user) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new GlobalException(ErrorCode.PRODUCT_NOT_FOUND));
        if (!product.getCreatedById().equals(user.getId())) {
            throw new GlobalException(ErrorCode.UNAUTHORIZED_ACTION);
        }
        if (product != null) {
            product.setName(productDTO.getName());
            product.setPrice(productDTO.getPrice());
            product.setDescription(productDTO.getDescription());
            product.setCategory(productDTO.getCategory());
            product.setImageFileName(productDTO.getImageFileName());
            product.setImageFileSize(productDTO.getImageFileSize());
            // Decode Base64 string to byte[]
            if (productDTO.getBase64Image() != null && !productDTO.getBase64Image().isEmpty()) {
                byte[] imageBytes = Base64.getDecoder().decode(productDTO.getBase64Image());
                product.setImageData(imageBytes);
            }
            Product updatedProduct = productRepository.save(product);
            return convertToDto(updatedProduct);
        }
        return null;
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductDto> searchProductsByName(String query) {
        if (query == null || query.isEmpty()) {
            return List.of(); // return empty list if query is empty
        }
        return productRepository.findByNameContainingIgnoreCase(query).stream().map(this::convertToDto).collect(Collectors.toList());
    }

    @Override
    public ProductDto getProductById(String id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new GlobalException(ErrorCode.PRODUCT_NOT_FOUND));
        return convertToDto(product);
    }

    private ProductDto convertToDto(Product product) {
        String base64Image = Base64.getEncoder().encodeToString(product.getImageData());

        return new ProductDto(
                product.getId(),
                product.getName(),
                product.getPrice(),
                product.getDescription(),
                product.getCategory(),
                base64Image,
                product.getImageFileName(),
                product.getImageFileSize()
        );
    }
}
