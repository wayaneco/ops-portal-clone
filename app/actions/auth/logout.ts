"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const logOutUser = async () => {
  const supabase = createClient();
  try {
    await supabase.auth.signOut();

    revalidatePath("/login");

    return {
      ok: true,
      message: "Success.",
    };
  } catch (error) {
    return { ok: false, message: error as string };
  }
};
