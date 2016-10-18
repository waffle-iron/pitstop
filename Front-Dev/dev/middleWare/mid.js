const mid = store =>next => action => {
    return next(action);
};

export default mid;
