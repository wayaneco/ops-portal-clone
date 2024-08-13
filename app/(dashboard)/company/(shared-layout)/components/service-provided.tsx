"use client";

import { TextInput, Button, Avatar, Modal, Radio, Label } from "flowbite-react";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";

export const ServiceProvided = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { setValue, watch, control } = useFormContext();

  const serviceProvided = watch("service_provided");

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "service_provided",
  });

  console.log(fields);
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

                  const clonedServiceProvided = JSON.parse(
                    JSON.stringify(serviceProvided)
                  );

                  const [item] = clonedServiceProvided.splice(source.index, 1);
                  clonedServiceProvided.splice(destination.index, 0, item);

                  setValue("service_provided", clonedServiceProvided);
                  // move(source.index, destination.index);
                }}
              >
                <Droppable droppableId="1">
                  {(droppableProvided) => (
                    <div
                      ref={droppableProvided.innerRef}
                      {...droppableProvided.droppableProps}
                    >
                      {fields.map((_, index: number) => (
                        <Draggable
                          key={`draggable-${index}`}
                          index={index}
                          draggableId={`draggable-${index}`}
                          isDragDisabled={isEditing}
                          disableInteractiveElementBlocking
                          shouldRespectForcePress
                        >
                          {(draggableProvided, draggableSnapshot) => (
                            <div
                              ref={draggableProvided.innerRef}
                              className={`flex items-center gap-x-4 p-4 transition-colors text-black  `}
                              {...draggableProvided.draggableProps}
                            >
                              <Controller
                                control={control}
                                name={`service_provided[${index}].label`}
                                render={({ field }) => (
                                  <TextInput
                                    disabled={
                                      !isEditing || fields?.length - 1 !== index
                                    }
                                    placeholder="Enter service name"
                                    {...field}
                                  />
                                )}
                              />
                              <Controller
                                control={control}
                                name={`service_provided[${index}].type`}
                                render={({ field }) => (
                                  <>
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
                                  </>
                                )}
                              />
                              {!isEditing && (
                                <>
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
                                  <div className="p-2 rounded-md text-black cursor-pointer hover:bg-red-500 group">
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
                                </>
                              )}
                              {fields?.length - 1 === index && isEditing && (
                                <Button onClick={() => setIsEditing(false)}>
                                  Save
                                </Button>
                              )}
                            </div>
                          )}
                        </Draggable>
                      ))}
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
