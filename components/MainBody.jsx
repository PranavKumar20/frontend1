import { DragDropContext } from 'react-beautiful-dnd';
import TodoList from './TodoList';
import { useState } from 'react';
import Editor from './Editor';
import axios from 'axios';

const MainBody = ({ todos, onDragEnd, onCreateNew }) => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);

  const statuses = ['To do', 'In progress', 'Under review', 'Finished'];

  const getTodosByStatus = (status) => {
    return todos.filter(todo => todo.status === status);
  };

  const openEditor = (todo) => {
    setCurrentTodo(todo);
    setIsEditorOpen(true);
  };

  const closeEditor = () => {
    setCurrentTodo(null);
    setIsEditorOpen(false);
  };

  const handleAdd = (newTodo) => {
    // Update state or re-fetch todos
    // This should be handled as per your application logic
    console.log('Todo added/updated:', newTodo);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`https://backend1-bukz.onrender.com/api/v1/todos/deletetodo/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        console.log('Todo deleted:', id);
        // Update state or re-fetch todos
      } else {
        console.error('Failed to delete todo:', response.data);
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="relative flex-1 overflow-hidden">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex space-x-4 bg-white mr-4 overflow-auto h-full">
          {statuses.map(status => (
            <TodoList
              key={status}
              todos={getTodosByStatus(status)}
              status={status}
              onCreateNew={onCreateNew}
              onUpdate={openEditor}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </DragDropContext>
      {isEditorOpen && <Editor todo={currentTodo} onClose={closeEditor} onAdd={handleAdd} />}
    </div>
  );
};

export default MainBody;
