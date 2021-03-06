// UI Library Components
import React, { useState } from 'react';
import {
    Button, Heading, VStack, HStack, Box,
    Table, Thead, Tbody, Tr, Th, Td, TableCaption, Input,
    Flex, Spacer, Center, Text, Select, FormControl, FormLabel,
} from '@chakra-ui/react';
import { DownloadIcon, RepeatIcon, AddIcon, DeleteIcon } from '@chakra-ui/icons';

// HTTP Request
import axios from 'axios';
import handleDownload from '../utils/handleDownload';

// Custom Components
import { EditValue, InputNumber, ImageSlider, Card } from '../components';

function createList(numElements) {
    const parseNumEl = parseInt(numElements);
    const arr = new Array(parseNumEl);
    let i;
    for (i = 0; i < parseNumEl; i += 1) {
        arr[i] = parseNumEl;
    }
    return arr.map((element, index) => (
        <Box p={2}>
            <VStack>
                <HStack>
                    <VStack>
                        <Box fontWeight="semibold">
                            <h3>
                                {`Heading ${index + 1}`}
                            </h3>
                        </Box>
                        <EditValue
                            initValue="Insert text here"
                        />
                    </VStack>
                    <VStack>
                        <Box fontWeight="semibold">
                            <h3>
                                {`Content ${index + 1}`}
                            </h3>
                        </Box>
                        <EditValue
                            initValue="Insert text here"
                        />
                    </VStack>
                </HStack>
            </VStack>
        </Box>
    ));
}

export default function Home({ apiUrl }) {
    const [fileName, setFileName] = useState('');
    const [imageSource, setImageSource] = useState('https://bit.ly/sage-adebayo');
    const [title, setTitle] = useState('');
    const [slideType, setSlideType] = useState('CHEVRON');
    // List
    // const [listElement, setListElement] = useState(3);
    const [chevronData, setChevronData] = useState([
        {
            heading: 'Heading 1',
            subheading: 'Subheading 1',
            iconName: 'https://bit.ly/sage-adebayo',
        },
        {
            heading: 'Heading 2',
            subheading: 'Subheading 2',
            iconName: 'https://bit.ly/sage-adebayo',
        },
        {
            heading: 'Heading 3',
            subheading: 'Subheading 3',
            iconName: 'https://bit.ly/sage-adebayo',
        },
        {
            heading: 'Heading 4',
            subheading: 'Subheading 4',
            iconName: 'https://bit.ly/sage-adebayo',
        },
    ]);
    const MIN_CHEVRON_ITEM = 4;
    const MAX_CHEVRON_ITEM = 6;

    // const handleTableDataChange = (newValue, indexRow, indexCol) => {
    //     setTableData((prevState) => {
    //         const newState = [...prevState];
    //         newState[indexRow][indexCol] = newValue;
    //         return newState;
    //     });
    //     console.log(tableData);
    // };

    const handleChevronDataChange = (newValue, itemChangedEnum, index) => {
        if (itemChangedEnum === 0) {
            // Heading change
            setChevronData((prevState) => {
                const newState = [...prevState];
                newState[index].heading = newValue;
                return newState;
            });
        } else if (itemChangedEnum === 1) {
            // Subheading change
            setChevronData((prevState) => {
                const newState = [...prevState];
                newState[index].subheading = newValue;
                return newState;
            });
        } else {
            // Icon Name change
            setChevronData((prevState) => {
                const newState = [...prevState];
                newState[index].iconName = newValue;
                return newState;
            });
        }
    };

    const handleChevronDataAdd = () => {
        const newItem = {
            heading: '',
            subheading: '',
            iconName: '',
        };
        setChevronData((prevState) => {
            if (prevState.length < MAX_CHEVRON_ITEM) {
                return [...prevState, newItem];
            }
            return prevState;
        });
    };

    const handleChevronDataDelete = () => {
        setChevronData((prevState) => {
            const newState = [...prevState];
            if (newState.length > MIN_CHEVRON_ITEM) {
                newState.pop();
            }
            return newState;
        });
    };

    const handleSubmit = (event) => {
        // alert(JSON.stringify({test: 'Test'}));
        event.preventDefault();
        // const toast = useToast();
        const body = chevronData;
        const values = {
            title,
            slideType,
            body,
        };
        axios.post(`${apiUrl}/pptx`, values)
            .then((response) => {
                setFileName(response.data.fileName);
                // toast({
                //     title: 'PPTX generated!',
                //     description: `${response.data.fileName} has been successfully generated`,
                //     status: 'success',
                //     duration: 5000,
                //     isClosable: true,
                // });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* HEADER SECTION */}
            <Flex borderBottom="1px" borderBottomColor="gray.200">
                <Box p={4}>
                    <Heading>Fiat Lux</Heading>
                </Box>
                <Spacer />
                <Box p={4}>
                    <Button
                        colorScheme="blue"
                        type="submit"
                        rightIcon={<RepeatIcon />}
                    >
                        Generate PPTX
                    </Button>
                </Box>
            </Flex>
            {/* BODY SECTION */}
            <Flex>
                {/* LEFT SIDE - LIST OF SLIDES */}
                <Box w={1 / 6} p={4} borderRight="1px" borderRightColor="gray.200" overflowY="scroll" height="90vh">
                    <Center>
                        <Text fontSize="lg" fontWeight="bold">Slides</Text>
                    </Center>
                    <Center m="4px">
                        <Button leftIcon={<AddIcon />} size="sm" isDisabled>Add Slide</Button>
                    </Center>
                    <Card imageSource={imageSource} text="Slide 1" />
                </Box>
                {/* MIDDLE - SLIDES DATA */}
                <Box w={2 / 3} p={8} borderRight="1px" borderRightColor="gray.200" overflowY="scroll" height="90vh">
                    {/* Title Component */}
                    <FormControl>
                        <FormLabel>Title</FormLabel>
                        <Input
                            label="Title"
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </FormControl>
                    {/* Slide Type Component */}
                    <Box marginTop="16px" marginBottom="16px">
                        <FormControl>
                            <FormLabel>Slide Type</FormLabel>
                            <Select
                                value={slideType}
                                onChange={(event) => setSlideType(event.target.value)}
                            >
                                <option value="CHEVRON">Chevron</option>
                                <option value="GANTT">Gantt Chart</option>
                            </Select>
                        </FormControl>
                    </Box>
                    {/* Chevron Components */}
                    {chevronData.map((item, index) => (
                        <Box
                            lineHeight="1.2"
                            transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                            border="1px"
                            p="12px"
                            borderRadius="6px"
                            fontSize="14px"
                            fontWeight="semibold"
                            borderColor="#ccd0d5"
                            color="#4b4f56"
                            marginTop="16px"
                            marginBottom="16px"
                        >
                            <FormControl>
                                <FormLabel>{`Heading ${index + 1}`}</FormLabel>
                                <Input
                                    label={`Heading ${index + 1}`}
                                    type="text"
                                    placeholder="Heading"
                                    value={item.heading}
                                    onChange={(e) => handleChevronDataChange(e.target.value, 0, index)}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>{`Subheading ${index + 1}`}</FormLabel>
                                <Input
                                    label={`Subheading ${index + 1}`}
                                    type="text"
                                    placeholder="Subheading"
                                    value={item.subheading}
                                    onChange={(e) => handleChevronDataChange(e.target.value, 1, index)}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>{`Icon URL ${index + 1}`}</FormLabel>
                                <Input
                                    label={`Icon URL ${index + 1}`}
                                    type="text"
                                    placeholder="Icon URL"
                                    value={item.iconName}
                                    onChange={(e) => handleChevronDataChange(e.target.value, 2, index)}
                                />
                            </FormControl>
                        </Box>
                    ))}
                    <Flex>
                        <Spacer />
                        <Box mx="16px">
                            <Button
                                leftIcon={<DeleteIcon />}
                                onClick={handleChevronDataDelete}
                                isDisabled={chevronData.length <= MIN_CHEVRON_ITEM}
                            >
                                Delete Item
                            </Button>
                        </Box>
                        <Box>
                            <Button
                                leftIcon={<AddIcon />}
                                onClick={handleChevronDataAdd}
                                isDisabled={chevronData.length >= MAX_CHEVRON_ITEM}
                            >
                                Add Item
                            </Button>
                        </Box>
                    </Flex>
                    {/* List Component (Start) */}
                    {/* <Box>
                        <HStack spacing="200px">
                            <Box fontWeight="semibold">
                                List
                            </Box>
                            <VStack>
                                <Box w="100%" fontWeight="semibold">
                                    Title:
                                </Box>
                                <EditValue
                                    initValue="Insert title here"
                                />
                            </VStack>
                            <VStack>
                                <Box w="100%" fontWeight="semibold">
                                    Number of Element:
                                </Box>
                                <InputNumber
                                    value={listElement}
                                    onChange={(value) => setListElement(value)}
                                    min={3}
                                    max={5}
                                />
                            </VStack>
                        </HStack>
                    </Box>
                    <Box p={4}>
                        {createList(listElement)}
                    </Box> */}
                    {/* List Component (End) */}
                </Box>
                {/* RIGHT SIDE - PREVIEW */}
                <Box w={2 / 6} p={4}>
                    <Center>
                        <Text fontSize="lg" fontWeight="bold">Preview</Text>
                    </Center>
                    <ImageSlider images={[imageSource]} />
                    <Center>
                        <Box p={16}>
                            {fileName !== '' ? <Button rightIcon={<DownloadIcon />} colorScheme="teal" onClick={() => handleDownload(fileName)}>Download PPTX</Button> : null}
                        </Box>
                    </Center>
                </Box>
            </Flex>
        </form>
    );
}

export async function getStaticProps() {
    const apiUrl = process.env.API_URL;
    return {
        props: {
            apiUrl,
        },
    };
}
