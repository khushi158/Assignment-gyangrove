import React from 'react';

const LowStockHighlight = ({ inventory }) => {
  return (
    <div>
      {inventory.filter(item => item.quantity < 10).map(item => (
        <div key={item.id} style={{ backgroundColor: 'yellow' }}>
          <p>{item.name} is low on stock!</p>
        </div>
      ))}
    </div>
  );
};

export default LowStockHighlight;
