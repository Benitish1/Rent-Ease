package com.rentease.controller;

import com.rentease.model.Chat;
import com.rentease.model.Message;
import com.rentease.model.Property;
import com.rentease.model.User;
import com.rentease.repository.ChatRepository;
import com.rentease.repository.MessageRepository;
import com.rentease.repository.PropertyRepository;
import com.rentease.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/chats")
@CrossOrigin(origins = "http://localhost:3000")
public class ChatController {

    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<?> createChat(@RequestBody Map<String, Long> request) {
        try {
            Long propertyId = request.get("propertyId");
            Long tenantId = request.get("tenantId");
            Long landlordId = request.get("landlordId");

            if (propertyId == null || tenantId == null || landlordId == null) {
                return ResponseEntity.badRequest().body("Missing required fields: propertyId, tenantId, or landlordId");
            }

            // Check if chat already exists
            Chat existingChat = chatRepository.findByPropertyIdAndTenantIdAndLandlordId(
                    propertyId, tenantId, landlordId);
            if (existingChat != null) {
                return ResponseEntity.ok(existingChat);
            }

            // Verify property exists
            Property property = propertyRepository.findById(propertyId)
                    .orElseThrow(() -> new RuntimeException("Property not found"));

            // Verify users exist
            User tenant = userRepository.findById(tenantId)
                    .orElseThrow(() -> new RuntimeException("Tenant not found"));
            User landlord = userRepository.findById(landlordId)
                    .orElseThrow(() -> new RuntimeException("Landlord not found"));

            // Create new chat
            Chat chat = new Chat();
            chat.setProperty(property);
            chat.setTenant(tenant);
            chat.setLandlord(landlord);

            return ResponseEntity.ok(chatRepository.save(chat));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error creating chat: " + e.getMessage());
        }
    }

    @GetMapping("/tenant/{tenantId}")
    public ResponseEntity<?> getTenantChats(@PathVariable Long tenantId) {
        try {
            List<Chat> chats = chatRepository.findByTenantId(tenantId);
            return ResponseEntity.ok(chats);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error fetching chats: " + e.getMessage());
        }
    }

    @GetMapping("/landlord/{landlordId}")
    public ResponseEntity<?> getLandlordChats(@PathVariable Long landlordId) {
        try {
            List<Chat> chats = chatRepository.findByLandlordId(landlordId);
            return ResponseEntity.ok(chats);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error fetching chats: " + e.getMessage());
        }
    }

    @GetMapping("/{chatId}/messages")
    public ResponseEntity<?> getChatMessages(@PathVariable Long chatId) {
        try {
            List<Message> messages = messageRepository.findByChatIdOrderByTimestampAsc(chatId);
            return ResponseEntity.ok(messages);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error fetching messages: " + e.getMessage());
        }
    }

    @PostMapping("/{chatId}/messages")
    public ResponseEntity<?> sendMessage(
            @PathVariable Long chatId,
            @RequestBody Map<String, Object> request) {
        try {
            String content = (String) request.get("content");
            Long senderId = Long.valueOf(request.get("senderId").toString());
            Long receiverId = Long.valueOf(request.get("receiverId").toString());

            if (content == null || content.trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Message content cannot be empty");
            }

            // Verify chat exists
            Chat chat = chatRepository.findById(chatId)
                    .orElseThrow(() -> new RuntimeException("Chat not found"));

            // Verify users exist
            User sender = userRepository.findById(senderId)
                    .orElseThrow(() -> new RuntimeException("Sender not found"));
            User receiver = userRepository.findById(receiverId)
                    .orElseThrow(() -> new RuntimeException("Receiver not found"));

            Message message = new Message();
            message.setChat(chat);
            message.setContent(content);
            message.setSender(sender);
            message.setReceiver(receiver);

            return ResponseEntity.ok(messageRepository.save(message));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error sending message: " + e.getMessage());
        }
    }
}