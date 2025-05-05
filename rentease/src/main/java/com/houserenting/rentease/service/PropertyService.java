package com.houserenting.rentease.service;

import com.houserenting.rentease.dto.PropertyRequest;
import com.houserenting.rentease.model.Property;
import com.houserenting.rentease.model.User;
import com.houserenting.rentease.repository.PropertyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PropertyService {

    private final PropertyRepository propertyRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;

    public Property createProperty(PropertyRequest request, List<MultipartFile> images, Long landlordId) {
        // Construct the landlord user object using the landlordId
        User landlord = new User();
        landlord.setId(landlordId);

        Property property = new Property();

        // Set property details from the request
        property.setTitle(request.getTitle());
        property.setDescription(request.getDescription());
        property.setType(request.getType());
        property.setAddress(request.getAddress());
        property.setNeighborhood(request.getNeighborhood());
        property.setCity(request.getCity());
        property.setDistrict(request.getDistrict());
        property.setBedrooms(request.getBedrooms());
        property.setBathrooms(request.getBathrooms());
        property.setArea(request.getArea());
        property.setYearBuilt(request.getYearBuilt());
        property.setParkingSpaces(request.getParkingSpaces());
        property.setFurnished(request.getFurnished());
        property.setAmenities(request.getAmenities());
        property.setVideoUrl(request.getVideoUrl());
        property.setPrice(request.getPrice());
        property.setDeposit(request.getDeposit());
        property.setAvailableFrom(request.getAvailableFrom() != null ? request.getAvailableFrom() : LocalDate.now());
        property.setMinLeaseMonths(request.getMinLeaseMonths());
        property.setUtilitiesIncluded(request.getUtilitiesIncluded());
        property.setPets(request.getPets());
        property.setSmoking(request.getSmoking());
        property.setEvents(request.getEvents());
        property.setMaxOccupants(request.getMaxOccupants());
        property.setLandlord(landlord); // Set landlord

        // Handle image uploads
        List<String> imageUrls = new ArrayList<>();
        for (MultipartFile image : images) {
            if (!image.isEmpty()) {
                String fileName = UUID.randomUUID() + "-" + image.getOriginalFilename();
                File dest = new File(uploadDir + File.separator + fileName);
                try {
                    image.transferTo(dest);
                    imageUrls.add(fileName);
                } catch (IOException e) {
                    e.printStackTrace(); // Consider using proper logging
                }
            }
        }

        if (!imageUrls.isEmpty()) {
            property.setMainPhoto(imageUrls.get(0)); // Set main photo from uploaded images
            property.setAdditionalPhotos(imageUrls); // Set additional photos
        }

        return propertyRepository.save(property); // Save property to DB
    }

    // Get properties by landlord ID
    public List<Property> getPropertiesByLandlord(Long landlordId) {
        return propertyRepository.findByLandlordId(landlordId);
    }

    // Get all properties in the system
    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }

    // Get all available properties
    public List<Property> getAllAvailableProperties() {
        return propertyRepository.findByStatus("AVAILABLE");
    }

    // Get all approved properties
    public List<Property> getApprovedProperties() {
        return propertyRepository.findByStatus("APPROVED");
    }

    // Search properties based on various criteria
    public List<Property> searchProperties(String location, Double minPrice, Double maxPrice,
                                           String propertyType, Integer bedrooms, Boolean available, Long landlordId) {
        return propertyRepository.searchProperties(location, minPrice, maxPrice, propertyType, bedrooms, available, landlordId);
    }

    // Delete a property by ID (only if it belongs to the given landlord)
    public void deleteProperty(Long propertyId, Long landlordId) {
        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new RuntimeException("Property not found"));

        if (!property.getLandlord().getId().equals(landlordId)) {
            throw new RuntimeException("Unauthorized to delete this property");
        }

        propertyRepository.delete(property); // Delete property from DB
    }
}
