import React from 'react';
import Header from '../Header';
import STYLES from './App.scss';
import ListComponent from './flights/ListComponent';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const App = () => (
  <div className={getClassName('App')}>
    <Header />
    <main className={getClassName('App__main')}>
      {/* ListComponent to display the list of itineraries */}
      <ListComponent />
    </main>
  </div>
);

export default App;
