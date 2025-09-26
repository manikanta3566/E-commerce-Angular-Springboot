package com.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDto {
    private String id;
    private String name;
    private double price;
    private String description;
    private String category;
    private String base64Image; // Image as Base64 encoded string
    private String imageFileName;
    private long imageFileSize;
}
