package com.project.service;

import com.project.dto.ProductDto;
import com.project.entity.User;

public interface ProductService {

    ProductDto addProduct(ProductDto productDTO, User user);
}
