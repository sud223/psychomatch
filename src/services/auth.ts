import { apiService } from './api';
import { storage } from '../utils';
import { STORAGE_KEYS } from '../constants';
import { User, ApiResponse } from '../types';

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupCredentials {
  name: string;
  email: string;
  password: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> {
    try {
      // Simulate API call - replace with actual API endpoint
      const response = await apiService.post<AuthResponse>('/auth/login', credentials);
      
      if (response.success && response.data) {
        await this.storeAuthData(response.data.token, response.data.user);
      }
      
      return response;
    } catch (error) {
      return {
        success: false,
        data: null as unknown as AuthResponse,
        message: 'Login failed',
      };
    }
  }

  async signup(credentials: SignupCredentials): Promise<ApiResponse<AuthResponse>> {
    try {
      // Simulate API call - replace with actual API endpoint
      const response = await apiService.post<AuthResponse>('/auth/signup', credentials);
      
      if (response.success && response.data) {
        await this.storeAuthData(response.data.token, response.data.user);
      }
      
      return response;
    } catch (error) {
      return {
        success: false,
        data: null as unknown as AuthResponse,
        message: 'Signup failed',
      };
    }
  }

  async logout(): Promise<void> {
    try {
      await storage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      await storage.removeItem(STORAGE_KEYS.USER_DATA);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const userData = await storage.getItem(STORAGE_KEYS.USER_DATA);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  }

  async getAuthToken(): Promise<string | null> {
    try {
      return await storage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    } catch (error) {
      console.error('Get auth token error:', error);
      return null;
    }
  }

  async isAuthenticated(): Promise<boolean> {
    const token = await this.getAuthToken();
    return !!token;
  }

  private async storeAuthData(token: string, user: User): Promise<void> {
    await storage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    await storage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));
  }

  // Mock authentication for demo purposes
  async mockLogin(email: string, password: string): Promise<ApiResponse<AuthResponse>> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (email === 'demo@example.com' && password === 'password') {
      const mockUser: User = {
        id: '1',
        email: 'demo@example.com',
        name: 'Demo User',
        avatar: 'https://via.placeholder.com/100',
      };

      const mockToken = 'mock-jwt-token';
      
      await this.storeAuthData(mockToken, mockUser);

      return {
        success: true,
        data: {
          user: mockUser,
          token: mockToken,
        },
      };
    }

    return {
      success: false,
      data: null as unknown as AuthResponse,
      message: 'Invalid credentials',
    };
  }
}

export const authService = new AuthService();

