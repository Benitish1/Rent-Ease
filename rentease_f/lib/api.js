// lib/api.js
import axios from "axios";

const API_BASE_URL = "http://localhost:8082/api";

// Basic Axios client (no auth headers)
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add response interceptor for better error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Response error:", error.response.data);
      throw error.response.data;
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Request error:", error.request);
      throw new Error(
        "No response from server. Please check if the server is running."
      );
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error:", error.message);
      throw error;
    }
  }
);

// === AUTH ENDPOINTS ===

export const signup = async (userData) => {
  try {
    const response = await apiClient.post("/auth/signup", userData);
    return response.data;
  } catch (error) {
    throw error;
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
    throw error;
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
    throw error;
  }
};

// === PROPERTY ENDPOINTS ===

export const fetchProperties = async () => {
  try {
    const response = await apiClient.get("/properties/my", {
      params: { landlord: 8 },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchProperty = async (propertyId) => {
  try {
    const response = await apiClient.get(`/properties/${propertyId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProperty = async (propertyId, landlordId) => {
  try {
    const response = await apiClient.delete(`/properties/${propertyId}`, {
      params: { landlordId: landlordId.toString() },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createProperty = async (propertyData, images, landlordId) => {
  try {
    const formData = new FormData();
    formData.append(
      "property",
      new Blob([JSON.stringify(propertyData)], {
        type: "application/json",
      })
    );

    if (images && images.length > 0) {
      images.forEach((image) => {
        formData.append("images", image);
      });
    }

    const response = await apiClient.post("/properties", formData, {
      params: { landlordId },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// === FORGOT PASSWORD ===
export const forgotPassword = async (email) => {
  try {
    const response = await apiClient.post("/auth/forgot-password", { email });
    return response.data;
  } catch (error) {
    throw error;
  }
};
