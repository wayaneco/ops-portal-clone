"use client";

import { useEffect, useState } from "react";
import { TextInput, Button } from "flowbite-react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";

export const ServiceProvided = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const {
    watch,
    control,
    reset,
    getValues,
    trigger,
    formState: { errors },
  } = useFormContext();

  const serviceProvided = watch("service_provided");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "service_provided",
  });

  useEffect(() => {
    return () => {
      // REMOVE THE LAST SERVICE PROVIDED TAG IF EMPTY

      if (serviceProvided?.length >= 1) {
        const isLastServiceProvidedEmpty =
          !serviceProvided[serviceProvided?.length - 1].label;

        if (isLastServiceProvidedEmpty) {
          remove(serviceProvided?.length - 1);
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceProvided]);

  return (
    <div>
      <div>
        <div className="overflow-y-auto rounded-md border border-gray-200">
          <div className="max-h-[calc(100vh-400px)]">
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

                  reset({
                    ...getValues(),
                    service_provided: clonedServiceProvided,
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
                          <div className="text-center text-gray-600">
                            No Data
                          </div>
                        </div>
                      ) : (
                        fields.map((_, index: number) => {
                          const fieldValue = watch(
                            `service_provided[${index}]`
                          );

                          const isMeals = fieldValue?.label === "Meals";

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
                                    name={`service_provided[${index}].label`}
                                    render={({ field }) => (
                                      <div className="w-full">
                                        <TextInput
                                          color="primary"
                                          disabled={
                                            !isEditing ||
                                            fields?.length - 1 !== index
                                          }
                                          placeholder="Enter service name"
                                          {...field}
                                        />
                                        {(errors?.service_provided as any)?.[
                                          index
                                        ]?.label?.message && (
                                          <small className="text-red-500 mt-1">
                                            {
                                              (
                                                errors?.service_provided as any
                                              )?.[index]?.label?.message
                                            }
                                          </small>
                                        )}
                                      </div>
                                    )}
                                  />
                                  <Controller
                                    control={control}
                                    name={`service_provided[${index}].type`}
                                    defaultValue="count"
                                    render={({ field }) => (
                                      <div className="w-full hidden">
                                        <TextInput
                                          color="primary"
                                          disabled={
                                            !isEditing ||
                                            fields?.length - 1 !== index
                                          }
                                          {...field}
                                        />
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
                                        className={`p-2 rounded-md text-black  group ${
                                          isMeals
                                            ? "cursor-not-allowed hover:bg-gray-400"
                                            : " cursor-pointer hover:bg-red-500"
                                        }`}
                                        onClick={() => {
                                          if (isMeals) {
                                            return;
                                          }

                                          const clonedServiceProvided =
                                            JSON.parse(
                                              JSON.stringify(serviceProvided)
                                            );

                                          clonedServiceProvided.splice(
                                            index,
                                            1
                                          );

                                          reset({
                                            ...getValues(),
                                            service_provided:
                                              clonedServiceProvided,
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
                                  {fields?.length - 1 === index &&
                                    isEditing && (
                                      <div className="mt-1 5">
                                        <div className="flex items-center gap-x-2">
                                          <div
                                            className={`p-2 rounded-md text-white bg-green-500 group cursor-pointer hover:bg-green-500"
                                      }`}
                                            onClick={() => {
                                              const fieldLabel = watch(
                                                `service_provided[${index}].label`
                                              );

                                              if (!fieldLabel) {
                                                trigger([
                                                  `service_provided[${index}].label`,
                                                ]);
                                                return;
                                              }

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
              type: "count",
            });
          }}
        >
          Add
        </Button>
      </div>
    </div>
  );
};
