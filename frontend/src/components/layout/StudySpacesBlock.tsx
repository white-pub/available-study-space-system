import React from 'react';
import { Accordion } from '@mantine/core';

function StudySpacesBlock({ filteredRooms }) {
  // Map through filteredRooms to create individual accordion items for each room
  const Rooms = filteredRooms.map((room) => (
    <Accordion.Item 
      key={room.room_id} 
      value={`${room.building_name} - ${room.room_name}`} // Unique value for each accordion item
    >
      {/* Display the building and room name with an emoji */}
      <Accordion.Control icon={room.emoji}>
        {room.building_name} - {room.room_name}
      </Accordion.Control>
      
      {/* Room details inside the expandable panel */}
      <Accordion.Panel>
        {room.description}
      </Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <div>
      {/* Header section with centered text */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ margin: 0 }}>CUNE Study Spaces</h1>
        <h4 style={{ margin: 25 }}>Status | Room</h4>
      </div>

      {/* Accordion component with a separated variant and default open item */}
      <Accordion 
        variant="separated" // Adds spacing between items
        radius="md" // Medium border-radius for rounded corners
        defaultValue={`${filteredRooms[0]?.building_name} - ${filteredRooms[0]?.room_name}`} // Default open item
      >
        {Rooms} {/* Render the mapped accordion items */}
      </Accordion>
    </div>
  );
}

export default StudySpacesBlock;
