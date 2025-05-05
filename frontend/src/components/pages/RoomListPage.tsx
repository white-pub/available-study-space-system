import React from 'react';
import { MantineProvider } from '@mantine/core';
import RoomFilter from '../layout/RoomFilter';
import SearchBar from '../layout/SearchBar';
import {useRoomData} from "../functions/FetchRoomData";
import RoomList from "../RoomListPage/RoomList";
import StudySpacesBlock from '../layout/StudySpacesBlock';


const RoomListPage: React.FC = () => {
  const { filteredRooms, filters, setFilters, staticRoomData, occupiedRooms, joinedOccupiedRooms } = useRoomData(); // Get joinedOccupiedRooms from the hook

  return (
    <MantineProvider>
      <div style={{ backgroundColor: '#0b1b42', minHeight: '100vh', padding: '20px' }}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <RoomFilter filters={filters} setFilters={setFilters} filteredRooms={filteredRooms} />
            </div>

            {/* CUNE Study Spaces div */}
            <div className="col-md-6">
              <div style={{ backgroundColor: '#D3D3D3', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
                <StudySpacesBlock filteredRooms={filteredRooms}/>
              </div>
            </div>
            
            <div className="col-md-3"><SearchBar /></div>
          </div>
          {/* Test room List page data fetching */}
          <div className="row" style={{backgroundColor: '#abdbe3'}}>
            <RoomList staticRoomData={staticRoomData} occupiedRooms={occupiedRooms} joinedOccupiedRooms={joinedOccupiedRooms} />
          </div>
        </div>
      </div>
    </MantineProvider>
  );
};

export default RoomListPage;
