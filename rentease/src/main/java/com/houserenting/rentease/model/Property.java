package com.houserenting.rentease.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@Builder
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Basic Information
    private String title;
    private String type;
    @Column(length = 2000)
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
    @ElementCollection
    private List<String> amenities;

    // Media
    @Column(name = "main_photo")
    private String mainPhoto;
    @ElementCollection
    @CollectionTable(name = "property_additional_photos", joinColumns = @JoinColumn(name = "property_id"))
    @Column(name = "photo_url")
    private List<String> additionalPhotos = new ArrayList<>();
    private String videoUrl;

    // Pricing & Availability
    private double price;
    private double deposit;
    private LocalDate availableFrom;
    private int minLeaseMonths;
    @ElementCollection
    private List<String> utilitiesIncluded;

    // Rules & Preferences
    private String pets;
    private String smoking;
    private String events;
    private int maxOccupants;

    // Landlord Relationship
    @ManyToOne
    @JoinColumn(name = "landlord_id")
    private User landlord;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PropertyStatus status = PropertyStatus.PENDING;

    // Add image to additional photos list
    // Add image to additional photos list
    public void addImage(String imageUrl) {
        if (this.additionalPhotos == null) {
            this.additionalPhotos = new ArrayList<>();
        }
        this.additionalPhotos.add(imageUrl);
    }

    // // Set main photo
    // public void setMainPhoto(String imageUrl) {
    // this.mainPhoto = imageUrl;
    // }
    //
    //
    // // You could also add validation logic for setting a main photo if needed
    public void updateMainPhoto(String imageUrl) {
        if (this.mainPhoto == null || this.mainPhoto.isEmpty()) {
            this.mainPhoto = imageUrl;
        } else {
            // Optionally handle if mainPhoto is already set, or decide on replacement
            // behavior
            this.mainPhoto = imageUrl;
        }
    }

    public Property(Long id, String title, String type, String description, String address, String neighborhood,
            String city, String district, int bedrooms, double bathrooms, double area, int yearBuilt, int parkingSpaces,
            String furnished, List<String> amenities, String mainPhoto, List<String> additionalPhotos, String videoUrl,
            double price, double deposit, LocalDate availableFrom, int minLeaseMonths, List<String> utilitiesIncluded,
            String pets, String smoking, String events, int maxOccupants, User landlord) {
        this.id = id;
        this.title = title;
        this.type = type;
        this.description = description;
        this.address = address;
        this.neighborhood = neighborhood;
        this.city = city;
        this.district = district;
        this.bedrooms = bedrooms;
        this.bathrooms = bathrooms;
        this.area = area;
        this.yearBuilt = yearBuilt;
        this.parkingSpaces = parkingSpaces;
        this.furnished = furnished;
        this.amenities = amenities;
        this.mainPhoto = mainPhoto;
        this.additionalPhotos = additionalPhotos;
        this.videoUrl = videoUrl;
        this.price = price;
        this.deposit = deposit;
        this.availableFrom = availableFrom;
        this.minLeaseMonths = minLeaseMonths;
        this.utilitiesIncluded = utilitiesIncluded;
        this.pets = pets;
        this.smoking = smoking;
        this.events = events;
        this.maxOccupants = maxOccupants;
        this.landlord = landlord;
    }
    //
    // public Long getId() {
    // return id;
    // }
    //
    // public void setId(Long id) {
    // this.id = id;
    // }
    //
    // public String getTitle() {
    // return title;
    // }
    //
    // public void setTitle(String title) {
    // this.title = title;
    // }
    //
    // public String getType() {
    // return type;
    // }
    //
    // public void setType(String type) {
    // this.type = type;
    // }
    //
    // public String getDescription() {
    // return description;
    // }
    //
    // public void setDescription(String description) {
    // this.description = description;
    // }
    //
    // public String getAddress() {
    // return address;
    // }
    //
    // public void setAddress(String address) {
    // this.address = address;
    // }
    //
    // public String getNeighborhood() {
    // return neighborhood;
    // }
    //
    // public void setNeighborhood(String neighborhood) {
    // this.neighborhood = neighborhood;
    // }
    //
    // public String getCity() {
    // return city;
    // }
    //
    // public void setCity(String city) {
    // this.city = city;
    // }
    //
    // public String getDistrict() {
    // return district;
    // }
    //
    // public void setDistrict(String district) {
    // this.district = district;
    // }
    //
    // public int getBedrooms() {
    // return bedrooms;
    // }
    //
    // public void setBedrooms(int bedrooms) {
    // this.bedrooms = bedrooms;
    // }
    //
    // public double getBathrooms() {
    // return bathrooms;
    // }
    //
    // public void setBathrooms(double bathrooms) {
    // this.bathrooms = bathrooms;
    // }
    //
    // public double getArea() {
    // return area;
    // }
    //
    // public void setArea(double area) {
    // this.area = area;
    // }
    //
    // public int getYearBuilt() {
    // return yearBuilt;
    // }
    //
    // public void setYearBuilt(int yearBuilt) {
    // this.yearBuilt = yearBuilt;
    // }
    //
    // public int getParkingSpaces() {
    // return parkingSpaces;
    // }
    //
    // public void setParkingSpaces(int parkingSpaces) {
    // this.parkingSpaces = parkingSpaces;
    // }
    //
    // public String getFurnished() {
    // return furnished;
    // }
    //
    // public void setFurnished(String furnished) {
    // this.furnished = furnished;
    // }
    //
    // public List<String> getAmenities() {
    // return amenities;
    // }
    //
    // public void setAmenities(List<String> amenities) {
    // this.amenities = amenities;
    // }
    //
    // public String getMainPhoto() {
    // return mainPhoto;
    // }
    //
    // public List<String> getAdditionalPhotos() {
    // return additionalPhotos;
    // }
    //
    // public void setAdditionalPhotos(List<String> additionalPhotos) {
    // this.additionalPhotos = additionalPhotos;
    // }
    //
    // public String getVideoUrl() {
    // return videoUrl;
    // }
    //
    // public void setVideoUrl(String videoUrl) {
    // this.videoUrl = videoUrl;
    // }
    //
    // public double getPrice() {
    // return price;
    // }
    //
    // public void setPrice(double price) {
    // this.price = price;
    // }
    //
    // public double getDeposit() {
    // return deposit;
    // }
    //
    // public void setDeposit(double deposit) {
    // this.deposit = deposit;
    // }
    //
    // public LocalDate getAvailableFrom() {
    // return availableFrom;
    // }
    //
    // public void setAvailableFrom(LocalDate availableFrom) {
    // this.availableFrom = availableFrom;
    // }
    //
    // public int getMinLeaseMonths() {
    // return minLeaseMonths;
    // }
    //
    // public void setMinLeaseMonths(int minLeaseMonths) {
    // this.minLeaseMonths = minLeaseMonths;
    // }
    //
    // public List<String> getUtilitiesIncluded() {
    // return utilitiesIncluded;
    // }
    //
    // public void setUtilitiesIncluded(List<String> utilitiesIncluded) {
    // this.utilitiesIncluded = utilitiesIncluded;
    // }
    //
    // public String getPets() {
    // return pets;
    // }
    //
    // public void setPets(String pets) {
    // this.pets = pets;
    // }
    //
    // public String getSmoking() {
    // return smoking;
    // }
    //
    // public void setSmoking(String smoking) {
    // this.smoking = smoking;
    // }
    //
    // public String getEvents() {
    // return events;
    // }
    //
    // public void setEvents(String events) {
    // this.events = events;
    // }
    //
    // public int getMaxOccupants() {
    // return maxOccupants;
    // }
    //
    // public void setMaxOccupants(int maxOccupants) {
    // this.maxOccupants = maxOccupants;
    // }
    //
    // public User getLandlord() {
    // return landlord;
    // }
    //
    // public void setLandlord(User landlord) {
    // this.landlord = landlord;
    // }

    public Property(Long id, String title, String type, String description, String address, String neighborhood,
            String city, String district, int bedrooms, double bathrooms, double area, int yearBuilt, int parkingSpaces,
            String furnished, List<String> amenities, String mainPhoto, List<String> additionalPhotos, String videoUrl,
            double price, double deposit, LocalDate availableFrom, int minLeaseMonths, List<String> utilitiesIncluded,
            String pets, String smoking, String events, int maxOccupants, User landlord, PropertyStatus status) {
        this.id = id;
        this.title = title;
        this.type = type;
        this.description = description;
        this.address = address;
        this.neighborhood = neighborhood;
        this.city = city;
        this.district = district;
        this.bedrooms = bedrooms;
        this.bathrooms = bathrooms;
        this.area = area;
        this.yearBuilt = yearBuilt;
        this.parkingSpaces = parkingSpaces;
        this.furnished = furnished;
        this.amenities = amenities;
        this.mainPhoto = mainPhoto;
        this.additionalPhotos = additionalPhotos;
        this.videoUrl = videoUrl;
        this.price = price;
        this.deposit = deposit;
        this.availableFrom = availableFrom;
        this.minLeaseMonths = minLeaseMonths;
        this.utilitiesIncluded = utilitiesIncluded;
        this.pets = pets;
        this.smoking = smoking;
        this.events = events;
        this.maxOccupants = maxOccupants;
        this.landlord = landlord;
        this.status = status;
    }

    // Constructor, getters, setters...
}
