"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from '@/components/SideBar';
import MainBody from '@/components/MainBody';
import InputBox2 from '@/components/InputBox2';
import Editor from '@/components/Editor';

import { CiSearch } from "react-icons/ci";
import { SlCalender } from "react-icons/sl";
import { RiAiGenerate } from "react-icons/ri";
import { CiFilter } from "react-icons/ci";
import { CiShare2 } from "react-icons/ci";
import { AiFillPlusCircle } from "react-icons/ai";

const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://backend1-bukz.onrender.com/api/v1/user/getprofile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data.user);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    const fetchTodos = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://backend1-bukz.onrender.com/api/v1/user/mytodos', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setTodos(response.data.myTodos);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchProfile();
    fetchTodos();
  }, []);

  const onDragEnd = async (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    const updatedTodos = Array.from(todos);
    const [movedTodo] = updatedTodos.splice(source.index, 1);
    movedTodo.status = destination.droppableId;
    updatedTodos.splice(destination.index, 0, movedTodo);

    setTodos(updatedTodos);

    try {
      const token = localStorage.getItem('token');
      await axios.post('https://backend1-bukz.onrender.com/api/v1/user/updatetodo', movedTodo, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error('Error updating todo status:', error);
    }
  };

  const handleCreateNew = () => {
    setCurrentTodo(null);
    setShowEditor(true);
  };

  const handleEditTodo = (todo) => {
    setCurrentTodo(todo);
    setShowEditor(true);
  };

  const handleCloseEditor = () => {
    setShowEditor(false);
  };

  const handleAddOrUpdate = async (newTodo) => {
    try {
      const token = localStorage.getItem('token');
      const url = currentTodo
        ? `https://backend1-bukz.onrender.com/api/v1/todos/updatetodo/${currentTodo.id}`
        : 'https://backend1-bukz.onrender.com/api/v1/todos/createtodos';
      const method = currentTodo ? 'PUT' : 'POST';

      const response = await axios({
        method,
        url,
        data: newTodo,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        setTodos((prevTodos) => {
          if (currentTodo) {
            return prevTodos.map((todo) => (todo.id === currentTodo.id ? response.data.updatedTodo : todo));
          }
          return [...prevTodos, response.data.newTodo];
        });
        setShowEditor(false);
        await fetchTodos();
      }
    } catch (error) {
      console.error('Error adding/updating todo:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://backend1-bukz.onrender.com/api/v1/todos/deletetodo/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching todos: {error.message}</div>;
  }

  if (!user) {
    return <div>Please log in to view your dashboard.</div>;
  }

  return (
    <div className="flex h-screen">
      <SideBar userName={user.fullname} onCreateNew={handleCreateNew} />
      <div className="w-5/6 p-4 flex flex-col">
        <h1 className="text-3xl font-bold mb-6">Good morning, {user.fullname}!</h1>
        <SearchRow onCreateNew={handleCreateNew} />
        <MainBody
          todos={todos}
          onDragEnd={onDragEnd}
          onCreateNew={handleCreateNew}
          onEditTodo={handleEditTodo}
          onDeleteTodo={handleDeleteTodo}
        />
        {showEditor && <Editor onClose={handleCloseEditor} onAdd={handleAddOrUpdate} todo={currentTodo} />}
      </div>
    </div>
  );
};

export default Dashboard;

const SearchRow = ({ onCreateNew }) => {
  return (
    <div className="flex flex-row justify-between py-2 pr-2">
      <div className="">
        <InputBox2 className="bg-white" placeholder="Search" icon={<CiSearch />} />
      </div>
      <div className="flex flex-row">
        <div><LabelWithIcon label="Calender View" icon={<SlCalender />} /></div>
        <div><LabelWithIcon label="Automation" icon={<RiAiGenerate />} /></div>
        <div><LabelWithIcon label="Filter" icon={<CiFilter />} /></div>
        <div><LabelWithIcon label="Share" icon={<CiShare2 />} /></div>
        <div className="pl-2">
          <button
            className="w-full bg-purple-500 text-white py-1 px-4 rounded flex justify-between"
            onClick={onCreateNew} // Call the passed function on click
          >
            Create new
            <div className="pt-1">
              <AiFillPlusCircle />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

const LabelWithIcon = ({ label, icon }) => {
  return (
    <div className="flex flex-row pl-4">
      <div className="pt-1">{label}</div>
      <div className="pl-2 pt-2">{icon}</div>
    </div>
  );
};
