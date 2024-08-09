import React, { useState } from 'react';
import { TextField, Button, List as MUIList, Container, Paper, Typography, Box } from '@mui/material';
import Item from './Item';

interface Todo {
    id: number;
    text: string;
    done: boolean;
}

const List: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState<string>('');

    const addTodo = () => {
        if (newTodo.trim() !== '') {
            setTodos([...todos, { id: Date.now(), text: newTodo, done: false }]);
            setNewTodo('');
        }
    };

    const toggleTodo = (id: number) => {
        setTodos(
            todos.map(todo =>
                todo.id === id ? { ...todo, done: !todo.done } : todo
            )
        );
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
                        />
                    ))}
                </MUIList>
            </Paper>
        </Container>
    );
};

export default List;
