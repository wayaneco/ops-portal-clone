export type UserDetailType = {
  user_id: string;
  email: string;
  addr_line_1: string;
  addr_line_2: string;
  city: string;
  country: string;
  state_province_region: string;
  primary_email: string;
  secondary_email: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  preferred_name: string;
  birth_date: string;
  primary_phone: string;
  zip_code: string;
  secondary_phone: string;
  photo_url: string;
  clients: Array<ClientsType>;
};

export enum Privileges {
  "NetworkAdmin" = "Network Admin",
  "CompanyAdmin" = "Company Admin",
  "Agent" = "Agent",
  "Customer" = "Customer",
}

export type ClientsType = {
  client_id: string;
  name: string;
  latitude: string;
  logo_url: string;
  zip_code: string;
  longitude: string;
  time_zone: string;
  is_enabled: boolean;
  privileges: Array<Privileges>;
  tags: Array<{
    label: string;
  }>;
  provider_types: Array<{
    label: string;
  }>;
  service_provided_data: Array<{
    label: string;
    type?: string;
  }>;
  description: string;
  web_address: string;
  provisioning_status: string;
  created_at?: string;
};
