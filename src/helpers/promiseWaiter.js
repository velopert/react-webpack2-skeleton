const promiseWaiter = store => next => action => {
    // if it is browser, skip this process
    if(process.browser) return next(action);
    
    const { payload } = action;

    if(!payload) return next(action);

    const promise = action.payload.promise;

    if(!promise) return next(action);

    store.dispatch({ type: 'AWAIT_PROMISE', promise});
    next(action);
}

export default promiseWaiter;