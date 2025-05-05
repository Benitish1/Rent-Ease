package com.houserenting.rentease.repository;

import com.houserenting.rentease.model.Property;
import com.houserenting.rentease.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PropertyRepository extends JpaRepository<Property, Long> {

    List<Property> findByLandlord(User landlord);

    List<Property> findByStatus(String status);

    List<Property> findByLandlordId(Long landlordId);

    @Query("SELECT p FROM Property p " +
            "WHERE (:location IS NULL OR p.city LIKE %:location% OR p.district LIKE %:location% OR p.neighborhood LIKE %:location%) " +
            "AND (:minPrice IS NULL OR p.price >= :minPrice) " +
            "AND (:maxPrice IS NULL OR p.price <= :maxPrice) " +
            "AND (:propertyType IS NULL OR p.type = :propertyType) " +
            "AND (:bedrooms IS NULL OR p.bedrooms = :bedrooms) " +
            "AND (:available IS NULL OR (p.status = 'AVAILABLE')) " +
            "AND (:landlordId IS NULL OR p.landlord.id = :landlordId)")
    List<Property> searchProperties(
            @Param("location") String location,
            @Param("minPrice") Double minPrice,
            @Param("maxPrice") Double maxPrice,
            @Param("propertyType") String propertyType,
            @Param("bedrooms") Integer bedrooms,
            @Param("available") Boolean available,
            @Param("landlordId") Long landlordId
    );
}
