//package com.houserenting.rentease.util;
//
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.SignatureAlgorithm;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Component;
//
//import java.util.Date;
//
//@Component
//public class JwtUtil {
//
//    @Value("${jwt.secret}")
//    private String SECRET_KEY; // The secret key should be externalized and loaded from application properties
//
//    private final long EXPIRATION_TIME = 1000 * 60 * 60 * 10; // 10 hours
//
//    // Generate a JWT token using the username
//    public String generateToken(String username) {
//        return Jwts.builder()
//                .setSubject(username)
//                .setIssuedAt(new Date(System.currentTimeMillis()))
//                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
//                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
//                .compact();
//    }
//
//    // Overloaded method to generate token using UserDetails
//    public String generateToken(UserDetails userDetails) {
//        return generateToken(userDetails.getUsername());
//    }
//
//    // Extract username from the JWT token
//    public String extractUsername(String token) {
//        return extractAllClaims(token).getSubject();
//    }
//
//    // Check if the token is expired
//    public boolean isTokenExpired(String token) {
//        return extractAllClaims(token).getExpiration().before(new Date());
//    }
//
//    // Extract all claims from the JWT token
//    private Claims extractAllClaims(String token) {
//        return Jwts.parser()
//                .setSigningKey(SECRET_KEY)
//                .parseClaimsJws(token)
//                .getBody();
//    }
//
//    // Validate the token with the user details
//    public boolean isTokenValid(String token, UserDetails userDetails) {
//        final String username = extractUsername(token);
//        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
//    }
//}
