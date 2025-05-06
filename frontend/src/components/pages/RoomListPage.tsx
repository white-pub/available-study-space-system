/*
RoomListPage.tsx
Description: This file holds the styling outline for the rooms-list page.
Written by: Abe Gomez and Anna Chen

*/

import React from 'react';
import { MantineProvider, Button } from '@mantine/core';
import RoomFilter from '../layout/RoomFilter';
import {useRoomData} from "../functions/FetchRoomData";
import StudySpacesBlock from '../layout/StudySpacesBlock';
import RoomList from '../RoomListPage/RoomList'; // for testing
import { Link } from 'react-router-dom';


const RoomListPage: React.FC = () => {
  const { filteredRooms, filters, setFilters} = useRoomData(); // Get joinedOccupiedRooms from the hook

  return (
    <MantineProvider>
      <div style={{ backgroundColor: '#0b1b42', minHeight: '100vh', padding: '20px' }}>
        <div className="container-fluid">
          <div className="row">
            {/* Filter */}
            <div>
              <RoomFilter filters={filters} setFilters={setFilters} filteredRooms={filteredRooms} />
            </div>

            {/* CUNE Study Spaces div */}
            <div className="col-md-6">
              <div style={{ backgroundColor: '#D3D3D3', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
                <StudySpacesBlock filteredRooms={filteredRooms}/>
              </div>
              <Button fullWidth component={Link} to="/home" size="lg" variant="filled" radius="lg" >GO TO HOME</Button>
            </div>
            {/* for testing to see if data loaded correctly */}
            {/* <div>
              <RoomList filteredRooms={filteredRooms} />
            </div> */}
          </div>
        </div>
      </div>
    </MantineProvider>
  );
};

export default RoomListPage;
