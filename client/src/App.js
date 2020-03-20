import React from "react";
import { Button } from "antd";
import { Provider } from "react-redux";
import { configStore, getHistory } from "./containers/configStore";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { GlobalStyles } from "./components/GlobalStyles";
import Layout from "./containers/Layout";
import Board from "./containers/BoardPage";
import BoardForm from "./containers/BoardPage/form";
import Signin from "./containers/AuthPage/Signin";
import Signup from "./containers/AuthPage/Signup";
import PrivateRoute from "./containers/utils/PrivateRoute";
import AuthRoute from "./containers/utils/AuthRoute";

const store = configStore();

const HomePage = () => {
    return (
        <div>
            This is home page{" "}
            <Button>
                <Link to="/board">Go to Borad Page</Link>
            </Button>
        </div>
    );
};
function App() {
    
        return (
            <Provider store={store}>
                <ConnectedRouter history={getHistory()}>
                    <Switch>
                        <AuthRoute path="/signin" exact ><Signin/></AuthRoute>
                        <AuthRoute path="/signup" exact><Signup/></AuthRoute>

                        <Layout>
                            <PrivateRoute path="/board" exact>
                                <Board />
                            </PrivateRoute>
                            <PrivateRoute path="/board/new" exact>
                                <BoardForm />
                            </PrivateRoute>
                            <PrivateRoute path="/" exact>
                                <HomePage />
                            </PrivateRoute>
                        </Layout>
                    </Switch>
                </ConnectedRouter>
                <GlobalStyles />
            </Provider>
        );
}

export default App;
