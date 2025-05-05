// frontend/src/components/RoomListPage/RoomList.tsx
// Updated: 2025-5-4
// 
// Displays the different set of data in list format
// For testing purpose

import React from "react";

function RoomList({ filteredRooms }) {
// function RoomList({ staticRoomData, occupiedRooms, joinedOccupiedRooms, filteredRooms }) {
    return (
        <div className="room-list">
            {/* <h2>Room List</h2>
            <ul>
                {staticRoomData.map((room) => {
                    return (
                        <li key={room.room_id}>
                            {room.building_name} - {room.room_name}
                        </li>
                    );
                })}
            </ul> */}
            {/* <h2>Occupied Room List - only show id</h2>
            <ul>
                {occupiedRooms.map((occupiedRoom) => {
                    return (
                        <li key={occupiedRoom.room_id}>
                            {occupiedRoom.room_id}
                        </li>
                    );
                })}
            </ul> */}
            {/* <h2>Occupied Room List</h2>
            <ul>
                {joinedOccupiedRooms.map((joinedOccupiedRoom) => {
                    return (
                        <li key={joinedOccupiedRoom.room_id}>
                            {joinedOccupiedRoom.is_occupied ? "❌ " : "✅ "} - {joinedOccupiedRoom.building_name} {joinedOccupiedRoom.room_name}
                            - capacity:{joinedOccupiedRoom.capacity}
                        </li>
                    );
                })}
            </ul> */}
            <h2>filtered Room List</h2>
            <ul>
                {filteredRooms.map((rooms) => {
                    return (
                        <li key={rooms.room_id}>
                            {rooms.is_occupied ? "❌ Occupied" : "✅ Available"} - {rooms.building_name} - {rooms.room_name}
                            {rooms.close_at}
                        </li>
                    );
                })}
            </ul>
        </div>
        
    );
}

export default RoomList;