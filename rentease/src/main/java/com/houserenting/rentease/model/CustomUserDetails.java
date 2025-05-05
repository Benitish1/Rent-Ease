//package com.houserenting.rentease.model;
//
////import org.springframework.security.core.GrantedAuthority;
////import org.springframework.security.core.userdetails.UserDetails;
//
//import java.util.Collection;
//
//public class CustomUserDetails  {
//
//    private final User user; rentease
//
//    public CustomUserDetails(User user) {
//        this.user = user;
//    }
//
//    public Long getId() {
//        return user.getId();
//    }
//
//    public String getRole() {
//        return user.getRole().name(); // Use name() to return string
//    }
//
////    @Override
////    public Collection<? extends GrantedAuthority> getAuthorities() {
////        return user.getAuthorities(); // Uses the method defined in User
////    }
//
//    @Override
//    public String getPassword() {
//        return user.getPassword();
//    }
//
//    @Override
//    public String getUsername() {
//        return user.getEmail(); // Use email as username
//    }
//
//    @Override
//    public boolean isAccountNonExpired() {
//        return true;
//    }
//
//    @Override
//    public boolean isAccountNonLocked() {
//        return true;
//    }
//
//    @Override
//    public boolean isCredentialsNonExpired() {
//        return true;
//    }
//
//    @Override
//    public boolean isEnabled() {
//        return user.isEnabled(); // Uses 'enabled' field in User
//    }
//
//    public User getUser() {
//        return user;
//    }
//}
