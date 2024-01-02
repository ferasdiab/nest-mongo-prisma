import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Client, Contact } from '@prisma/client';
import { CreateClientDTO, CreateContactDTO } from './dto/create-dtos';

@Injectable()
export class ContactsService {
  constructor(private prisma: PrismaService) {}

  async createClient(createClientDTO: CreateClientDTO): Promise<Client> {
    const { name } = createClientDTO;
    const newClent = await this.prisma.client.create({
      data: {
        name,
      },
    });
    return newClent;
  }

  async createContact(
    createContactDTO: CreateContactDTO,
    req: any = undefined,
  ) {
    const { name, primaryPhone, clientId } = createContactDTO;

    const data = this.generateContatcs(clientId);

    const newContact = await this.prisma.contact.create({
      data: {
        active: true,
        name: 'hello test',
      },
    });
    const extraData = req.extraData;

    return { newContact, extraData };
  }

  async getContacts(): Promise<Contact[]> {
    const contacts = await this.prisma.contact.findMany({
      take: 10,
      include: { client: { select: { id: true, name: true } } },
    });
    return contacts;
  }

  async getCLients(): Promise<Client[]> {
    const clients = await this.prisma.client.findMany({
      include: { _count: { select: { Contact: true } } },
    });

    return clients;
  }

  generateContatcs(id: string) {
    const getRandomName = () => {
      const randomChars =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      let randomName = '';
      for (let i = 0; i < 5; i++) {
        randomName += randomChars.charAt(
          Math.floor(Math.random() * randomChars.length),
        );
      }
      return randomName;
    };

    const getRandomPhoneNumber = () => {
      const randomDigits = '0123456789';
      let phoneNumber = '';
      for (let i = 0; i < 10; i++) {
        phoneNumber += randomDigits.charAt(
          Math.floor(Math.random() * randomDigits.length),
        );
      }
      return phoneNumber;
    };

    const arr = new Array(5000).fill(undefined);

    return arr.map((ele) => {
      return {
        name: getRandomName(),
        primaryPhone: getRandomPhoneNumber(),
        clientId: id,
        active: true,
      };
    });
  }
}
