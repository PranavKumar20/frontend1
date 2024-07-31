import { useState } from 'react';
import axios from 'axios';
import { IoClose } from 'react-icons/io5';

const Editor = ({ onClose, onAdd }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('Low');
    const [status, setStatus] = useState('To do');
    const [deadline, setDeadline] = useState('');
    const [error, setError] = useState('');

    const handleAdd = async () => {
        if (!title || !description || !status) {
            setError('Title, description, and status are mandatory.');
            return;
        }
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                'https://backend1-bukz.onrender.com/api/v1/todos/createtodos',
                { title, description, status, priority, deadline },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (response.status === 200) {
                onAdd(response.data);
                onClose();
            } else {
                setError('Failed to add todo.');
            }
        } catch (error) {
            setError('Error adding todo.');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg w-full max-w-md relative">
                <button className="absolute top-4 right-4" onClick={onClose}>
                    <IoClose size={24} />
                </button>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>
                <div className="mb-4">
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="Urgent">Urgent</option>
                    </select>
                </div>
                <div className="mb-4">
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        <option value="To do">To do</option>
                        <option value="In progress">In progress</option>
                        <option value="Under review">Under review</option>
                        <option value="Finished">Finished</option>
                    </select>
                </div>
                <div className="mb-4">
                    <input
                        type="date"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <div className="flex justify-end">
                    <button
                        onClick={handleAdd}
                        className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Editor;
