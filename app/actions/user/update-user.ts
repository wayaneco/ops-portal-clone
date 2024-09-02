"use server";

import { revalidatePath } from "next/cache";
import { createClient as createAdminClient } from "@supabase/supabase-js";

import { createClient } from "utils/supabase/server";

import { BASE_URL, SUPABASE_SERVICE_ROLE_KEY } from "@/constant/index";

type UpdateUserInfoType = {
  user_id: string;
  photo_url: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  birth_date: string;
  preferred_name: string;
  email: string;
  primary_phone: string;
  addr_line_1: string;
  addr_line_2: string;
  city: string;
  zip_code: string;
  country: string;
  state_province_region: string;
  staff_id: string;
  isEmailChanged: boolean;
};

export async function updateUserInfo(
  params: UpdateUserInfoType
): Promise<{ ok: boolean; message: string }> {
  const supabase = createClient();
  const supabaseAdmin = createAdminClient(BASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  try {
    const currentLoggedInUser = await supabase.auth.getUser();

    if (params?.isEmailChanged) {
      const { error: update_email_error } =
        await supabaseAdmin.auth.admin.updateUserById(params?.user_id, {
          email: params?.email,
        });

      if (update_email_error) throw update_email_error?.message;
    }

    const payload = {
      birth_date: params?.birth_date ?? "",
      city: params?.city ?? "",
      first_name: params?.first_name ?? "",
      last_name: params?.last_name ?? "",
      line_1: params?.addr_line_1 ?? "",
      line_2: params?.addr_line_2 ?? "",
      middle_name: params?.middle_name ?? "",
      preferred_name: params?.preferred_name ?? "",
      primary_email: params?.email ?? "",
      primary_phone: params?.primary_phone ?? "",
      profile_url: params?.photo_url ?? "",
      staff_id: currentLoggedInUser?.data?.user?.id ?? "",
      state_province_region: params?.state_province_region ?? "",
      user_id: params?.user_id ?? "",
      zip_code: params?.zip_code ?? "",
    };

    const { data, error: update_user_info_error } = await supabase.rpc(
      "update_admin_user",
      payload
    );

    if (update_user_info_error) throw update_user_info_error?.message;

    revalidatePath("(dashboard)/user/[id]", "page");

    return {
      ok: true,
      message: "Success.",
    };
  } catch (error) {
    return {
      ok: false,
      message: error as string,
    };
  }
}
