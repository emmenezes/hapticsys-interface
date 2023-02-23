import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import Home from '../pages/Home';
import Editor from '../pages/Editor';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" exact />
        <Route element={<Editor />} path="/editor" exact />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
