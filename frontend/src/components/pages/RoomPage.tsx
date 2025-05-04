import React from 'react';
import { MantineProvider } from '@mantine/core';
import LeftSidebar from '../layout/LeftSidebar';
import RightSidebar from '../layout/RightSidebar';
import HeaderSection from '../layout/HeaderSection';
import DropdownSection from '../dropdown/DropdownSection';
import RoomListPage from "./components/RoomListPage/roomListPage";


const RoomPage: React.FC = () => {
  return (
    <MantineProvider>
      <div style={{ backgroundColor: '#0b1b42', minHeight: '100vh', padding: '20px' }}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3"><LeftSidebar /></div>

            {/* CUNE Study Spaces div */}
            <div className="col-md-6">
              <div style={{ backgroundColor: '#D3D3D3', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
                <HeaderSection />
                <DropdownSection />
              </div>
            </div>
            
            <div className="col-md-3"><RightSidebar /></div>
          </div>
          {/* Test room List page data fetching */}
          <div className="row" style={{backgroundColor: '#abdbe3'}}>
            <RoomListPage />
          </div>
        </div>
      </div>
    </MantineProvider>
  );
};

export default RoomPage;
