//package com.houserenting.rentease.controller;
//
//import com.houserenting.rentease.dto.LoginRequest;
//import com.houserenting.rentease.dto.SignupRequest;
//import com.houserenting.rentease.model.User;
//import com.houserenting.rentease.service.UserService;
////import com.houserenting.rentease.util.JwtUtil;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.Collections;
//
//@RestController
//@RequestMapping("/api/auth")
//public class UserController {
//
//    @Autowired
//    private UserService userService;
//
////    @Autowired
////    private JwtUtil jwtUtil;
//
////    @Autowired
////    private AuthenticationManager authenticationManager;
//
//    @Autowired
//    private UserDetailsService userDetailsService;
//
//    @PostMapping("/signup")
//    public ResponseEntity<?> signup(@RequestBody SignupRequest request) {
//        User user = userService.register(request);
//        return ResponseEntity.ok("User registered!");
//    }
//
//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
//        try {
//            // Authenticate using Spring Security
//            authenticationManager.authenticate(
//                    new UsernamePasswordAuthenticationToken(
//                            request.getEmail(),
//                            request.getPassword()));
//
//            // Load user details and generate JWT
//            UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
//            String token = jwtUtil.generateToken(userDetails);
//
//            return ResponseEntity.ok(Collections.singletonMap("token", token));
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
//        }
//    }
//}










package com.houserenting.rentease.controller;

import com.houserenting.rentease.dto.LoginRequest;
import com.houserenting.rentease.dto.SignupRequest;
import com.houserenting.rentease.model.User;
import com.houserenting.rentease.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest request) {
        User user = userService.register(request);
        return ResponseEntity.ok("User registered!");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        boolean isValid = userService.validateUser(request.getEmail(), request.getPassword());
        if (isValid) {
            return ResponseEntity.ok("Login successful (mocked, no security)");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }
}

