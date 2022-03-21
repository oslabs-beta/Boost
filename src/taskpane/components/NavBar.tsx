import React from 'react';

export default (props) => {
  const { setPage } = props;

  return (
    <div>
      <h3>Navigation Bar</h3>
      <button onClick={() => setPage('query')}>Query</button>
      <button onClick={() => setPage('ide')}>TS IDE</button>
      <button onClick={() => setPage('visual')}>Visuals</button>
      <button onClick={() => setPage('database')}>Database</button>
    </div>
  )
}