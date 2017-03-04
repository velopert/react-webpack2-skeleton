import { createAction, handleActions } from 'redux-actions';
import createPromiseAction from 'helpers/createPromiseAction';
import { Map } from 'immutable';
import pender from 'helpers/pender';

const SOMETHING_DO = 'sample/SOMETHING_DO';
const DATA_FETCH = 'sample/DATA_FETCH';

function fakeFetch(payload) {
    return new Promise(resolve => {
        setTimeout(()=>{
            resolve({ result: payload });
        }, 500);
    });
}

export const doSomething = createAction(SOMETHING_DO);

export const fetchData = createPromiseAction({
    type: DATA_FETCH,
    promiseCreator: fakeFetch
});

const initialState = Map({
    pending: Map({
        fetchData: false
    }),
    something: null,
    result: null
});

export default handleActions({
    // sample action handler
    [SOMETHING_DO]: (state, action) => {
        return state.set('something', 'done');
    },

    ...pender({
        type: DATA_FETCH,
        name: 'fetchData',
        onFulfill: (state, action) => {
            return state.set('result', action.payload.result);
        }
    })

}, initialState);