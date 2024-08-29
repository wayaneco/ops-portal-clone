import { Button } from "flowbite-react";

import { createClient } from "@/utils/supabase/server";

const Page = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="py-32">
      <div className="text-5xl text-gray-500">Welcome, {user?.email}</div>
      <div className="text-3xl text-gray-400 mt-10">
        You&apos;ve been invited to receive credentials
        <br /> for the Everest Network
      </div>
      <div className="mt-20">
        <Button color="primary" size="lg">
          Accept Passkey
        </Button>
      </div>
    </div>
  );
};

export default Page;
