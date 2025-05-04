import React from "react";

function RoomList({ staticRoomData, occupiedRooms, joinedOccupiedRooms }) {
    return (
        <div className="room-list">
            <h2>Room List</h2>
            <ul>
                {staticRoomData.map((room) => {
                    return (
                        <li key={room.room_id}>
                            {room.building_name} - {room.room_name}
                        </li>
                    );
                })}
            </ul>
            <h2>Occupied Room List - only show id</h2>
            <ul>
                {occupiedRooms.map((occupiedRoom) => {
                    return (
                        <li key={occupiedRoom.room_id}>
                            {occupiedRoom.room_id}
                        </li>
                    );
                })}
            </ul>
            <h2>Occupied Room List</h2>
            <ul>
                {joinedOccupiedRooms.map((joinedOccupiedRoom) => {
                    return (
                        <li key={joinedOccupiedRoom.room_id}>
                            {joinedOccupiedRoom.is_occupied ? "❌ Occupied" : "✅ Available"} - {joinedOccupiedRoom.building_name} - {joinedOccupiedRoom.room_name}
                        </li>
                    );
                })}
            </ul>
        </div>
        
    );
}

export default RoomList;