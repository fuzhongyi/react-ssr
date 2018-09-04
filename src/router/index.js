import {NavLink as Link, Switch} from 'react-router-dom';
import React from "react";
import Loadable from 'react-loadable';
import {Spin} from 'antd';
import {renderRoutes} from 'react-router-config';
import styled from "styled-components";

const StyledTab = styled.ul`
    padding-left: 10px;
    padding-top: 10px;
    margin-bottom: 10px;
    li {
        display: inline-block;
        margin-right: 20px;
        a.active {
            font-weight: bold;
            color: #ffa800;
        }
    }
`;

const NodeForm = Loadable({loader: () => import('@/pages/NodeForm'), loading: () => <Spin/>});
const List = Loadable({loader: () => import('@/pages/NodeList'), loading: () => <Spin/>});

export const router = [
    {path: '/', component: NodeForm, exact: true},
    {path: '/list', component: List}
];

export default () =>
    <React.Fragment>
        <StyledTab>
            <li>
                <Link to="/" exact activeClassName="active">Form</Link>
            </li>
            <li>
                <Link to="/list" activeClassName="active">List</Link>
            </li>
        </StyledTab>
        <Switch>
            {renderRoutes(router)}
        </Switch>
    </React.Fragment>
