export type UserDetailType = {
  name: string;
  email: string;
  phoneNumber: string;
  mailAddress: string;
  clients: ClientsType;
};

export enum Privileges {
  "CompanyAdmin" = "Company Admin",
  "Agent" = "Agent",
}

export type ClientsType = Array<{
  client: string;
  privileges: Array<Privileges>;
}>;
