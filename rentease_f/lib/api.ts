import axios from "axios";

const API_BASE_URL = "http://localhost:8082/api";

// Basic Axios client (no auth headers)
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// === AUTH ENDPOINTS ===

export const signup = async (userData: any) => {
  try {
    const response = await apiClient.post("/auth/signup", userData);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export const registerLandlord = async (
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  password: string
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
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  password: string
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
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  password: string
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

export const login = async (email: string, password: string, role: string) => {
  try {
    const response = await apiClient.post("/auth/login", {
      email,
      password,
      role,
    });

    // No token saving
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export const loginLandlord = async (email: string, password: string) => {
  return login(email, password, "LANDLORD");
};

export const loginTenant = async (email: string, password: string) => {
  return login(email, password, "TENANT");
};

export const loginAdmin = async (email: string, password: string) => {
  return login(email, password, "ADMIN");
};

// === LOGOUT FUNCTION ===

export const logout = async () => {
  // No token, no cleanup needed
  return { success: true, message: "Logged out (no auth system active)" };
};

// === USER PROFILE ===

export const fetchProfile = async () => {
  try {
    const response = await apiClient.get("/user/profile");
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

// === PROPERTY ENDPOINTS ===

export interface Property {
  id: number;
  title: string;
  type: string;
  description: string;
  address: string;
  neighborhood: string;
  city: string;
  district: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  mainPhoto: string;
  additionalPhotos: string[];
  price: number;
  status: "PENDING" | "APPROVED" | "REJECTED" | "RENTED" | "INACTIVE";
  landlordId: number;
  landlordName: string;
}

export const fetchProperties = async (): Promise<Property[]> => {
  try {
    const response = await apiClient.get("/properties/landlord/8"); // Using the landlord ID we created
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export const fetchProperty = async (propertyId: number): Promise<Property> => {
  try {
    const response = await apiClient.get(`/properties/${propertyId}`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export const deleteProperty = async (propertyId: number, landlordId: number): Promise<void> => {
  try {
    const response = await apiClient.delete(`/properties/${propertyId}`, {
      params: { landlordId: landlordId.toString() }
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export const createProperty = async (
  propertyData: Partial<Property>,
  images: File[],
  landlordId: number
): Promise<Property> => {
  try {
    const formData = new FormData();
    formData.append('property', new Blob([JSON.stringify(propertyData)], {
      type: 'application/json'
    }));
    
    if (images && images.length > 0) {
      images.forEach(image => {
        formData.append('images', image);
      });
    }

    const response = await apiClient.post('/properties', formData, {
      params: { landlordId },
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

// === FORGOT PASSWORD ===
export const forgotPassword = async (email: string) => {
  try {
    const response = await apiClient.post("/auth/forgot-password", { email });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
}; 