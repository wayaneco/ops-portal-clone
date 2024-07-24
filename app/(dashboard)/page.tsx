import { Button } from "flowbite-react";

export default function Page() {
  return (
    <div className="py-32">
      <div className="text-5xl text-gray-500">Welcome, Bob Smith</div>
      <div className="text-3xl text-gray-400 mt-10">
        You&apos;ve been invited to receive credentials
        <br /> for the Everest Network
      </div>
      <div className="mt-20">
        <Button color="primary" size="lg" pill>
          Accept Passkey
        </Button>
      </div>
    </div>
  );
}
