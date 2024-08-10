import React from 'react';
import { Checkbox, ListItem, ListItemText, ListItemIcon, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface ItemProps {
    text: string;
    done: boolean;
    onToggle: () => void;
    onDelete: () => void;
}

const Item: React.FC<ItemProps> = ({ text, done, onToggle, onDelete }) => {
    return (
        <ListItem style={{ padding: '0.5rem 0' }}>
            <ListItemIcon>
                <Checkbox checked={done} onChange={onToggle} />
            </ListItemIcon>
            <ListItemText
                primary={text}
                style={{ textDecoration: done ? 'line-through' : 'none' }}
            />
            <IconButton edge="end" onClick={onDelete}>
                <DeleteIcon />
            </IconButton>
        </ListItem>
    );
};

export default Item;
