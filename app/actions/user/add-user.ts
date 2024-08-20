"use server";

import { convertBase64toFile } from "@/utils/file/convertBase64ToFile";
import { getMimeType } from "@/utils/file/getMimeType";
import { revalidatePath, revalidateTag } from "next/cache";

import { createClient } from "utils/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import {
  BASE_URL,
  DEFAULT_PASSWORD,
  SUPABASE_SERVICE_ROLE_KEY,
} from "../../constant";

type UpdateUserInfoType = {
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
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

export async function addUser(params: UpdateUserInfoType) {
  try {
    const supabase = createClient();
    const supabaseAdmin = createAdminClient(
      BASE_URL,
      SUPABASE_SERVICE_ROLE_KEY,
      {
        auth: {
          detectSessionInUrl: true,
          persistSession: true,
          autoRefreshToken: true,
        },
      }
    );

    let photoUrl = params?.photo_url ? params.photo_url : '';
    const password = DEFAULT_PASSWORD;

    let generatedEmail: any;

    if (!params.email) {
      const { data: publicEmail, error: error_generate_email } = await supabase
        .rpc("generate_email")
        .single();

      generatedEmail = publicEmail;

      if (error_generate_email) {
        throw new Error(error_generate_email.message);
      }
    }

    // Create auth user
    const {
      data: { user: authUser },
      error: error_create_user,
    } = await supabaseAdmin.auth.admin.createUser({
      email: params?.email ? params?.email : generatedEmail,
      password,
      email_confirm: true,
    });

    if (error_create_user) {
       throw new Error(error_create_user.message);
    } else {

      if (authUser) {
        const payload = {
          birth_date: params?.birth_date,
          city: params?.city,
          first_name: params?.first_name,
          last_name: params?.last_name,
          line_1: params?.addr_line_1,
          line_2: params?.addr_line_2,
          middle_name: params?.middle_name,
          p_client_id: '31b80006-af4c-450b-b2bd-bdbfff3da141',
          p_role_id: 'db920553-b3a6-4d18-82a1-e31cec57b8a0',
          p_user_id: authUser.id,
          preferred_name: params?.preferred_name,
          primary_email: params?.email,
          primary_phone: params?.primary_phone,
          profile_url: "",
          staff_id: params?.staff_id,
          state_province_region: params?.state_province_region,
          zip_code: params?.zip_code,
        };

        const { data: data_add_admin_user, error } = await supabase.rpc("add_admin_user", payload);

        if (error) {
          console.log(error, 'error daw')
          throw new Error(error.message);
        } else {
          console.log(data_add_admin_user, 'data_add_admin_user');

          // if (params?.photo_url && params?.photo_url?.includes("base64")) {
          //   const mimeType = getMimeType(params?.photo_url);
          //   const file = convertBase64toFile(
          //     params.photo_url!,
          //     params?.preferred_name
          //   );
    
          //   const [, type] = mimeType.split("/");
    
          //   const { data: file_data, error: file_error } = await supabase.storage
          //     .from("avatars")
          //     .upload(`public/${authUser?.id}.${type}`, file as File, {
          //       upsert: true,
          //     });
    
          //   photoUrl = `${supabaseUrl}/storage/v1/object/public/avatars/${file_data?.path}`;
          // }
    
          // const { data: update_photo_data, error: update_photo_error } =
          //   await supabase
          //     .from("profile_photos")
          //     .update({
          //       photo_url: photoUrl,
          //     })
          //     .eq("user_id", authUser?.id);
    
          // if (update_photo_error) throw new Error(update_photo_error?.message);
        }
  
      }
  
      revalidateTag("user_list");
      revalidatePath("(dashboard)/user", "page");
    }

    return {
      isError: false,
      error: null,
    };
  } catch (error) {
    console.log(error, 'error here')
    return JSON.parse(
      JSON.stringify({
        isError: true,
        error,
      })
    );
  }
}
