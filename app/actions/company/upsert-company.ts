"use server";

import { convertBase64toFile } from "@/utils/file/convertBase64ToFile";
import { revalidatePath } from "next/cache";
import { createClient } from "utils/supabase/server";
const GenerateSchema = require("generate-schema");

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
  service_provided: Array<{ label: string; count: string }>;
  provider_types: Array<string>;
  data_schema_id?: string;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

const transformPayload = (payload: Array<{ label: string; count: string }>) => {
  return payload?.map((data) => {
    const key = data?.label?.toLowerCase();

    return {
      [key]: 0,
    };
  });
};

export const upsertCompanyDetails = async (
  params: UpsertCompanyDetailsType,
  { update = false }: { update: boolean }
): Promise<{ ok: boolean; message: string }> => {
  const supabase = createClient();

  try {
    let filePath = params?.logo;

    const generatedSchema = GenerateSchema.json(
      params.web_address,
      params.service_provided
    );

    const transformedServicedProvider = transformPayload(
      params?.service_provided
    );

    console.log(transformedServicedProvider);

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
          p_provider_type: params?.provider_types,
          p_services_provided_list: params?.service_provided,
          p_tags: params?.tags,
          staff_id: params?.staff_id,
          time_zone: params?.time_zone ?? "",
          web_address: params?.web_address,
          zip_code: params?.zip_code ?? "",
        };

    const { data: client_id, error: error_update_clients } = await supabase.rpc(
      update ? "update_clients" : "add_clients",
      upsertClientParams
    );

    if (error_update_clients) throw error_update_clients?.message;

    const { error: update_data_schema_error } = await supabase.rpc(
      "update_data_schema",
      {
        p_data_schema_id: params.data_schema_id ? params.data_schema_id : null,
        p_description: params.web_address,
        p_identifier: params.web_address,
        p_is_active: true,
        p_schema: generatedSchema,
        p_version_number: 0,
        staff_id: params.staff_id,
      }
    );

    if (update_data_schema_error) throw update_data_schema_error.message;

    if (params.logo && params?.logo?.includes("base64")) {
      const file = convertBase64toFile(params.logo!, params?.name);

      const { data: file_data, error: error_upload_file } =
        await supabase.storage
          .from("client_logos")
          .upload(`public/${params?.client_id || client_id}`, file as File, {
            upsert: true,
          });

      if (error_upload_file) throw error_upload_file?.message;

      filePath = `${supabaseUrl}/storage/v1/object/public/client_logos/${file_data?.path}`;
    }

    const { error: error_logo } = await supabase
      .from("clients")
      .update({
        logo_url: filePath,
      })
      .eq("id", client_id || params?.client_id);

    if (error_logo) throw error_logo?.message;

    revalidatePath("(dashboard)/company", "page");
    revalidatePath("(dashboard)/company/(shared-layout)/[id]", "page");

    return {
      ok: true,
      message: "Success",
    };
  } catch (error) {
    return {
      ok: false,
      message: error as string,
    };
  }
};
