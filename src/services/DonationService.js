// services/DonationService.js
import axios from 'axios';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 30000, // Longer timeout for payment operations
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    console.log(`[${process.env.REACT_APP_ENV}] Donation API Request:`, {
      method: config.method,
      url: config.url,
      baseURL: config.baseURL
    });
    return config;
  },
  (error) => {
    console.error('Donation Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    console.log(`[${process.env.REACT_APP_ENV}] Donation API Response:`, {
      status: response.status,
      url: response.config.url
    });
    return response;
  },
  (error) => {
    console.error(`[${process.env.REACT_APP_ENV}] Donation API Error:`, {
      message: error.message,
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data
    });
    return Promise.reject(error);
  }
);

export const DonationService = {
  createOrder: async (donationData) => {
    try {
      const response = await apiClient.post('/donations/create-order', donationData);
      
      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Failed to create order');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          'Failed to create donation order. Please try again.';
      throw new Error(errorMessage);
    }
  },

  verifyPayment: async (verificationData) => {
    try {
      const response = await apiClient.post('/donations/verify-payment', verificationData);
      
      if (response.data.success) {
        return response.data;
      } else {
        throw new Error(response.data.message || 'Payment verification failed');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          'Payment verification failed. Please contact support.';
      throw new Error(errorMessage);
    }
  },

  reportFailedPayment: async (orderId, errorDetails) => {
    try {
      await apiClient.post('/donations/payment-failed', {
        orderId,
        error: errorDetails
      });
    } catch (error) {
      console.error('Failed to report payment error:', error);
    }
  },

  reportAbandonedOrder: async (orderId, reason) => {
    try {
      await apiClient.post('/donations/order-abandoned', {
        orderId,
        reason
      });
    } catch (error) {
      console.error('Failed to report abandoned order:', error);
    }
  },

  // Mock data for development/staging
  getMockOrderData: () => {
    if (process.env.REACT_APP_ENV === 'production') {
      return null; // Don't use mock data in production
    }
    
    return {
      orderId: `mock_order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      amount: 10000, // 100 INR in paise
      currency: 'INR',
      razorpayKey: process.env.REACT_APP_RAZORPAY_KEY_ID
    };
  }
};