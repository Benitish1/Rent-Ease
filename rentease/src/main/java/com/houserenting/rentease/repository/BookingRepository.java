package com.houserenting.rentease.repository;

import com.houserenting.rentease.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByTenantId(Long tenantId);
    List<Booking> findByPropertyId(Long propertyId);
    List<Booking> findByStatus(String status);

}
