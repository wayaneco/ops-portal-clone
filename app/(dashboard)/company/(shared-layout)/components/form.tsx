import { Label, TextInput, Button, Avatar } from "flowbite-react";
import { WebAddress } from "./web-address";
import { ServiceProvided } from "./service-provided";
import { Tags } from "./tags";
import { ProviderType } from "./provider-type";
import { MapProvider } from "@/providers/map-provider";
import { MapComponent } from "../components/maps";
type AddClientFormType = { routeName: string };

export const AddClientForm = ({ routeName }: AddClientFormType) => {
  let component;

  switch (routeName) {
    case "webAddress":
      component = <WebAddress />;
      break;

    case "serviceLocation":
      component = (
        <MapProvider>
          <MapComponent></MapComponent>
        </MapProvider>
      );
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
