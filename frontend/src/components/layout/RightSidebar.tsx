import React from 'react';
import { TextInput, Select} from '@mantine/core';

const RightSidebar: React.FC = () => {
  const selectData = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  return (
    <div style={{ backgroundColor: '#D3D3D3', 
    borderRadius: '10px', 
    padding: '10px',
    height: '680px',
     }}>
      <TextInput placeholder="Search" 
        style={{ marginBottom: '10px',
          borderRadius: '10px'
         }} 
      />
      <Select 
        data={selectData} 
        placeholder="Pick a building" 
      />
    </div>
  );
};

export default RightSidebar;

