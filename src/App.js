import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import PrivateRoute from "./components/PrivateRouter";
import SignInForm from "./components/SignInForm";
import AuthPage from "./pages/AuthPage"
import "./styles/globalStyle.css"

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={AuthPage} exact />
        <PrivateRoute path="/main" component={SignInForm} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
