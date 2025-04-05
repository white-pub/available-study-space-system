import React from 'react';
import { MantineProvider } from '@mantine/core';
import LeftSidebar from './components/layout/LeftSidebar';
import RightSidebar from './components/layout/RightSidebar';
import HeaderSection from './components/layout/HeaderSection';
import DropdownSection from './components/dropdown/DropdownSection';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  return (
    <MantineProvider>
      <div style={{ backgroundColor: '#0b1b42', minHeight: '100vh', padding: '20px' }}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3"><LeftSidebar /></div>
            <div className="col-md-6">
              <div style={{ backgroundColor: '#D3D3D3', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
                <HeaderSection />
                <DropdownSection />
              </div>
            </div>
            <div className="col-md-3"><RightSidebar /></div>
          </div>
        </div>
      </div>
    </MantineProvider>
  );
};

export default App;
