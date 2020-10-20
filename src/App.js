import Axios from 'axios';
import React, { useState } from 'react';
import CapitalList from './components/CapitalList';
import CapitalSearchForm from './components/CapitalSearchForm'
import DetailedCountry from './components/DetailedCountry';
import { useStore } from './context/MainContext';

function App() {
  const { selectedCapital } = useStore()

  return (

    <div className="container">
      <CapitalSearchForm />
      <main className="row mt-5">
        <div className="col-md-6">
          <CapitalList />
        </div>
        <div className="col-md-6">
          {selectedCapital && <DetailedCountry />}
        </div>
      </main>

    </div>

  );
}

export default App;
