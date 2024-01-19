import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import MyBook from './pages/MyBook';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import DetailBook from './pages/DetailBook';
import Reviews from './pages/Reviews';
import WriteReview from './pages/WriteReview';
import DetailReview from './pages/DetailReview';
import { onUserState } from './api/firebase';
import Nav from './components/Nav';

const root = ReactDOM.createRoot(document.getElementById('root'));

const ProtectRouter = ({checkUser, children}) => {
  const [user, setUser] = useState();

  useEffect(()=>{
   onUserState((user) => setUser(user)) 
  }, [])

  if(user && checkUser){
    return <Navigate to='/' replace/>
  }
  return children
}

const routes = createBrowserRouter([
  {
    path : '/', 
    element : <App/>,
    errorElement : <ErrorPage />,

    children : [
      {path : '/login', element : <LogIn/>},
      {path : '/signup', element : <SignUp/>},
      {path : '/mybook/:id' , element : <MyBook/>},
      {path : '/book/detail/:id', element : <DetailBook/>},
      {path : '/review', element : <Reviews/>},
      {path : '/review/write/:id', element : <WriteReview/>},
      {path : '/review/detail/:id', element : <DetailReview/>},
      // {path : '/search', element : <Search/>}
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
