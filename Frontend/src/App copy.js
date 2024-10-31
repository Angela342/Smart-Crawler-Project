import React from 'react';
import UrlTable from './components/UrlTable';
import './App.css'; // Import your App-level CSS here if needed

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Smart Crawler</h1>
            </header>
            <main>
                <UrlTable />
            </main>
        </div>
    );
}

export default App;
