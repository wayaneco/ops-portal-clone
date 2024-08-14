import { Label, TextInput, Button, Avatar, Card } from "flowbite-react";
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
      component = (
        <div className="m-8">
          <Card>
            <div className="p-8">
              <WebAddress />
            </div>
          </Card>
        </div>
      );
      break;

    case "serviceLocation":
      component = (
        <MapProvider>
          <MapComponent></MapComponent>
        </MapProvider>
      );
      break;

    case "serviceProvided":
      component = (
        <div className="m-8">
          <Card>
            <div className="p-8">
              <ServiceProvided />
            </div>
          </Card>
        </div>
      );
      break;

    case "tags":
      component = (
        <div className="m-8">
          <Card>
            <div className="p-8">
              <Tags />
            </div>
          </Card>
        </div>
      );
      break;

    case "providerType":
      component = (
        <div className="m-8">
          <Card>
            <div className="p-8">
              <ProviderType />
            </div>
          </Card>
        </div>
      );
      break;

    default:
      component = null;
      break;
  }

  return component;
};
