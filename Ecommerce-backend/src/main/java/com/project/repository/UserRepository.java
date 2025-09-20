package com.project.repository;

import com.project.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    // ...custom query methods if needed...

    User findByEmail(String email);
}

