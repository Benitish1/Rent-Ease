//package com.houserenting.rentease.service;
//
//import com.houserenting.rentease.model.User;
//import com.houserenting.rentease.repository.UserRepository;
//import com.houserenting.rentease.security.CustomUserDetails;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.*;
//import org.springframework.stereotype.Service;
//
//@Service
//public class CustomUserDetailsService implements UserDetailsService {
//
//    private final UserRepository userRepository;
//
//    @Autowired
//    public CustomUserDetailsService(UserRepository userRepository) {
//        this.userRepository = userRepository;
//    }
//
//    @Override
//    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
//        // Fetch user by email
//        User user = userRepository.findByEmail(email)
//                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
//
//        // Log the fetched user details for debugging purposes
//        System.out.println("Loaded user: " + user.getEmail() + " with role: " + user.getRole());
//
//        // Return custom user details that wraps the full User object
//        return new CustomUserDetails(user);
//    }
//}
