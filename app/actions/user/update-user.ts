"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { createClient as createAdminClient } from "@supabase/supabase-js";

import { createClient } from "utils/supabase/server";

import { BASE_URL, SUPABASE_SERVICE_ROLE_KEY } from "@/constant/index";
import { convertBase64toFile } from "@/utils/file/convertBase64ToFile";
import { getMimeType } from "@/utils/file/getMimeType";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

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

export async function updateUserInfo(params: UpdateUserInfoType) {
  const supabase = createClient();
  const supabaseAdmin = createAdminClient(BASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  try {
    const currentLoggedInUser = await supabase.auth.getUser();

    let photoUrl = params?.photo_url;

    // IF THE EMAIL IS CHANGE UPDATE THE EMAIL
    if (params?.isEmailChanged) {
      const { error: update_email_error } =
        await supabaseAdmin.auth.admin.updateUserById(params?.user_id, {
          email: params?.email,
        });

      if (update_email_error) throw new Error(update_email_error?.message);
    }

    const payload = {
      birth_date: params?.birth_date,
      city: params?.city,
      first_name: params?.first_name,
      last_name: params?.last_name,
      line_1: params?.addr_line_1,
      line_2: params?.addr_line_2,
      middle_name: params?.middle_name,
      preferred_name: params?.preferred_name,
      primary_email: params?.email,
      primary_phone: params?.primary_phone,
      profile_url: "",
      staff_id: currentLoggedInUser?.data?.user?.id,
      state_province_region: params?.state_province_region,
      user_id: params?.staff_id,
      zip_code: params?.zip_code,
    };

    const { error: update_user_info_error } = await supabase.rpc(
      "update_admin_user",
      payload
    );

    if (update_user_info_error)
      throw new Error(update_user_info_error?.message);

    if (params?.photo_url && params?.photo_url?.includes("base64")) {
      const mimeType = getMimeType(params?.photo_url);
      const file = convertBase64toFile(
        params.photo_url!,
        params?.preferred_name
      );

      const [, type] = mimeType.split("/");

      const { data: file_data, error: file_error } = await supabase.storage
        .from("avatars")
        .upload(`public/${params?.user_id}.${type}`, file as File, {
          upsert: true,
        });

      if (file_error) throw new Error(file_error?.message);

      photoUrl = `${supabaseUrl}/storage/v1/object/public/avatars/${file_data?.path}`;
    }

    const { error: update_photo_error } = await supabase
      .from("profile_photos")
      .update({
        photo_url: photoUrl,
      })
      .eq("user_id", params?.user_id);

    if (update_photo_error) throw new Error(update_photo_error?.message);

    revalidateTag("user_details");
    revalidatePath("(dashboard)/user/[id]", "layout");

    return JSON.parse(
      JSON.stringify({
        isError: false,
        message: "Success",
      })
    );
  } catch (error) {
    return JSON.parse(
      JSON.stringify({
        isError: true,
        message: error,
      })
    );
  }
}
