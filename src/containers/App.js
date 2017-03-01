import React, { Component } from 'react';

import Router from 'react-router-dom/BrowserRouter'
import Route from 'react-router-dom/Route'
import Link from 'react-router-dom/Link';

import asyncComponent from 'helpers/async-component';

const Home = asyncComponent(() =>
  System.import('./routes/Home').then(module => module.default)
);
const Foo = asyncComponent(() =>
  System.import('./routes/Foo').then(module => module.default)
);
const Bar = asyncComponent(() =>
  System.import('./routes/Bar').then(module => module.default)
);

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/foo">Foo</Link></li>
                        <li><Link to="/bar">Bar</Link></li>
                    </ul>

                    <hr />

                    <Route exact path="/" component={Home} />
                    <Route path="/foo" component={Foo} />
                    <Route path="/bar" component={Bar} />
                </div>
            </Router>
        );
    }
}

export default App;
