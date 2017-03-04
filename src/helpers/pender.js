/**
 * Transforms action type to ACTION\_TYPE\_[PENDING, FULFILLED, REJECTED]
 * 
 * @param {string} type 
 * @returns {object} actions
 */
const actionize = (type) => {
    return {
        PENDING: `${type}_PENDING`,
        FULFILLED: `${type}_FULFILLED`,
        REJECTED: `${type}_REJECTED`
    }
}

/*
    usage:
    handleActions({
        ...pender({
            type: SOMETHING,
            onFulfill: (state, action) => {
                return state;
            },
            onReject: (state, ction) => {
                return state;
            }
        })
    })
*/


/**
 * Creates Promise Handlers
 */
const pender = ({
    type,
    name,
    onFulfill = (state) => state, // in case function not given 
    onReject = (state) => state
}) => {
    const actionized = actionize(type);

    return {
        [actionized.PENDING]: (state, action) => {
            return state.setIn(['pending', name], true);
        },
        [actionized.FULFILLED]: (state, action) => {
            return onFulfill(state, action).setIn(['pending', name], false);
        },
        [actionized.REJECTED]: (state, action) => {
            return onReject(state,action).setIn(['pending', name], false);
        }
    }
}

export default pender;