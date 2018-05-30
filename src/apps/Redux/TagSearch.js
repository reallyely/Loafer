import * as R from 'ramda'
import { TagSearch } from '../../lazyModules/TagSearch'

const tagSearch = new TagSearch();
// How do we, can we generate constants?
// Does it matter when we just use these constants internally in the action creators?
const SET_ALL_TAGS = 'TagSearch/SET_ALL_TAGS'
const ADD_TAG = 'TagSearch/ADD_TAG'
const BACKSPACE_TAG = 'TagSearch/BACKSPACE_TAG'
const CALC_POSSIBLE_TAGS = 'TagSearch/CALC_POSSIBLE_TAGS'
const CLEAR_POSSIBLE_TAGS = 'TagSearch/CLEAR_POSSIBLE_TAGS'
const CLICK_DELETE_TAG = 'TagSearch/CLICK_DELETE_TAG'
const SELECT_NEXT_SUGGESTED_TAG = 'TagSearch/SELECT_NEXT_SUGGESTED_TAG'
const SELECT_PREVIOUS_SUGGESTED_TAG = 'TagSearch/SELECT_PREVIOUS_SUGGESTED_TAG'

// Reducer
// at the reducer we need to merge state
// const reducer = (state, action) => ({newState})
export default function reducer(state = tagSearch.store, action = {}) {
  switch (action.type) {
    case SET_ALL_TAGS:
      return Object.assign({}, state, tagSearch.actions.setAllTags(action.allTags)(state) )
    case ADD_TAG:
      return Object.assign({}, state, tagSearch.actions.addTag()(state) )
    case BACKSPACE_TAG:
      return Object.assign({}, state, tagSearch.actions.backspaceTag(action.value)(state) )
    case CALC_POSSIBLE_TAGS:
      return Object.assign({}, state, tagSearch.actions.calcPossibleTags(action.value)(state) )
    case CLEAR_POSSIBLE_TAGS:
      return Object.assign({}, state, tagSearch.actions.clearPossibleTags()(state) )
    case CLICK_DELETE_TAG:
      return Object.assign({}, state, tagSearch.actions.clickDeleteTag(action.id)(state) )
    case SELECT_NEXT_SUGGESTED_TAG:
      return Object.assign({}, state, tagSearch.actions.selectNextSuggestedTag()(state) )
    case SELECT_PREVIOUS_SUGGESTED_TAG:
      return Object.assign({}, state, tagSearch.actions.selectPreviousSuggestedTag()(state))
    default:
      return state;
  }
}

// Action Creators
// any -> { type: String, ...}
// Action creators look a lot like Loafer actions with a few exceptions
//  * Action Creators must return a type
//  * Action Creators are :: any -> Action
//  * Loafer Actions are :: any -> (state, actions, asyncActions) -> PartialState
// const mapToActionCreator = action => type => (...values) => ({
//   type,

// })
export const setAllTags = allTags => ({ type: SET_ALL_TAGS, allTags })
export const addTag = () => ({ type: ADD_TAG })
export const backspaceTag = value => ({type: BACKSPACE_TAG, value })
export const calcPossibleTags = value => ({ type: CALC_POSSIBLE_TAGS, value })
export const clearPossibleTags = () => ({ type: CLEAR_POSSIBLE_TAGS })
export const clickDeleteTag = id => ({ type: CLICK_DELETE_TAG, id })
export const selectNextSuggestedTag = () => ({ type: SELECT_NEXT_SUGGESTED_TAG })
export const selectPreviousSuggestedTag = () => ({ type: SELECT_PREVIOUS_SUGGESTED_TAG })

// side effects, only as applicable
// e.g. thunks, epics, etc
// export function getWidget () {
//   return dispatch => get('/widget').then(widget => dispatch(updateWidget(widget)))
export const getAllTags = number => dispatch =>
  tagSearch.asyncActions.getAllTags()()
    .then(allTags => setTimeout( () => dispatch(setAllTags(allTags)), 1000))