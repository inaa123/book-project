
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import GlobalStyle from './style/GlobalStyles';
import Search from './components/Search';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <GlobalStyle/>
      <Nav/>
      
      <Routes>
        <Route path='/' element = {<Search/>}/>
      </Routes>

      <Outlet/>
      </QueryClientProvider>
    </>
  );
}

export default App;
