"use client";

import { useEffect, useState } from "react";
import { TextInput, Button, Select } from "flowbite-react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { createClient } from "@/utils/supabase/client";

export const ProviderType = () => {
  const supabase = createClient();

  const [providerTypeOptions, setProviderTypeOptions] = useState<
    Array<{ label: string; value: string }>
  >([]);
  const [selectedProviderType, setSelectedProviderType] = useState<string>("");
  const [providerTypeInput, setProviderTypeInput] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const {
    watch,
    control,
    reset,
    getValues,
    clearErrors,
    setValue,
    setError,
    formState: { errors },
  } = useFormContext();

  const provider_types = watch("provider_types");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "provider_types",
  });

  const checkDuplicates = (value: string, index: number) => {
    const isExisting = provider_types
      ?.filter((provider_type: { label: string }) => !!provider_type?.label)
      ?.find(
        (provider_type: { label: string }) => provider_type?.label === value
      );

    if (!!isExisting) {
      setError(`provider_types[${index}].label`, {
        type: "validate",
        message: "Value is already exist.",
      });
    } else {
      clearErrors("provider_types");
    }

    return !!isExisting;
  };

  useEffect(() => {
    return () => {
      // REMOVE THE LAST ADDED PROVIDER TYPE IF EMPTY

      if (provider_types?.length >= 1) {
        const isLastProviderTypeEmpty =
          !provider_types[provider_types?.length - 1].label;

        if (isLastProviderTypeEmpty) {
          remove(provider_types?.length - 1);
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider_types]);

  useEffect(() => {
    const getProviderTypeList = async () => {
      const { data } = await supabase
        .from("provider_types")
        .select(`name`)
        .order("name", {
          ascending: true,
        });

      const formatData = data?.map((item) => ({
        label: item?.name,
        value: item?.name,
      }));
      setProviderTypeOptions(
        formatData as Array<{ label: string; value: string }>
      );
    };

    getProviderTypeList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="mb-5">
        <div className="text-sm text-gray-600">
          {provider_types
            ?.filter(
              (provider_type: { label: string }) => !!provider_type?.label
            )
            ?.map((provider_type: { label: string }) => provider_type?.label)
            .join(", ")}
        </div>
      </div>
      <div>
        <div className="overflow-y-auto rounded-md border border-gray-200">
          <div className="max-h-[calc(100vh-550px)]">
            <div className="bg-white">
              <DragDropContext
                onDragEnd={(result) => {
                  const { destination, source } = result;

                  if (!destination) return;

                  if (
                    destination.droppableId === source.droppableId &&
                    destination.index === source.index
                  )
                    return;

                  const clonedProviderTypes = JSON.parse(
                    JSON.stringify(provider_types)
                  );

                  const [item] = clonedProviderTypes.splice(source.index, 1);
                  clonedProviderTypes.splice(destination.index, 0, item);

                  reset({
                    ...getValues(),
                    provider_types: clonedProviderTypes,
                  });
                  setValue("isDirty", true);
                }}
              >
                <Droppable droppableId="1">
                  {(droppableProvided) => (
                    <div
                      ref={droppableProvided.innerRef}
                      {...droppableProvided.droppableProps}
                    >
                      {!fields?.length ? (
                        <div className="p-6">
                          <div className="text-center text-gray-600">
                            No Data
                          </div>
                        </div>
                      ) : (
                        fields.map((_, index: number) => {
                          const fieldLabel = watch(
                            `provider_types[${index}].label`
                          );

                          return (
                            <Draggable
                              key={`draggable-${index}`}
                              index={index}
                              draggableId={`draggable-${index}`}
                              isDragDisabled={isEditing}
                              disableInteractiveElementBlocking
                              shouldRespectForcePress
                            >
                              {(draggableProvided) => (
                                <div
                                  ref={draggableProvided.innerRef}
                                  className={`flex items-start gap-x-4 p-4 transition-colors text-black  `}
                                  {...draggableProvided.draggableProps}
                                >
                                  <Controller
                                    control={control}
                                    name={`provider_types[${index}].label`}
                                    render={({ field }) => (
                                      <div className="w-full">
                                        <div
                                          className={`w-full ${
                                            isEditing &&
                                            fields?.length - 1 === index
                                              ? "flex gap-x-4 items-center"
                                              : ""
                                          }`}
                                        >
                                          {isEditing &&
                                          fields?.length - 1 === index ? (
                                            <div className="w-full flex items-center gap-x-4">
                                              <div className="w-[450px]">
                                                <Select
                                                  color="primary"
                                                  disabled={!!fieldLabel}
                                                  value={selectedProviderType}
                                                  onChange={(event) => {
                                                    checkDuplicates(
                                                      event.target.value,
                                                      index
                                                    );
                                                    setSelectedProviderType(
                                                      event?.target?.value
                                                    );
                                                  }}
                                                >
                                                  <option key={-1} value={""}>
                                                    Select Provider Type
                                                  </option>
                                                  {providerTypeOptions?.map(
                                                    (option, index) => (
                                                      <option
                                                        key={index}
                                                        value={option?.value}
                                                      >
                                                        {option?.label}
                                                      </option>
                                                    )
                                                  )}
                                                </Select>
                                              </div>
                                              <TextInput
                                                color="primary"
                                                disabled={
                                                  !!selectedProviderType
                                                }
                                                value={providerTypeInput}
                                                placeholder="Enter Provider Type"
                                                onChange={(event) => {
                                                  checkDuplicates(
                                                    event.target.value,
                                                    index
                                                  );

                                                  setProviderTypeInput(
                                                    event.target.value
                                                  );
                                                }}
                                              />
                                            </div>
                                          ) : (
                                            <TextInput
                                              color="primary"
                                              disabled={true}
                                              placeholder="Enter Provider Type"
                                              {...field}
                                            />
                                          )}
                                        </div>

                                        {(errors?.provider_types as any)?.[
                                          index
                                        ]?.label?.message && (
                                          <small className="text-red-500 mt-1">
                                            {
                                              (errors?.provider_types as any)?.[
                                                index
                                              ]?.label?.message
                                            }
                                          </small>
                                        )}
                                      </div>
                                    )}
                                  />
                                  {!isEditing && (
                                    <div className="mt-1.5 flex">
                                      <div
                                        {...draggableProvided.dragHandleProps}
                                        className="p-2 rounded-md text-black cursor-pointer hover:bg-primary-500 group"
                                        title="drag"
                                      >
                                        <svg
                                          className="w-4 h-4 text-gray-800 group-hover:text-white"
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
                                            stroke-width="2"
                                            d="M5 7h14M5 12h14M5 17h14"
                                          />
                                        </svg>
                                      </div>
                                      <div
                                        className="p-2 rounded-md text-black cursor-pointer hover:bg-red-500 group"
                                        onClick={() => {
                                          const clonedProviderTypes =
                                            JSON.parse(
                                              JSON.stringify(provider_types)
                                            );

                                          clonedProviderTypes.splice(index, 1);

                                          reset({
                                            ...getValues(),
                                            provider_types: clonedProviderTypes,
                                          });
                                          setValue("isDirty", true);
                                        }}
                                      >
                                        <svg
                                          className="w-4 h-4 text-gray-800  group-hover:text-white"
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
                                            d="M6 18 17.94 6M18 18 6.06 6"
                                          />
                                        </svg>
                                      </div>
                                    </div>
                                  )}
                                  {fields?.length - 1 === index &&
                                    isEditing && (
                                      <div className="mt-1 5">
                                        <div className="flex items-center gap-x-2">
                                          <div
                                            className={`p-2 rounded-md text-white bg-green-500 group cursor-pointer hover:bg-green-500"
                                  }`}
                                            onClick={() => {
                                              if (
                                                errors?.provider_types ||
                                                (!selectedProviderType &&
                                                  !providerTypeInput)
                                              ) {
                                                setError(
                                                  `provider_types[${index}].label`,
                                                  {
                                                    type: "required",
                                                    message:
                                                      "This field is required.",
                                                  }
                                                );
                                                return;
                                              }

                                              if (selectedProviderType) {
                                                setValue(
                                                  `provider_types[${index}].label`,
                                                  selectedProviderType
                                                );
                                              } else {
                                                setValue(
                                                  `provider_types[${index}].label`,
                                                  providerTypeInput
                                                );
                                              }
                                              setSelectedProviderType("");
                                              setProviderTypeInput("");
                                              setIsEditing(false);
                                            }}
                                          >
                                            <svg
                                              className="w-4 h-4 text-white"
                                              aria-hidden="true"
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="24"
                                              height="24"
                                              fill="none"
                                              viewBox="0 0 24 24"
                                            >
                                              <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M5 11.917 9.724 16.5 19 7.5"
                                              />
                                            </svg>
                                          </div>
                                          <div
                                            className={`p-2 rounded-md text-white bg-red-500 group cursor-pointer hover:bg-red-500"
                                  }`}
                                            onClick={() => {
                                              remove(index);
                                              setSelectedProviderType("");
                                              setProviderTypeInput("");
                                              clearErrors("provider_types");
                                              setIsEditing(false);
                                            }}
                                          >
                                            <svg
                                              className="w-4 h-4 text-white dark:text-white"
                                              aria-hidden="true"
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="24"
                                              height="24"
                                              fill="none"
                                              viewBox="0 0 24 24"
                                            >
                                              <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M6 18 17.94 6M18 18 6.06 6"
                                              />
                                            </svg>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                </div>
                              )}
                            </Draggable>
                          );
                        })
                      )}
                      {droppableProvided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <Button
          disabled={isEditing}
          color="primary"
          onClick={() => {
            setIsEditing(true);
            append({
              label: "",
            });
          }}
        >
          Add
        </Button>
      </div>
    </div>
  );
};
