// UI Library Components
import React, { useState } from 'react';
import {
    Button, Heading, VStack, HStack, Box, useToast,
    NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper,
    Table, Thead, Tbody, Tr, Th, Td, TableCaption,
    Editable, EditableInput, EditablePreview, Flex, IconButton, ButtonGroup

} from '@chakra-ui/react';
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import { DownloadIcon } from '@chakra-ui/icons';

// Form Validation
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

// HTTP Request
import axios from 'axios';
import fileDownload from 'js-file-download';

// Firebase Config
import firebase from 'firebase/app';
import 'firebase/storage';

// Custom Components
import { InputField } from '../components';

const firebaseConfig = {
    apiKey: 'AIzaSyDCsbGBCMX5kjiWjc_zXpiQaexBT_gCC9Y',
    authDomain: 'unihack-fiatlux.firebaseapp.com',
    projectId: 'unihack-fiatlux',
    storageBucket: 'unihack-fiatlux.appspot.com',
    messagingSenderId: '668936761557',
    appId: '1:668936761557:web:d78decde68b1ea09b7b25c'
};

function handleDownload(fileName) {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app();
    }
    const storageRef = firebase.storage().ref();
    const pptxRef = storageRef.child(fileName);
    pptxRef.getDownloadURL()
        .then((url) => {
            axios.get(url, {
                responseType: 'blob',
            })
                .then((res) => {
                    fileDownload(res.data, fileName);
                });
        })
        .catch((error) => {
            console.log(error);
        });
}

function editValue(){
    function EditableControls({ isEditing, onSubmit, onCancel, onEdit }) {
        return isEditing ? (
            <ButtonGroup justifyContent="center" size="sm">
                <IconButton icon={<CloseIcon />} onClick={onCancel} />
                <IconButton icon={<CheckIcon />} onClick={onSubmit} />
            </ButtonGroup>
        ) : (
                <Flex justifyContent="center">
                    <IconButton size="sm" icon={<EditIcon />} onClick={onEdit} />
                </Flex>
            )
    }

    return (
        <Editable
            textAlign="center"
            defaultValue="Value"
            isPreviewFocusable={false}
            submitOnBlur={false}
        >
            {(props) => (
                <>
                    <HStack>
                        <EditablePreview />
                        <EditableInput />
                        <EditableControls {...props} />
                    </HStack>
                </>
            )}
        </Editable>
    )
}

function createTable(row, column) {
    
}

export default function Home({ apiUrl }) {
    const [fileName, setFileName] = useState('');
    const [rowNumber, setRowNumber] = useState(1);
    const [colNumber, setColNumber] = useState(1);
    const [tableData, setTableData] = useState([[1,2,3,4,5], [6,7,8,9,10]]);
    const toast = useToast();
    return (
        <VStack spacing="16px">
            <Heading>Fiat Lux</Heading>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                }}
                validationSchema={Yup.object({
                    firstName: Yup.string()
                        .max(15, 'Must be 15 characters or less')
                        .required('Required'),
                    lastName: Yup.string()
                        .max(20, 'Must be 20 characters or less')
                        .required('Required'),
                })}
                onSubmit={(values) => {
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
                }}
            >
                <Form>
                    <InputField
                        label="First Name"
                        name="firstName"
                        type="text"
                        placeholder="Albert"
                    />
                    <InputField
                        label="Last Name"
                        name="lastName"
                        type="text"
                        placeholder="Darmawan"
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
                                <NumberInput
                                    value={rowNumber}
                                    onChange={(value) => setRowNumber(value)}
                                    min={1}
                                    max={20}
                                >
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </VStack>
                            <VStack>
                                <Box>
                                    <h3>Column</h3>
                                </Box>
                                <NumberInput
                                    value={colNumber}
                                    onChange={(value) => setColNumber(value)}
                                    min={1}
                                    max={20}
                                >
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </VStack>
                        </HStack>
                        <Box p={4}>
                            {editValue()}
                        </Box>
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
                                                        {editValue()}
                                                    </Td>)
                                                })
                                            }
                                        </Tr>
                                    )
                                })}
                            </Tbody>
                        </Table>
                    </Box>
                    <Box m="24px" align="center">
                        <Button colorScheme="blue" type="submit">Generate PPTX</Button>
                    </Box>
                </Form>
            </Formik>
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
