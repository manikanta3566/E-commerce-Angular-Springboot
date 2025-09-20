package com.project.repository;

import com.project.entity.Role;
import com.project.enums.RoleType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface RoleRepository extends JpaRepository<Role, String> {
    // ...custom query methods if needed...
    Set<Role> findByNameIn(Set<RoleType> roleTypes);
}

