// frontend/src/components/functions/FetchRoomData.tsx
// Updated: 2025-5-3
// 
// Fetch the occupied room data in real time using SSE.
// Fetch static data: that has all rooms with building info
// Pass the data down to child components (e.g., list, map, filters).

import { useState, useEffect, useMemo } from "react";



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
    
    day_of_week?: string; // building hours
    open_at?: string;
    close_at?: string;

    is_occupied?: boolean; // Indicates if the room is occupied

    [key: string]: any; // Add other properties as needed
}

export function useRoomData() {
    const [occupiedRooms, setOccupiedRooms] = useState<Room[]>([]);
    const [staticRoomData, setStaticRoomData] = useState<Room[]>([]);
    const [joinedOccupiedRooms, setJoinedOccupiedRooms] = useState<Room[]>([]);
    const [filters, setFilters] = useState<string[]>([]);


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

    // Join the data from to have all room info + occupancy info
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

    // Filter the rooms based on the selected filters
    const filteredRooms = useMemo(() => {
        return joinedOccupiedRooms.filter((room) => {
            if (filters.includes("Empty Rooms") && room.is_occupied) return false;
            if (filters.includes("Occupied Rooms") && !room.is_occupied) return false;
            if (filters.includes("2 people or less") && room.capacity > 2) return false;
            if (filters.includes("3 to 5 people") && room.capacity <= 2) return false;
            if (filters.includes("3 to 5 people") && room.capacity > 5) return false;
            if (filters.includes("6 people or more") && room.capacity < 6) return false;
            if (filters.includes("TV") && room.tv === 0) return false;
            if (filters.includes("Whiteboard") && room.whiteboard ===0) return false;
            if (filters.includes("Dunklau") && room.building_name !== "Dunklau") return false;
            if (filters.includes("Link Library") && room.building_name !== "Link Library") return false;
            if (filters.includes("Janzow") && room.building_name !== "Janzow") return false;
            return true;
        });
    }, [filters, joinedOccupiedRooms]);

    return { filteredRooms, filters, setFilters, staticRoomData, occupiedRooms, joinedOccupiedRooms };
}