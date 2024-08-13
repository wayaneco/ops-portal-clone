"use client";

import { TextInput, Button, Avatar, Modal } from "flowbite-react";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useFormContext } from "react-hook-form";

export const ProviderType = () => {
  const [showModal, setShowModal] = useState(false);
  const [newProviderType, setNewProviderType] = useState("");

  const { setValue, watch } = useFormContext();

  const providerTypes = watch("provider_types");

  return (
    <div>
      <div>
        <div className="overflow-y-auto border border-primary-500">
          <div className="max-h-[calc(100vh-550px)]">
            <div className="bg-white">
              <DragDropContext
                onDragEnd={(result) => {
                  const { destination, source, draggableId } = result;

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

                  setValue("provider_types", clonedProviderTypes);
                }}
              >
                <Droppable droppableId="1">
                  {(droppableProvided) => (
                    <div
                      ref={droppableProvided.innerRef}
                      {...droppableProvided.droppableProps}
                    >
                      {providerTypes.map((item: string, key: number) => (
                        <Draggable
                          key={`draggable-${key}`}
                          index={key}
                          draggableId={`draggable-${key}`}
                        >
                          {(draggableProvided, draggableSnapshot) => (
                            <div
                              ref={draggableProvided.innerRef}
                              className={`flex items-center gap-x-4 p-4 cursor-pointer transition-colors text-black hover:bg-primary-500 hover:text-white ${
                                draggableSnapshot.isDragging &&
                                "bg-primary-500 text-white"
                              }`}
                              {...draggableProvided.draggableProps}
                              {...draggableProvided.dragHandleProps}
                            >
                              <Avatar
                                img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                                size="md"
                              />
                              <div className="text-lg">{item}</div>
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
        <Button color="primary" onClick={() => setShowModal(true)}>
          Add
        </Button>
      </div>
      <Modal dismissible show={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header>Add new Provider type</Modal.Header>
        <Modal.Body>
          <TextInput
            color="primary"
            placeholder="Add new provider type"
            value={newProviderType}
            autoFocus
            onChange={(event) => setNewProviderType(event.target.value)}
          />
          <Button
            type="button"
            color="primary"
            className="mt-5 mx-auto"
            onClick={() => {
              setValue("provider_types", [...providerTypes, newProviderType]);
              setNewProviderType("");
              setShowModal(false);
            }}
          >
            Submit
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};
