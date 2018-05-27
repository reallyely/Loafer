import React from "react";
import { render } from "react-dom";

import { react as reactCoupling } from "../../coupling";
import { TagSearch as TagSearchModule} from "../../lazyModules/TagSearch"
import { TagSearch as TagSearchView } from "../../views/react-view"

class ReactAppImplementation extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { lazyModule: { store, actions, asyncActions, execAsync, updateStore}} = this.props;

    execAsync(asyncActions.getAllTags)
      .then(updateStore(actions.setAllTags));
  }

  render() {
    const { lazyModule: { store, actions, asyncActions, updateStore } } = this.props

    return <TagSearchView
        allTags                    = {store.allTags}
        addedTags                  = {store.addedTags}
        possibleTags               = {store.possibleTags}
        selectedPossibleTag        = {store.selectedPossibleTag}
        value                      = {store.value}

        addTag                     = {updateStore(actions.addTag)}
        backspaceTag               = {updateStore(actions.backspaceTag)}
        calcPossibleTags           = {updateStore(actions.calcPossibleTags)}
        clearPossibleTags          = {updateStore(actions.clearPossibleTags)}
        clickDeleteTag             = {updateStore(actions.clickDeleteTag)}
        selectNextSuggestedTag     = {updateStore(actions.selectNextSuggestedTag)}
        selectPreviousSuggestedTag = {updateStore(actions.selectPreviousSuggestedTag)}
    />
  }

}

export const ReactApp = reactCoupling(TagSearchModule)(ReactAppImplementation);
