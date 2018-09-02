import express from 'express';
import fs from 'fs';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {StaticRouter} from "react-router-dom";
import path from 'path';
import Routers from '../src/router/index';
import Loadable from 'react-loadable';
import {ServerStyleSheet} from 'styled-components';
import {Provider} from 'react-redux';
import createStore from '../src/store';

const port = 9000;
const server = express();
const template = fs.readFileSync(path.join(__dirname, '../build/index.html'), 'utf8');

Loadable.preloadAll(); // The server does not load components dynamically, loading them in advance.
server.use('/static', express.static(path.join(__dirname, '../build/static')));
server.get('/*', (req, res) => {
    const context = {};
    const modules = [];
    const sheet = new ServerStyleSheet();
    const {store} = createStore(req.url);
    let clientHtml = renderToString(
        sheet.collectStyles(
            <Loadable.Capture report={m => modules.push(m)}>
                <Provider store={store}>
                    <StaticRouter location={req.url}
                                  context={context}>
                        <Routers/>
                    </StaticRouter>
                </Provider>
            </Loadable.Capture>
        )
    );
    const reduxState = `<script>window.__REDUX_STATE__ = ${JSON.stringify(store.getState()).replace(/</g, '\\u003c')}</script>`;
    const styles = sheet.getStyleTags();
    res.send(
        template
            .replace('<!-- style -->', styles)
            .replace('<!-- stark -->', clientHtml)
            .replace('<!-- state -->', reduxState));
});

server.listen(port, function () {
    console.log(`Server is running on port ${port}`);
});


