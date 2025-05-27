package com.rentease.repository;

import com.rentease.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
 
public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByChatIdOrderByTimestampAsc(Long chatId);
    long countByChatIdAndReceiverIdAndIsReadFalse(Long chatId, Long receiverId);
} 