import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Container, Divider, Form, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import Element from "../../elements/Element";
import { orderBy } from "lodash";

function FormDetails() {
  const { formStore } = useStore();
  const { selectedForm: form, loadForm, loadingInitial } = formStore;
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) loadForm(id);
  }, [id, loadForm]);

  if (loadingInitial || !form)
    return <LoadingComponent content="Form loading..." />;

  return (
    <Container>
      <Button
        as={Link}
        to={`/modifyForm/${form.id}`}
        floated="right"
        color='blue'
        content="Modify Form"
      />
      <h2>{form.formName}</h2>
      <Divider />
      <Segment>
        <Form>
          {orderBy(form.fields, "position").map((field) => (
            <Element
              key={field.field_id}
              field={field}
              updatePropertiesHandler={() => {}}
            />
          ))}
        </Form>
      </Segment>
    </Container>
  );
}

export default observer(FormDetails);
