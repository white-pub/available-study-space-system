// frontend/src/components/pages/RoomListPage.tsx
// Updated: 2025-05-04
// Written by: Abe Gomez and Anna Chen
// 
// Holds the styling outline and components for the rooms-list page.
// Components: Filter, StudySpacesBlock (display each room)



import React from 'react';
import { MantineProvider, Button } from '@mantine/core';
import RoomFilter from '../layout/RoomFilter';
import { useRoomData } from "../functions/FetchRoomData";
import StudySpacesBlock from '../layout/StudySpacesBlock';
import RoomList from '../RoomListPage/RoomList'; // for testing
import { Link } from 'react-router-dom';

// Define styles at the top
const useStyles = (): Record<string, React.CSSProperties> => ({
  container: {
    backgroundColor: '#0b1b42',
    minHeight: '100vh',
    padding: '30px 20px',
  },
  studySpacesBlock: {
    backgroundColor: '#D3D3D3',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
  },
});

const RoomListPage: React.FC = () => {
  const classes = useStyles();
  const { filteredRooms, filters, setFilters } = useRoomData(); // Get joinedOccupiedRooms from the hook

  return (
    <MantineProvider>
      <div style={classes.container}>
        <div className="container-fluid">
          <div className="row">
            {/* Filter */}
            <div>
              <RoomFilter filters={filters} setFilters={setFilters} filteredRooms={filteredRooms} />
            </div>

            {/* CUNE Study Spaces div */}
            <div className="col-md-6">
              <div style={classes.studySpacesBlock}>
                <StudySpacesBlock filteredRooms={filteredRooms} />
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
