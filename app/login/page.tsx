import { Card } from "flowbite-react";
import { LoginForm } from "./components/form";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ROLE_NETWORK_ADMIN } from "../constant";

export default async function Page() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) return redirect("/");

  async function loginUser(prevState: any, formData: FormData) {
    "use server";
    const supabase = createClient();

    let errors = { email: "", password: "" };

    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    if (!data?.email) errors.email = "This field is required";
    if (!data?.password) errors.password = "This field is required";

    const hasError = Object.keys(errors).some(
      (k) => !!errors[k as keyof typeof errors]
    );

    if (hasError) return errors;

    const response = await supabase.auth.signInWithPassword(data);

    if (response.error) {
      return response.error;
    }

    revalidatePath("/", "layout");
    redirect("/");
  }

  return (
    <div className="login bg-primary-600 h-screen w-screen">
      <div className="container mx-auto flex items-center h-full justify-center">
        <Card className="p-6 backdrop-blur-md shadow-md w-[430px]">
          <div className="text-xl font-medium text-center uppercase ">
            Login
          </div>
          <LoginForm loginUser={loginUser} />
        </Card>
      </div>
    </div>
  );
}
