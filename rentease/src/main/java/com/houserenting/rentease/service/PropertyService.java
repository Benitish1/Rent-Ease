package com.houserenting.rentease.service;

import com.houserenting.rentease.dto.PropertyRequest;
import com.houserenting.rentease.dto.PropertyResponse;
import com.houserenting.rentease.model.Property;
import com.houserenting.rentease.model.PropertyStatus;
import com.houserenting.rentease.model.User;
import com.houserenting.rentease.repository.PropertyRepository;
import com.houserenting.rentease.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Service
@RequiredArgsConstructor
public class PropertyService {

    private final PropertyRepository propertyRepository;
    private final UserRepository userRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Value("${server.port}")
    private String serverPort;

    @PersistenceContext
    private EntityManager entityManager;

    private String getImageUrl(String fileName) {
        return "http://localhost:" + serverPort + "/uploads/" + fileName;
    }

    private void ensureUploadDirectoryExists() {
        try {
            File directory = new File(uploadDir);
            if (!directory.exists()) {
                boolean created = directory.mkdirs();
                if (!created) {
                    throw new RuntimeException("Failed to create upload directory: " + uploadDir);
                }
            }
            // Verify the directory is writable
            if (!directory.canWrite()) {
                throw new RuntimeException("Upload directory is not writable: " + uploadDir);
            }
        } catch (Exception e) {
            throw new RuntimeException("Error setting up upload directory: " + e.getMessage(), e);
        }
    }

    private PropertyResponse convertToPropertyResponse(Property property) {
        PropertyResponse response = new PropertyResponse();
        response.setId(property.getId());
        response.setTitle(property.getTitle());
        response.setType(property.getType());
        response.setDescription(property.getDescription());
        response.setAddress(property.getAddress());
        response.setNeighborhood(property.getNeighborhood());
        response.setCity(property.getCity());
        response.setDistrict(property.getDistrict());
        response.setBedrooms(property.getBedrooms());
        response.setBathrooms(property.getBathrooms());
        response.setArea(property.getArea());
        response.setYearBuilt(property.getYearBuilt());
        response.setParkingSpaces(property.getParkingSpaces());
        response.setFurnished(property.getFurnished());
        response.setAmenities(property.getAmenities());
        response.setMainPhoto(property.getMainPhoto());
        response.setAdditionalPhotos(property.getAdditionalPhotos());
        response.setVideoUrl(property.getVideoUrl());
        response.setPrice(property.getPrice());
        response.setDeposit(property.getDeposit());
        response.setAvailableFrom(property.getAvailableFrom());
        response.setMinLeaseMonths(property.getMinLeaseMonths());
        response.setUtilitiesIncluded(property.getUtilitiesIncluded());
        response.setPets(property.getPets());
        response.setSmoking(property.getSmoking());
        response.setEvents(property.getEvents());
        response.setMaxOccupants(property.getMaxOccupants());
        response.setLandlordId(property.getLandlord().getId());
        response.setLandlordName(property.getLandlord().getFirstName() + " " + property.getLandlord().getLastName());
        response.setStatus(property.getStatus());
        return response;
    }

    public PropertyResponse createProperty(PropertyRequest request, List<MultipartFile> images, Long landlordId) {
        try {
            ensureUploadDirectoryExists();

            // Validate landlord
            User landlord = userRepository.findById(landlordId)
                    .orElseThrow(() -> new RuntimeException("Landlord not found with id: " + landlordId));

            // Handle image uploads with better error handling
            List<String> imageUrls = new ArrayList<>();
            for (MultipartFile image : images) {
                if (!image.isEmpty()) {
                    String fileName = UUID.randomUUID() + "-" + image.getOriginalFilename();
                    File dest = new File(uploadDir + File.separator + fileName);
                    try {
                        image.transferTo(dest);
                        imageUrls.add(getImageUrl(fileName));
                    } catch (IOException e) {
                        throw new RuntimeException("Failed to upload image: " + e.getMessage(), e);
                    }
                }
            }

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
            property.setAvailableFrom(
                    request.getAvailableFrom() != null ? request.getAvailableFrom() : LocalDate.now());
            property.setMinLeaseMonths(request.getMinLeaseMonths());
            property.setUtilitiesIncluded(request.getUtilitiesIncluded());
            property.setPets(request.getPets());
            property.setSmoking(request.getSmoking());
            property.setEvents(request.getEvents());
            property.setMaxOccupants(request.getMaxOccupants());
            property.setLandlord(landlord);

            if (!imageUrls.isEmpty()) {
                property.setMainPhoto(imageUrls.get(0)); // Set main photo from uploaded images
                property.setAdditionalPhotos(imageUrls); // Set additional photos
            }

            Property savedProperty = propertyRepository.save(property);
            return convertToPropertyResponse(savedProperty);
        } catch (Exception e) {
            throw new RuntimeException("Failed to create property: " + e.getMessage(), e);
        }
    }

    public List<PropertyResponse> getPropertiesByLandlord(Long landlordId) {
        return propertyRepository.findByLandlordId(landlordId)
                .stream()
                .map(this::convertToPropertyResponse)
                .collect(Collectors.toList());
    }

    public PropertyResponse getPropertyById(Long propertyId) {
        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new RuntimeException("Property not found with id: " + propertyId));
        return convertToPropertyResponse(property);
    }

    public List<PropertyResponse> getAllProperties() {
        return propertyRepository.findAll()
                .stream()
                .map(this::convertToPropertyResponse)
                .collect(Collectors.toList());
    }

    public List<PropertyResponse> getAllAvailableProperties() {
        return propertyRepository.findByStatus(PropertyStatus.APPROVED)
                .stream()
                .map(this::convertToPropertyResponse)
                .collect(Collectors.toList());
    }

    public List<PropertyResponse> getApprovedProperties() {
        return propertyRepository.findByStatus(PropertyStatus.APPROVED)
                .stream()
                .map(this::convertToPropertyResponse)
                .collect(Collectors.toList());
    }

    public List<PropertyResponse> searchProperties(String location, Double minPrice, Double maxPrice,
            String propertyType, Integer bedrooms, Boolean available, Long landlordId) {
        return propertyRepository.searchProperties(location, minPrice, maxPrice, propertyType, bedrooms, available,
                landlordId)
                .stream()
                .map(this::convertToPropertyResponse)
                .collect(Collectors.toList());
    }

    public List<Map<String, Object>> getPropertyPriceDistribution(Long landlordId) {
        return propertyRepository.getPropertyPriceDistribution(landlordId);
    }

    @Transactional
    public void deleteProperty(Long propertyId, Long landlordId) {
        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new RuntimeException("Property not found"));

        // Verify that the property belongs to the landlord
        if (!property.getLandlord().getId().equals(landlordId)) {
            throw new RuntimeException("Unauthorized to delete this property");
        }

        // Delete associated images from the filesystem
        if (property.getMainPhoto() != null) {
            deleteImageFile(property.getMainPhoto());
        }
        if (property.getAdditionalPhotos() != null) {
            property.getAdditionalPhotos().forEach(this::deleteImageFile);
        }

        // First delete from property_additionalphotos table
        entityManager.createNativeQuery("DELETE FROM property_additionalphotos WHERE property_id = :propertyId")
                .setParameter("propertyId", propertyId)
                .executeUpdate();

        // Then delete from other join tables
        entityManager.createNativeQuery("DELETE FROM property_amenities WHERE property_id = :propertyId")
                .setParameter("propertyId", propertyId)
                .executeUpdate();

        entityManager.createNativeQuery("DELETE FROM property_utilitiesincluded WHERE property_id = :propertyId")
                .setParameter("propertyId", propertyId)
                .executeUpdate();

        // Clear the collections in memory
        property.getAdditionalPhotos().clear();
        property.getAmenities().clear();
        property.getUtilitiesIncluded().clear();

        // Flush the changes to ensure the collections are cleared in the database
        entityManager.flush();

        // Now delete the property
        propertyRepository.delete(property);
    }

    private void deleteImageFile(String fileName) {
        try {
            File file = new File(uploadDir + File.separator + fileName);
            if (file.exists()) {
                file.delete();
            }
        } catch (Exception e) {
            // Log the error but don't throw it to prevent the deletion from failing
            e.printStackTrace();
        }
    }
}
