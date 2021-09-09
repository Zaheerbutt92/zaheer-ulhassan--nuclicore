import React from 'react';
import './styles.css';
import NavBar from './NavBar';
import { Container } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import FormDashboard from '../../features/forms/dashboard/FormDashboard';
import { Route, useLocation } from 'react-router-dom';
import FormDetails from '../../features/forms/details/FormDetails';
import NewForm from '../../features/forms/form/NewForm';


function App() {
  const location = useLocation();

  return (
    <>
      <NavBar />
      <Container fluid style={{ marginTop: "7em" }}>
      <Route exact path="/forms" component={FormDashboard} />
              <Route path="/forms/:id" component={FormDetails} />
              <Route
                key={location.key}
                path={["/createForm", "/modifyForm/:id"]}
                component={NewForm}
              />
      </Container>
    </>
  );
}

export default observer(App);