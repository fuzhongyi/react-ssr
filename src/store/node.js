import {FULFILLED} from 'redux-promise-middleware';
import typeToReducer from 'type-to-reducer';
import update from 'immutability-helper';

const ADD_NODE = 'ADD_NODE';
const DEL_NODE = 'DEL_NODE';

export const actionAddNode = (text) => ({
    type: ADD_NODE,
    payload: Promise.resolve(text)
});

export const actionDelNode = (idx) => ({
    type: DEL_NODE,
    payload: Promise.resolve(idx)
});

export default typeToReducer(
    {
        [ADD_NODE]: {
            [FULFILLED]: (state, action) => update(state, {$push: [action.payload]})
        },
        [DEL_NODE]: {
            [FULFILLED]: (state, action) => update(state, {$splice: [[action.payload, 1]]})
        }
    },
    [
        'Racing car sprays burning fuel into crowd.',
        'Japanese princess to wed commoner.',
        'Australian walks 100km after outback crash.',
        'Man charged over missing wedding girl.',
        'Los Angeles battles huge wildfires.',
    ]
)
