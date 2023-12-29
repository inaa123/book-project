import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import MyBook from './pages/MyBook';
import Phrase from './pages/Phrase';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';

const root = ReactDOM.createRoot(document.getElementById('root'));

//const routes = createBrowserRouter([
const routes = createBrowserRouter([
  {
    path : '/', 
    element : <App/>,
    errorElement : <ErrorPage />,

    children : [
      {path : '/login', element : <LogIn/>},
      {path : '/signup', element : <SignUp/>},
      {path : '/mybook' , element : <MyBook/>},
      {path : '/phrase', element : <Phrase/>},
    ]
  }
])

root.render(
  <React.StrictMode>
    <RouterProvider router={routes}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
