// UI Library Components
import React, { useState } from 'react';
import {
    Button, Heading, VStack, HStack, Box, useToast,
    NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper,
    Table, Thead, Tbody, Tr, Th, Td, TableCaption, Input,
    Editable, EditableInput, EditablePreview, Flex, IconButton, ButtonGroup,
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon, EditIcon, DownloadIcon } from '@chakra-ui/icons';

// HTTP Request
import axios from 'axios';
import handleDownload from '../utils/handleDownload';

// Custom Components
import { EditValue, InputNumber } from '../components';

export default function Home({ apiUrl }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleSubmit = (event) => {
        alert(JSON.stringify({test: firstName}));
        // const toast = useToast();
        // const values = {
        //     test: 'Test'
        // }
        // axios.post(`${apiUrl}/pptx`, values)
        //     .then((response) => {
        //         setFileName(response.data.fileName);
        //         toast({
        //             title: 'PPTX generated!',
        //             description: `${response.data.fileName} has been successfully generated`,
        //             status: 'success',
        //             duration: 5000,
        //             isClosable: true,
        //         });
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
        event.preventDefault();
    }

    const [fileName, setFileName] = useState('');
    const [rowNumber, setRowNumber] = useState(1);
    const [colNumber, setColNumber] = useState(1);
    const [listNumber, setListNumber] = useState(3);
    const [tableData, setTableData] = useState([[1,2,3,4,5], [6,7,8,9,10]]);
    return (
        <VStack spacing="16px">
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
                    {/* <Box p={4}>
                        {editValue()}
                    </Box> */}
                    <Table variant="striped" colorScheme="teal" size="md">
                        <TableCaption>Customise your table</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>
                                </Th>
                                <Th>
                                </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {tableData.map((itemRow, indexRow) => {
                                return (
                                    <Tr>
                                        {
                                            tableData[indexRow].map((itemCol, indexCol) => {
                                                return (
                                                <Td>
                                                    {/* {itemCol} */}
                                                    {/* {editValue()} */}
                                                    <EditValue 
                                                        initValue="Value"
                                                    />
                                                </Td>)
                                            })
                                        }
                                    </Tr>
                                )
                            })}
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
        </VStack>
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
