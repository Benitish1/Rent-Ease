package com.houserenting.rentease.controller;

import com.houserenting.rentease.model.Favorite;
import com.houserenting.rentease.service.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users/{userId}/favorites")
public class FavoriteController {

    @Autowired
    private FavoriteService favoriteService;

    @GetMapping
    public ResponseEntity<List<Favorite>> getUserFavorites(@PathVariable Long userId) {
        return ResponseEntity.ok(favoriteService.getUserFavorites(userId));
    }

    @PostMapping
    public ResponseEntity<Favorite> addToFavorites(
            @PathVariable Long userId,
            @RequestBody Map<String, Long> request) {
        Long propertyId = request.get("propertyId");
        return ResponseEntity.ok(favoriteService.addToFavorites(userId, propertyId));
    }

    @DeleteMapping
    public ResponseEntity<Void> removeFromFavorites(
            @PathVariable Long userId,
            @RequestBody Map<String, Long> request) {
        Long propertyId = request.get("propertyId");
        favoriteService.removeFromFavorites(userId, propertyId);
        return ResponseEntity.ok().build();
    }
}
