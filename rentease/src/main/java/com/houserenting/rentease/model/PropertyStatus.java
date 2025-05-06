package com.houserenting.rentease.model;

public enum PropertyStatus {
    PENDING, // Property is waiting for admin approval
    APPROVED, // Property has been approved and is available for rent
    REJECTED, // Property has been rejected by admin
    RENTED, // Property is currently rented
    INACTIVE // Property is temporarily inactive
}