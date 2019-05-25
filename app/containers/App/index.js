import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import Service from '../Service';
import HomePage from '../HomePage/Loadable';

import { LeftSidebar } from './components/LeftSidebar';
import './App.scss';

const AppWrapper = styled.div`
  min-height: 100%;
`;

const mainMenuItems = ['ORDERS', 'CATALOGUE', 'SETTINGS'];
const pages = [
  HomePage,
  Service,
  HomePage,
]

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeSlide: 0,
    };
  }

  onMenuClick = event => {
    event.preventDefault();
    this.setState({ activeSlide: parseInt(event.target.dataset.key) });
  };

  render() {
    const page = pages[this.state.activeSlide]

    return (
      <AppWrapper>
        <Helmet titleTemplate="%s - Живой дом" defaultTitle="Живой дом" />
        <div className="layout-wrapper">
          <LeftSidebar
            items={mainMenuItems}
            onClick={this.onMenuClick}
            activeSlide={this.state.activeSlide}
            className="left-sidebar"
          />
          <div className="region-content">
            <Switch>
              <Route exact path="/" component={page} />
              <Route path="" component={NotFoundPage} />
            </Switch>
          </div>
        </div>
      </AppWrapper>
    );
  }
}

export default App;
