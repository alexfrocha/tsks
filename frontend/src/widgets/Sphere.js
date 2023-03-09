import { Box } from '@chakra-ui/react'
import React from 'react'

export default function Sphere({ size, absolute = false, top = 0, left = 0 }) {
    return (
        <Box overflow='hidden' bg='tsks.gradient' sx={{
        width: size,
        height: size,
        borderRadius: '50%',
        display: 'flex',
        content: "''",
        position: absolute ? 'absolute' : 'relative',
        top: top,
        left: left
    }}>
        
    </Box>
    )
}