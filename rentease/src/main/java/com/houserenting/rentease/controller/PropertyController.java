package com.houserenting.rentease.controller;

import com.houserenting.rentease.dto.PropertyRequest;
import com.houserenting.rentease.dto.PropertyResponse;
import com.houserenting.rentease.service.PropertyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/properties")
@RequiredArgsConstructor
public class PropertyController {

    private final PropertyService propertyService;

    @GetMapping("/my")
    public ResponseEntity<List<PropertyResponse>> getMyProperties(@RequestParam Long landlord) {
        return ResponseEntity.ok(propertyService.getPropertiesByLandlord(landlord));
    }

    @PostMapping
    public ResponseEntity<PropertyResponse> createProperty(
            @RequestPart("property") PropertyRequest request,
            @RequestPart(value = "images", required = false) List<MultipartFile> images,
            @RequestParam Long landlordId) {
        return ResponseEntity.ok(propertyService.createProperty(request, images, landlordId));
    }

    @GetMapping("/landlord/{landlordId}")
    public ResponseEntity<List<PropertyResponse>> getPropertiesByLandlord(@PathVariable Long landlordId) {
        return ResponseEntity.ok(propertyService.getPropertiesByLandlord(landlordId));
    }

    @GetMapping("/{propertyId}")
    public ResponseEntity<PropertyResponse> getPropertyById(@PathVariable Long propertyId) {
        return ResponseEntity.ok(propertyService.getPropertyById(propertyId));
    }

    @GetMapping
    public ResponseEntity<List<PropertyResponse>> getAllProperties() {
        return ResponseEntity.ok(propertyService.getAllProperties());
    }

    @GetMapping("/available")
    public ResponseEntity<List<PropertyResponse>> getAvailableProperties() {
        return ResponseEntity.ok(propertyService.getAllAvailableProperties());
    }

    @GetMapping("/approved")
    public ResponseEntity<List<PropertyResponse>> getApprovedProperties() {
        return ResponseEntity.ok(propertyService.getApprovedProperties());
    }

    @GetMapping("/search")
    public ResponseEntity<List<PropertyResponse>> searchProperties(
            @RequestParam(required = false) String location,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) String propertyType,
            @RequestParam(required = false) Integer bedrooms,
            @RequestParam(required = false) Boolean available,
            @RequestParam(required = false) Long landlordId) {
        return ResponseEntity.ok(propertyService.searchProperties(
                location, minPrice, maxPrice, propertyType, bedrooms, available, landlordId));
    }

    @DeleteMapping("/{propertyId}")
    public ResponseEntity<Void> deleteProperty(
            @PathVariable Long propertyId,
            @RequestParam Long landlordId) {
        propertyService.deleteProperty(propertyId, landlordId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/price-distribution")
    public ResponseEntity<List<Map<String, Object>>> getPropertyPriceDistribution(
            @RequestParam Long landlordId) {
        return ResponseEntity.ok(propertyService.getPropertyPriceDistribution(landlordId));
    }

    @PutMapping("/{propertyId}")
    public ResponseEntity<PropertyResponse> updateProperty(
            @PathVariable Long propertyId,
            @RequestPart("property") PropertyRequest request,
            @RequestPart(value = "images", required = false) List<MultipartFile> images,
            @RequestParam Long landlordId) {
        return ResponseEntity.ok(propertyService.updateProperty(propertyId, request, images, landlordId));
    }
}
