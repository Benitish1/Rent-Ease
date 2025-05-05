package com.houserenting.rentease.controller;

import com.houserenting.rentease.dto.PropertyRequest;
import com.houserenting.rentease.model.Property;
import com.houserenting.rentease.service.PropertyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/properties")
@RequiredArgsConstructor
public class PropertyController {

    private final PropertyService propertyService;

    // === CREATE PROPERTY ===
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Property> createProperty(
            @RequestPart("property") PropertyRequest propertyRequest,
            @RequestPart("images") List<MultipartFile> images,
            @RequestParam("landlordId") Long landlordId
    ) {
        Property saved = propertyService.createProperty(propertyRequest, images, landlordId);
        return ResponseEntity.ok(saved);
    }

    // === GET PROPERTIES BY LANDLORD ===
    @GetMapping("/my")
    public ResponseEntity<List<Property>> getMyProperties(@RequestParam Long landlordId) {
        return ResponseEntity.ok(propertyService.getPropertiesByLandlord(landlordId));
    }

    // === GET ALL APPROVED PROPERTIES ===
    @GetMapping
    public ResponseEntity<List<Property>> getAllApprovedProperties() {
        List<Property> properties = propertyService.getApprovedProperties();
        return ResponseEntity.ok(properties);
    }

    // === SEARCH PROPERTIES ===
    @GetMapping("/search")
    public ResponseEntity<List<Property>> searchProperties(
            @RequestParam(required = false) String location,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) String propertyType,
            @RequestParam(required = false) Integer bedrooms,
            @RequestParam(required = false) Boolean available,
            @RequestParam(required = false) Long landlordId
    ) {
        List<Property> results = propertyService.searchProperties(
                location, minPrice, maxPrice, propertyType, bedrooms, available, landlordId
        );
        return ResponseEntity.ok(results);
    }

    // === DELETE PROPERTY ===
    @DeleteMapping("/{propertyId}")
    public ResponseEntity<?> deleteProperty(
            @PathVariable Long propertyId,
            @RequestParam Long landlordId
    ) {
        propertyService.deleteProperty(propertyId, landlordId);
        return ResponseEntity.ok("Property deleted successfully");
    }
}
