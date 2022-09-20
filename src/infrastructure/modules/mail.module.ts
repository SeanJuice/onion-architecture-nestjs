import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

import { mailInfo } from '@infrastructureLayer|config';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          ...mailInfo,
        },
        defaults: {
          from: '"No Reply" <claraekekenta32@gmail.com>',
        },
        template: {
          dir: join(__dirname, '../email-templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class MailModule {}
