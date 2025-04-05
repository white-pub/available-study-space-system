import React, { useState } from 'react';
import { MantineTheme, Burger, Checkbox } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

const LeftSidebar: React.FC = () => {
  const [expanded, { toggle }] = useDisclosure(true);
  const options = ['Empty Rooms', 'Occupied Rooms', '2-5', '5-10','10+', 'Whiteboard', 'TV', 'Dunklau', 'Thom', 'Library', 'Janzow'];
  const [checkedItems, setCheckedItems] = useState(new Array(options.length).fill(false));

  const handleCheckboxChange = (index: number) => {
    const updatedItems = [...checkedItems];
    updatedItems[index] = !updatedItems[index];
    setCheckedItems(updatedItems);
  };

  return (
    <div style={{ backgroundColor: '#D3D3D3', borderRadius: '8px', padding: '10px', width: '280px' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Burger
          opened={expanded}
          onClick={toggle}
          
          size={30}
          color="#ff4500"
          style={(theme: MantineTheme) => ({
            border: '1px solid #000',
            borderRadius: '4px',
            padding: '4px',
            '& div': {
              backgroundColor: expanded ? theme.colors.green[6] : theme.colors.red[6],
            },
          })}
        />
        <span style={{ marginLeft: '25px', whiteSpace: 'nowrap' }}>Menu</span>
      </div>
      <div
        style={{
          marginTop: '10px',
          maxHeight: expanded ? '630px' : '0px',
          overflow: 'hidden',
          transition: 'max-height 0.5s ease',
        }}
      >
        {options.map((option, index) => (
          <Checkbox
            key={index}
            label={option}
            variant="outline"
            checked={checkedItems[index]}
            onChange={() => handleCheckboxChange(index)}
            style={{ marginBottom: '10px' }}
            // Using Mantine's color prop to change the primary color
            color="teal"
            // Customize inner styles via the styles prop
            styles={{
              icon: { display: 'none' }, // Hides the default check icon
              label: { fontSize: '16px', color: '#333', marginLeft: '8px' },
              input: {
                // Here you can override the default checkbox appearance
                borderColor: checkedItems[index] ? 'teal' : '#ccc',
                '&:checked': {
                  backgroundColor: 'teal',
                },
              },
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LeftSidebar;

