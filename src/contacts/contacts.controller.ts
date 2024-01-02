import {
  Controller,
  Get,
  Query,
  UseGuards,
  Put,
  Body,
  Param,
  Delete,
  Post,
  Req,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { Client, Contact } from '@prisma/client';
import { CreateClientDTO, CreateContactDTO } from './dto/create-dtos';
@Controller('contacts')
export class ContactsController {
  constructor(private ContactsService: ContactsService) {}
  @Post('/contact')
  createContact(@Body() createContactDTO: CreateContactDTO, @Req() req) {
    return this.ContactsService.createContact(createContactDTO, req);
  }

  @Post('/client')
  createClient(@Body() createClientDTO: CreateClientDTO): Promise<Client> {
    return this.ContactsService.createClient(createClientDTO);
  }

  @Get('/contact')
  getContacts(): Promise<Contact[]> {
    return this.ContactsService.getContacts();
  }

  @Get('/client')
  getCLients(): Promise<Client[]> {
    return this.ContactsService.getCLients();
  }
}
