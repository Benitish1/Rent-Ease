package com.rentease.repository;

import com.rentease.model.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ChatRepository extends JpaRepository<Chat, Long> {
    List<Chat> findByTenantId(Long tenantId);

    List<Chat> findByLandlordId(Long landlordId);

    Chat findByPropertyIdAndTenantIdAndLandlordId(Long propertyId, Long tenantId, Long landlordId);
}