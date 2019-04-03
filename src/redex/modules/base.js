import { Map } from 'immutable';
import { handleActions, createAction } from 'redux-actions';

const SET_HEADER_VISIBILITY = 'base/SET_HEADER_VISIBILITY';

export const setHEaderVisibility = createAction(SET_HEADER_VISIBILITY);

const initialState = Map({
    hader: Map({ visible: true }),
});

export default handleActions({
    [SET_HEADER_VISIBILITY]: (state, action) => state.setIn(
        ['header', 'visible'], action.payload),
}, initialState);
