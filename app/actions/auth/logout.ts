"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/utils/supabase/server";

export const logOutUser = async () => {
  const supabase = createClient();
  try {
    await supabase.auth.signOut();

    revalidatePath("/login");

    return {
      data: true,
      error: null,
    };
  } catch (_error) {
    return {
      data: null,
      error:
        typeof _error !== "string"
          ? "Something went wrong, Please contact your administrator."
          : _error,
    };
  }
};
