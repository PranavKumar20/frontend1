import { DragDropContext } from 'react-beautiful-dnd';
import TodoList from './TodoList';

const MainBody = ({ todos, onDragEnd,onCreateNew }) => {
  const statuses = ['To do', 'In progress', 'Under review', 'Finished'];

  const getTodosByStatus = (status) => {
    return todos.filter(todo => todo.status === status);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex space-x-4 bg-white mr-4 flex-1 overflow-y-auto">
        {statuses.map(status => (
          <TodoList onCreateNew={onCreateNew} key={status} todos={getTodosByStatus(status)} status={status} />
        ))}
      </div>
    </DragDropContext>
  );
};

export default MainBody;
