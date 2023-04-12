import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import Home from '../pages/Home';
import Editor from '../pages/Editor';
import Library from '../pages/Library';
import { EditorProvider } from '../context/EditorContext';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" exact />
        <Route
          element={
            <EditorProvider>
              <Editor />
            </EditorProvider>
          }
          path="/editor"
          exact
        />
        <Route element={<Library />} path="/library" exact />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
