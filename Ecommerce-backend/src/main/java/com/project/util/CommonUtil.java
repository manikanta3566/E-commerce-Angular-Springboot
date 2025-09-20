package com.project.util;

import com.project.dto.UserDto;
import com.project.entity.Role;
import com.project.entity.User;

import java.util.stream.Collectors;

public class CommonUtil {

    public static UserDto getUserDto(User principle) {
        if (principle == null) {
            return null;
        }
        UserDto userDto = new UserDto();
        userDto.setId(principle.getId());
        userDto.setEmail(principle.getEmail());
        userDto.setRoles(principle.getRoles().stream().map(Role::getName).collect(Collectors.toSet()));
        userDto.setActive(principle.isActive());
        userDto.setName(principle.getName());
        return userDto;
    }
}
