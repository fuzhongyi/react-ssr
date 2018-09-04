import express from 'express';
import fs from 'fs';
import React from 'react';
import {Provider} from 'react-redux';
import {renderToString} from 'react-dom/server';
import {StaticRouter, matchPath} from "react-router-dom";
import path from 'path';
import Routers, {router} from '@/router/index';
import Loadable from 'react-loadable';
import {ServerStyleSheet} from 'styled-components';
import createStore from '@/store';
import {matchRoutes} from 'react-router-config';
// import connectHistoryApiFallback from 'connect-history-api-fallback'

const port = 9000;
const app = express();
const template = fs.readFileSync(path.join(__dirname, '../build/index.html'), 'utf8');

// app.use('/static', express.static(path.join(__dirname, '../build/static')));
app.use(express.static(path.resolve(__dirname, "../build")));
app.get('/*', async (req, res, next) => {
    const context = {};
    const modules = [];
    const sheet = new ServerStyleSheet();
    const {store} = createStore(req.url);
    const branch = matchRoutes(router, req.url);
    const promises = branch.map(async ({route}) => {
        const component = await route.component.preload();
        const prefetch = component.default.prefetch;
        return prefetch instanceof Function ? prefetch(store) : Promise.resolve(null)
    });
    await Promise.all(promises).catch((err) => console.log(err));
    let isMatch = router.some(route => matchPath(req.url, {path: route.path, exact: route.exact}));
    if (!isMatch) {
        await next();
    } else {
        const clientHtml = renderToString(
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
    }
});

// The server does not load components dynamically, loading them in advance.
Loadable.preloadAll().then(() => {
    app.listen(port, function () {
        console.log(`Server is running on port ${port}`);
    });
});


