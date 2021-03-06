import React from 'react';
import {
    Box, Image, Text, Center,
} from '@chakra-ui/react';

const Card = ({ imageSource, text }) => (
    <Box
        // as="button"
        lineHeight="1.2"
        transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
        border="1px"
        px="8px"
        borderRadius="6px"
        fontSize="14px"
        fontWeight="semibold"
        bg="#f5f6f7"
        borderColor="#ccd0d5"
        color="#4b4f56"
        m="4px"
        // _hover={{ bg: '#ebedf0' }}
        // _active={{
        //     bg: '#dddfe2',
        //     transform: 'scale(0.98)',
        //     borderColor: '#bec3c9',
        // }}
        // _focus={{
        //     boxShadow: '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
        // }}
        // onClick={() => alert("Triggered")}
    >
        <Image src={imageSource} />
        <Center>
            <Text>{text}</Text>
        </Center>
    </Box>
);

export default Card;
