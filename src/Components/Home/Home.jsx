import React, { 
    useState, 
    useMemo, 
    useCallback, 
    lazy, 
    Suspense,
    useEffect 
  } from 'react';
  import { 
    Grid, 
    Paper, 
    Typography, 
    Box, 
    Alert, 
    Skeleton 
  } from '@mui/material';
  import supabase from '../../supabase';
  
  // Lazy-loaded components
  const InventoryTable = lazy(() => import('./InventoryTable'));
  const AddItemForm = lazy(() => import('./AddItemForm'));
  const FilterBar = lazy(() => import('./FilterBar'));
  const StockAlertSidebar = lazy(() => import('./StockAlertSidebar'));
  
  const Home = () => {
    const [inventory, setInventory] = useState([]);
    const [filter, setFilter] = useState('');
    const [sortConfig, setSortConfig] = useState({ 
      key: 'name', 
      direction: 'asc' 
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
  
    // Fetch inventory from Supabase
    const fetchInventory = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.from('Inventory').select('*');
        
        if (error) throw error;
        
        setInventory(data || []);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    // Fetch inventory on component mount
    useEffect(() => {
      fetchInventory();
    }, []);
  
    // Add item to Supabase
    const handleAddItem = async (newItem) => {
      try {
        const { data, error } = await supabase
          .from('Inventory')
          .insert([{
            name: newItem.name,
            category: newItem.category,
            quantity: newItem.quantity
          }])
          .select();
  
        if (error) throw error;
        
        setInventory(prev => [...prev, data[0]]);
      } catch (err) {
        setError(err.message);
      }
    };
  
    // Edit item in Supabase
    const handleEditItem = async (updatedItem) => {
      try {
        const { data, error } = await supabase
          .from('Inventory')
          .update({
            name: updatedItem.name,
            category: updatedItem.category,
            quantity: updatedItem.quantity
          })
          .eq('id', updatedItem.id)
          .select();
  
        if (error) throw error;
        
        setInventory(prev => 
          prev.map(item => 
            item.id === updatedItem.id ? data[0] : item
          )
        );
      } catch (err) {
        setError(err.message);
      }
    };
  
    // Delete item from Supabase
    const handleDeleteItem = async (id) => {
      try {
        const { error } = await supabase
          .from('Inventory')
          .delete()
          .eq('id', id);
  
        if (error) throw error;
        
        setInventory(prev => prev.filter(item => item.id !== id));
      } catch (err) {
        setError(err.message);
      }
    };
  
    // Memoized filtered and sorted inventory
    const processedInventory = useMemo(() => {
      let result = [...inventory];
  
      // Filter
      result = result.filter(item => 
        item.category.toLowerCase().includes(filter.toLowerCase())
      );
  
      // Sort
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
  
      return result;
    }, [inventory, filter, sortConfig]);
  
    return (
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Inventory Dashboard
        </Typography>
  
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
  
        <Grid container spacing={3}>
          <Grid item xs={12} md={9}>
            <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
              <Suspense fallback={<Skeleton variant="rectangular" height={50} />}>
                <FilterBar 
                  setFilter={setFilter} 
                  sortConfig={sortConfig}
                  setSortConfig={setSortConfig}
                />
              </Suspense>
            </Paper>
  
            <Suspense fallback={<Skeleton variant="rectangular" height={100} />}>
              <AddItemForm addItem={handleAddItem} />
            </Suspense>
  
            <Suspense fallback={<Skeleton variant="rectangular" height={400} />}>
              <InventoryTable
                inventory={processedInventory}
                deleteItem={handleDeleteItem}
                editItem={handleEditItem}
                loading={loading}
              />
            </Suspense>
          </Grid>
  
          <Grid item xs={12} md={3}>
            <Suspense fallback={<Skeleton variant="rectangular" height={300} />}>
              <StockAlertSidebar 
                inventory={inventory} 
                lowStockThreshold={10} 
              />
            </Suspense>
          </Grid>
        </Grid>
      </Box>
    );
  };
  
  export default Home;