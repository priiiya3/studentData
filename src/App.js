import HomeScreen from "./components/home";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';

// Bring in the GoogleLogin
// component from the library
function App() {

  return (
      <div className="App">
          <Router>
        <Routes>
            <Route expath path = '/home' element={<HomeScreen/>} />
            <Route expath path = '/' element={<Login/>} />
        </Routes>
        </Router>
      </div>
  );
}

export default App;
