import {Link, Route, Switch} from 'react-router-dom';
import React from "react";
import Loadable from 'react-loadable';
import {Spin} from 'antd';

const List = Loadable({loader: () => import('../pages/NodeList'), loading: () => <Spin/>});
const NodeForm = Loadable({loader: () => import('../pages/NodeForm'), loading: () => <Spin/>});

export default () =>
    <div>
        <ul>
            <li>
                <Link to="/">Form</Link>
            </li>
            <li>
                <Link to="/list">List</Link>
            </li>
        </ul>
        <Switch>
            <Route exact path="/" component={NodeForm}/>
            <Route path="/list" component={List}/>
        </Switch>
    </div>
