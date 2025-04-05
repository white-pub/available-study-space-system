import React from 'react';
import { Accordion } from '@mantine/core';
import { dropdownData } from '../../data/dropdownData';
import DropdownItem from './DropdownItem';

const DropdownSection: React.FC = () => (
  <Accordion multiple>
    {dropdownData.map(item => (
      <DropdownItem key={item.id} item={item} />
    ))}
  </Accordion>
);

export default DropdownSection;
