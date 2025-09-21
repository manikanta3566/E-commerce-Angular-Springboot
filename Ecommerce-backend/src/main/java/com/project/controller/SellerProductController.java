package com.project.controller;

import com.project.dto.GenricResponse;
import com.project.dto.ProductDto;
import com.project.entity.User;
import com.project.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/seller/products")
@RequiredArgsConstructor
@RestController
public class SellerProductController {
    private final ProductService productService;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addProduct(
            @RequestBody ProductDto productDTO,
            @AuthenticationPrincipal User user) {
        return new ResponseEntity<>(
                GenricResponse.success(productService.addProduct(productDTO, user), "Product created successfully"),
                HttpStatus.CREATED
        );
    }

}
