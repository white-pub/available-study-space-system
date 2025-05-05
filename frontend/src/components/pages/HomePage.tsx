import { List, Button, MantineProvider } from "@mantine/core"
import React from "react"
import { Text } from '@mantine/core';
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
    return (
        <MantineProvider>
            <div style={{ backgroundColor: '#0b1b42', minHeight: '100vh', padding: '20px'}}>
                <div style={{ backgroundColor: '#D3D3D3', borderRadius: '8px', padding: '10px', paddingBottom: '10px', width: "250px", margin: '0 auto'}}>
                    <Text size="xl" fw={700} ta="center">FIND STUDY SPACE</Text>
                </div>
                <div style={{ height: '20px' }}></div> {/* Needed this for space */}
                <div
                    style={{
                        backgroundColor: '#D3D3D3',
                        borderRadius: '8px',
                        position: 'relative',
                        minHeight: '150px',
                        padding: '20px',
                        display: 'flex',
                        flexDirection: 'column', // Stacks items vertically
                        alignItems: 'flex-start', // Aligns text to the left
                        justifyContent: 'flex-start', // Ensures items start at the top
                    }}>
                    <Text size="lg" fw={700}>ABOUT</Text>
                    <Text>Find available study rooms on campus wth ease!</Text>
                    <Text>
                        Simply search by building and room number or scan the QR code outside any study room to 
                        see availablity and nearby options. 
                    </Text>
                </div>

                <div
                    style={{
                        backgroundColor: '#D3D3D3',
                        borderRadius: '8px',
                        position: 'relative',
                        minHeight: '150px',
                        padding: '20px',
                        marginTop: '20px',
                        display: 'flex',
                        flexDirection: 'column', // Stacks items vertically
                        alignItems: 'flex-start', // Aligns text to the left
                        justifyContent: 'flex-start', // Ensures items start at the top
                    }}>
                    <Text size="lg" fw={700}>HOW TO FIND A STUDY SPACE</Text>
                    <Text>Searching by Building or Room Number:</Text>
                    <List type="ordered">
                        <List.Item>Enter the building name or room number in the search field.</List.Item>
                        <List.Item>Press Search!</List.Item>
                    </List>
                </div>

                <div style={{ height: '20px' }}></div> {/* Needed this for space */}

                <Button fullWidth component={Link} to="/rooms-list" size="lg" variant="filled" radius="lg" >GO TO ROOMS</Button>

            </div>
        </MantineProvider>
    );
};

export default HomePage;