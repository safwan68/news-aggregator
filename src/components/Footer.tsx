import React, { CSSProperties } from 'react';

const Footer: React.FC = () => {
  return (
    <footer style={footerStyle}>
      <p style={footerTextStyle}>© 2024 News Aggregator. All Rights Reserved.</p>
      <p style={footerTextStyle}>Developed by Mohammed Safwan</p>
    </footer>
  );
};

const footerStyle: CSSProperties = {
  backgroundColor: '#edf2fa', 
  padding: '1rem',
  textAlign: 'center',
  boxShadow: '0px -4px 2px -3px gray',
  position: 'relative',
  bottom: 0,
};

const footerTextStyle: CSSProperties = {
  margin: '0.2rem',
  fontSize: '1rem',
  color: '#333',
};

export default Footer;
