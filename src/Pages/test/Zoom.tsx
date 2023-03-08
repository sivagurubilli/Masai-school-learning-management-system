import React from 'react'
import { Box, Flex, Button, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom';

const Zoom = () => {
    const ZOOM_MEETING_URL = 'https://us06web.zoom.us/j/88499349139'; // Replace with your own Zoom meeting URL
    const ZOOM_SETTINGS_URL = 'https://zoom.us/profile/setting';

    const handleJoinMeetingClick = () => {
        window.location.href = ZOOM_MEETING_URL;
    };

    const handleZoomSettingsClick = () => {
        window.location.href = ZOOM_SETTINGS_URL;
    };

    return (
        <Box m='auto' bg='blue'>
            <Box  p='50px'>
                <Flex
                    align="center"
                    justify="center"
                    color='white'
                    bg='blue'
                    p='10px'>
                    Mute your microphone while joining a meeting
                </Flex>
                <Flex
                    align="center"
                    justify="center"
                    color='white'
                    bg='blue'
                    p='10px'>
                    
                        <Text textDecoration="underline" onClick={handleZoomSettingsClick}>Zoom Settings</Text>   
                </Flex>
                <Flex
                    align="center"
                    justify="center"
                    color='white'
                    bg='blue'
                    p='10px'>
                    <Button color='blue' bg='white' onClick={handleJoinMeetingClick}>
                        Join Zoom Session
                    </Button>
                </Flex>
            </Box>
        </Box>
    )
}

export default Zoom;
