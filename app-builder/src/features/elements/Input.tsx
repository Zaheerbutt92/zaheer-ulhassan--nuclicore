import React from 'react'
import { Form } from 'semantic-ui-react'

interface Props{
    field_id:string;
    field_label:string;
    field_placeholder?:string;
    field_value?:string;
    updatePropertiesHandler: (field_id:string) => void;
}

function Input({ field_id, field_label, field_placeholder, field_value,updatePropertiesHandler }: Props)
{
    return (
      <div className="textEl" onClick={() => {updatePropertiesHandler(field_id)}}>
        <Form.Field>
          <label htmlFor={field_id}>{field_label}</label>
          <input readOnly className="textEl" 
            onChange={()=>{}}
            type="text"
            id={field_id}
            name={field_id}
            value={field_value}
            placeholder={field_placeholder ? field_placeholder : ""}
          />
        </Form.Field>
      </div>
    );
}

export default Input