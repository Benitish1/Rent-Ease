package com.houserenting.rentease.service;

import com.houserenting.rentease.model.Favorite;
import com.houserenting.rentease.model.Property;
import com.houserenting.rentease.model.User;
import com.houserenting.rentease.repository.FavoriteRepository;
import com.houserenting.rentease.repository.PropertyRepository;
import com.houserenting.rentease.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class FavoriteService {
    @Autowired
    private FavoriteRepository favoriteRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PropertyRepository propertyRepository;

    public List<Favorite> getUserFavorites(Long userId) {
        return favoriteRepository.findByUserId(userId);
    }

    @Transactional
    public Favorite addToFavorites(Long userId, Long propertyId) {
        try {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            Property property = propertyRepository.findById(propertyId)
                    .orElseThrow(() -> new RuntimeException("Property not found"));

            if (favoriteRepository.existsByUserIdAndPropertyId(userId, propertyId)) {
                throw new RuntimeException("Property is already in favorites");
            }

            Favorite favorite = new Favorite();
            favorite.setUser(user);
            favorite.setProperty(property);
            return favoriteRepository.save(favorite);
        } catch (Exception e) {
            throw new RuntimeException("Failed to add property to favorites: " + e.getMessage());
        }
    }

    @Transactional
    public void removeFromFavorites(Long userId, Long propertyId) {
        try {
            if (!favoriteRepository.existsByUserIdAndPropertyId(userId, propertyId)) {
                throw new RuntimeException("Property is not in favorites");
            }
            favoriteRepository.deleteByUserIdAndPropertyId(userId, propertyId);
        } catch (Exception e) {
            throw new RuntimeException("Failed to remove property from favorites: " + e.getMessage());
        }
    }
}
