package com.houserenting.rentease.dto;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.List;

@Data
public class PropertyRequest {

    // Basic Information
    private String title;
    private String type;
    private String description;

    // Location
    private String address;
    private String neighborhood;
    private String city;
    private String district;

    // Details
    private int bedrooms;
    private double bathrooms;
    private double area;
    private int yearBuilt;
    private int parkingSpaces;
    private String furnished; // fully, partially, unfurnished

    // Amenities
    private List<String> amenities;

    // Media
    private String videoUrl;

    // Pricing & Availability
    private double price;
    private double deposit;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate availableFrom;

    private int minLeaseMonths;
    private List<String> utilitiesIncluded;

    // Rules & Preferences
    private String pets;
    private String smoking;
    private String events;
    private int maxOccupants;
}
