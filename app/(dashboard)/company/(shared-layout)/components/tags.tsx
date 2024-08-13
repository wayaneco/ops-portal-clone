"use client";

import { TextInput, Button, Avatar, Modal } from "flowbite-react";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useFormContext } from "react-hook-form";

export const Tags = () => {
  const [showModal, setShowModal] = useState(false);
  const [tag, setNewTag] = useState("");

  const { setValue, watch } = useFormContext();

  const tags = watch("tags");

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

                  const clonedTags = JSON.parse(JSON.stringify(tags));

                  const [item] = clonedTags.splice(source.index, 1);
                  clonedTags.splice(destination.index, 0, item);

                  setValue("tags", clonedTags);
                }}
              >
                <Droppable droppableId="1">
                  {(droppableProvided) => (
                    <div
                      ref={droppableProvided.innerRef}
                      {...droppableProvided.droppableProps}
                    >
                      {tags.map((item: string, key: number) => (
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
        <Modal.Header>Add tag type</Modal.Header>
        <Modal.Body>
          <TextInput
            color="primary"
            placeholder="Add tag"
            value={tag}
            autoFocus
            onChange={(event) => setNewTag(event.target.value)}
          />
          <Button
            type="button"
            color="primary"
            className="mt-5 mx-auto"
            onClick={() => {
              setValue("tags", [...tags, tag]);
              setNewTag("");
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
