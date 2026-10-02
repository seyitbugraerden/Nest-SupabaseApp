import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService implements OnModuleInit {
  private client: SupabaseClient;
  private adminClient: SupabaseClient;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    const url = this.configService.getOrThrow<string>('SUPABASE_URL');
    const anonKey = this.configService.getOrThrow<string>('SUPABASE_ANON_KEY');
    const serviceRoleKey = this.configService.get<string>(
      'SUPABASE_SERVICE_ROLE_KEY',
    );

    // Public client (uses anon key — respects RLS)
    this.client = createClient(url, anonKey);

    // Admin client (uses service role key — bypasses RLS)
    if (serviceRoleKey) {
      this.adminClient = createClient(url, serviceRoleKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      });
    }
  }

  /** Public Supabase client (anon key, respects RLS) */
  getClient(): SupabaseClient {
    return this.client;
  }

  /** Admin Supabase client (service role key, bypasses RLS) */
  getAdminClient(): SupabaseClient {
    if (!this.adminClient) {
      throw new Error(
        'Admin client not available. Provide SUPABASE_SERVICE_ROLE_KEY.',
      );
    }
    return this.adminClient;
  }
}
