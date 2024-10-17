import { createStore } from 'redux';
import rootReducer from './reducer'; // Assuming you have a reducers file

const store = createStore(rootReducer);

export default store;
