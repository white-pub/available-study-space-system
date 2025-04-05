import React from 'react';
import { Accordion, Button } from '@mantine/core';
import { DropdownDataType } from '../../data/dropdownData';

const DropdownItem: React.FC<{ item: DropdownDataType }> = ({ item }) => {
  return (
    <Accordion.Item 
      value={`${item.id}`} 
      key={item.id} 
      style={(theme) => ({
        borderRadius: '2px',
        marginBottom: '5px',
        backgroundColor: '#f7feff',
        boxShadow: theme.shadows.sm,
        overflow: 'hidden',
      })}
    >
      <div
      // Occupied / Available indicator
        style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: item.status ? 'green' : 'red',
          marginRight: '8px',
        }}
        // Accordian Control
      />
      <Accordion.Control>
        <div style={{ width: '40px'}}>
        </div>
      </Accordion.Control>
    <span style={{ textAlign: 'right'}}>
    {item.title}
    </span>
      <Accordion.Panel>
        <div style={{ padding: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', flex: 1 }}>
            <img 
              src={item.image} 
              alt={item.text} 
              style={{ borderRadius: '8px', width: '100px', height: '100px' }} 
            />
            <div style={{ flex: 1, margin: '5px'}}>
            <p>{item.extraText}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px'}}>
              <Button variant="outline">Show Room</Button>
              <Button variant="outline">Open Campus Map</Button>
            </div>
          </div>
        </div>
      </Accordion.Panel>
    </Accordion.Item>
  );
};

export default DropdownItem;

