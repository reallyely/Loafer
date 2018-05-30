import React from "react";
import { render } from "react-dom";
import { connect } from 'react-redux'
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
    addTag: (...all) =>
      dispatch(addTag(all)),
    backspaceTag: (...all) =>
      dispatch(backspaceTag(all)),
    calcPossibleTags: (...all) =>
      dispatch(calcPossibleTags(all)),
    clearPossibleTags: (...all) =>
      dispatch(clearPossibleTags(all)),
    clickDeleteTag: (...all) =>
      dispatch(clickDeleteTag(all)),
    selectNextSuggestedTag: (...all) =>
      dispatch(selectNextSuggestedTag(all)),
    selectPreviousSuggestedTag: (...all) =>
      dispatch(selectPreviousSuggestedTag(all)),
    getAllTags: (...all) =>
      dispatch(getAllTags(all))
  }
}

export const ReduxApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(TagSearchView);
