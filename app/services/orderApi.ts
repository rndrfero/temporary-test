import type { Order } from "~/types/order";

// Base API configuration
const API_BASE_URL = "http://localhost:3001";

// Generic API client with error handling
async function apiCall<T>(endpoint: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API call failed:", endpoint, error);
    throw error;
  }
}

// Order-specific API methods
export const orderApi = {
  async getOrders(page = 1, limit = 10) {
    const response = await fetch(
      `${API_BASE_URL}/orders?_page=${page}&_limit=${limit}`
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const totalCount = parseInt(response.headers.get("x-total-count") || "0");
    const orders = await response.json();
    return { orders, totalCount };
  },

  async getOrder(id: number) {
    return apiCall<Order>(`/orders/${id}`);
  },

  async createOrder(orderData: Order) {
    return apiCall<Order>("/orders", {
      method: "POST",
      body: JSON.stringify(orderData),
    });
  },

  async updateOrder(id: number, orderData: Partial<Order>) {
    return apiCall<Order>(`/orders/${id}`, {
      method: "PATCH",
      body: JSON.stringify(orderData),
    });
  },

  async deleteOrder(id: number) {
    return apiCall<void>(`/orders/${id}`, {
      method: "DELETE",
    });
  },
};
