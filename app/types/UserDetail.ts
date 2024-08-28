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
  secondary_phone: string | null;
  photo_url: string;
  zip_code: string;
  clients: Array<ClientsType>;
};

export type Privileges =
  | "Network Admin"
  | "Company Admin"
  | "Agent"
  | "Primary Contact";

export type ClientsType = {
  id: string;
  client_id?: string;
  name: string;
  latitude: string;
  logo_url: string;
  zip_code: string;
  longitude: string;
  time_zone: string;
  is_enabled: boolean;
  created_at: string;
  privileges?: Array<Privileges>;
  tags: Array<{
    label: string;
  }>;
  provider_types: Array<{
    label: string;
  }>;
  service_provided: Array<{
    // TODO:
    label: string;
  }>;
  service_provided_data: Array<{
    // TODO:
    label: string;
  }>;
  description: string;
  web_address: string;
  provisioning_status: string;
};
