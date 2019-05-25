import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import HomePage from '../HomePage/Loadable';

import './App.scss';

const AppWrapper = styled.div`
  min-height: 100%;
`;

class App extends React.PureComponent {
  render() {
    return (
      <AppWrapper>
        <Helmet titleTemplate="%s - Живой дом" defaultTitle="Живой дом" />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="" component={NotFoundPage} />
          </Switch>
      </AppWrapper>
    );
  }
}

export default App;
