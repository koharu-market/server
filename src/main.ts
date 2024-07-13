import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000', // 허용할 도메인
    credentials: true, // 자격 증명을 허용
  });
  app.use(
    session({
      name: 'session_id', // 세션 쿠키 이름 변경
      secret: 'my-secret',
      resave: false, // 세션 데이터에 변경이 없는 경우 저장하지 않음
      saveUninitialized: false, // 초기화되지 않은 세션은 저장하지 않음
    }),
  );
  await app.listen(8000);
}
bootstrap();
