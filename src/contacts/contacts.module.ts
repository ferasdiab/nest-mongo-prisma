import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { SharedModule } from 'src/shared/shared.module';
import { ValidationMiddleware } from './validation.middleware';

@Module({
  imports: [SharedModule],
  providers: [ContactsService],
  controllers: [ContactsController],
})
export class ContactsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidationMiddleware).forRoutes('contacts/contact');
  }
}
