const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Helper method to get auth headers
  getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getAuthHeaders(),
      ...options
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Authentication APIs
  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  }

  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  async updateProfile(profileData) {
    return this.request('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData)
    });
  }

  // Product APIs
  async getProducts(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/products${queryString ? `?${queryString}` : ''}`);
  }

  async getProduct(id) {
    return this.request(`/products/${id}`);
  }

  async getProductsByCategory(category, limit = 8) {
    return this.request(`/products/category/${category}?limit=${limit}`);
  }

  async getBestsellers(limit = 8) {
    return this.request(`/products/bestsellers?limit=${limit}`);
  }

  // Order APIs
  async createOrder(orderData) {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData)
    });
  }

  async getOrders(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/orders${queryString ? `?${queryString}` : ''}`);
  }

  async getOrder(id) {
    return this.request(`/orders/${id}`);
  }

  async updateOrderStatus(id, status) {
    return this.request(`/orders/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    });
  }

  async getOrderTracking(id) {
    return this.request(`/orders/tracking/${id}`);
  }

  // Review APIs
  async createReview(reviewData) {
    return this.request('/reviews', {
      method: 'POST',
      body: JSON.stringify(reviewData)
    });
  }

  async getProductReviews(productId, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/reviews/product/${productId}${queryString ? `?${queryString}` : ''}`);
  }

  async getUserReviews(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/reviews/user${queryString ? `?${queryString}` : ''}`);
  }

  async updateReview(id, reviewData) {
    return this.request(`/reviews/${id}`, {
      method: 'PUT',
      body: JSON.stringify(reviewData)
    });
  }

  async deleteReview(id) {
    return this.request(`/reviews/${id}`, {
      method: 'DELETE'
    });
  }

  async markReviewHelpful(id) {
    return this.request(`/reviews/${id}/helpful`, {
      method: 'POST'
    });
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;


