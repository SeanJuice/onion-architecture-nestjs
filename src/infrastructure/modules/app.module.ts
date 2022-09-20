import { Module } from '@nestjs/common';
import { AuthModule, ServiceModule } from 'src/domain/modules';
import { EmailService } from 'src/domain/services';
import { MailModule } from './mail.module';

@Module({
  imports: [MailModule, ServiceModule, AuthModule, MailModule],
  controllers: [],
  providers: [MailModule, EmailService],
})
export class AppModule {}
