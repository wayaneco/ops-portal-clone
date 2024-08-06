export type UserDetailType = {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  clients: ClientsType;
};

export enum Privileges {
  "CompanyAdmin" = "Company Admin",
  "Agent" = "Agent",
}

export type ClientsType = Array<{
  name: string;
  privileges: Array<Privileges>;
}>;
