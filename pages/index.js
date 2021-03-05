// UI Library Components
import React, { useState } from 'react';
import {
    Button, Heading, VStack, HStack, Box, useToast,
    Table, Thead, Tbody, Tr, Th, Td, TableCaption, Input,
    Flex, Spacer,
} from '@chakra-ui/react';
import { DownloadIcon } from '@chakra-ui/icons';

// HTTP Request
import axios from 'axios';
import handleDownload from '../utils/handleDownload';

// Custom Components
import { EditValue, InputNumber } from '../components';

export default function Home({ apiUrl }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [fileName, setFileName] = useState('');
    const [rowNumber, setRowNumber] = useState(1);
    const [colNumber, setColNumber] = useState(1);
    const [listNumber, setListNumber] = useState(3);
    const [tableData, setTableData] = useState([[1,2,3,4,5], [6,7,8,9,10]]);

    const handleSubmit = (event) => {
        const toast = useToast();
        const values = {
            test: 'Test',
        };
        axios.post(`${apiUrl}/pptx`, values)
            .then((response) => {
                setFileName(response.data.fileName);
                toast({
                    title: 'PPTX generated!',
                    description: `${response.data.fileName} has been successfully generated`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
            })
            .catch((error) => {
                console.log(error);
            });
        event.preventDefault();
    };

    return (
        <div>
            <Flex>
                <Box p={4}>
                    Fiat Lux
                </Box>
                <Spacer />
                <Box p={4}>
                    Button
                </Box>
            </Flex>
            <Flex>
                <Box w={1 / 6} p={4} borderRight="1px" borderRightColor="gray.200">
                    Test 1
                </Box>
                <Box w={2 / 3} p={4} borderRight="1px" borderRightColor="gray.200">
                    <Heading>Fiat Lux</Heading>
                    <form onSubmit={handleSubmit}>
                        <Input
                            label="First Name"
                            type="text"
                            placeholder="Albert"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <Input
                            label="Last Name"
                            type="text"
                            placeholder="Darmawan"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <Box>
                            <HStack>
                                <Box w="100%" fontWeight="semibold">
                                    Table
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
                                <TableCaption>Customise your table</TableCaption>
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
                        <Box>
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
                                        value={listNumber}
                                        onChange={(value) => setListNumber(value)}
                                        min={3}
                                        max={5}
                                    />
                                </VStack>
                            </HStack>
                        </Box>
                        <Box m="24px" align="center">
                            <Button colorScheme="blue" type="submit">Generate PPTX</Button>
                        </Box>
                    </form>
                    {fileName !== '' ? <Button rightIcon={<DownloadIcon />} colorScheme="teal" onClick={() => handleDownload(fileName)}>Download PPTX</Button> : null}
                </Box>
                <Box w={2 / 6} p={4}>
                    Test 3
                </Box>
            </Flex>
        </div>
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
