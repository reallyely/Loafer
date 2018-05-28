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

    // execAsync(asyncActions.wait)()
    //   .then(execAsync(asyncActions.getAllTags))
    //   .then(execAsync(asyncActions.wait))
    //   .then(updateStore(actions.setAllTags));
  }

  render() {
    const { store, actions, asyncActions, updateStore, execAsync } = this.props.lazyModule;

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

      getAllTags = {number =>
        execAsync(asyncActions.getAllTags)(number)
          .then(execAsync(asyncActions.wait))
          .then(updateStore(actions.setAllTags))
      }
    />
  }

}

export const ReactApp = reactCoupling(TagSearchModule)(ReactAppImplementation);
