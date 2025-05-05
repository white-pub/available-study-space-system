import React from 'react';
import { Accordion } from '@mantine/core';

const groceries = [
  {
    emoji: '✅',
    value: 'Study Space 1',
    description:
      'Description',
  },
  {
    emoji: '❌',
    value: 'Study Space 2',
    description:
      'Description',
  },
  {
    emoji: '❌',
    value: 'Study Space 3',
    description:
      'Description',
  },
];

function StudySpacesBlock() {
  // See Study Space data above
  const Rooms = groceries.map((room) => (
    <Accordion.Item key={room.value} value={room.value}>
      <Accordion.Control icon={room.emoji}>{room.value}</Accordion.Control>
      <Accordion.Panel>{room.description}</Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ margin: 0 }}>CUNE Study Spaces</h1>
        <h4 style={{ margin: 25 }}>Status | Room</h4>
      </div>

      <Accordion variant="separated" radius="md" defaultValue="Study Space 1">
        {Rooms}
      </Accordion>
    </div>
  );
}

export default StudySpacesBlock;

