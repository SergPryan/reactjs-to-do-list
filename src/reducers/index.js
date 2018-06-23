import { combineReducers } from 'redux'

import {tasks} from "./tasks";
import {filterTask} from "./filterTask";
import {counterTask} from "./counterTask";

export default combineReducers({
    tasks,
    filterTask,
    counterTask
})