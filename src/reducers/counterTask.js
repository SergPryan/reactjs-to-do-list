let counter=0;

export function counterTask(state=counter, action) {
    if (action.type === 'COUNTER_TASK') {
        return ++counter;
    }
    return state;
}
