import React from 'react';
import {
    Editable, EditableInput, EditablePreview, Flex, IconButton, ButtonGroup, HStack,
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';

const EditValue = ({ ...restProps }) => {
    function EditableControls({
        isEditing, onSubmit, onCancel, onEdit,
    }) {
        return isEditing ? (
            <ButtonGroup justifyContent="center" size="sm">
                <IconButton icon={<CloseIcon />} onClick={onCancel} />
                <IconButton icon={<CheckIcon />} onClick={onSubmit} />
            </ButtonGroup>
        ) : (
            <Flex justifyContent="center">
                <IconButton size="sm" icon={<EditIcon />} onClick={onEdit} />
            </Flex>
        );
    }

    return (
        <Editable
            textAlign="center"
            isPreviewFocusable={false}
            submitOnBlur={false}
            {...restProps}
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
    );
};

export default EditValue;
