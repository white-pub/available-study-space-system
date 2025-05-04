// frontend/src/components/RoomListPage/RoomListPage.tsx
// Updated: 2025-5-3
// 
// Fetch the occupied room data in real time using SSE.
// Fetch static data: that has all rooms with building info
// Pass the data down to child components (e.g., list, map, filters).

import React, { useState, useEffect } from "react";
import RoomList from "./RoomList";
// import RoomFilters from "./RoomFilter";

function RoomListPage() {
    interface Room {
        room_id: string; // Unique identifier for the room
        room_name?: string; // Name of the room
        capacity?: number; // Capacity of the room. 3 means can have 3 people inside
        whiteboard?: number; // number of whiteboards in room
        tv?: number; // number of TV in a room
        room_pic_url?: string; // url for room pic
        building_map_url?: string; // url for building map with room location marked out
        campus_map_url?: string; // url for campus map with room location marked out

        building_id?: string; // ID of the building the room belongs to
        building_name?: string; // Name of the building

        is_occupied?: boolean; // Indicates if the room is occupied

        [key: string]: any; // Add other properties as needed
    }

    const [occupiedRooms, setOccupiedRooms] = useState<Room[]>([]);
    const [staticRoomData, setStaticRoomData] = useState<Room[]>([]);
    const [joinedOccupiedRooms, setJoinedOccupiedRooms] = useState<Room[]>([]);

    // Fetch static room data (one-time fetch)
    useEffect(() => {
        const fetchStaticRoomData = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/all-room-with-building-info`);
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data = await res.json();
                setStaticRoomData(data);
            } catch (error) {
                console.error("Error fetching static room data:", error);
            }

        };

        fetchStaticRoomData();
    }, []);


    // Fetch occupied room data using SSE
    useEffect(() => {
        const eventSource = new EventSource(`${import.meta.env.VITE_API_BASE_URL}/occupied-rooms-stream`);

        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setOccupiedRooms(data); // Update the state with the new data
        };

        eventSource.onerror = () => {
            console.error("Error with SSE connection");
            eventSource.close(); // Close the connection on error
        };

        return () => eventSource.close(); // Cleanup on unmount
    }, []);

    // Join the data
    useEffect(() => {
        const updatedJoinedRooms = staticRoomData.map((room) => {
            const isOccupied = occupiedRooms.some(
                (occupiedRoom) => occupiedRoom.room_id === room.room_id
            );
            return {
                ...room, // Include all properties from the static room data
                is_occupied: isOccupied, // Add the is_occupied property
            };
        });

        setJoinedOccupiedRooms(updatedJoinedRooms); // Update the state
    }, [staticRoomData, occupiedRooms]); // Re-run whenever staticRoomData or occupiedRooms changes

    return (
        <div>
            {/* <RoomFilters staticRoomData={staticRoomData} occupiedRooms={occupiedRooms} /> */}
            <RoomList staticRoomData={staticRoomData} occupiedRooms={occupiedRooms} joinedOccupiedRooms={joinedOccupiedRooms}/>
        </div>
    );
}

export default RoomListPage;