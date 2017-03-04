const createPromiseAction = ({type, promiseCreator}) => (payload) => ({
    type,
    payload: {
        promise: promiseCreator(payload)
    }
})


export default createPromiseAction;