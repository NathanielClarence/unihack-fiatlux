import React, { useState } from 'react';
import {
    Image, Button, Box, Center, Flex, Spacer,
} from '@chakra-ui/react';
import {
    ChevronLeftIcon, ChevronRightIcon,
} from '@chakra-ui/icons';

const ImageSlider = ({ images }) => {
    const imagesList = images;
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePreviousSlide = () => {
        let previousIndex = currentIndex - 1;
        if (previousIndex < 0) previousIndex = 0;
        setCurrentIndex(previousIndex);
    };

    const handleNextSlide = () => {
        let nextIndex = currentIndex + 1;
        if (nextIndex > imagesList.length - 1) nextIndex = imagesList.length - 1;
        setCurrentIndex(nextIndex);
    };

    return (
        <Box>
            <Center>
                <Image boxSize="200px" src={imagesList[currentIndex]} />
            </Center>
            <Flex p={4}>
                <Button
                    isDisabled={currentIndex <= 0}
                    leftIcon={<ChevronLeftIcon />}
                    onClick={handlePreviousSlide}
                >
                    Previous Slide
                </Button>
                <Spacer />
                <Button
                    isDisabled={currentIndex >= imagesList.length - 1}
                    rightIcon={<ChevronRightIcon />}
                    onClick={handleNextSlide}
                >
                    Next Slide
                </Button>
            </Flex>
        </Box>
    );
}

export default ImageSlider;
