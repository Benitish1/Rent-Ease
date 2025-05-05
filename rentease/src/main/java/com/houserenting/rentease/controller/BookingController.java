package com.houserenting.rentease.controller;

import com.houserenting.rentease.dto.BookingDTO;
import com.houserenting.rentease.model.Booking;
import com.houserenting.rentease.service.BookingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookingDTO> getBooking(@PathVariable Long id) {
        BookingDTO bookingDTO = bookingService.getBookingById(id);
        return ResponseEntity.ok(bookingDTO);
    }

    @PostMapping
    public ResponseEntity<BookingDTO> createBooking(@RequestBody BookingDTO bookingDTO) {
        BookingDTO created = bookingService.createBooking(bookingDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PatchMapping("/{id}/confirm")
    public ResponseEntity<?> confirmBooking(@PathVariable Long id) {
        bookingService.updateBookingStatus(id, "APPROVED");
        return ResponseEntity.ok("Booking confirmed");
    }

    @PatchMapping("/{id}/decline")
    public ResponseEntity<?> declineBooking(@PathVariable Long id) {
        bookingService.updateBookingStatus(id, "REJECTED");
        return ResponseEntity.ok("Booking declined");
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Booking>> getByStatus(@PathVariable String status) {
        return ResponseEntity.ok(bookingService.getBookingsByStatus(status));
    }


}
