import React, {useState} from 'react'
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'

import {Home} from './pages/Home'
import {AddForm} from './pages/AddForm'
import {EditForm} from './pages/EditForm'
import {Navbar} from './components/Navbar'
import {FirebaseState} from './context/firebase/firebaseState'
import {Login} from './pages/Login'

function App() {
  const userAuth = localStorage.getItem('isLogin')
  const [isLogin, setLogin] = useState(!!userAuth)

  return (
    <FirebaseState>
      <BrowserRouter>
        {isLogin && <Navbar setLogin={setLogin} />}
        <div className="container pt-4">
          {
            isLogin
            ? (<Switch>
              <Route path={'/'} exact component={Home} />
              <Route path={'/add_product'} component={AddForm} />
              <Route path={'/edit/:id'} render={(matchProps) =>
                  <EditForm
                    {...matchProps}
                  />
              }/>
              <Redirect to={'/'} />
            </Switch>)
            : (
              <Switch>
                <Route path={'/login'}>
                  <Login setLogin={setLogin} />
                </Route>
                <Redirect to={'/login'} />
              </Switch>
            )
          }
          
        </div>
      </BrowserRouter>
    </FirebaseState>
  );
}

export default App;
