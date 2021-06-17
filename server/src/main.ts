import { NestFactory } from '@nestjs/core';
import session, { Session } from 'express-session';
import { AppModule } from './app.module';
import pg from 'pg';
import connectPg from 'connect-pg-simple';
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      credentials: true,
      origin: 'http://localhost:8080',
    },
  });

  const pgPool = new pg.Pool({
    database: 'postgres',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: 5432,
  });

  const pgSession = connectPg(session);

  app.use(
    session({
      store: new pgSession({
        pool: pgPool,
      }),
      name: 'qid',
      secret: 'riepgerhgkjvlefvhjklfh',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 25 * 365 * 10,
        sameSite: 'lax',
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
