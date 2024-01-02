export class CreateClientDTO {
  name: string;
}

export class CreateContactDTO {
  name: string;
  primaryPhone: string;
  clientId: string;
}
