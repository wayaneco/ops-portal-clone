"use client";

import { TextInput, Button, Avatar, Modal } from "flowbite-react";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useFormContext } from "react-hook-form";

export const ServiceProvided = () => {
  const [showModal, setShowModal] = useState(false);
  const [newServiceProvided, setNewServiceProvided] = useState("");

  const { setValue, watch } = useFormContext();

  const serviceProvided = watch("service_provided");

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
                }}
              >
                <Droppable droppableId="1">
                  {(droppableProvided) => (
                    <div
                      ref={droppableProvided.innerRef}
                      {...droppableProvided.droppableProps}
                    >
                      {serviceProvided.map((item: string, key: number) => (
                        <Draggable
                          key={`draggable-${key}`}
                          index={key}
                          draggableId={`draggable-${key}`}
                        >
                          {(draggableProvided, draggableSnapshot) => (
                            <div
                              ref={draggableProvided.innerRef}
                              className={`flex items-center gap-x-4 p-4 cursor-pointer transition-colors hover:bg-primary-500 hover:text-white ${
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
        <Modal.Header>Add service provided</Modal.Header>
        <Modal.Body>
          <TextInput
            color="primary"
            placeholder="Add service provided"
            value={newServiceProvided}
            autoFocus
            onChange={(event) => setNewServiceProvided(event.target.value)}
          />
          <Button
            type="button"
            color="primary"
            className="mt-5 mx-auto"
            onClick={() => {
              setValue("service_provided", [
                ...serviceProvided,
                newServiceProvided,
              ]);
              setNewServiceProvided("");
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
