/**
 * Follow Up Boss API Client
 * Comprehensive integration for lead management and CRM operations
 */

export interface FUBLead {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message?: string;
  source?: string;
  tags?: string[];
  customFields?: Record<string, any>;
  propertyInterest?: string;
  timeline?: string;
  budget?: string;
  preferredContact?: string;
  neighborhood?: string;
  propertyType?: string;
  trigger?: string;
  timestamp?: string;
}

export interface FUBResponse {
  success: boolean;
  data?: any;
  error?: string;
  message?: string;
}

export interface FUBContact {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  tags?: string[];
  customFields?: Record<string, any>;
}

export interface FUBProperty {
  id?: string;
  address: string;
  price?: number;
  bedrooms?: number;
  bathrooms?: number;
  squareFeet?: number;
  propertyType: string;
  status: string;
  description?: string;
  images?: string[];
}

class FollowUpBossAPI {
  private apiKey: string;
  private baseUrl: string;
  private accountId: string;

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_FUB_API_KEY || 'fka_0N4mnN0gI0wiplmBLtC4TTO93R9CDV83W7';
    this.baseUrl = 'https://api.followupboss.com/v1';
    this.accountId = process.env.NEXT_PUBLIC_FUB_ACCOUNT_ID || '';
  }

  /**
   * Create a new lead in Follow Up Boss
   */
  async createLead(leadData: FUBLead): Promise<FUBResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/people`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          people: [
            {
              firstName: leadData.firstName,
              lastName: leadData.lastName,
              emails: [{ value: leadData.email, type: 'work' }],
              phones: [{ value: leadData.phone, type: 'work' }],
              tags: [
                'Website Lead',
                'Centennial Hills',
                leadData.propertyInterest || 'General Inquiry',
                leadData.timeline || 'Not Specified',
                leadData.budget || 'Not Specified',
              ],
              customFields: {
                'Property Interest': leadData.propertyInterest || 'General Inquiry',
                Timeline: leadData.timeline || 'Not Specified',
                Budget: leadData.budget || 'Not Specified',
                'Preferred Contact': leadData.preferredContact || 'Any',
                Neighborhood: leadData.neighborhood || 'Centennial Hills',
                'Property Type': leadData.propertyType || 'Not Specified',
                'Lead Source': leadData.source || 'Website',
                Trigger: leadData.trigger || 'Contact Form',
                Message: leadData.message || '',
                'Submission Time': leadData.timestamp || new Date().toISOString(),
              },
              source: leadData.source || 'Website',
              type: 'Person',
            },
          ],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      const data = await response.json();

      // Log successful lead creation
      console.log('Follow Up Boss Lead Created:', data);

      return {
        success: true,
        data: data,
        message: 'Lead created successfully',
      };
    } catch (error) {
      console.error('Follow Up Boss API Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Create a new contact in Follow Up Boss
   */
  async createContact(contactData: FUBContact): Promise<FUBResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/people`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          people: [
            {
              firstName: contactData.firstName,
              lastName: contactData.lastName,
              emails: [{ value: contactData.email, type: 'work' }],
              phones: [{ value: contactData.phone, type: 'work' }],
              tags: ['Website Contact', 'Centennial Hills', ...(contactData.tags || [])],
              customFields: {
                'Contact Source': 'Website',
                'Contact Time': new Date().toISOString(),
                ...contactData.customFields,
              },
              source: 'Website',
              type: 'Person',
            },
          ],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      const data = await response.json();

      return {
        success: true,
        data: data,
        message: 'Contact created successfully',
      };
    } catch (error) {
      console.error('Follow Up Boss API Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Create a new property listing in Follow Up Boss
   */
  async createProperty(propertyData: FUBProperty): Promise<FUBResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/properties`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          properties: [
            {
              address: propertyData.address,
              price: propertyData.price,
              bedrooms: propertyData.bedrooms,
              bathrooms: propertyData.bathrooms,
              squareFeet: propertyData.squareFeet,
              propertyType: propertyData.propertyType,
              status: propertyData.status,
              description: propertyData.description,
              images: propertyData.images,
              customFields: {
                'Listed By': 'Dr. Jan Duffy',
                Neighborhood: 'Centennial Hills',
                'List Date': new Date().toISOString(),
              },
            },
          ],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      const data = await response.json();

      return {
        success: true,
        data: data,
        message: 'Property created successfully',
      };
    } catch (error) {
      console.error('Follow Up Boss API Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Search for existing contacts by email or phone
   */
  async searchContacts(searchTerm: string): Promise<FUBResponse> {
    try {
      const response = await fetch(
        `${this.baseUrl}/people/search?q=${encodeURIComponent(searchTerm)}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      const data = await response.json();

      return {
        success: true,
        data: data,
        message: 'Search completed successfully',
      };
    } catch (error) {
      console.error('Follow Up Boss API Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Update an existing contact
   */
  async updateContact(contactId: string, updateData: Partial<FUBContact>): Promise<FUBResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/people/${contactId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: updateData.firstName,
          lastName: updateData.lastName,
          emails: updateData.email ? [{ value: updateData.email, type: 'work' }] : undefined,
          phones: updateData.phone ? [{ value: updateData.phone, type: 'work' }] : undefined,
          tags: updateData.tags,
          customFields: updateData.customFields,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      const data = await response.json();

      return {
        success: true,
        data: data,
        message: 'Contact updated successfully',
      };
    } catch (error) {
      console.error('Follow Up Boss API Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Add tags to a contact
   */
  async addTagsToContact(contactId: string, tags: string[]): Promise<FUBResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/people/${contactId}/tags`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tags }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      const data = await response.json();

      return {
        success: true,
        data: data,
        message: 'Tags added successfully',
      };
    } catch (error) {
      console.error('Follow Up Boss API Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Get contact details by ID
   */
  async getContact(contactId: string): Promise<FUBResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/people/${contactId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      const data = await response.json();

      return {
        success: true,
        data: data,
        message: 'Contact retrieved successfully',
      };
    } catch (error) {
      console.error('Follow Up Boss API Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Test API connection
   */
  async testConnection(): Promise<FUBResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/people/search?q=test`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 401) {
        return {
          success: false,
          error: 'Invalid API key',
        };
      }

      if (response.status === 403) {
        return {
          success: false,
          error: 'API key does not have required permissions',
        };
      }

      return {
        success: true,
        message: 'API connection successful',
      };
    } catch (error) {
      console.error('Follow Up Boss API Connection Test Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Connection failed',
      };
    }
  }
}

// Create singleton instance
export const fubAPI = new FollowUpBossAPI();

// Export individual methods for convenience
export const {
  createLead,
  createContact,
  createProperty,
  searchContacts,
  updateContact,
  addTagsToContact,
  getContact,
  testConnection,
} = fubAPI;

export default fubAPI;
