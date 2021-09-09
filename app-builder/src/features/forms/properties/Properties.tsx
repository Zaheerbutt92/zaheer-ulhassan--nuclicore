import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Card, Divider, Form } from "semantic-ui-react";
import { FieldModel } from "../../../app/models/fields";

interface Props{
    field:FieldModel;
    updateElement : (field:FieldModel) => void;
    deleteElement : (field_id:string) => void;
}

export default function Properties ({field,updateElement,deleteElement}:Props){
    const [properties,setProperties] = useState({
        field_id: '',
        field_placeholder: '',
        field_type: '',
        field_label: '',
        field_value: '',
        position: 0
    });

    useEffect(() => {
        if (field) {
            setProperties({field_id: field.field_id,
                field_placeholder: field.field_placeholder!,
                field_type: field.field_type,
                field_label: field.field_label,
                field_value: field.field_value! ,
                position: field.position});
          }
      }, [field]);
    
    function handelInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name, value} = event.target;
        setProperties({...properties, [name]: value});
    }

    function handleSubmit(){
        updateElement(properties);
        setProperties({
            field_id: '',
            field_placeholder: '',
            field_type: '',
            field_label: '',
            field_value: '',
            position: 0
        })
     }

     function handleDelete(){
        deleteElement(properties.field_id);
        setProperties({
            field_id: '',
            field_placeholder: '',
            field_type: '',
            field_label: '',
            field_value: '',
            position: 0
        })
     }
    
    return (
      <Card fluid>
        <Card.Content>
          <Card.Header className="">Properties</Card.Header>
          <Divider />
          <Form onSubmit={handleSubmit} autoComplete="off">
            <Form.Field>
              <label>label</label>
              <Form.Input
                type="text"
                placeholder=""
                name="field_label"
                value={properties.field_label}
                onChange={handelInputChange}
              />
            </Form.Field>
            {(properties.field_type ==='text')?
              <Form.Field>
                <label>placeholder</label>
                <input
                  type="text"
                  placeholder=""
                  name="field_placeholder"
                  value={properties.field_placeholder}
                  onChange={handelInputChange}
                />
              </Form.Field>
              :
              null
            }
            {/* <Form.Field>
              <label>position</label>
              <input
                type="text"
                placeholder=""
                name="position"
                value={properties.position}
                onChange={handelInputChange}
              />
            </Form.Field> */}
            <Card.Content textAlign="center">
              <Button
                disabled={!properties.field_id}
                color="blue"
                positive
                type="submit"
                content="Update"
              />
              <Button
                disabled={!properties.field_id}
                onClick={handleDelete}
                color="red"
                content="Delete"
              />
            </Card.Content>
          </Form>
        </Card.Content>
      </Card>
    );
}