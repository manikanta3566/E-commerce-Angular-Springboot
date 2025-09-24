package com.project.service;

import com.project.dto.PaginatedResponse;
import com.project.dto.ProductDto;
import com.project.entity.User;

public interface ProductService {

    ProductDto addProduct(ProductDto productDTO, User user);

    PaginatedResponse<ProductDto> getProducts(int pageNumber, int pageSize, User user);
}
