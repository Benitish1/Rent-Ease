package com.houserenting.rentease.dto;

import com.houserenting.rentease.model.PropertyStatus;
import lombok.Data;
import java.time.LocalDate;
import java.util.List;

@Data
public class PropertyResponse {
    private Long id;
    private String title;
    private String type;
    private String description;
    private String address;
    private String neighborhood;
    private String city;
    private String district;
    private int bedrooms;
    private double bathrooms;
    private double area;
    private int yearBuilt;
    private int parkingSpaces;
    private String furnished;
    private List<String> amenities;
    private String mainPhoto;
    private List<String> additionalPhotos;
    private String videoUrl;
    private double price;
    private double deposit;
    private LocalDate availableFrom;
    private int minLeaseMonths;
    private List<String> utilitiesIncluded;
    private String pets;
    private String smoking;
    private String events;
    private int maxOccupants;
    private Long landlordId;
    private String landlordName;
    private PropertyStatus status;
}