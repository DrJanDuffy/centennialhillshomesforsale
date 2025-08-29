/**
 * Cloudflare API Utilities
 * Handles DNS management, caching, and other Cloudflare operations
 */

interface CloudflareConfig {
  apiKey: string;
  email: string;
  zoneId?: string;
  accountId?: string;
}

interface CloudflareDNSRecord {
  id: string;
  type: string;
  name: string;
  content: string;
  ttl: number;
  proxied: boolean;
}

interface CloudflareZoneInfo {
  id: string;
  name: string;
  status: string;
  plan: {
    name: string;
  };
}

class CloudflareAPI {
  private config: CloudflareConfig;
  private baseURL = 'https://api.cloudflare.com/client/v4';

  constructor(config: CloudflareConfig) {
    this.config = config;
  }

  /**
   * Get DNS records for a zone
   */
  async getDNSRecords(zoneId: string): Promise<CloudflareDNSRecord[]> {
    try {
      const response = await fetch(`${this.baseURL}/zones/${zoneId}/dns_records`, {
        headers: {
          'X-Auth-Key': this.config.apiKey,
          'X-Auth-Email': this.config.email,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Cloudflare API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.result || [];
    } catch (error) {
      console.error('Error fetching DNS records:', error);
      throw error;
    }
  }

  /**
   * Create a new DNS record
   */
  async createDNSRecord(
    zoneId: string,
    record: Omit<CloudflareDNSRecord, 'id'>
  ): Promise<CloudflareDNSRecord> {
    try {
      const response = await fetch(`${this.baseURL}/zones/${zoneId}/dns_records`, {
        method: 'POST',
        headers: {
          'X-Auth-Key': this.config.apiKey,
          'X-Auth-Email': this.config.email,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(record),
      });

      if (!response.ok) {
        throw new Error(`Cloudflare API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error('Error creating DNS record:', error);
      throw error;
    }
  }

  /**
   * Update an existing DNS record
   */
  async updateDNSRecord(
    zoneId: string,
    recordId: string,
    updates: Partial<Omit<CloudflareDNSRecord, 'id'>>
  ): Promise<CloudflareDNSRecord> {
    try {
      const response = await fetch(`${this.baseURL}/zones/${zoneId}/dns_records/${recordId}`, {
        method: 'PUT',
        headers: {
          'X-Auth-Key': this.config.apiKey,
          'X-Auth-Email': this.config.email,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error(`Cloudflare API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error('Error updating DNS record:', error);
      throw error;
    }
  }

  /**
   * Delete a DNS record
   */
  async deleteDNSRecord(zoneId: string, recordId: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseURL}/zones/${zoneId}/dns_records/${recordId}`, {
        method: 'DELETE',
        headers: {
          'X-Auth-Key': this.config.apiKey,
          'X-Auth-Email': this.config.email,
        },
      });

      if (!response.ok) {
        throw new Error(`Cloudflare API error: ${response.statusText}`);
      }

      return true;
    } catch (error) {
      console.error('Error deleting DNS record:', error);
      throw error;
    }
  }

  /**
   * Purge cache for specific URLs or entire zone
   */
  async purgeCache(zoneId: string, urls?: string[]): Promise<boolean> {
    try {
      const payload = urls ? { files: urls } : { purge_everything: true };

      const response = await fetch(`${this.baseURL}/zones/${zoneId}/purge_cache`, {
        method: 'POST',
        headers: {
          'X-Auth-Key': this.config.apiKey,
          'X-Auth-Email': this.config.email,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Cloudflare API error: ${response.statusText}`);
      }

      return true;
    } catch (error) {
      console.error('Error purging cache:', error);
      throw error;
    }
  }

  /**
   * Get zone information
   */
  async getZoneInfo(zoneId: string): Promise<CloudflareZoneInfo> {
    try {
      const response = await fetch(`${this.baseURL}/zones/${zoneId}`, {
        headers: {
          'X-Auth-Key': this.config.apiKey,
          'X-Auth-Email': this.config.email,
        },
      });

      if (!response.ok) {
        throw new Error(`Cloudflare API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error('Error fetching zone info:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const cloudflareAPI = new CloudflareAPI({
  apiKey: process.env.CLOUDFLARE_API_KEY || '',
  email: process.env.CLOUDFLARE_EMAIL || '',
});

// Export the class for custom instances
export { CloudflareAPI };

// Export types
export type { CloudflareConfig, CloudflareDNSRecord, CloudflareZoneInfo };
