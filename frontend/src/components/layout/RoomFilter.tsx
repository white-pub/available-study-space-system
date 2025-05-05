// 

import React from 'react';
import { Burger, Checkbox } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import '@mantine/core/styles.css';

interface RoomFilterProps {
  filters: string[];
  setFilters: React.Dispatch<React.SetStateAction<string[]>>;
  filteredRooms?: any[]; // Add this line to define filteredRooms (adjust the type as needed)
}

const RoomFilter: React.FC<RoomFilterProps> = ({filters, setFilters}) => {
  const [opened, { toggle }] = useDisclosure();
  const options = ['Empty Rooms', 'Occupied Rooms', '2 people or less', '3 to 5 people', '6 people or more', 'Whiteboard', 'TV', 'Dunklau', 'Link Library', 'Janzow'];

  // console.log("159");
  // console.log("RoomFilter Props:", { filters, setFilters });

  const handleCheckboxChange = (option: string, checked: boolean) => {
    if (checked) {
      setFilters((prev) => [...prev, option]); // Add the filter
    } else {
      setFilters((prev) => prev.filter((filter) => filter !== option)); // Remove the filter
    }
  };


  return (
    <div style={{
      backgroundColor: '#D3D3D3',
      borderRadius: '8px',
      padding: '10px',
      // width: opened ? '280px' : '50px', // Expands sideways, starts as a small box
      width: opened ? 'auto' : '50px', // Expands sideways, starts as a small box
      height: opened ? 'auto' : '50px', // Remains a small square when closed
      overflow: 'hidden',
      transition: 'width 0.5s ease, height 0.5s ease', // Smooth animations
      display: "grid", // Displays in nice columns
      marginBottom: "10px",
      paddingRight: '10px',
      position: 'fixed',
      // borderWidth: '3px',
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Burger
          opened={opened}
          onClick={toggle}
          size={20}
        />
        <span style={{marginLeft: '10px', fontWeight: 'bold'}}>Filter</span>
      </div>
      <div
        style={{
          marginLeft: '5px', // Adjust spacing
          maxWidth: opened ? '100%' : '0px', // Expands horizontally instead of vertically
          overflow: 'hidden', // Prevent content from spilling out when closed
          whiteSpace: 'nowrap', // Prevent text from wrapping
          transition: 'max-width 0.5s ease', // Smooth sliding animation
        }}>

        {options.map((option, index) => (
          <Checkbox
            key={index}
            label={option}
            checked={filters.includes(option)} // Check if the filter is selected
            onChange={(event) => handleCheckboxChange(option, event.currentTarget.checked)}
          />
        ))}
      </div>
    </div>
  );
};

export default RoomFilter;

