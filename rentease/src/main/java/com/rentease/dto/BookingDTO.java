package com.rentease.dto;

import com.rentease.model.BookingStatus;
import lombok.Data;
import java.time.LocalDate;

@Data
public class BookingDTO {
    private Long id;
    private Long propertyId;
    private Long tenantId;
    private LocalDate startDate;
    private LocalDate endDate;
    private BookingStatus status;
    private String propertyTitle;
    private String tenantName;
    private String landlordName;
}