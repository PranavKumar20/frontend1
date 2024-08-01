import { Draggable } from 'react-beautiful-dnd';
import { CiClock2 } from "react-icons/ci";
import { AiOutlineMore } from "react-icons/ai";
import { useState } from 'react';

const TodoItem = ({ todo, index, onUpdate, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);

  const getPriorityBgColor = (priority) => {
    switch (priority) {
      case 'Low':
        return 'bg-green-500';
      case 'Medium':
        return 'bg-yellow-500';
      case 'Urgent':
        return 'bg-red-500';
      default:
        return 'bg-gray-200';
    }
  };

  return (
    <Draggable draggableId={todo.id} index={index}>
      {(provided) => (
        <div
          className="px-2 py-4 bg-gray-100 rounded mb-4 border relative"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="flex justify-between">
            <h3 className="font-semibold text-lg">{todo.title}</h3>
            <div className="relative">
              <button onClick={() => setShowMenu(!showMenu)}>
                <AiOutlineMore />
              </button>
              {showMenu && (
                <div className="absolute right-0 top-8 bg-white shadow-lg rounded">
                  <button
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={() => onUpdate(todo)}
                  >
                    Update
                  </button>
                  <button
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={() => onDelete(todo.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
          <p className="text-gray-500">{todo.description}</p>
          <div className={`${getPriorityBgColor(todo.priority)} rounded px-2 py-1 inline-block text-sm text-white`}>
            {todo.priority}
          </div>
          <div className="flex flex-row mt-2">
            <div className="pt-1 pr-1 text-base">
              <CiClock2 />
            </div>
            <p className="text-sm pt-1 text-lg">{todo.deadline}</p>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TodoItem;
