import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SupabaseService } from './supabase.service.js';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [SupabaseService, ConfigService],
  exports: [SupabaseService],
})
export class SupabaseModule {}
