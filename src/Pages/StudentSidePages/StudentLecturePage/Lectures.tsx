import React from 'react'
import { Flex } from '@chakra-ui/react';

import { Box, Badge, Text } from '@chakra-ui/react';

const Lectures = () => {
    return (
        <Flex justify="space-between" align="center" m="10">
            <Box>
                <Flex>
                    <Box>CSBT Intervantion || Weekly Connect</Box>
                    <Badge
                    colorScheme={"red"}
                    variant="solid"
                    h="20px"
                    w="60px"
                    fontSize="12px"
                >
                    LIVE
                </Badge>
                </Flex>
                <Box>lkdsnf</Box>
            </Box>
            <Box>
                <Badge
                    colorScheme={"red"}
                    variant="solid"
                    h="20px"
                    w="60px"
                    fontSize="12px"
                >
                    Absent
                </Badge>
            </Box>
        </Flex>
    )
}

export default Lectures