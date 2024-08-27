"use server";

import { createClient } from "@/utils/supabase/server";
import { convertBase64toFile } from "@/utils/file/convertBase64ToFile";
import { revalidateTag, revalidatePath } from "next/cache";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

type UploadFileType = {
  base64_file: string;
  user_id: string;
};
export const uploadFile = async (params: UploadFileType) => {
  const supabase = createClient();

  try {
    let photoUrl;

    if (params?.base64_file && params?.base64_file?.includes("base64")) {
      const file = convertBase64toFile(params.base64_file!, params?.user_id);

      const { data: file_data, error: file_error } = await supabase.storage
        .from("avatars")
        .upload(`public/${params?.user_id}`, file as File, {
          upsert: true,
        });

      if (file_error) {
        return {
          isError: true,
          message: `Failed to upload file.`,
        };
      }

      photoUrl = `${supabaseUrl}/storage/v1/object/public/avatars/${file_data?.path}`;

      const { error: update_profile_photo_error } = await supabase
        .from("profile_photos")
        .update({
          photo_url: photoUrl,
        })
        .eq("user_id", params?.user_id);

      if (update_profile_photo_error) {
        return {
          isError: true,
          message: `Failed to update profile url.`,
        };
      }
    }

    revalidateTag("user_details");
    revalidateTag("user_list");
    revalidatePath("(dashboard)/user/[id]", "page");

    return JSON.parse(JSON.stringify(params?.base64_file));
  } catch (err) {
    return JSON.parse(JSON.stringify(err));
  }
};
