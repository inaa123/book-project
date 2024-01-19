
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import GlobalStyle from './style/GlobalStyles';
import { QueryClient, QueryClientProvider } from 'react-query';
import Home from './pages/Home';

const queryClient = new QueryClient();

function App() {
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <GlobalStyle/>
      <Nav/>
      
      <Routes>
        {/* <Route path='/' element = { <Main/> }/> */}
        <Route path='/' element = { <Home/> }/> 
      </Routes>

      <Outlet/>
      </QueryClientProvider>
    </>
  );
}

export default App;
