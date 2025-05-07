// frontend/src/components/layout/StudySpacesBlock.tsx
// Updated: 2025-05-06
// Written by: Abe Gomez and Anna Chen
//
// Contains the StudySpacesBlock component: the main block on the rooms-list page
// Include styling and displaying room detail info and links to map. 
// Note: all mock up picture for now


import React from 'react';
import { Link } from "react-router-dom";
import { Accordion, Image, Group, Text, Anchor, Button } from '@mantine/core';
import thomImage from '../../assets/thom_image_placeholder.jpeg'
import { Room } from '../functions/FetchRoomData'; // Import the Room type

interface StudySpacesBlockProps {
  filteredRooms: Room[];
}

const StudySpacesBlock: React.FC<StudySpacesBlockProps> = ({ filteredRooms }) => {
  
  // Generate accordion items with room details
  const Rooms = filteredRooms.map((room) => (
    
    <Accordion.Item key={room.room_id} value={`${room.building_name} - ${room.room_name}`}>
      {/* Display the building and room name with an occupancy emoji */}
      <Accordion.Control icon={room.emoji}>
        {room.is_occupied ? "❌" : "✅"} {room.building_name} - {room.room_name}
      </Accordion.Control>

      {/* Room details inside the expandable panel */}
      <Accordion.Panel>
        <Group>
          <Image src={thomImage} width={200} height={200} radius="md" />
          <div>
            <Text size="sm"><b>Capacity:</b> {room.capacity ?? 'Unknown'}</Text>
            <Text size="sm"><b>Whiteboards:</b> {room.whiteboard ?? 'None'}</Text>
            <Text size="sm"><b>TVs:</b> {room.tv ?? 'None'}</Text>
            {/* Building hours("HH:mm:ss") - Extract only the "HH:mm" part*/}
            <Text size="sm">
              <b>Note:</b> Building opens at{" "}{room.open_at ? room.open_at.slice(0, 5) : 'None'}
              {" "}and closes at{" "}{room.close_at ? room.close_at.slice(0, 5) : 'None'}
            </Text>
          </div>
        </Group>
        <Group mt="md">
          {room.building_map_url && (
            <Button component={Link} to={room.building_map_url} variant="light" color="rgba(17, 112, 237, 1)">
              📍 Building Map
            </Button>
          )}
          {room.campus_map_url && (
            <Button component={Link} to={room.building_map_url} variant="light" color="rgba(17, 112, 237, 1)">
              🏫 Campus Map
            </Button>
          )}
        </Group>
      </Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <div>
      {/* Header section with centered text */}
      <div style={{ textAlign: 'center', marginBottom: '20px' , paddingTop: '50px'}}>
        <h1 style={{ margin: 0 }}>CUNE Study Spaces</h1>
        <h4 style={{ margin: 25 }}>Status | Room</h4>
      </div>

      {/* Accordion component with separated variant and default open item */}
      <Accordion
        variant="separated"
        radius="md"
        defaultValue={filteredRooms[0] ? `${filteredRooms[0].building_name} - ${filteredRooms[0].room_name}` : undefined}
      >
        {Rooms}
      </Accordion>
    </div>
  );
}

export default StudySpacesBlock;
