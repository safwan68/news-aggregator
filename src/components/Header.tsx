import React, { CSSProperties } from 'react';

const Header: React.FC = () => {
  return (
    <header style={headerStyle}>
      <h1 style={headerTextStyle}>News Aggregator</h1>
    </header>
  );
};

const headerStyle: CSSProperties = {
  backgroundColor: '#edf2fa',
  boxShadow: '0px 4px 2px -3px gray', 
  padding: '1rem',
  textAlign: 'center',
  marginBottom: '0.2rem',
};

const headerTextStyle: CSSProperties = {
  margin: 0,
  fontSize: '2rem',
  fontWeight: 'bold',
};

export default Header;
