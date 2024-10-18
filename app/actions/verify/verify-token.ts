"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const verifyToken = async (token_hash: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.verifyOtp({
    token_hash,
    type: "magiclink",
  });

  if (error) {
    return {
      data: null,
      error: error?.message,
    };
  }

  revalidatePath("/");

  return {
    data,
    error: null,
  };
};
