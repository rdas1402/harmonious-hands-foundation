// services/ContactUsService.js
import axios from 'axios';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`[${process.env.REACT_APP_ENV}] API Request:`, {
      method: config.method,
      url: config.url,
      baseURL: config.baseURL,
      data: config.data
    });
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log(`[${process.env.REACT_APP_ENV}] API Response:`, {
      status: response.status,
      url: response.config.url,
      data: response.data
    });
    return response;
  },
  (error) => {
    console.error(`[${process.env.REACT_APP_ENV}] API Error:`, {
      message: error.message,
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data
    });
    return Promise.reject(error);
  }
);

export const ContactUsService = {
  submitContactForm: async (formData) => {
    try {
      const response = await apiClient.post('/contact/submit', formData);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          'Failed to submit form. Please try again.';
      throw new Error(errorMessage);
    }
  },
  
  getLocations: async () => {
    try {
      const response = await apiClient.get('/contact/locations');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch locations:', error);
      // Return mock data for development/staging if API fails
      if (process.env.REACT_APP_ENV !== 'production') {
        console.log('Using mock locations data for development/staging');
        return {
          headOffice: {
            city: 'Jorhat',
            address: 'Kamalabaria Gaon, Na-Ali, Jorhat East, Jorhat, Assam – 785001',
            mapUrl: 'https://maps.app.goo.gl/VRSq9V3k3Vk2X6t59',
            phone: '+91-86386-56513',
            email: 'support@harmonioushandsfoundation.com'
          },
          otherLocations: ['Guwahati', 'Shivsagar', 'Dibrugarh'],
          primaryEmail: 'support@harmonioushandsfoundation.com',
          supportEmail: 'support@harmonioushandsfoundation.com',
          primaryPhone: '+91-86386-56513'
        };
      }
      throw new Error('Failed to fetch locations');
    }
  }
};