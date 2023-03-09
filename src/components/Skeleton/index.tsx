import React from 'react'
import { Box, SkeletonCircle, SkeletonText } from '@chakra-ui/react'

const Skeleton = () => {
    return (
        <Box padding='6' boxShadow='lg' bg='white'>
            <SkeletonCircle size='10' />
            <SkeletonText mt='4' noOfLines={16} spacing='4' skeletonHeight='2' />
        </Box>
    )
}

export default Skeleton