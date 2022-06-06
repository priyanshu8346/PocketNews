import './App.css';
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LoadingBar from 'react-top-loading-bar';
import News from './components/News';
import { HashRouter as Router, Routes, Route } from "react-router-dom";

const categories = [
  'business',
  'entertainment',
  'general',
  'health',
  'sports',
  'technology',
  'science'
]
const App = () => {
  const api = 'oh__va_kvNPcxk7aO4wHucNH5YRdtrJmt3Z3nWSqGHg';
  // "4e4f45ad8dee4db5a1cebcf6d204b476";

  const [progress, setProgress] = useState(0);
  const set = (element) => {
    setProgress(element);
  }

  return (
    <div>
      <Router>
        <Navbar />
        <LoadingBar
          color='#f11946'
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
        <Routes>
          <Route path="/*">
            <Route index element={< News setProgress={set} api={api} key={'Home'} pageSize={5} category={'general'} country={'in'} />} />
            {
              categories.map(category => {
                return <Route exact path={category} key={category} element={< News setProgress={set} api={api} key={category} pageSize={5} category={category} country={'in'} />} />
              })
            }
          </Route>
        </Routes>

      </Router>
    </div>);

}
export default App;