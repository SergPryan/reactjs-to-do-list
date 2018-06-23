let counterTask = 0;

function updateObjectInArray(array, action) {
    return array.map( (item, index) => {
        if(index !== action.payload.id) {
            // This isn't the item we care about - keep it as-is
            return item;
        }
        // Otherwise, this is the one we want - return an updated value
        return {
            ...item,
            ...action.payload
        };
    });
}

export function tasks(state=[], action) {
    if (action.type === 'ADD_TASK') {
        action.payload.id=counterTask++;
        return[
            ...state,
            action.payload
        ]
    }
    if(action.type === 'DELETE_TASK'){
        const taskId = action.payload.id;
        return [...state.filter(task => task.id !== taskId)];
    }
    if(action.type==='UPDATE_TASK'){
        return updateObjectInArray(state,action)
    }


    return state;
}