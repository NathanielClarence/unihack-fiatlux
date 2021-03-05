// UI Library Components
import React, { useState } from 'react';
import {
    Button, Heading, VStack, HStack, Box,
    Table, Thead, Tbody, Tr, Th, Td, TableCaption, Input,
    Flex, Spacer, Center, Text, Select, FormControl, FormLabel,
} from '@chakra-ui/react';
import { DownloadIcon, RepeatIcon, AddIcon } from '@chakra-ui/icons';

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
    const [slideType, setSlideType] = useState('TABLE');
    // Table
    const [rowNumber, setRowNumber] = useState(1);
    const [colNumber, setColNumber] = useState(1);
    const [tableData, setTableData] = useState([[1]]);
    // List
    // const [listElement, setListElement] = useState(3);

    const handleSubmit = (event) => {
        // alert(JSON.stringify({test: 'Test'}));
        event.preventDefault();
        // const toast = useToast();
        const values = {
            title,
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
                    <Box marginTop="16px">
                        <FormControl>
                            <FormLabel>Slide Type</FormLabel>
                            <Select
                                value={slideType}
                                onChange={(event) => setSlideType(event.target.value)}
                            >
                                <option value="TABLE">Table</option>
                                <option value="LIST">List</option>
                            </Select>
                        </FormControl>
                    </Box>
                    {/* Table Components (Start) */}
                    <Box>
                        <HStack>
                            <Box w="100%" fontWeight="semibold">
                                Data
                            </Box>
                            <VStack>
                                <Box>
                                    <h3>Row</h3>
                                </Box>
                                <InputNumber
                                    value={rowNumber}
                                    onChange={(value) => setRowNumber(value)}
                                    min={1}
                                    max={20}
                                />
                            </VStack>
                            <VStack>
                                <Box>
                                    <h3>Column</h3>
                                </Box>
                                <InputNumber
                                    value={colNumber}
                                    onChange={(value) => setColNumber(value)}
                                    min={1}
                                    max={20}
                                />

                            </VStack>
                        </HStack>
                        <Table variant="striped" colorScheme="teal" size="md">
                            <Thead>
                                <Tr>
                                    <Th></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {tableData.map((itemRow, indexRow) => (
                                    <Tr>
                                        {
                                            tableData[indexRow].map((itemCol, indexCol) => (
                                                <Td>
                                                    <EditValue
                                                        initValue="Value"
                                                    />
                                                </Td>
                                            ))
                                        }
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </Box>
                    {/* Table Component (End) */}
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
