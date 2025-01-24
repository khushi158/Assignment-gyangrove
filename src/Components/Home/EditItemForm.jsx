import React, { useState, useEffect } from 'react';
import { 
  Button, 
  TextField, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  Grid 
} from '@mui/material';

const EditItemDialog = ({ open, onClose, item, editItem }) => {
  const [editedItem, setEditedItem] = useState(item);

  useEffect(() => {
    setEditedItem(item);
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedItem(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) : value
    }));
  };

  const handleSubmit = () => {
    editItem(editedItem);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Inventory Item</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Item Name"
              fullWidth
              value={editedItem.name}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="dense"
              name="category"
              label="Category"
              fullWidth
              value={editedItem.category}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="dense"
              name="quantity"
              label="Quantity"
              type="number"
              fullWidth
              value={editedItem.quantity}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditItemDialog;