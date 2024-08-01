import { Droppable } from 'react-beautiful-dnd';
import TodoItem from './TodoItem';

import { AiFillPlusCircle } from "react-icons/ai";

const TodoList = ({ todos, status, onCreateNew, onUpdate, onDelete }) => {
  return (
    <Droppable droppableId={status}>
      {(provided) => (
        <div
          className="p-4 rounded w-1/4"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <h2 className="text-xl font-semibold mb-4">{status}</h2>
          {todos.map((todo, index) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              index={index}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))}
          {provided.placeholder}
          <div>
            <button
              className="w-full bg-gray-700 text-white py-2 px-4 rounded mt-6 flex justify-between"
              onClick={onCreateNew}
            >
              Add new
              <div className="pt-1">
                <AiFillPlusCircle />
              </div>
            </button>
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default TodoList;
