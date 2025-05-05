//package com.houserenting.rentease.security;
//
//import com.houserenting.rentease.util.JwtUtil;
//import io.jsonwebtoken.ExpiredJwtException;
//import io.jsonwebtoken.MalformedJwtException;
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
//import org.springframework.stereotype.Component;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import java.io.IOException;
//import java.security.SignatureException;
//import java.util.logging.Level;
//import java.util.logging.Logger;
//
//@Component
//public class JwtAuthenticationFilter extends OncePerRequestFilter {
//
//    private final JwtUtil jwtUtil;
//    private final UserDetailsService userDetailsService;
//    private static final Logger logger = Logger.getLogger(JwtAuthenticationFilter.class.getName());
//
//    public JwtAuthenticationFilter(JwtUtil jwtUtil, UserDetailsService userDetailsService) {
//        this.jwtUtil = jwtUtil;
//        this.userDetailsService = userDetailsService;
//    }
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request,
//                                    HttpServletResponse response,
//                                    FilterChain filterChain)
//            throws ServletException, IOException {
//
//        final String authHeader = request.getHeader("Authorization");
//
//        // If no Authorization header or token does not start with "Bearer ", just continue the filter chain
//        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
//            filterChain.doFilter(request, response);
//            return;
//        }
//
//        final String token = authHeader.substring(7);
//        if(token == null || !token.startsWith("Bearer ")) {
//            logger.log(Level.SEVERE, "Invalid JWT token or missing");
//            // Extract token without "Bearer " prefix
//        }else{
//            logger.info("JWT token found"+token);
//        }
//        final String username = jwtUtil.extractUsername(token); // Extract the username from the token
//
//        // If the username is not null and not already authenticated, check the token's validity
//        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
//            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
//
//            try {
//                // If token is valid, authenticate the user
//                if (jwtUtil.isTokenValid(token, userDetails)) {
//                    UsernamePasswordAuthenticationToken authenticationToken =
//                            new UsernamePasswordAuthenticationToken(
//                                    userDetails, null, userDetails.getAuthorities()
//                            );
//                    authenticationToken.setDetails(
//                            new WebAuthenticationDetailsSource().buildDetails(request)
//                    );
//                    SecurityContextHolder.getContext().setAuthentication(authenticationToken); // Set the authentication
//                }
//            } catch (ExpiredJwtException e) {
//                // Log the error and send an appropriate response for expired token
//                logger.log(Level.WARNING, "Token expired for user: " + username, e);
//                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
//                response.setContentType("application/json");
//                response.getWriter().write("{\"error\":\"Token expired\"}");
//                return;
//            } catch (MalformedJwtException e) {
//                // Log the error and send an appropriate response for malformed token
//                logger.log(Level.SEVERE, "Malformed token for user: " + username, e);
//                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
//                response.setContentType("application/json");
//                response.getWriter().write("{\"error\":\"Malformed token\"}");
//                return;
//            } catch (Exception e) {
//                // Log other errors for debugging purposes
//                logger.log(Level.SEVERE, "Token validation failed for user: " + username, e);
//                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
//                response.setContentType("application/json");
//                response.getWriter().write("{\"error\":\"Invalid or expired token\"}");
//                return;
//            }
//        }
//
//        filterChain.doFilter(request, response); // Continue the filter chain
//    }
//
//    @Override
//    protected boolean shouldNotFilter(HttpServletRequest request) {
//        String path = request.getRequestURI();
//        // Skip JWT validation for any path under /api/auth/
//        return path.startsWith("/api/auth/");
//    }
//}
