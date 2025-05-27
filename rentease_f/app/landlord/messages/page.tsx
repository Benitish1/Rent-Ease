"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, User } from "lucide-react";

interface Message {
  id: number;
  content: string;
  senderId: number;
  receiverId: number;
  timestamp: string;
  isRead: boolean;
}

interface Chat {
  id: number;
  propertyId: number;
  propertyTitle: string;
  tenantId: number;
  tenantName: string;
  lastMessage?: Message;
  unreadCount: number;
}

export default function MessagesPage() {
  const { toast } = useToast();
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    if (selectedChat) {
      fetchMessages(selectedChat.id);
    }
  }, [selectedChat]);

  const fetchChats = async () => {
    try {
      const userData = localStorage.getItem("user");
      if (!userData) {
        throw new Error("User not logged in");
      }
      const user = JSON.parse(userData);

      const response = await fetch(
        `http://localhost:8082/api/chats/landlord/${user.id}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch chats");
      }

      const data = await response.json();
      setChats(data);
    } catch (err: any) {
      console.error("Error fetching chats:", err);
      toast({
        title: "Error",
        description: err.message || "Failed to fetch chats",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (chatId: number) => {
    try {
      const response = await fetch(
        `http://localhost:8082/api/chats/${chatId}/messages`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }

      const data = await response.json();
      setMessages(data);
    } catch (err: any) {
      console.error("Error fetching messages:", err);
      toast({
        title: "Error",
        description: err.message || "Failed to fetch messages",
        variant: "destructive",
      });
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedChat) return;

    try {
      const userData = localStorage.getItem("user");
      if (!userData) {
        throw new Error("User not logged in");
      }
      const user = JSON.parse(userData);

      const response = await fetch(
        `http://localhost:8082/api/chats/${selectedChat.id}/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: newMessage,
            senderId: user.id,
            receiverId: selectedChat.tenantId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const message = await response.json();
      setMessages([...messages, message]);
      setNewMessage("");
    } catch (err: any) {
      console.error("Error sending message:", err);
      toast({
        title: "Error",
        description: err.message || "Failed to send message",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Messages</h1>
        <p className="text-muted-foreground">
          Chat with tenants about properties and bookings
        </p>
      </div>

      <div className="grid h-[600px] gap-6 md:grid-cols-2">
        {/* Chat List */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Conversations</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              {loading ? (
                <div className="flex items-center justify-center p-4">
                  <p className="text-sm text-muted-foreground">
                    Loading chats...
                  </p>
                </div>
              ) : chats.length === 0 ? (
                <div className="flex items-center justify-center p-4">
                  <p className="text-sm text-muted-foreground">
                    No conversations yet
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {chats.map((chat) => (
                    <button
                      key={chat.id}
                      className={`flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors hover:bg-accent ${
                        selectedChat?.id === chat.id ? "bg-accent" : ""
                      }`}
                      onClick={() => setSelectedChat(chat)}
                    >
                      <Avatar>
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 overflow-hidden">
                        <p className="font-medium">{chat.tenantName}</p>
                        <p className="text-sm text-muted-foreground">
                          {chat.propertyTitle}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {chat.lastMessage?.content || "No messages yet"}
                        </p>
                      </div>
                      {chat.unreadCount > 0 && (
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                          {chat.unreadCount}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Window */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>
              {selectedChat
                ? `${selectedChat.tenantName} - ${selectedChat.propertyTitle}`
                : "Select a chat"}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden">
            {selectedChat ? (
              <>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-4 p-4">
                    {messages.map((message) => {
                      const isOwnMessage =
                        message.senderId === selectedChat.tenantId;
                      return (
                        <div
                          key={message.id}
                          className={`flex ${
                            isOwnMessage ? "justify-start" : "justify-end"
                          }`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg p-3 ${
                              isOwnMessage
                                ? "bg-muted"
                                : "bg-primary text-primary-foreground"
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p className="mt-1 text-xs text-muted-foreground">
                              {new Date(message.timestamp).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
                <div className="mt-4 flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        sendMessage();
                      }
                    }}
                  />
                  <Button onClick={sendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex h-full items-center justify-center">
                <p className="text-sm text-muted-foreground">
                  Select a conversation to start chatting
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
