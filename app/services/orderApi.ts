import type { Order } from "~/types/order";
import type { OrderFetchOptions } from "~/types/orderFetchOptions";

// Base API configuration
const API_BASE_URL = "http://localhost:3001";

// Generic API client with error handling
async function apiCall<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await apiFetch(endpoint, options);
  return await response.json();
}

// Lower-level fetch wrapper that returns the response for header access
async function apiFetch(
  endpoint: string,
  options?: RequestInit
): Promise<Response> {
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

    return response;
  } catch (error) {
    console.error("API call failed:", endpoint, error);
    throw error;
  }
}

// Order-specific API methods
export const orderApi = {
  async getOrders({
    page = 1,
    itemsPerPage = 10,
    sortBy,
  }: OrderFetchOptions = {}): Promise<{ orders: Order[]; totalCount: number }> {
    let url = `/orders?_page=${page}&_limit=${itemsPerPage}`;

    // Add sorting parameters if provided
    if (sortBy?.[0]) {
      url += `&_sort=${sortBy[0].key}&_order=${sortBy[0].order}`;
    }

    const response = await apiFetch(url);
    const totalCount = parseInt(
      response.headers.get("x-total-count") || "0",
      10
    );
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
