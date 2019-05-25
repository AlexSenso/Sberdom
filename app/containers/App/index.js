/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import HomePage from 'containers/HomePage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';

import './App.scss';

const AppWrapper = styled.div`
  min-height: 100%;
`;

function App() {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - Овсянка"
        defaultTitle="Доставка правильной еды в Омске"
      >
        <meta
          name="description"
          content="Полезная и вкусная еда без сахара, без ГМО с доставкой в Омске. Правильный рацион питания на каждый день, заказ 8 (913)-6-288-557"
        />
      </Helmet>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/features" component={FeaturePage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
      <Footer />
    </AppWrapper>
  );
}

export default App;
