import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Purchases from './pages/Purchases';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Purchases} />
        
      </Switch>
    </BrowserRouter>
  );
}