package com.houserenting.rentease.service;

import com.houserenting.rentease.dto.LoginRequest;
import com.houserenting.rentease.dto.SignupRequest;
import com.houserenting.rentease.model.User;
import com.houserenting.rentease.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Register new user
    public User register(SignupRequest request) {
        try {
            User user = new User();
            user.setEmail(request.getEmail());
            user.setFirstName(request.getFirstName());
            user.setLastName(request.getLastName());
            user.setPhone(request.getPhone());
            user.setPassword(request.getPassword()); // No encoding
            user.setRole(request.getRole());
            return userRepository.save(user);
        } catch (Exception e) {
            System.out.println("Error creating account: " + e.getMessage());
            return null;
        }
    }

    // Login user using DTO
    public Optional<User> login(LoginRequest request) {
        return userRepository.findByEmail(request.getEmail())
                .filter(user -> request.getPassword().equals(user.getPassword()))
                .filter(user -> user.getRole().name().equalsIgnoreCase(request.getRole()));
    }

    // Validate user (if needed)
    public boolean validateUser(String email, String password) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        return userOpt.isPresent() && password.equals(userOpt.get().getPassword());
    }
}
