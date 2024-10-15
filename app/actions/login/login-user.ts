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
      data: data,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: typeof error !== "string" ? "Something went wrong" : error,
    };
  }
};
