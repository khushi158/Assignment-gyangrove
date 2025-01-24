import React from 'react';
import { 
  TextField, 
  Grid, 
  MenuItem, 
  Select, 
  FormControl, 
  InputLabel 
} from '@mui/material';

const FilterBar = ({ setFilter, sortConfig, setSortConfig }) => {
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    const { name, value } = e.target;
    setSortConfig(prev => ({
      key: name,
      direction: value
    }));
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} md={6}>
        <TextField
          label="Filter by Category"
          variant="outlined"
          fullWidth
          onChange={handleFilterChange}
        />
      </Grid>
      <Grid item xs={6} md={3}>
        <FormControl fullWidth variant="outlined">
          <InputLabel>Sort By</InputLabel>
          <Select
            name="key"
            value={sortConfig.key}
            onChange={handleSortChange}
            label="Sort By"
          >
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="category">Category</MenuItem>
            <MenuItem value="quantity">Quantity</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6} md={3}>
        <FormControl fullWidth variant="outlined">
          <InputLabel>Direction</InputLabel>
          <Select
            name="direction"
            value={sortConfig.direction}
            onChange={handleSortChange}
            label="Direction"
          >
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default FilterBar;