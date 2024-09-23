import './App.css';
import Calculator from './Calculator';
import SupportPage from './SupportPage';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
const App = () => {
      

    return (
      <>
      
      <Router>
        <Routes>
          <Route path="/" element={<Calculator />} />
          <Route path="/support" element={<SupportPage />} />
        </Routes>
      </Router>
      </>
    );


  };



export default App
