import React, { useState } from 'react';
import { 
  Button, 
  TextField, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  Grid 
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const AddItemForm = ({ addItem }) => {
  const [open, setOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    quantity: ''
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) : value
    }));
  };

  const handleSubmit = () => {
    addItem(newItem);
    setNewItem({ name: '', category: '', quantity: '' });
    handleClose();
  };

  return (
    <>
      <Button 
        variant="contained" 
        color="primary" 
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
        sx={{ mb: 2 }}
      >
        Add New Item
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Inventory Item</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                name="name"
                label="Item Name"
                fullWidth
                value={newItem.name}
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
                value={newItem.category}
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
                value={newItem.quantity}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add Item
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddItemForm;