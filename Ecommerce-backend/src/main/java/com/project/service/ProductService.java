package com.project.service;

import com.project.dto.PaginatedResponse;
import com.project.dto.ProductDto;
import com.project.entity.User;

import java.util.List;

public interface ProductService {

    ProductDto addProduct(ProductDto productDTO, User user);

    PaginatedResponse<ProductDto> getProducts(int pageNumber, int pageSize, User user);

    String deleteProduct(String productId, User user);

    ProductDto updateProduct(String productId, ProductDto productDTO, User user);

    List<ProductDto> searchProductsByName(String query);
}
