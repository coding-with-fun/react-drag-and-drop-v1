import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import spaceCharacters from "./data";
import "./App.css";

function App() {
    const [characters, setCharacters] = useState(spaceCharacters);

    function handleOnDragEnd(result) {
        if (!result.destination) return;

        const items = Array.from(characters);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setCharacters(items);
    }

    return (
        <div className="main__container">
            <header className="body__container">
                <h1>Final Space Characters</h1>
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="characters">
                        {(provided) => (
                            <ul
                                className="characters"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {characters.map(
                                    ({ id, name, thumb }, index) => {
                                        return (
                                            <Draggable
                                                key={id}
                                                draggableId={id}
                                                index={index}
                                            >
                                                {(provided) => (
                                                    <li
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                    >
                                                        <div
                                                            className="characters__image"
                                                            {...provided.dragHandleProps}
                                                        >
                                                            <img
                                                                src={thumb}
                                                                alt={`${name} Thumb`}
                                                            />
                                                        </div>
                                                        <p>{name}</p>
                                                    </li>
                                                )}
                                            </Draggable>
                                        );
                                    }
                                )}
                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>
            </header>
            <p>
                Images from{" "}
                <a href="https://final-space.fandom.com/wiki/Final_Space_Wiki">
                    Final Space Wiki
                </a>
            </p>
        </div>
    );
}

export default App;
