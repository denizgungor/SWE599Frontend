import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Input from './input';
import Main from './Main';
import Forecast from './forecast';

import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from "react-router-dom";

/*ReactDOM.render(<App />, document.getElementById('root'));*/

ReactDOM.render(
<Router>
      <div>
        <Route exact path="/" component={Main} />
        <Route exact path="/sprint" component={Input} />
        <Route path="/graph" component={App} />
        <Route path="/forecast" component={Forecast} />

      </div>
  </Router> , document.getElementById('root'));
serviceWorker.unregister();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
/*serviceWorker.unregister();
*/