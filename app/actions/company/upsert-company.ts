"use server";

import { ROLE_NETWORK_ADMIN } from "@/app/constant";
import { convertBase64toFile } from "@/utils/file/convertBase64ToFile";
import { revalidatePath, revalidateTag } from "next/cache";
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
  {
    update = false,
    currentPrivilege,
  }: { update: boolean; currentPrivilege: Array<string> }
) => {
  console.log("PARAMS", params);
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
        }
      : {
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
        };

    const { data: client_id, error: error_update_clients } = await supabase.rpc(
      update ? "update_clients" : "add_clients",
      upsertClientParams
    );

    if (error_update_clients) {
      return {
        isError: true,
        message: `Failed to ${update ? "update" : "create"} clients.`,
      };
    }

    if (params.logo && params?.logo?.includes("base64")) {
      const file = convertBase64toFile(params.logo!, params?.name);

      const { data: file_data, error: error_upload_file } =
        await supabase.storage
          .from("client_logos")
          .upload(`public/${client_id}`, file as File, {
            upsert: true,
          });

      if (error_upload_file) {
        return {
          isError: true,
          message: `Failed to upload file.`,
        };
      }

      filePath = `${supabaseUrl}/storage/v1/object/public/client_logos/${file_data?.path}`;
    }

    const { error: error_logo } = await supabase
      .from("clients")
      .update({
        logo_url: filePath,
      })
      .eq("id", client_id || params?.client_id);

    if (currentPrivilege?.includes(ROLE_NETWORK_ADMIN)) {
      revalidateTag("company_list");
      revalidatePath("(dashboard)/company", "page");
    }

    if (error_logo) {
      return {
        isError: true,
        message: `Failed to ${update ? "update" : "create"} client logo url.`,
      };
    }

    return {
      isError: false,
      message: "Success",
    };
  } catch (error) {
    return {
      isError: true,
      message: error,
    };
  }
};
