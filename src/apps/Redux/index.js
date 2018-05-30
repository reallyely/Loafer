import React from "react";
import { render } from "react-dom";
import { connect } from 'react-redux'
import { compose } from 'ramda'

import {
  addTag,
  backspaceTag,
  calcPossibleTags,
  clearPossibleTags,
  clickDeleteTag,
  selectNextSuggestedTag,
  selectPreviousSuggestedTag,
  getAllTags
 } from './TagSearch'

import { TagSearch as TagSearchView } from "../../views/react-view"

const mapStateToProps = state => {
  return {
    allTags: state.allTags,
    addedTags: state.addedTags,
    possibleTags: state.possibleTags,
    selectedPossibleTag: state.selectedPossibleTag,
    value: state.value
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addTag: compose(dispatch, addTag),
    backspaceTag: compose(dispatch, backspaceTag),
    calcPossibleTags: compose(dispatch, calcPossibleTags),
    clearPossibleTags: compose(dispatch, clearPossibleTags),
    clickDeleteTag: compose(dispatch, clickDeleteTag),
    selectNextSuggestedTag: compose(dispatch, selectNextSuggestedTag),
    selectPreviousSuggestedTag: compose(dispatch, selectPreviousSuggestedTag),
    getAllTags: compose(dispatch, getAllTags)
  }
}

export const ReduxApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(TagSearchView);
