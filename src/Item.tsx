import React from 'react';
import { Checkbox, ListItem, ListItemText, ListItemIcon } from '@mui/material';

interface ItemProps {
    text: string;
    done: boolean;
    onToggle: () => void;
}

const Item: React.FC<ItemProps> = ({ text, done, onToggle }) => {
    return (
        <ListItem style={{ padding: '0.5rem 0' }}>
            <ListItemIcon>
                <Checkbox checked={done} onChange={onToggle} />
            </ListItemIcon>
            <ListItemText
                primary={text}
                style={{ textDecoration: done ? 'line-through' : 'none' }}
            />
        </ListItem>
    );
};

export default Item;
