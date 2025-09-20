package com.project.controller;

import com.project.dto.GenricResponse;
import com.project.dto.UserDto;
import com.project.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/users")
@RequiredArgsConstructor
@RestController
public class UserController {

    private final UserService userService;

    @PostMapping
    public ResponseEntity<GenricResponse<UserDto>> createUser(@RequestBody UserDto user) {
        return  new ResponseEntity<>(GenricResponse.success(userService.createUser(user),"user created successfully"), HttpStatus.CREATED);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<GenricResponse<UserDto>> getUserById(@PathVariable String userId) {
        return new ResponseEntity<>(GenricResponse.success(userService.getUserById(userId),"user fetched successfully"), HttpStatus.OK);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<GenricResponse<Void>> deleteUser(@PathVariable String userId){
        userService.deleteUser(userId);
        return new ResponseEntity<>(GenricResponse.success(null, "user deleted successfully"), HttpStatus.NO_CONTENT);
    }
}
