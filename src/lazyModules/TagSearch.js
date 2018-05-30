import * as R from "ramda";
import {
  TAGS
} from "../data/tags";

const getPossibilitiesFromTAGS = (value, addedTags, allTags) =>
  R.complement(R.isEmpty(value))
  ? R.compose(
      R.slice(0, 5),
      R.filter(R.compose(R.test(new RegExp(value, "i")), R.prop("title"))),
      R.reject(R.contains(R.__, addedTags))
    )(allTags) // TODO: Replace with proper call to tags db
  : [];

// LAZY MODULE
export class TagSearch {
  constructor(initialProps) {
    this.store = {
      allTags: [],
      addedTags: [],
      possibleTags: [],
      selectedPossibleTag: 0,
      value: ""
    };

    this.actions = {
      setAllTags: allTags => () => ({ allTags }),
      addTag: () => store =>
        store.possibleTags.length > 0
          ? ({
              value: "",
              possibleTags: [],
              selectedPossibleTag: 0,
              addedTags: [].concat(
                store.addedTags,
                store.possibleTags[store.selectedPossibleTag]
              )
            })
          : ({}),

      clearPossibleTags: () => store => ({
        possibleTags: []
      }),

      calcPossibleTags: value => store => ({
        value,
        possibleTags: getPossibilitiesFromTAGS(value, store.addedTags, store.allTags),
        selectedPossibleTag: 0
      }),

      clickDeleteTag: id => store => ({
        addedTags: R.remove(
          R.findIndex(R.propEq("id", id), store.addedTags),
          1,
          store.addedTags
        )
      }),

      backspaceTag: value => store => ({
        possibleTags: getPossibilitiesFromTAGS(value, store.addedTags, store.allTags),
        addedTags: store.value.length === 0 && store.addedTags.length > 0
          ? R.init(store.addedTags)
          : store.addedTags
      }),

      selectNextSuggestedTag: () => store => ({
        selectedPossibleTag: store.selectedPossibleTag < store.possibleTags.length - 1
          ? store.selectedPossibleTag + 1
          : store.possibleTags.length > 0
            ? store.possibleTags.length - 1
            : 0
      }),

      selectPreviousSuggestedTag: () => store => ({
        selectedPossibleTag: store.selectedPossibleTag > 0
          ? store.selectedPossibleTag - 1
          : 0
      })
    };

    // Is this necessary? Should async actions just be under actions they just return a promise?
    this.asyncActions = {
      getAllTags: (number = 3) => (state, actions, asyncActions) => Promise.resolve(R.slice(0, number, TAGS)),
      wait: value => () => new Promise((resolve, reject) => setTimeout(() => resolve(value), 1000))
    }
  }
}