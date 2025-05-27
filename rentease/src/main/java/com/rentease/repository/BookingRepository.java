package com.rentease.repository;

import com.rentease.model.Booking;
import com.rentease.model.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByTenantId(Long tenantId);

    List<Booking> findByPropertyId(Long propertyId);

    List<Booking> findByPropertyIdAndStatus(Long propertyId, BookingStatus status);

    List<Booking> findByStatus(BookingStatus status);

    boolean existsByPropertyIdAndTenantIdAndStatus(Long propertyId, Long tenantId, BookingStatus status);
}