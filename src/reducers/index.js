import { combineReducers } from 'redux'

import {tasks} from "./tasks";
import {filterTask} from "./filterTask";

export default combineReducers({
    tasks,
    filterTask
})