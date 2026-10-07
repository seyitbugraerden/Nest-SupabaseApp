# Supavolt API — Part 2

Bu bölümde NestJS API'ye Neon PostgreSQL bağlantısı, Drizzle ORM şemaları ve ilk migration eklendi. Part 1 başlangıcı: `a7e0ecf` (`initial creation of supavolt ep1`).

## Kurulum

Node.js ve pnpm gereklidir. Aşağıdaki komutları depo kökünden çalıştırın:

```bash
pnpm install
```

Bu bölümde eklenen paketler için eşdeğer kurulum komutları:

```bash
pnpm --filter api add @neondatabase/serverless drizzle-orm dotenv
pnpm --filter api add -D drizzle-kit
```

### pnpm ile eklenen paketler

| Paket | Kurulum komutu (depo kökünden) | Görevi |
| --- | --- | --- |
| `@neondatabase/serverless` | `pnpm --filter api add @neondatabase/serverless` | Neon PostgreSQL bağlantısı için HTTP istemcisi. |
| `drizzle-orm` | `pnpm --filter api add drizzle-orm` | TypeScript ile tablo şemalarını ve tipli veritabanı sorgularını tanımlar. |
| `dotenv` | `pnpm --filter api add dotenv` | Drizzle yapılandırmasında `.env` dosyasını `process.env` içine yükler. |
| `drizzle-kit` | `pnpm --filter api add -D drizzle-kit` | Migration üretme ve uygulama, şema senkronizasyonu ve Studio komutlarını sağlar. |

`--filter api`, paketin yalnızca API uygulamasına eklenmesini sağlar. `-D`, paketi geliştirme bağımlılığı olarak kaydeder. `pnpm install` ise manifest ve kilit dosyasında kayıtlı çalışma alanı bağımlılıklarını kurar.

Terminal zaten `apps/api` klasöründeyse aynı paketler şu komutlarla eklenebilir:

```bash
pnpm add @neondatabase/serverless drizzle-orm dotenv
pnpm add -D drizzle-kit
```

Paketler mevcut `package.json` ve `pnpm-lock.yaml` içinde kayıtlıdır; yeniden eklemek gerekmez. `pnpm-workspace.yaml` dosyasında `esbuild` kurulum betiği için `allowBuilds: false` kaydı eklendi.

## Ortam değişkenleri

`apps/api/.env` dosyasını oluşturun ve Neon PostgreSQL bağlantı bilgilerinizi girin:

```dotenv
DATABASE_URL=postgresql://USER:PASSWORD@HOST/DATABASE?sslmode=require
PORT=3000
WEB_URL=http://localhost:3001
```

`.env` Git tarafından yok sayılır. Gerçek bağlantı bilgilerini commit etmeyin. API ortam değişkenlerini global `ConfigModule` üzerinden, Drizzle CLI ise `dotenv/config` ile okur. `DATABASE_URL` eksikse açık bir hata verilir.

## Part 2 kapsamı

1. **Paketler ve CLI:** Neon, Drizzle ORM, dotenv, Drizzle Kit bağımlılıkları ve dört veritabanı scripti.
2. **Şema ve migration:** `users`, `organizations`, `org_members`, `projects` tabloları; `admin` ve `developer` rollerini içeren `org_role` enum'u; benzersiz alanlar ve silmede cascade uygulayan dış anahtarlar. İlk migration ve metadata dosyaları `drizzle/` altında tutulur.
3. **NestJS bağlantısı ve README:** Global `DbModule`, dışa aktarılan `DrizzleService` ve `AppModule` bağlantısı. Servisin `db` alanı Neon HTTP sürücüsü üzerinden tipli Drizzle istemcisini sunar.

Şemaların giriş noktası `src/db/schema/index.ts` dosyasıdır. UUID birincil anahtarları uygulama tarafından sağlanır. `updatedAt` varsayılan olarak oluşturma zamanını alır; güncellemede otomatik değişmez.

## Veritabanı komutları

Depo kökünden çalıştırın. `--dir apps/api` doğru `.env` ve Drizzle yapılandırmasının okunmasını sağlar.

```bash
# Şema değişikliklerinden SQL migration üret
pnpm --dir apps/api run db:generate

# Kayıtlı migration'ları hedef veritabanına uygula
pnpm --dir apps/api run db:migrate

# Geliştirmede şemayı migration üretmeden doğrudan uygula
pnpm --dir apps/api run db:push

# Drizzle Studio'yu aç
pnpm --dir apps/api run db:studio
```

Sürümlenmiş değişikliklerde `db:generate` ve `db:migrate` akışını kullanın. `db:push` hedef veritabanının şemasını doğrudan değiştirir. İlk migration: `drizzle/0000_soft_amphibian.sql`.

## Çalıştırma ve doğrulama

```bash
# API geliştirme sunucusu
pnpm run dev:api

# API ve web uygulamasını birlikte başlat
pnpm run dev

# API derlemesi
pnpm --dir apps/api run build

# Birim testleri
pnpm --dir apps/api run test

# E2E testleri
pnpm --dir apps/api run test:e2e
```

API varsayılan olarak `http://localhost:3000/api` adresinde çalışır. CORS web adresi varsayılan olarak `http://localhost:3001` olup `WEB_URL` ile değiştirilebilir.
