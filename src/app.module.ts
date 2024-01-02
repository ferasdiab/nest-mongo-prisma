import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { ContactsModule } from './contacts/contacts.module';

@Module({
  imports: [SharedModule, ContactsModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
