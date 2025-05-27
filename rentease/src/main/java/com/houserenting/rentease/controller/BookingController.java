package com.houserenting.rentease.controller;

import com.houserenting.rentease.model.Booking;
import com.houserenting.rentease.model.BookingStatus;
import com.houserenting.rentease.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @GetMapping("/tenant/{tenantId}")
    public ResponseEntity<List<Booking>> getTenantBookings(@PathVariable Long tenantId) {
        return ResponseEntity.ok(bookingService.getTenantBookings(tenantId));
    }

    @GetMapping("/property/{propertyId}")
    public ResponseEntity<List<Booking>> getPropertyBookings(@PathVariable Long propertyId) {
        return ResponseEntity.ok(bookingService.getPropertyBookings(propertyId));
    }

    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody Map<String, Object> request) {
        try {
            System.out.println("Received booking request: " + request);
            System.out.println("Request class: " + request.getClass().getName());
            System.out.println("Request keys: " + request.keySet());

            for (Map.Entry<String, Object> entry : request.entrySet()) {
                System.out.println("Key: " + entry.getKey() + ", Value: " + entry.getValue() +
                        ", Value class: "
                        + (entry.getValue() != null ? entry.getValue().getClass().getName() : "null"));
            }

            if (!request.containsKey("propertyId") || !request.containsKey("tenantId")
                    || !request.containsKey("startDate")) {
                String error = "Missing required fields: " +
                        (!request.containsKey("propertyId") ? "propertyId " : "") +
                        (!request.containsKey("tenantId") ? "tenantId " : "") +
                        (!request.containsKey("startDate") ? "startDate" : "");
                System.err.println(error);
                return ResponseEntity.badRequest().body(error);
            }

            Long propertyId;
            Long tenantId;
            LocalDate startDate;

            try {
                Object propertyIdObj = request.get("propertyId");
                System.out.println("propertyId raw value: " + propertyIdObj + ", type: " +
                        (propertyIdObj != null ? propertyIdObj.getClass().getName() : "null"));
                propertyId = Long.valueOf(propertyIdObj.toString());
            } catch (NumberFormatException e) {
                System.err.println("Invalid propertyId format: " + request.get("propertyId"));
                return ResponseEntity.badRequest().body("Invalid propertyId format");
            }

            try {
                Object tenantIdObj = request.get("tenantId");
                System.out.println("tenantId raw value: " + tenantIdObj + ", type: " +
                        (tenantIdObj != null ? tenantIdObj.getClass().getName() : "null"));
                tenantId = Long.valueOf(tenantIdObj.toString());
            } catch (NumberFormatException e) {
                System.err.println("Invalid tenantId format: " + request.get("tenantId"));
                return ResponseEntity.badRequest().body("Invalid tenantId format");
            }

            try {
                Object startDateObj = request.get("startDate");
                System.out.println("startDate raw value: " + startDateObj + ", type: " +
                        (startDateObj != null ? startDateObj.getClass().getName() : "null"));
                startDate = LocalDate.parse(startDateObj.toString());
            } catch (DateTimeParseException e) {
                System.err.println("Invalid date format: " + request.get("startDate"));
                return ResponseEntity.badRequest().body("Invalid date format. Expected YYYY-MM-DD");
            }

            System.out.println("Parsed values - propertyId: " + propertyId + ", tenantId: " + tenantId + ", startDate: "
                    + startDate);

            Booking booking = bookingService.createBooking(propertyId, tenantId, startDate);
            return ResponseEntity.ok(booking);
        } catch (Exception e) {
            System.err.println("Error creating booking: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{bookingId}/status")
    public ResponseEntity<?> updateBookingStatus(
            @PathVariable Long bookingId,
            @RequestBody Map<String, String> request) {
        try {
            if (!request.containsKey("status")) {
                return ResponseEntity.badRequest().body("Missing status field");
            }
            BookingStatus status = BookingStatus.valueOf(request.get("status").toUpperCase());
            return ResponseEntity.ok(bookingService.updateBookingStatus(bookingId, status));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid status value");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{bookingId}")
    public ResponseEntity<?> cancelBooking(@PathVariable Long bookingId) {
        try {
            bookingService.cancelBooking(bookingId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
