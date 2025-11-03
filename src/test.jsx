import React from 'react';

export default function Test() {
  return (
    <div style={{ padding: '50px', fontFamily: 'Arial' }}>
      <h1>✅ App is Loading Correctly!</h1>
      <p>If you see this, React is working</p>
      <button onClick={() => alert('Clicked!')}>
        Click me to test interactivity
      </button>
    </div>
  );
}

