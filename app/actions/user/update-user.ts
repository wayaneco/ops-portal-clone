"use server";

import { revalidatePath, revalidateTag } from "next/cache";

import { createClient } from "utils/supabase/server";

type UpdateUserInfoType = {
  photo_url: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  preferred_name: string;
  email: string;
  primary_phone: string;
  addr_line_1: string;
  addr_line_2: string;
  city: string;
  zip_code: string;
  country: string;
  state_province_region: string;
};

export async function updateUserInfo(params: UpdateUserInfoType) {
  const supabase = createClient();

  console.log(params);
  // const { data, error } = await supabase.rpc("update_user", params);

  // if (error) {
  //   throw new Error("Error updating user roles.");
  // }

  // revalidateTag("user_details");
  // revalidatePath("(dashboard)/user/[id]", "layout");

  // return data;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(params);
    }, 5000);
  });
}
