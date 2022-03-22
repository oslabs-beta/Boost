import React from 'react';
import Query from './Query';
import IDE from './IDE';
import Database from './Database';

export default (props) => {
  const { setPage } = props;

  return (
    <div>
      <h3>Navigation Bar</h3>
      <button onClick={() => setPage(<Query />)}>Query</button>
      <button onClick={() => setPage(<IDE />)}>TS IDE</button>
      <button onClick={() => setPage('visual')}>Visuals</button>
      <button onClick={() => setPage(<Database />)}>Database</button>
    </div>
  )
}