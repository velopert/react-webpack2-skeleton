import { combineReducers } from 'redux';
import sample from './sample';
import promise from './promise';


const modules = combineReducers({
    sample,
    promise
});

export default modules;
