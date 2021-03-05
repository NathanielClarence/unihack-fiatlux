import React from 'react';
import { useField } from 'formik';
import {
    FormControl, FormLabel, FormErrorMessage, Input,
} from '@chakra-ui/react';

const InputField = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    const { id, name } = props;
    return (
        <FormControl isInvalid={meta.touched && meta.error}>
            <FormLabel htmlFor={id || name}>{label}</FormLabel>
            <Input {...field} {...props} />
            <FormErrorMessage>{meta.error}</FormErrorMessage>
        </FormControl>
    );
};

export default InputField;
