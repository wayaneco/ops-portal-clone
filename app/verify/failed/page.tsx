import { Card } from "flowbite-react";
import { Content } from "./component/content";

const Page = async () => {
  return (
    <div className="login bg-primary-600 h-screen w-screen">
      <div className="container mx-auto flex items-center h-full justify-center">
        <Card className="p-6 backdrop-blur-md shadow-md w-[450px] text-center">
          <Content />
        </Card>
      </div>
    </div>
  );
};

export default Page;
