export function filterTask(state=null, action) {
    if (action.type === 'FILTER_TASK') {
       return action.payload;
    }
    return state;
}