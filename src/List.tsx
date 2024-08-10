import React, { useState, useEffect } from 'react';
import { TextField, Button, List as MUIList, Container, Paper, Typography, Box } from '@mui/material';
import Item from './Item';
import axios from 'axios';

interface Todo {
    id: number;
    text: string;
    done: boolean;
}

const List: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState<string>('');

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = () => {
        axios.get('http://localhost:5000/')
            .then(response => setTodos(response.data))
            .catch(error => console.error(error));
    };

    const addTodo = () => {
        if (newTodo.trim() !== '') {
            axios.post('http://localhost:5000/', { text: newTodo })
                .then(response => {
                    setTodos([...todos, response.data]);
                    setNewTodo('');
                })
                .catch(error => console.error(error));
        }
    };

    const toggleTodo = (id: number) => {
        const todo = todos.find(todo => todo.id === id);
        if (todo) {
            axios.put(`http://localhost:5000/${id}`, { done: !todo.done })
                .then(() => {
                    setTodos(
                        todos.map(todo =>
                            todo.id === id ? { ...todo, done: !todo.done } : todo
                        )
                    );
                })
                .catch(error => console.error(error));
        }
    };

    const deleteTodo = (id: number) => {
        axios.delete(`http://localhost:5000/${id}`)
            .then(() => {
                setTodos(todos.filter(todo => todo.id !== id));
            })
            .catch(error => console.error(error));
    };

    return (
        <Container maxWidth="sm" style={{ paddingTop: '2rem' }}>
            <Paper elevation={3} style={{ padding: '2rem', backgroundColor: '#f9f9f9' }}>
                <Typography variant="h4" align="center" gutterBottom>
                    To-Do List
                </Typography>
                <Box display="flex" alignItems="center" marginBottom="1rem">
                    <TextField
                        label="New Task"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        variant="outlined"
                        style={{ marginRight: '1rem', flex: 1 }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={addTodo}
                    >
                        Add
                    </Button>
                </Box>
                <MUIList>
                    {todos.map(todo => (
                        <Item
                            key={todo.id}
                            text={todo.text}
                            done={todo.done}
                            onToggle={() => toggleTodo(todo.id)}
                            onDelete={() => deleteTodo(todo.id)}
                        />
                    ))}
                </MUIList>
            </Paper>
        </Container>
    );
};

export default List;
