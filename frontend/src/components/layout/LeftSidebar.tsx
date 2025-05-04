import React from 'react';
import { Burger, Checkbox } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import '@mantine/core/styles.css';

const LeftSidebar: React.FC = () => {
  const [opened, { toggle }] = useDisclosure();
  const options = ['Empty Rooms', 'Occupied Rooms', '2-5', '5-10','10+', 'Whiteboard', 'TV', 'Dunklau', 'Thom', 'Library', 'Janzow'];


  return (
    <div style={{
      backgroundColor: '#D3D3D3',
      borderRadius: '8px',
      padding: '10px',
      width: opened ? '280px' : '50px', // Expands sideways, starts as a small box
      height: opened ? 'auto' : '50px', // Remains a small square when closed
      overflow: 'hidden',
      transition: 'width 0.5s ease, height 0.5s ease', // Smooth animations
      display: "grid", // Displays in nice columns
      marginBottom: "10px"
      }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Burger
          opened={opened}
          onClick={toggle}
          size={20}
        />
        <span style={{ marginLeft: '10px' }}>Menu</span>
      </div>
      <div
        style={{
          marginLeft: '10px', // Adjust spacing
          maxWidth: opened ? '280px' : '0px', // Expands horizontally instead of vertically
          overflow: 'hidden', // Prevent content from spilling out when closed
          whiteSpace: 'nowrap', // Prevent text from wrapping
          transition: 'max-width 0.5s ease', // Smooth sliding animation
        }}>
          
        {options.map((option, index) => (
          <Checkbox
            key={index}
            label={option}
          />
        ))}
      </div>
    </div>
  );
};

export default LeftSidebar;

