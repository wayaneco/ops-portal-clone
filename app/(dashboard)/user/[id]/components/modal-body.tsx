import { ModalProps } from "flowbite-react";
import { ModalContentType } from "../types";
import { AddClient } from "./add-client";
import { EditClient } from "./edit-client";
import { Invite } from "./invite";
import { RevokeClient } from "./revoke-client";
import { EditUser } from "./edit-user";

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
    case ModalContentType.INVITE:
      component = <Invite />;
      break;
    case ModalContentType.EDIT_USER:
      component = <EditUser />;
    default:
      break;
  }

  return component;
};
