# Next.js + NestJS Monorepo

Full-stack monorepo: **Next.js** frontend + **NestJS** backend + **Supabase** entegrasyonu.

## Proje Yapısı

```
nest-creation/
├── package.json          ← root: her iki uygulamayı yönetir
├── frontend/             ← Next.js 15 (port 3000)
│   ├── src/
│   │   ├── app/          ← App Router sayfaları
│   │   └── lib/
│   │       ├── api.ts    ← NestJS backend fetch client
│   │       └── supabase.ts ← Supabase browser client
│   ├── .env.local        ← NEXT_PUBLIC_* env değişkenleri
│   └── next.config.ts    ← /api/* → backend proxy
└── backend/              ← NestJS 12 (port 3001)
    ├── src/
    │   ├── main.ts       ← CORS, /api prefix, ValidationPipe
    │   ├── app.module.ts ← ConfigModule + SupabaseModule
    │   └── supabase/
    │       ├── supabase.module.ts
    │       └── supabase.service.ts ← getClient() / getAdminClient()
    └── .env              ← SUPABASE_* anahtarları
```

## Kurulum ve Çalıştırma

### 1. Env değişkenlerini doldur

**`backend/.env`**
```env
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
PORT=3001
FRONTEND_URL=http://localhost:3000
```

**`frontend/.env.local`**
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### 2. Her iki uygulamayı aynı anda başlat

```bash
npm run dev
```

- Frontend → http://localhost:3000
- Backend  → http://localhost:3001/api

## Kullanım Örnekleri

### Frontend'den backend'e istek

```ts
import { api } from '@/lib/api'

// GET /api/users
const users = await api.get<User[]>('/users')

// POST /api/users
const newUser = await api.post<User>('/users', { name: 'Ali' })
```

### Frontend'de Supabase (direkt)

```ts
import { supabase } from '@/lib/supabase'

const { data } = await supabase.from('products').select('*')
```

### Backend'de Supabase (SupabaseService)

```ts
import { SupabaseService } from '../supabase/supabase.service.js'

@Injectable()
export class UsersService {
  constructor(private supabase: SupabaseService) {}

  async findAll() {
    const { data } = await this.supabase.getClient()
      .from('users').select('*')
    return data
  }
}
```

## Yeni Modül Ekleme (NestJS)

```bash
cd backend
npx nest g module users
npx nest g controller users
npx nest g service users
```
