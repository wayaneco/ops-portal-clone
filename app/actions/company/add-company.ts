"use server";

import { convertBase64toFile } from "@/utils/file/convertBase64ToFile";
import { getMimeType } from "@/utils/file/getMimeType";
import { error } from "console";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "utils/supabase/server";

type Hello = {
  staff_id: string;
  logo?: null | string;
  name: string;
  web_address: string;
  longitude?: string;
  latitude?: string;
  is_enabled?: boolean;
  provisioning_status?: string;
  service_provided: Array<string>;
  tags: Array<string>;
  provider_types: Array<string>;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

export const addCompany = async (params: Hello) => {
  const supabase = createClient();

  try {
    // Upload first the image
    let filePath = "";

    const { data: client_id } = await supabase.rpc("add_clients", {
      description: "",
      is_enabled: params?.is_enabled,
      latitude: params?.latitude,
      logo_url: "",
      longitude: params.longitude,
      name: params?.name,
      staff_id: params?.staff_id,
      tags: params?.tags,
      time_zone: "",
      web_address: params?.web_address,
      zip_code: "",
    });

    if (params.logo) {
      const mimeType = getMimeType(params?.logo);
      const file = convertBase64toFile(params.logo!, params?.name);

      const [, type] = mimeType.split("/");

      const { data: file_data } = await supabase.storage
        .from("client_logos")
        .upload(`public/${client_id}.${type}`, file as File, {
          upsert: true,
        });

      filePath = `${supabaseUrl}/storage/v1/object/public/client_logos/${file_data?.path}`;
    }

    const { data: update_data } = await supabase
      .from("clients")
      .update({
        logo_url: filePath,
      })
      .eq("id", client_id);

    revalidateTag("company_list");
    revalidatePath("(dashboard)/company", "page");

    return update_data;
  } catch (error) {
    return error;
  }
};
