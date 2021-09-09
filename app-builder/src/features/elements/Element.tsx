import React from 'react'
import { FieldModel } from '../../app/models/fields';
import FormButton from './Button';
import Input from './Input';

interface Props{
    field:FieldModel,
    updatePropertiesHandler: (field_id:string) => void;
}
function Element({field:{field_type, field_id, field_label, field_placeholder, field_value},updatePropertiesHandler}: Props)
{
    switch (field_type) {
        case 'text':
            return ( <Input
                field_id={field_id}
                field_label={field_label}
                field_placeholder={field_placeholder}
                field_value={field_value}
                updatePropertiesHandler={updatePropertiesHandler}
            />)
        case 'button':
            return (<FormButton
                field_id={field_id}
                field_label={field_label}
                field_placeholder={field_placeholder}
                field_value={field_value}
                updatePropertiesHandler={updatePropertiesHandler}

            />)
        default:
            return null;
    }
}

export default Element