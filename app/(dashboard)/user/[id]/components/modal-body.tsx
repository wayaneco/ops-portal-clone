import { ModalContentType } from "../types";
import { AddClient } from "./add-client";
import { EditClient } from "./edit-client";
import { Passkey } from "./passkey";
import { RevokeClient } from "./revoke-client";

export const UserModalForm = ({
  contentType,
}: {
  contentType: ModalContentType;
}) => {
  let component;

  switch (contentType) {
    case ModalContentType.ADD:
      component = <AddClient />;
      break;
    case ModalContentType.EDIT:
      component = <EditClient />;
      break;
    case ModalContentType.REVOKE:
      component = <RevokeClient />;
      break;
    case ModalContentType.PASSKEY:
      component = <Passkey />;
      break;
    default:
      break;
  }

  return component;
};
