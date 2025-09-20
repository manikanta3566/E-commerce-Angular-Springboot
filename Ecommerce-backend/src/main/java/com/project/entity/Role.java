package com.project.entity;

import com.project.enums.RoleType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@AllArgsConstructor
@Data
@Entity
@Table(name = "ROLES")
public class Role {
    @Id
    private String id;

    @Enumerated(EnumType.STRING)
    private RoleType name;

    public Role(){
        this.id = UUID.randomUUID().toString();
    }
}
