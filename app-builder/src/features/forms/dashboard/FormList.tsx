import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";


function FormList() {
  const [target,setTarget] = useState('');
  const {formStore} = useStore();
  const {formsByDate,deleteForm,loading} = formStore;

  function handleFormDelete(e:SyntheticEvent<HTMLButtonElement>, id:string){
    setTarget(e.currentTarget.name);
    deleteForm(id);
  }


  if (formsByDate.length<=0) {
    return (
      <Container>
        <Segment>
          <h3>No Forms!</h3>
          <p>new forms will appear in list</p>
        </Segment>
      </Container>
    )
  }

  return (
    <Container>
      <Segment>
      <Item.Group divided>
        {formsByDate.map((form) => (
          <Item key={form.id}>
            <Item.Content>
              <Item.Header as="a">{form.formName}</Item.Header>
              <Item.Extra>
                <Button
                  as={Link}
                  to={`/forms/${form.id}`}
                  floated="right"
                  content="View"
                  color="blue"
                />
                <Button
                  name={form.id}
                  loading={loading && target === form.id}
                  onClick={(e) => handleFormDelete(e, form.id)}
                  floated="right"
                  content="Delete"
                  color="red"
                />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
      </Segment>
    </Container>
  );
}

export default observer(FormList);