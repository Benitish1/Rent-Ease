package com.rentease.service;

import com.rentease.dto.BookingDTO;
import com.rentease.model.Booking;
import com.rentease.model.BookingStatus;
import com.rentease.model.Property;
import com.rentease.model.User;
import com.rentease.repository.BookingRepository;
import com.rentease.repository.PropertyRepository;
import com.rentease.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Booking> getTenantBookings(Long tenantId) {
        return bookingRepository.findByTenantId(tenantId);
    }

    public List<Booking> getPropertyBookings(Long propertyId) {
        return bookingRepository.findByPropertyId(propertyId);
    }

    @Transactional
    public Booking createBooking(Long propertyId, Long tenantId, LocalDate startDate) {
        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new RuntimeException("Property not found"));
        User tenant = userRepository.findById(tenantId)
                .orElseThrow(() -> new RuntimeException("Tenant not found"));

        // Check if there's already a pending or approved booking for this property and
        // tenant
        if (bookingRepository.existsByPropertyIdAndTenantIdAndStatus(propertyId, tenantId, BookingStatus.PENDING)) {
            throw new RuntimeException(
                    "You already have a pending booking request for this property. Please wait for the landlord's response or cancel your existing request.");
        }

        if (bookingRepository.existsByPropertyIdAndTenantIdAndStatus(propertyId, tenantId, BookingStatus.APPROVED)) {
            throw new RuntimeException(
                    "You already have an approved booking for this property. You cannot make another booking request.");
        }

        // Check if the property is available for the requested dates
        List<Booking> existingBookings = bookingRepository.findByPropertyIdAndStatus(propertyId,
                BookingStatus.APPROVED);
        for (Booking booking : existingBookings) {
            if (startDate.isAfter(booking.getStartDate()) && startDate.isBefore(booking.getEndDate())) {
                throw new RuntimeException("Property is not available for the selected dates");
            }
        }

        Booking booking = new Booking();
        booking.setProperty(property);
        booking.setTenant(tenant);
        booking.setStartDate(startDate);
        booking.setEndDate(startDate.plusMonths(1)); // Default to 1 month rental
        booking.setStatus(BookingStatus.PENDING);

        return bookingRepository.save(booking);
    }

    @Transactional
    public Booking updateBookingStatus(Long bookingId, BookingStatus status) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setStatus(status);
        return bookingRepository.save(booking);
    }

    @Transactional
    public void cancelBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (booking.getStatus() != BookingStatus.PENDING) {
            throw new RuntimeException("Only pending bookings can be cancelled");
        }

        booking.setStatus(BookingStatus.CANCELLED);
        bookingRepository.save(booking);
    }

    public BookingDTO getBookingById(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        return convertToDto(booking);
    }

    private BookingDTO convertToDto(Booking booking) {
        BookingDTO dto = new BookingDTO();
        dto.setId(booking.getId());
        dto.setPropertyId(booking.getProperty().getId());
        dto.setTenantId(booking.getTenant().getId());
        dto.setStartDate(booking.getStartDate());
        dto.setEndDate(booking.getEndDate());
        dto.setStatus(booking.getStatus());
        dto.setPropertyTitle(booking.getProperty().getTitle());
        dto.setTenantName(booking.getTenant().getFirstName() + " " + booking.getTenant().getLastName());
        dto.setLandlordName(booking.getProperty().getLandlord().getFirstName() + " " +
                booking.getProperty().getLandlord().getLastName());
        return dto;
    }

    public List<Booking> getBookingsByStatus(BookingStatus status) {
        return bookingRepository.findByStatus(status);
    }
}