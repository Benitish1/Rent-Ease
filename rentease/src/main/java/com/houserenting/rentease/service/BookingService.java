package com.houserenting.rentease.service;

import com.houserenting.rentease.dto.BookingDTO;
import com.houserenting.rentease.model.Booking;
import com.houserenting.rentease.model.BookingStatus;
import com.houserenting.rentease.model.Property;
import com.houserenting.rentease.model.User;
import com.houserenting.rentease.repository.BookingRepository;
import com.houserenting.rentease.repository.PropertyRepository;
import com.houserenting.rentease.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private UserRepository userRepository;

    public BookingDTO createBooking(BookingDTO bookingDTO) {
        Booking booking = convertToEntity(bookingDTO);
        Booking savedBooking = bookingRepository.save(booking);
        return convertToDto(savedBooking);
    }

    public BookingDTO getBookingById(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        return convertToDto(booking);
    }

    public List<Booking> getBookingsByTenant(Long tenantId) {
        return bookingRepository.findByTenantId(tenantId);
    }

    public List<Booking> getBookingsByProperty(Long propertyId) {
        return bookingRepository.findByPropertyId(propertyId);
    }

    public Booking updateBookingStatus(Long bookingId, String status) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        booking.setStatus(Enum.valueOf(BookingStatus.class, status.toUpperCase()));
        return bookingRepository.save(booking);
    }

    private BookingDTO convertToDto(Booking booking) {
        BookingDTO dto = new BookingDTO();
        dto.setId(booking.getId());
        dto.setPropertyId(booking.getProperty().getId());
        dto.setTenantId(booking.getTenant().getId());
        dto.setStartDate(booking.getStartDate());
        dto.setEndDate(booking.getEndDate());
        return dto;
    }

    private Booking convertToEntity(BookingDTO dto) {
        if (dto.getPropertyId() == null) {
            throw new IllegalArgumentException("Property ID cannot be null");
        }
        if (dto.getTenantId() == null) {
            throw new IllegalArgumentException("Tenant ID cannot be null");
        }

        Property property = propertyRepository.findById(dto.getPropertyId())
                .orElseThrow(() -> new RuntimeException("Property not found with ID: " + dto.getPropertyId()));
        User tenant = userRepository.findById(dto.getTenantId())
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + dto.getTenantId()));

        Booking booking = new Booking();
        booking.setProperty(property);
        booking.setTenant(tenant);
        booking.setStartDate(dto.getStartDate());
        booking.setEndDate(dto.getEndDate());
        booking.setStatus(BookingStatus.PENDING); // Or use dto.getStatus() if needed

        return booking;
    }

    public void updateBookingStatus(Long bookingId, BookingStatus status) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        booking.setStatus(status);
        bookingRepository.save(booking);
    }


    public List<Booking> getBookingsByStatus(String status) {
        return bookingRepository.findByStatus(status);
    }


}
