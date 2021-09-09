import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import ActivityList from "./FormList";

function FromDashboard() {
  const { formStore } = useStore();
  const { loadForms, formRegistry } = formStore;

  useEffect(() => {
    if (formRegistry.size <= 1) loadForms();
  }, [formRegistry.size, loadForms]);

  if (formStore.loadingInitial)
    return <LoadingComponent content="Loading app" />;

  return (
    <Grid>
      <Grid.Column width="16">
        <ActivityList />
      </Grid.Column>
    </Grid>
  );
}

export default observer(FromDashboard);
