"use client";

import { TextInput, Button, Avatar, Modal, Radio, Label } from "flowbite-react";
import { useState, useRef } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";

export const ProviderType = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const {
    setValue,
    watch,
    control,
    reset,
    getValues,
    trigger,
    formState: { errors },
  } = useFormContext();

  const providerTypes = watch("provider_types");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "provider_types",
  });

  return (
    <div>
      <div>
        <div className="overflow-y-auto border border-primary-500">
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
                    JSON.stringify(providerTypes)
                  );

                  const [item] = clonedProviderTypes.splice(source.index, 1);
                  clonedProviderTypes.splice(destination.index, 0, item);

                  reset({
                    ...getValues(),
                    provider_types: clonedProviderTypes,
                  });
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
                          <div className="text-center">No Data</div>
                        </div>
                      ) : (
                        fields.map((_, index: number) => (
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
                                      <TextInput
                                        color="primary"
                                        disabled={
                                          !isEditing ||
                                          fields?.length - 1 !== index
                                        }
                                        placeholder="Enter tag"
                                        {...field}
                                      />
                                      {(errors?.provider_types as any)?.[index]
                                        ?.label?.message && (
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
                                <Controller
                                  control={control}
                                  name={`provider_types[${index}].type`}
                                  render={({ field }) => (
                                    <div className="flex flex-col">
                                      <div className="flex gap-x-4 mt-3">
                                        <div className="flex items-center gap-2">
                                          <Radio
                                            id={`count-${index}`}
                                            value="count"
                                            disabled={
                                              !isEditing ||
                                              fields?.length - 1 !== index
                                            }
                                            onChange={field?.onChange}
                                            checked={field?.value === "count"}
                                          />
                                          <Label
                                            htmlFor={`count-${index}`}
                                            className="cursor-pointer"
                                          >
                                            Count
                                          </Label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <Radio
                                            id={`string-${index}`}
                                            value="string"
                                            disabled={
                                              !isEditing ||
                                              fields?.length - 1 !== index
                                            }
                                            onChange={field?.onChange}
                                            checked={field?.value === "string"}
                                          />
                                          <Label
                                            htmlFor={`string-${index}`}
                                            className="cursor-pointer"
                                          >
                                            String
                                          </Label>
                                        </div>
                                      </div>

                                      {(errors?.provider_types as any)?.[index]
                                        ?.type?.message && (
                                        <small className="text-red-500 mt-1">
                                          {
                                            (errors?.provider_types as any)?.[
                                              index
                                            ]?.type?.message
                                          }
                                        </small>
                                      )}
                                    </div>
                                  )}
                                />
                                {!isEditing && (
                                  <div className="mt-2 flex">
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
                                        const clonedProviderTypes = JSON.parse(
                                          JSON.stringify(providerTypes)
                                        );

                                        clonedProviderTypes.splice(index, 1);

                                        reset({
                                          ...getValues(),
                                          provider_typees: clonedProviderTypes,
                                        });
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
                                {fields?.length - 1 === index && isEditing && (
                                  <Button
                                    color="primary"
                                    onClick={() => {
                                      const fieldType = watch(
                                        `provider_types[${index}].type`
                                      );
                                      const fieldLabel = watch(
                                        `provider_types[${index}].label`
                                      );

                                      if (!fieldType || !fieldLabel) {
                                        trigger([
                                          `provider_types[${index}].label`,
                                          `provider_types[${index}].type`,
                                        ]);
                                        return;
                                      }

                                      setIsEditing(false);
                                    }}
                                  >
                                    Save
                                  </Button>
                                )}
                              </div>
                            )}
                          </Draggable>
                        ))
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
              type: "",
            });
          }}
        >
          Add
        </Button>
      </div>
    </div>
  );
};
