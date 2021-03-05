import React from 'react';
import { useField } from 'formik';
import {
    FormControl, FormLabel, FormErrorMessage, Select,
} from '@chakra-ui/react';

const Dropdown = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    const { id, name } = props;
    return (
        <FormControl isInvalid={meta.touched && meta.error}>
            <FormLabel htmlFor={id || name}>{label}</FormLabel>
            <Select {...field} {...props} />
            <FormErrorMessage>{meta.error}</FormErrorMessage>
        </FormControl>
    );
};

export default Dropdown;
