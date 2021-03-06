// UI Library Components
import React, { useState } from 'react';
import {
    Button, Heading, VStack, HStack, Box,
    Table, Thead, Tbody, Tr, Th, Td, TableCaption, Input, useToast,
    Flex, Spacer, Center, Text, Select, FormControl, FormLabel, useColorMode, IconButton,
} from '@chakra-ui/react';
import {
    DownloadIcon, RepeatIcon, AddIcon, DeleteIcon, MoonIcon, SunIcon,
} from '@chakra-ui/icons';

// HTTP Request
import axios from 'axios';
import handleDownload from '../utils/handleDownload';

// Custom Components
import { EditValue, ImageSlider, Card } from '../components';

const ICONS_URL = {
    publicLight: 'https://res.cloudinary.com/doeq4duhf/image/upload/v1615011593/baseline_public_white_48dp_zesoji.png',
    publicDark: 'https://res.cloudinary.com/doeq4duhf/image/upload/v1615011576/baseline_public_black_48dp_orhbij.png',
    phoneLinkLight: 'https://res.cloudinary.com/doeq4duhf/image/upload/v1615011552/baseline_phonelink_white_48dp_foug8j.png',
    phoneLinkDark: 'https://res.cloudinary.com/doeq4duhf/image/upload/v1615011564/baseline_phonelink_black_48dp_f6avox.png',
    laptopLight: 'https://res.cloudinary.com/doeq4duhf/image/upload/v1615011538/baseline_laptop_white_48dp_oqacb7.png',
    laptopDark: 'https://res.cloudinary.com/doeq4duhf/image/upload/v1615011524/baseline_laptop_black_48dp_quz8md.png',
    feedLight: 'https://res.cloudinary.com/doeq4duhf/image/upload/v1615011504/baseline_feed_white_48dp_pyliek.png',
    feedDark: 'https://res.cloudinary.com/doeq4duhf/image/upload/v1615011517/baseline_feed_black_48dp_zanbbn.png',
    settingsLight: 'https://res.cloudinary.com/doeq4duhf/image/upload/v1615011420/baseline_settings_white_48dp_lhdd0v.png',
    settingsDark: 'https://res.cloudinary.com/doeq4duhf/image/upload/v1615011408/baseline_settings_black_48dp_kmockt.png',
    sportsKabaddiLight: 'https://res.cloudinary.com/doeq4duhf/image/upload/v1615011381/baseline_sports_kabaddi_white_48dp_t2vg6h.png',
    sportsKabaddiDark: 'https://res.cloudinary.com/doeq4duhf/image/upload/v1615011347/baseline_sports_kabaddi_black_48dp_hck911.png',
    paymentLight: 'https://res.cloudinary.com/doeq4duhf/image/upload/v1615011028/baseline_payment_white_48dp_h2vujo.png',
    paymentDark: 'https://res.cloudinary.com/doeq4duhf/image/upload/v1615010867/baseline_payment_black_48dp_yg02x5.png',
};

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
    const [isButtonLoading, setIsButtonLoading] = useState(false);
    const [fileName, setFileName] = useState('');
    const [imageSource, setImageSource] = useState('https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg');
    const [title, setTitle] = useState('');
    const [slideType, setSlideType] = useState('CHEVRON');
    const toast = useToast();
    const { colorMode, toggleColorMode } = useColorMode();

    // List
    // const [listElement, setListElement] = useState(3);
    const [chevronData, setChevronData] = useState([
        {
            heading: 'Heading 1',
            subheading: 'Subheading 1',
            iconName: ICONS_URL.publicLight,
        },
        {
            heading: 'Heading 2',
            subheading: 'Subheading 2',
            iconName: ICONS_URL.publicLight,
        },
        {
            heading: 'Heading 3',
            subheading: 'Subheading 3',
            iconName: ICONS_URL.publicLight,
        },
        {
            heading: 'Heading 4',
            subheading: 'Subheading 4',
            iconName: ICONS_URL.publicLight,
        },
    ]);
    const MIN_CHEVRON_ITEM = 4;
    const MAX_CHEVRON_ITEM = 6;

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
            iconName: ICONS_URL.publicLight,
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
        event.preventDefault();
        setFileName('');
        setIsButtonLoading(true);
        const body = chevronData;
        // if (slideType === 'GANTT') {
        //     body = ganttData;
        // }
        const values = {
            title,
            slideType,
            body,
        };
        // alert(JSON.stringify(values));
        axios.post(`${apiUrl}/pptx`, values)
            .then((response) => {
                setFileName(response.data.fileName);
                setIsButtonLoading(false);
                toast({
                    title: 'Slides successfully generated!',
                    description: 'You can download your slide by clicking the Download Slides button',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
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
                    {colorMode === 'light'
                        ? (<IconButton aria-label="Dark mode" icon={<MoonIcon />} onClick={toggleColorMode} />)
                        : (<IconButton aria-label="Light mode" icon={<SunIcon />} onClick={toggleColorMode} />
                        )}
                </Box>
                <Box p={4}>
                    <Button
                        isLoading={isButtonLoading}
                        loadingText="Crafting your slides..."
                        colorScheme="blue"
                        type="submit"
                        rightIcon={<RepeatIcon />}
                    >
                        Generate Slides
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
                    {slideType === 'CHEVRON' ? chevronData.map((item, index) => (
                        <Box
                            lineHeight="1.2"
                            transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                            border="1px"
                            p="12px"
                            borderRadius="6px"
                            fontSize="14px"
                            fontWeight="semibold"
                            borderColor="#ccd0d5"
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
                                <FormLabel>{`Icon Name ${index + 1}`}</FormLabel>
                                <Select
                                    value={item.iconName}
                                    onChange={(e) => handleChevronDataChange(e.target.value, 2, index) }
                                >
                                    {Object.keys(ICONS_URL).map((key) => (
                                        <option value={ICONS_URL[key]}>{key}</option>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    )) : null}
                    {slideType === 'CHEVRON' ?
                        (
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
                        ) : null}
                    {/* Chevron Components (End) */}
                </Box>
                {/* RIGHT SIDE - PREVIEW */}
                <Box w={2 / 6} p={4}>
                    <Center>
                        <Text fontSize="lg" fontWeight="bold">Preview</Text>
                    </Center>
                    <ImageSlider images={[imageSource]} />
                    <Center>
                        <Box p={16}>
                            {fileName !== '' ? <Button rightIcon={<DownloadIcon />} colorScheme="teal" onClick={() => handleDownload(fileName)}>Download Slides</Button> : null}
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
