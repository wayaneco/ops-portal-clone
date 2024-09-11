"use client";

import { useEffect, useState } from "react";
import { TextInput, Button, Select } from "flowbite-react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { createClient } from "@/utils/supabase/client";

export const Tags = () => {
  const supabase = createClient();

  const [tagOptions, setTagOptions] = useState<
    Array<{ label: string; value: string }>
  >([]);
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [tagInput, setTagInput] = useState<string>("");
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

  const tags = watch("tags");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tags",
  });

  const checkDuplicates = (value: string, index: number) => {
    const isExisting = tags
      ?.filter((tag: { label: string }) => !!tag?.label)
      ?.find((tag: { label: string }) => tag?.label === value);

    if (!!isExisting) {
      setError(`tags[${index}].label`, {
        type: "validate",
        message: "Value is already exist.",
      });
    } else {
      clearErrors("tags");
    }

    return !!isExisting;
  };

  useEffect(() => {
    return () => {
      // REMOVE THE LAST ADDED TAG IF EMPTY

      if (tags?.length >= 1) {
        const isLastTagIsEmpty = !tags[tags?.length - 1].label;

        if (isLastTagIsEmpty) {
          remove(tags?.length - 1);
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags]);

  useEffect(() => {
    const getTagsList = async () => {
      const { data } = await supabase
        .from("tags")
        .select(`name`)
        .order("name", {
          ascending: true,
        });

      const formatData = data?.map((item) => ({
        label: item?.name,
        value: item?.name,
      }));
      setTagOptions(formatData as Array<{ label: string; value: string }>);
    };

    getTagsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="mb-5">
        <div className="text-sm text-gray-600">
          {tags
            ?.filter((tag: { label: string }) => !!tag?.label)
            ?.map((tag: { label: string }) => tag?.label)
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

                  const clonedTags = JSON.parse(JSON.stringify(tags));

                  const [item] = clonedTags.splice(source.index, 1);
                  clonedTags.splice(destination.index, 0, item);

                  reset({
                    ...getValues(),
                    tags: clonedTags,
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
                                    name={`tags[${index}].label`}
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
                                                  disabled={!!tagInput}
                                                  value={selectedTag}
                                                  onChange={(event) => {
                                                    checkDuplicates(
                                                      event.target.value,
                                                      index
                                                    );
                                                    setSelectedTag(
                                                      event?.target?.value
                                                    );
                                                  }}
                                                >
                                                  <option key={-1} value={""}>
                                                    Select tag
                                                  </option>
                                                  {tagOptions?.map(
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
                                                disabled={!!selectedTag}
                                                value={tagInput}
                                                placeholder="Enter Tag"
                                                onChange={(event) => {
                                                  checkDuplicates(
                                                    event.target.value,
                                                    index
                                                  );

                                                  setTagInput(
                                                    event.target.value
                                                  );
                                                }}
                                              />
                                            </div>
                                          ) : (
                                            <TextInput
                                              color="primary"
                                              disabled={true}
                                              placeholder="Enter tag"
                                              {...field}
                                            />
                                          )}
                                        </div>

                                        {(errors?.tags as any)?.[index]?.label
                                          ?.message && (
                                          <small className="text-red-500 mt-1">
                                            {
                                              (errors?.tags as any)?.[index]
                                                ?.label?.message
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
                                          const clonedTags = JSON.parse(
                                            JSON.stringify(tags)
                                          );

                                          clonedTags.splice(index, 1);

                                          reset({
                                            ...getValues(),
                                            tags: clonedTags,
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
                                                errors?.tags ||
                                                (!selectedTag && !tagInput)
                                              ) {
                                                setError(
                                                  `tags[${index}].label`,
                                                  {
                                                    type: "required",
                                                    message:
                                                      "This field is required.",
                                                  }
                                                );
                                                return;
                                              }

                                              if (selectedTag) {
                                                setValue(
                                                  `tags[${index}].label`,
                                                  selectedTag
                                                );
                                              } else {
                                                setValue(
                                                  `tags[${index}].label`,
                                                  tagInput
                                                );
                                              }
                                              setSelectedTag("");
                                              setTagInput("");
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
                                              setSelectedTag("");
                                              setTagInput("");
                                              clearErrors("tags");
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
