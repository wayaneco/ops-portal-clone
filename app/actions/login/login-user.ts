"use server";

import { loginWithLink } from "../email/login";

type LoginUserPayloadType = {
  email: string;
};

export const loginUser = async ({ email }: LoginUserPayloadType) => {
  try {
    const { data, error } = await loginWithLink({ email });

    if (error) throw error;

    return {
      ok: true,
      message: data,
    };
  } catch (error) {
    return {
      ok: false,
      message: typeof error !== "string" ? "" : error,
    };
  }
};
