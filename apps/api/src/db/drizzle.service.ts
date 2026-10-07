import { Injectable, OnModuleInit } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

@Injectable()
export class DrizzleService implements OnModuleInit {
  public db!: ReturnType<typeof drizzle<typeof schema>>;

  constructor(private readonly configService: ConfigService) {}
  onModuleInit() {
    const databaseUrl = this.configService.getOrThrow<string>('DATABASE_URL');
    this.db = drizzle(neon(databaseUrl), { schema });
  }
}
