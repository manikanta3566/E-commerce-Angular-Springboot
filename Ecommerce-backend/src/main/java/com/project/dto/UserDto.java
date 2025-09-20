package com.project.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.project.enums.RoleType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class UserDto {

    private String id;
    private boolean active;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
    private String email;
    private String name;
    private Set<RoleType> roles;
}
