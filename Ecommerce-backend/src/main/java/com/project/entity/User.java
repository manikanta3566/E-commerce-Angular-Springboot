package com.project.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;
import java.util.stream.Collectors;

@Entity
@Table(name = "USERS")
@AllArgsConstructor
@Data
public class User implements UserDetails {
    @Id
    private String id;
    private boolean active;
    private String password;
    private String email;
    private String name;

    @ManyToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    @JoinTable(
            name = "user_roles", // join table
            joinColumns = @JoinColumn(name = "user_id"), // foreign key to User
            inverseJoinColumns = @JoinColumn(name = "role_id") // foreign key to Role
    )
    private Set<Role> roles = new HashSet<>();
    public User(){
        this.id = UUID.randomUUID().toString();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Optional.ofNullable(this.roles)
                .orElse(Collections.emptySet())
                .stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_"+role.getName().name()))
                .collect(Collectors.toList());
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return this.active;
    }
}
