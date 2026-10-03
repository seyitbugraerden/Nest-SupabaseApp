import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api'); // /api/...

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: process.env.WEB_URL ?? 'http://localhost:3001',
    credentials: true,
  });
  // app.enableCors({
  //   origin: (origin, callback) => {
  //     // allow server-to-server / curl (no Origin header)
  //     if (!origin) return callback(null, true);

  //     const webUrl = process.env.WEB_URL ?? 'http://localhost:3001';
  //     if (origin === webUrl) return callback(null, true);

  //     // SDK demo: npx serve . from packages/supavolt-js (any localhost port)
  //     if (/^http:\/\/localhost(:\d+)?$/.test(origin)) {
  //       return callback(null, true);
  //     }

  //     callback(new Error(`CORS blocked: ${origin}`));
  //   },
  //   credentials: true,
  // });

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`API running on http://localhost:${port}/api`);
}
void bootstrap();
