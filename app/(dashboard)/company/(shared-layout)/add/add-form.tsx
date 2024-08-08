import { Label, TextInput, Button, Avatar } from "flowbite-react";
import { WebAddress } from "./components/web-address";
import { ServiceProvided } from "./components/service-provided";
import { Tags } from "./components/tags";
import { ProviderType } from "./components/provider-type";

type AddClientFormType = { routeName: string };

export const AddClientForm = ({ routeName }: AddClientFormType) => {
  let component;
  switch (routeName) {
    case "webAddress":
      component = <WebAddress />;
      break;

    case "serviceLocation":
      component = <div>Service Location Body</div>;
      break;

    case "serviceProvided":
      component = <ServiceProvided />;
      break;

    case "tags":
      component = <Tags />;
      break;

    case "providerType":
      component = <ProviderType />;
      break;
    default:
      component = null;
      break;
  }

  return component;
};
