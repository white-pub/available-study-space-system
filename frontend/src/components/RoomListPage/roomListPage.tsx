// frontend/src/components/RoomListPage/roomListPage.tsx
// Updated: 2025-5-3
// 
// Fetch the occupied room data in real time using SSE.
// Fetch static data: that has all rooms with building info
// Pass the data down to child components (e.g., list, map, filters).

import React, { useState, useEffect } from "react";
import RoomList from "./RoomList";
// import RoomFilters from "./RoomFilter";

function RoomListPage() {
    const [occupiedRooms, setOccupiedRooms] = useState([]);
    const [staticRoomData, setStaticRoomData] = useState([]);

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
    // useEffect(() => {
    //     const eventSource = new EventSource("/occupied-rooms-stream");

    //     eventSource.onmessage = (event) => {
    //         const data = JSON.parse(event.data);
    //         setOccupiedRooms(data); // Update the state with the new data
    //     };

    //     eventSource.onerror = () => {
    //         console.error("Error with SSE connection");
    //         eventSource.close(); // Close the connection on error
    //     };

    //     return () => eventSource.close(); // Cleanup on unmount
    // }, []);

    return (
        <div>
            {/* <RoomFilters staticRoomData={staticRoomData} occupiedRooms={occupiedRooms} /> */}
            <RoomList staticRoomData={staticRoomData} occupiedRooms={[]} />
        </div>
    );
}

export default RoomListPage;