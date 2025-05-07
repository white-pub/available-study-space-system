// frontend/src/components/pages/HomePage.tsx
// Updated: 2025-05-06
// Written by: Abe Gomez
// 
// Holds the styling for the home page.
// This page provides overview of the app's features and navigation to other pages

import React from "react";
import { Text, List, Button, MantineProvider } from "@mantine/core";
import { Link } from "react-router-dom";

const useStyles = (): Record<string, React.CSSProperties> => ({
    // the styling used in this page
    container: {
        paddingTop: "55px",
        backgroundColor: "#0b1b42",
        minHeight: "100vh",
        padding: "30px 20px",
    },
    header: {
        backgroundColor: "#D3D3D3",
        borderRadius: "8px",
        padding: "10px",
        paddingBottom: "10px",
        width: "250px",
        margin: "0 auto",
    },
    section: {
        backgroundColor: "#D3D3D3",
        borderRadius: "8px",
        position: "relative",
        minHeight: "auto",
        padding: "20px",
        margin: "20px 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },
});

const HomePage: React.FC = () => {
    const classes = useStyles();

    return (
        <MantineProvider>
            <div style={classes.container}>
                <div style={classes.spacer}></div>
                <div style={classes.header}>
                    <Text size="xl" fw={700} ta="center">
                        FIND STUDY SPACE
                    </Text>
                </div>
                {/* About section */}
                <div style={classes.section}>
                    <Text size="lg" fw={700}>
                        ABOUT
                    </Text>
                    <Text>Find available study rooms on campus with ease!</Text>
                    <Text>
                        Simply choose your filter options to see availability and nearby
                        options. Whether you want a space in a specific room or with
                        specific materials inside, the filter can do the work for you!
                    </Text>
                </div>
                {/* How to find study space */}
                <div style={classes.section}>
                    <Text size="lg" fw={700}>
                        HOW TO FIND A STUDY SPACE
                    </Text>
                    <List type="ordered">
                        <List.Item>Navigate to the rooms page.</List.Item>
                        <List.Item>Use the filter to find your favorite study space!</List.Item>
                    </List>
                </div>

                {/* navigation button */}
                <Button fullWidth component={Link} to="/rooms-list" size="lg" variant="filled" radius="lg">
                    GO TO ROOMS
                </Button>
            </div>
        </MantineProvider>
    );
};

export default HomePage;