package com.project.service.impl;

import com.project.Exception.GlobalException;
import com.project.dto.ProductDto;
import com.project.entity.Product;
import com.project.entity.User;
import com.project.enums.ErrorCode;
import com.project.repository.ProductRepository;
import com.project.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Base64;

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
}
