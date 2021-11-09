import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import PrivateRoute from './routes/PrivateRoute'
import PublicRoute from './routes/PublicRoute'
import './App.css'
import './scss/style.scss'
import 'bootstrap/dist/css/bootstrap.min.css'


const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const TrucksList = React.lazy(() => import('./views/pages/trucksList/TrucksList'))
const Home = React.lazy(() => import('./views/pages/home/Home'))
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const App = () => {
    return (
      <HashRouter>
          <React.Suspense fallback={loading}>
            <Switch>
              <PublicRoute exact path="/" name="Home" component={Home} restricted={false} />
              <PublicRoute
                exact
                path="/trucks"
                name="Home"
                component={TrucksList}
                restricted={false}
              />
              <PublicRoute
                exact
                path="/login"
                name="Login Page"
                component={Login}
                restricted={true}
              />
              <PublicRoute
                restricted={true}
                exact
                path="/register"
                name="Register Page"
                component={Register}
              />
              <Route exact path="/404" name="Page 404" render={(props) => <Page404 {...props} />} />
              <Route exact path="/500" name="Page 500" render={(props) => <Page500 {...props} />} />
              <PrivateRoute path="/dashboard" name="Dashboard" component={DefaultLayout} />
            </Switch>
          </React.Suspense>
      </HashRouter>
    )
  }

export default App
