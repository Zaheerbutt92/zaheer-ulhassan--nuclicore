import React from 'react'
import { Button } from 'semantic-ui-react'

interface Props{
    field_id:string;
    field_label:string;
    field_placeholder?:string;
    field_value?:string;
    updatePropertiesHandler: (field_id:string) => void;
}

function FormButton({ field_id, field_label, field_placeholder, field_value,updatePropertiesHandler}: Props)
{
    return (
        <Button onClick={()=>{updatePropertiesHandler(field_id)}}  className="btnEl" positive type="submit" content={field_label} />
    );
}

export default FormButton