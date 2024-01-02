
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import GlobalStyle from './style/GlobalStyles';
import Search from './components/Search';

function App() {
  return (
    <>
      <GlobalStyle/>
      <Nav/>
      
      <Routes>
        <Route path='/' element = {<Search/>}/>
      </Routes>

      <Outlet/>
    </>
  );
}

export default App;
