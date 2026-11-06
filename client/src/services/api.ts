import { ContactFormData, ApiResponse } from '../types/portfolio.js';

export const submitContactMessage = async (
  formData: ContactFormData
): Promise<ApiResponse> => {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data: ApiResponse = await response.json();

    if (!response.ok) {
      const result: ApiResponse = {
        success: false,
        message: data.message || `Request failed with status ${response.status}`,
        isConfigError: data.isConfigError || response.status === 503,
      };
      if (data.errors) {
        result.errors = data.errors;
      }
      return result;
    }

    return data;
  } catch (error: any) {
    return {
      success: false,
      message:
        'Unable to reach the backend API server. If running locally, ensure the Express server is active on port 5000.',
      isConfigError: false,
    };
  }
};

export const checkApiHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch('/api/health');
    return response.ok;
  } catch {
    return false;
  }
};

