import {PENDING, REJECTED, FULFILLED} from 'redux-promise-middleware';
import typeToReducer from 'type-to-reducer';
import update from 'immutability-helper';
import {fetchNodes, insertNode, removeNode} from "@/api";
import {message} from 'antd';

const GET_NODE = 'GET_NODE';
const ADD_NODE = 'ADD_NODE';
const DEL_NODE = 'DEL_NODE';

export const actionGetNodes = () => ({
    type: GET_NODE,
    payload: fetchNodes()
});

export const actionAddNode = (data) => ({
    type: ADD_NODE,
    payload: insertNode(data)
});

export const actionDelNode = (id) => ({
    type: DEL_NODE,
    payload: removeNode(id)
});

export default typeToReducer(
    {
        [GET_NODE]: {
            [PENDING]: state => update(state, {loading: {$set: true}}),
            [REJECTED]: (state, action) => {
                message.error(action.payload.message);
                return update(state, {loading: {$set: false}})
            },
            [FULFILLED]: (state, action) => update(state, {
                loading: {$set: false},
                data: {$set: action.payload.data}
            })
        },
        [ADD_NODE]: {
            [PENDING]: state => update(state, {loading: {$set: true}}),
            [REJECTED]: (state, action) => {
                message.error(action.payload.message);
                return update(state, {loading: {$set: false}})
            },
            [FULFILLED]: (state, action) => {
                message.success('Add Node Success!');
                return update(state, {
                    loading: {$set: false},
                    data: {$push: [action.payload.data]}
                });
            }
        },
        [DEL_NODE]: {
            [PENDING]: state => update(state, {loading: {$set: true}}),
            [REJECTED]: (state, action) => {
                message.error(action.payload.message);
                return update(state, {loading: {$set: false}})
            },
            [FULFILLED]: (state, action) => {
                message.success('Delete Node Success!');
                return update(state, {
                    loading: {$set: false},
                    data: {$splice: [[state.data.findIndex(itm => itm.id === action.payload.data.id), 1]]}
                })
            }
        }
    },
    {
        loading: false,
        data: []
    }
)
