package com.rentease.model;

import com.houserenting.rentease.model.Favorite;
import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String phoneNumber;
    private String role; // ROLE_TENANT, ROLE_LANDLORD, ROLE_ADMIN

    @OneToMany(mappedBy = "landlord")
    private List<Property> properties;

    @OneToMany(mappedBy = "tenant")
    private List<Booking> bookings;

    @OneToMany(mappedBy = "user")
    private List<Favorite> favorites;

    @OneToMany(mappedBy = "sender")
    private List<Message> sentMessages;

    @OneToMany(mappedBy = "receiver")
    private List<Message> receivedMessages;
}