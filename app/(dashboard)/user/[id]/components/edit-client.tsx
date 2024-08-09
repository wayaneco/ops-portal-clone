import { Controller, useFormContext } from "react-hook-form";
import { Checkbox, Label, Button, Modal } from "flowbite-react";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

import { editPrivilege } from "app/actions/user/edit-privilege";

export const EditClient = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [privilegeList, setPrivilegeList] = useState<Array<any>>([]);

  const { watch, control, setValue } = useFormContext();

  const { user, client } = watch("info");
  const selectedPrivileges = watch("privilege");

  useEffect(() => {
    if (!privilegeList.length) {
      setIsLoading(true);
      createClient()
        .from("roles")
        .select()
        .then((response) => {
          setPrivilegeList(response.data as Array<any>);
          setIsLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Modal.Header>{client?.name}</Modal.Header>
      <Modal.Body>
        <div className="flex flex-col gap-y-3">
          {privilegeList?.map((privilege, i) => (
            <div key={privilege?.id} className="flex items-center gap-2">
              <Controller
                control={control}
                name={`privilege`}
                defaultValue={""}
                render={({ field }) => {
                  const isChecked = selectedPrivileges?.includes(
                    privilege?.name
                  );

                  return (
                    <>
                      <Checkbox
                        color="primary"
                        id={privilege?.id}
                        className="w-5 h-5"
                        checked={isChecked}
                        onChange={() => {
                          const clonedSelectedPrivileges = JSON.parse(
                            JSON.stringify(selectedPrivileges)
                          );

                          if (isChecked) {
                            const filteredPrivileges =
                              clonedSelectedPrivileges.filter(
                                (p: string) => p !== privilege?.name
                              );

                            setValue("privilege", filteredPrivileges);
                          } else {
                            setValue("privilege", [
                              ...clonedSelectedPrivileges,
                              privilege?.name,
                            ]);
                          }
                        }}
                      />
                      <Label className="text-lg" htmlFor={privilege?.id}>
                        {privilege?.name}
                      </Label>
                    </>
                  );
                }}
              />
            </div>
          ))}
          {isLoading && (
            <>
              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5" />
              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[260px] mb-2.5" />
              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[560px] mb-2.5" />
              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[560px] mb-2.5" />
              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[160px] mb-2.5" />
            </>
          )}
        </div>
        <div className="mt-10 ">
          <Button
            color="primary"
            className="w-[150px] mx-auto"
            onClick={() => {
              const privilegeIds = privilegeList
                ?.filter((privilege) =>
                  selectedPrivileges?.includes(privilege?.name)
                )
                .map((priv) => priv?.id);

              editPrivilege({
                user_id: user?.user_id,
                client_id: client?.id,
                privileges: privilegeIds,
              });
            }}
          >
            Save
          </Button>
        </div>
      </Modal.Body>
    </>
  );
};
