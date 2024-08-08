export type UserDetailType = {
  user_id: string;
  email: string;
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  line_1?: string;
  line_2?: string;
  city?: string;
  state_province_region?: string;
  primary_phone?: string;
  clients?: Array<ClientsType>;
  privileges?: Privileges[]
};

export enum Privileges {
  "NetworkAdmin" = "Network Admin",
  "CompanyAdmin" = "Company Admin",
  "Agent" = "Agent",
  "Cutomer" = "Customer"
  
}

export type ClientsType = {
  name: string;
  privileges: Array<Privileges>;
};
