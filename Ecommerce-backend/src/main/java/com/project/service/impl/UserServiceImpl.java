package com.project.service.impl;

import com.project.Exception.GlobalException;
import com.project.dto.UserDto;
import com.project.enums.ErrorCode;
import com.project.entity.Role;
import com.project.entity.User;
import com.project.repository.RoleRepository;
import com.project.repository.UserRepository;
import com.project.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService , UserDetailsService {

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    @Lazy
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDto createUser(UserDto userDto) {
        User existingUser = userRepository.findByEmail(userDto.getEmail());
        if (existingUser != null) {
            throw new GlobalException(ErrorCode.USER_ALREADY_EXISTS);
        }
        User user = new User();
        user.setActive(true);
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setEmail(userDto.getEmail());
        user.setName(userDto.getName());
        Set<Role> availableRoles = roleRepository.findByNameIn(userDto.getRoles());
        if (availableRoles.isEmpty()) {
            throw new GlobalException(ErrorCode.ROLE_NOT_FOUND);
        }
        user.setRoles(availableRoles);
        User savedUser = userRepository.save(user);
        userDto.setId(savedUser.getId());
        return userDto;
    }

    @Override
    public UserDto getUserById(String userId) {
    User user = userRepository.findById(userId).orElseThrow( () -> new GlobalException(ErrorCode.USER_NOT_FOUND));
    if (user != null) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setActive(user.isActive());
        userDto.setEmail(user.getEmail());
        userDto.setName(user.getName());
        userDto.setRoles(user.getRoles().stream().map(Role::getName).collect(Collectors.toSet()));
        return userDto;
    }
        return null;
    }

    @Override
    public UserDto updateUser(String userId, UserDto userDto) {
    User existingUser = userRepository.findById(userId).orElseThrow(() -> new GlobalException(ErrorCode.USER_NOT_FOUND));
    if (existingUser != null) {
        existingUser.setActive(userDto.isActive());
        existingUser.setEmail(userDto.getEmail());
        existingUser.setName(userDto.getName());
        Set<Role> availableRoles = roleRepository.findByNameIn(userDto.getRoles());
        if (availableRoles.isEmpty()) {
            throw new GlobalException(ErrorCode.ROLE_NOT_FOUND);
        }
        existingUser.setRoles(availableRoles);
        User updatedUser = userRepository.save(existingUser);
        userDto.setId(updatedUser.getId());
        return userDto;
    }
        return null;
    }

    @Override
    public void deleteUser(String userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new GlobalException(ErrorCode.USER_NOT_FOUND));
        if (user != null) {
            userRepository.delete(user);
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username);
        if (user == null) {
            throw new GlobalException(ErrorCode.USER_NOT_FOUND);
        }
        return user;
    }
}
