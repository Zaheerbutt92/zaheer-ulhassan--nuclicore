import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Divider, Form, Grid, Segment } from "semantic-ui-react";
import { useDrop } from "react-dnd";
import CustomToolBox from "../../toolbox/CustomToolbox";
import Element from "../../elements/Element";
import { useStore } from "../../../app/stores/store";
import { useHistory, useParams } from "react-router";
import { FieldModel } from "../../../app/models/fields";
import { v4 as uuid } from "uuid";
import { orderBy } from "lodash";
import Properties from "../properties/Properties";
import { Form as form } from "../../../app/models/form";

const NewForm = () => {
  const history = useHistory();
  const { formStore } = useStore();
  const { loadForm,updateForm,createForm,loading } = formStore;
  const { id } = useParams<{ id: string }>();
  const [fields, setFields] = useState<FieldModel[]>([]);
  const [form, setFrom] = useState<form>({date:'', fields:[], formData:'',formName:'',id:''});
  const [selectedElement, setSelectedElement] = useState<FieldModel>({
    field_value:'',
    field_id:'',
    position:0,
    field_label:'',
    field_type:'',
    field_placeholder:''
  });

  useEffect(() => {
    if (id) {
      loadForm(id).then((form) => {
        setFields(form?.fields!);
        setFrom(form!);
      });
    }
  }, [id, loadForm]);

  const [{ isOver }, addToFormRef] = useDrop({
    accept: "field",
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });
  const dragHoverFormBG = isOver ? "bg-grey" : "bg-light";
  
  function addField(field_type: string) {
    let newPosition = -1;
      //Accepting field into the form
      const newField: FieldModel = {
        field_id: uuid(),
        field_label: field_type === "text"? "input label" : "Button",
        field_type: field_type,
        position: newPosition,
        field_placeholder:field_type === "text"?  "textbox place holder" : "button",
        field_value: "",
      };
      setFields((fields) => [...fields, newField]);
  }

  function selectPropertiesHandler(field_id:string){
    const element= fields.filter((item)=>{
        return item.field_id === field_id;
      });
    if(element) setSelectedElement(element[0])
  };

  function updateElement(field:FieldModel){
    const index = fields.findIndex(i => i.field_id === field.field_id),
    items = [...fields] 
    items[index] = field;
    setFields(items);
  }

  function deleteElement(field_id:string){
    setFields((fields) => [...fields.filter(x=>x.field_id !== field_id)]);
  }

  function handelFormInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    const { name, value } = event.target;
    setFrom({...form, [name]: value });
  }

  function handleSubmit() {
    if (form.id.length ===0) {
      let newForm = {
        ...form,
        fields: fields,
        formData: JSON.stringify(fields),
        date: new Date(new Date()).toUTCString(),
      };
      createForm(newForm).then(() => history.push(`/forms/${newForm.id}`));
    } else {
      let updatedForm = {
        ...form,
        fields: fields,
        formData: fields.toString(),
        date: new Date(new Date()).toUTCString(),
      };
      updateForm(updatedForm).then(() =>
        history.push(`/forms/${updatedForm.id}`)
      );
    }
  }

  return (
    <Grid>
      <Grid.Column width="4">
        <CustomToolBox addFiedlHandler={addField} />
      </Grid.Column>
      <Grid.Column width="8">
        <Segment className={`${dragHoverFormBG}`}>
          <Form>
            <div style={{ height: "500px" }} ref={addToFormRef}>
              {orderBy(fields, "position").map((element) => (
                <Element
                  key={element.field_id}
                  field={element}
                  updatePropertiesHandler={selectPropertiesHandler}
                />
              ))}
            </div>
          </Form>
        </Segment>
      </Grid.Column>
      <Grid.Column width="4">
        <Properties
          field={selectedElement}
          updateElement={updateElement}
          deleteElement={deleteElement}
        />
        <Divider />
        <Form onSubmit={handleSubmit}>
          <Form.Input
            onChange={handelFormInputChange}
            type="text"
            id="formName"
            name="formName"
            value={form.formName}
            placeholder="Enter form name"
          ></Form.Input>
          <Button loading={loading} disabled={!form.formName} fluid color="blue" type='submit' content="Save Form" />
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default NewForm;
