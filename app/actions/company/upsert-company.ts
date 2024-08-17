"use server";

import { convertBase64toFile } from "@/utils/file/convertBase64ToFile";
import { getMimeType } from "@/utils/file/getMimeType";
import { error } from "console";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "utils/supabase/server";

type UpsertCompanyDetailsType = {
  client_id?: string;
  name: string;
  staff_id: string;
  description?: string;
  time_zone?: string;
  logo?: null | string;
  web_address: string;
  longitude?: string;
  latitude?: string;
  is_enabled?: boolean;
  provisioning_status?: string;
  zip_code?: string;
  tags: Array<string>;
  service_provided: Array<string>;
  provider_types: Array<string>;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

export const upsertCompanyDetails = async (
  params: UpsertCompanyDetailsType,
  { update = false }: { update: boolean }
) => {
  const supabase = createClient();

  try {
    let filePath = params?.logo;

    const upsertClientParams = update
        ? {
          p_description: params?.description ?? "",
          p_id: params?.client_id,
          p_is_enabled: params?.is_enabled,
          p_latitude: params?.latitude ?? "",
          p_logo_url: filePath,
          p_longitude: params?.longitude ?? "",
          p_name: params?.name,
          p_provider_type: params?.provider_types,
          p_services_provided_list: params?.service_provided,
          p_staff_id: params?.staff_id,
          p_tags: params?.tags,
          p_time_zone: params?.time_zone ?? "",
          p_web_address: params?.web_address,
          p_zip_code: params?.zip_code ?? "",
        } : {
          description: params?.description ?? "",
          is_enabled: params?.is_enabled,
          latitude: params?.latitude ?? "",
          logo_url: filePath,
          longitude: params?.longitude ?? "",
          name: params?.name,
          p_services_provided_list: params?.service_provided,
          provider_type: params?.provider_types,
          staff_id: params?.staff_id,
          tags: params?.tags,
          time_zone: params?.time_zone ?? "",
          web_address: params?.web_address,
          zip_code: params?.zip_code ?? "",
        }

    const { data: client_id, error: error_update_clients } = await supabase.rpc(
      update ? "update_clients" : "add_clients", upsertClientParams
    );

    if(error_update_clients) {
      throw error_update_clients;
    }

    if (params.logo && params?.logo?.includes("base64")) {
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
    console.log(error, 'error here');
    return error;
  }
};
