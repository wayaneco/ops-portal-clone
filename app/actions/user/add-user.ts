"use server";

import { convertBase64toFile } from "@/utils/file/convertBase64ToFile";

import { createClient } from "utils/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } from "@/constant/index";

import { inviteUser } from "../email/invite";

type UpdateUserInfoType = {
  role_id: string;
  isNetworkAdmin: boolean;
  photo_url: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  birth_date: string;
  preferred_name: string;
  preferred_contact: string;
  email: string;
  primary_phone: string;
  addr_line_1: string;
  addr_line_2: string;
  city: string;
  zip_code: string;
  country: string;
  state_province_region: string;
  staff_id: string;
  client_id: string;
  role_name: string;
  client_name: string;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

export async function addUser(
  params: UpdateUserInfoType
): Promise<{ ok: boolean; message: string }> {
  try {
    const supabase = createClient();
    const supabaseAdmin = createAdminClient(
      SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY
    );

    let photoUrl = params?.photo_url ? params.photo_url : "";

    const {
      data: { user: authUser },
      error: error_create_user,
    } = await supabaseAdmin.auth.admin.createUser({
      email: params?.email,
      email_confirm: true,
    });

    const { error } = await inviteUser({
      full_name: `${params?.first_name} ${params?.last_name}`,
      client: params?.client_name,
      role: params?.role_name,
      email: authUser?.email || params?.email,
    });

    if (error) throw error;

    if (error_create_user) throw error_create_user?.message;

    if (authUser) {
      const payload = {
        birth_date: params?.birth_date || null,
        city: params?.city ?? "",
        first_name: params?.first_name ?? "",
        last_name: params?.last_name ?? "",
        line_1: params?.addr_line_1 ?? "",
        line_2: params?.addr_line_2 ?? "",
        middle_name: params?.middle_name ?? "",
        p_user_id: authUser.id ?? "",
        preferred_name: params?.preferred_name ?? "",
        preferred_contact_type: params?.preferred_contact ?? "",
        primary_email: params?.email ?? "",
        primary_phone: params?.primary_phone ?? "",
        profile_url: photoUrl,
        staff_id: params?.staff_id ?? "",
        state_province_region: params?.state_province_region ?? "",
        zip_code: params?.zip_code ?? "",
        ...(!params?.isNetworkAdmin && {
          p_client_id: (params?.isNetworkAdmin ? "" : params?.client_id) ?? "",
          p_role_id: params?.role_id,
        }),
      };

      const { error: error_update_user_info } = await supabase.rpc(
        params?.isNetworkAdmin ? "add_network_admin_user" : "add_admin_user",
        payload
      );

      if (error_update_user_info) throw error_update_user_info?.message;

      if (params?.photo_url && params?.photo_url?.includes("base64")) {
        const file = convertBase64toFile(
          params.photo_url!,
          params?.preferred_name
        );

        const { data: file_data, error: file_error } = await supabase.storage
          .from("avatars")
          .upload(`public/${authUser?.id}`, file as File, {
            upsert: true,
          });

        if (file_error) throw file_error?.message;

        photoUrl = `${supabaseUrl}/storage/v1/object/public/avatars/${file_data?.path}`;
      }

      const { error: update_photo_error } = await supabase
        .from("profile_photos")
        .update({
          photo_url: photoUrl,
        })
        .eq("user_id", authUser?.id);

      if (update_photo_error) throw update_photo_error?.message;
    }

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
