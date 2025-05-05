// lib/api.js
import axios from "axios";

const API_BASE_URL = "http://localhost:8082/api";

// Basic Axios client (no auth headers)
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// === AUTH ENDPOINTS ===

export const signup = async (userData) => {
  try {
    const response = await apiClient.post("/auth/signup", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const registerLandlord = async (
    firstName,
    lastName,
    email,
    phone,
    password
) => {
  return signup({
    firstName,
    lastName,
    email,
    phone,
    password,
    role: "LANDLORD",
  });
};

export const registerTenant = async (
    firstName,
    lastName,
    email,
    phone,
    password
) => {
  return signup({
    firstName,
    lastName,
    email,
    phone,
    password,
    role: "TENANT",
  });
};

export const registerAdmin = async (
    firstName,
    lastName,
    email,
    phone,
    password
) => {
  return signup({
    firstName,
    lastName,
    email,
    phone,
    password,
    role: "ADMIN",
  });
};

export const registerSampleLandlord = async () => {
  return registerLandlord(
      "John",
      "Doe",
      "john.doe@example.com",
      "+1234567890",
      "Landlord123!"
  );
};

export const registerSampleTenant = async () => {
  return registerTenant(
      "Jane",
      "Smith",
      "jane.smith@example.com",
      "+1987654321",
      "Tenant123!"
  );
};

export const registerSampleAdmin = async () => {
  return registerAdmin(
      "Admin",
      "User",
      "admin@rentease.com",
      "+1122334455",
      "Admin123!"
  );
};

// === LOGIN FUNCTIONS ===

export const login = async (email, password, role) => {
  try {
    const response = await apiClient.post("/auth/login", {
      email,
      password,
      role,
    });

    // No token saving
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const loginLandlord = async (email, password) => {
  return login(email, password, "LANDLORD");
};

export const loginTenant = async (email, password) => {
  return login(email, password, "TENANT");
};

export const loginAdmin = async (email, password) => {
  return login(email, password, "ADMIN");
};

// === LOGOUT FUNCTION ===

export const logout = async () => {
  // No token, no cleanup needed
  return { success: true, message: "Logged out (no auth system active)" };
};

// === USER PROFILE (REMOVE IF NOT USED) ===

export const fetchProfile = async () => {
  try {
    const response = await apiClient.get("/user/profile");
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// === PROPERTY ENDPOINTS ===

export const fetchProperties = async () => {
  try {
    const response = await apiClient.get("/properties/my", {
      params: { landlordId: 8 }, // <- correct query parameter key
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};


