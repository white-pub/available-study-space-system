import React from "react";

function RoomList({ staticRoomData, occupiedRooms }) {
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
        </div>
    );
}

export default RoomList;