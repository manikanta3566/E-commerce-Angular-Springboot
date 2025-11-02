package com.project.controller;

import com.project.dto.GenricResponse;
import com.project.dto.PaginatedResponse;
import com.project.dto.ProductDto;
import com.project.entity.User;
import com.project.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/public")
public class PublicApiController {

    private final ProductService productService;

    @GetMapping("/search")
    public ResponseEntity<GenricResponse<List<ProductDto>>> searchProducts(@RequestParam("query") String query) {
        return new ResponseEntity<>(GenricResponse.success(productService.searchProductsByName(query),
                "Products fetched successfully"), HttpStatus.OK);
    }

    @GetMapping("/listing")
    public ResponseEntity<GenricResponse<PaginatedResponse<ProductDto>>> getProducts(@RequestParam(defaultValue = "0") int pageNumber,
                                                                                     @RequestParam(defaultValue = "10") int pageSize,
                                                                                     @AuthenticationPrincipal User user) {
        return new ResponseEntity<>(GenricResponse.success(productService.getProducts(pageNumber, pageSize, user),
                "Products fetched successfully"), HttpStatus.OK);
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<GenricResponse<ProductDto>> getProductById(@PathVariable("id") String id) {
        return new ResponseEntity<>(GenricResponse.success(productService.getProductById(id),
                "Product fetched successfully"), HttpStatus.OK);
    }
}
