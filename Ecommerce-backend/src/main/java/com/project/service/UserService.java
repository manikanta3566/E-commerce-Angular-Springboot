package com.project.service;

import com.project.dto.UserDto;

public interface UserService {
    UserDto createUser(UserDto userDto);
    UserDto getUserById(String userId);
    UserDto updateUser(String userId, UserDto userDto);
    void deleteUser(String userId);
}
