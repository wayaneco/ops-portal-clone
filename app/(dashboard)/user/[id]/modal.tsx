"use client";

import {
  Button,
  Checkbox,
  Label,
  Modal,
  TextInput,
  type ModalProps,
} from "flowbite-react";

import { UserDetailType } from "@/types/UserDetail";
import { ReactNode } from "react";

enum ModalContentType {
  ADD,
  EDIT,
  REVOKE,
  PASSKEY,
}

type UpsertModalProps = ModalProps & {
  modalContent: ModalContentType;
  data: any;
};
export function UpsertModal(props: UpsertModalProps) {
  const { show, onClose, modalContent, data, ...otherProps } = props;

  return (
    <Modal dismissible show={show} onClose={onClose} {...otherProps}>
      <Modal.Header>{getModalHeader(modalContent, data?.name)}</Modal.Header>
      <Modal.Body>
        {modalContent === ModalContentType.ADD && (
          <TextInput placeholder="Search by client" />
        )}
        {getModalContent(modalContent)}
        <div className="mt-5"></div>
      </Modal.Body>
    </Modal>
  );
}

const getModalHeader = (content: ModalContentType, client: string): string => {
  let text: string;

  switch (content) {
    case ModalContentType.ADD:
      text = "Link to New Client";
      break;
    case ModalContentType.EDIT:
      text = client;
      break;

    case ModalContentType.REVOKE:
      text = "Revoke Access";
      break;
    case ModalContentType.PASSKEY:
      text = "Send Invation";
      break;
    default:
      text = "";
      break;
  }

  return text;
};

const getModalContent = (content: ModalContentType): ReactNode => {
  let elem;

  switch (content) {
    case ModalContentType.ADD:
      elem = (
        <>
          <div className="flex flex-col">
            <div className="px-6 py-4">Toni&apos;s Soup Kitchen</div>
            <div className="px-6 py-4 bg-blue-100">
              <div className="flex items-center justify-between cursor-pointer">
                <span>Toni&apos;s Soup House</span>
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 11.917 9.724 16.5 19 7.5"
                  />
                </svg>
              </div>
            </div>
            <div className="px-6 py-4">Toni&apos;s Childcare - Downtown</div>
          </div>

          <div className="mt-10 ">
            <Button color="primary" className="w-[150px] mx-auto">
              Add
            </Button>
          </div>
        </>
      );
      break;

    case ModalContentType.EDIT:
      elem = (
        <>
          <div className="flex flex-col gap-y-3">
            <div className="flex items-center gap-2">
              <Checkbox color="primary" id="networkAdmin" className="w-5 h-5" />
              <Label className="text-lg" htmlFor="networkAdmin">
                Network Admin
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                color="primary"
                id="companyAdmin"
                className="w-5 h-5"
                checked
              />
              <Label className="text-lg" htmlFor="companyAdmin">
                Company Admin
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                color="primary"
                id="agent"
                className="w-5 h-5"
                checked
              />
              <Label className="text-lg" htmlFor="agent">
                Agent
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                color="primary"
                id="primaryContact"
                className="w-5 h-5"
              />
              <Label className="text-lg" htmlFor="primaryContact">
                Primary Contact
              </Label>
            </div>
          </div>
          <div className="mt-10 ">
            <Button color="primary" className="w-[150px] mx-auto">
              Save
            </Button>
          </div>
        </>
      );
      break;

    case ModalContentType.REVOKE:
      elem = (
        <>
          <div className="flex items-center justify-center">
            <div className="text-center text-lg">
              Do you want to revoke access to{" "}
              <strong>Toni&apos;s Kitchen</strong> for{" "}
              <strong>Mary Smith</strong>?
            </div>
          </div>
          <div className="mt-10 ">
            <Button color="primary" className="w-[150px] mx-auto">
              Confirm
            </Button>
          </div>
        </>
      );
      break;

    case ModalContentType.PASSKEY:
      elem = (
        <>
          <div className="flex items-center justify-center">
            <div className="text-center text-lg">
              Send passkey email invitation to{" "}
              <strong>bob@toniskitchen.org</strong>?
            </div>
          </div>
          <div className="mt-10 ">
            <Button color="primary" className="w-[150px] mx-auto">
              Confirm
            </Button>
          </div>
        </>
      );
      break;

    default:
      elem = null;
      break;
  }

  return elem;
};
