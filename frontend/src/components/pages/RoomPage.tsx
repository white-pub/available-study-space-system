import React from 'react';
import { MantineProvider } from '@mantine/core';
import RoomFilter from '../functions/RoomFilter';
import SearchBar from '../functions/SearchBar';
import HeaderSection from '../layout/HeaderSection';
import FetchRoomData from "../functions/FetchRoomData";


const RoomPage: React.FC = () => {
  return (
    <MantineProvider>
      <div style={{ backgroundColor: '#0b1b42', minHeight: '100vh', padding: '20px' }}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3"><RoomFilter /></div>

            {/* CUNE Study Spaces div */}
            <div className="col-md-6">
              <div style={{ backgroundColor: '#D3D3D3', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
                <HeaderSection />
              </div>
            </div>
            
            <div className="col-md-3"><SearchBar /></div>
          </div>
          {/* Test room List page data fetching */}
          <div className="row" style={{backgroundColor: '#abdbe3'}}>
            <FetchRoomData />
          </div>
        </div>
      </div>
    </MantineProvider>
  );
};

export default RoomPage;
