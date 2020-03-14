import React from 'react';
import { Button } from 'antd';
import { Provider } from 'react-redux';
import { configStore, getHistory } from './containers/configStore';
import Board from './containers/BoardPage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { ConnectedRouter } from 'connected-react-router';
import { GlobalStyles } from './components/GlobalStyles';
import Layout from './containers/Layout';

const store = configStore()

const HomePage = () => {
  return <div>This is home page <Button><Link to="/board">Go to Borad Page</Link></Button></div>
}
function App() {
  return (
      <Provider store={store}>
          <ConnectedRouter history={getHistory()}>
                  <Layout>
                      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                      <Switch>
                          <Route path="/board" exact component={Board} />
                          <Route path="/" exact component={HomePage} />
                      </Switch>
                  </Layout>
          </ConnectedRouter>
          <GlobalStyles />
      </Provider>
  );
}


export default App;
