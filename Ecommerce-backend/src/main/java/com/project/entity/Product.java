package com.project.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "PRODUCTS")
@AllArgsConstructor
@Data
public class Product {

    @Id
    private String id;

    private String name;
    private double price;
    private String description;
    private String category;

    private String createdById;

    private String updatedById;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdDate;

    @UpdateTimestamp
    @Column(insertable = false)
    private LocalDateTime updatedDate;

    @Lob
    @Column(name = "image_data")
    private byte[] imageData;

    private String imageFileName;

    @Column(name = "image_file_size", nullable = false, columnDefinition = "BIGINT DEFAULT 0")
    private long imageFileSize;

    public Product() {
        this.id = java.util.UUID.randomUUID().toString();
    }
}
