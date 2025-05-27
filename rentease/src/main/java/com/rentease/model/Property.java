package com.rentease.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Data
public class Property {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private BigDecimal price;
    private Integer bedrooms;
    private Integer bathrooms;
    private Double area;
    private String mainPhoto;
    private String type;
    private String neighborhood;
    private String city;
    private String furnished;
    private LocalDate availableFrom;

    @ManyToOne
    @JoinColumn(name = "landlord_id")
    private User landlord;
}