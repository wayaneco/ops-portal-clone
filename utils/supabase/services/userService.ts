import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseRoleKey = process.env.SUPABASE_API_KEY_SERVICE_ROLE;

const supabase = createClient(
  supabaseUrl as string,
  supabaseRoleKey as string,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export const create = async (username: string, userFullName: string) => {
  const { data, error } = await supabase.auth.admin.createUser({
    email: username,
    user_metadata: { name: userFullName, isCorbadoUser: true },
    email_confirm: true,
  });

  if (error) {
    console.log("Error from create user: ", error.message);
    return null;
  }

  console.log(data);
  return data;
};

export const findByEmail = async (email: string) => {
  var { data, error } = await supabase.rpc("get_user_id_by_email", {
    email: email,
  });

  if (error) {
    console.log("Error from get_user_id_by_email: ", error.message);
    return null;
  }

  console.log("get_user_id_by_email", data);
  if (data.length == 0) {
    // No user found
    return null;
  }

  const id = data[0].id;
  var response = await supabase.auth.admin.getUserById(id);
  if (response.error) {
    console.log("Error from getUserById: ", response.error.message);
    return null;
  }

  console.log("get_user_id_by_email", data);
  if (response.data.user == null) {
    // No user found
    return null;
  }

  return response.data.user;
};

export const verifyPassword = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    console.log("Error from verifyPassword: ", error.message);
    return null;
  }

  console.log(data);
  return data;
};
