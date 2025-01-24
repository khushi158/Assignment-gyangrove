import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Tooltip,
  Skeleton,
  Typography
} from '@mui/material';
import { 
  Edit as EditIcon, 
  Delete as DeleteIcon 
} from '@mui/icons-material';

const InventoryTable = ({ 
  inventory, 
  deleteItem, 
  editItem, 
  loading 
}) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Loading state
  if (loading) {
    return (
      <Paper>
        {[...Array(5)].map((_, index) => (
          <Skeleton 
            key={index} 
            variant="rectangular" 
            height={60} 
            sx={{ my: 1 }} 
          />
        ))}
      </Paper>
    );
  }

  // Empty inventory state
  if (inventory.length === 0) {
    return (
      <Paper sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="body1" color="textSecondary">
          No items in inventory. Add your first item!
        </Typography>
      </Paper>
    );
  }

  // Open edit dialog
  const handleEditClick = (item) => {
    setSelectedItem({...item});
    setEditDialogOpen(true);
  };

  // Close edit dialog
  const handleEditClose = () => {
    setEditDialogOpen(false);
    setSelectedItem(null);
  };

  // Submit edit changes
  const handleEditSubmit = () => {
    if (selectedItem) {
      editItem(selectedItem);
      handleEditClose();
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventory.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Edit Item">
                    <IconButton 
                      color="primary" 
                      onClick={() => handleEditClick(item)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Item">
                    <IconButton 
                      color="error" 
                      onClick={() => deleteItem(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog 
        open={editDialogOpen} 
        onClose={handleEditClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Inventory Item</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            fullWidth
            variant="outlined"
            value={selectedItem?.name || ''}
            onChange={(e) => setSelectedItem(prev => ({
              ...prev, 
              name: e.target.value
            }))}
          />
          <TextField
            margin="dense"
            label="Category"
            fullWidth
            variant="outlined"
            value={selectedItem?.category || ''}
            onChange={(e) => setSelectedItem(prev => ({
              ...prev, 
              category: e.target.value
            }))}
          />
          <TextField
            margin="dense"
            label="Quantity"
            type="number"
            fullWidth
            variant="outlined"
            value={selectedItem?.quantity || ''}
            onChange={(e) => setSelectedItem(prev => ({
              ...prev, 
              quantity: parseInt(e.target.value) || 0
            }))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="primary">
            Cancel
          </Button>
          <Button 
            onClick={handleEditSubmit} 
            color="primary" 
            variant="contained"
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default InventoryTable;