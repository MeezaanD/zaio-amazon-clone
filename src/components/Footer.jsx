import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>© 2025 Amazon Clone. All rights reserved.</p>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#282c34',
    color: 'white',
    padding: '10px 0',
    position: 'fixed',
    bottom: 0,
    width: '100%',
    textAlign: 'center',
  },
  text: {
    margin: 0,
    fontSize: '14px',
  },
};

export default Footer;