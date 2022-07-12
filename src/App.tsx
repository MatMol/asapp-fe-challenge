import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import  AutoComplete  from "./components/AutoComplete";
import  Favorites  from './components/Favorites';

function App() {
  return (
    <BrowserRouter>
      <Layout>
          <Routes>
              <Route path="/" element={<AutoComplete />} />
              <Route path="/favorites" element={<Favorites />} />
          </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
