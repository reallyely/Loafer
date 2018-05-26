import * as R from "ramda";
import {
  TAGS
} from "../data/tags";

const getPossibilitiesFromTAGS = (value, addedTags) =>
  R.complement(R.isEmpty(value))
  ? R.compose(
      R.slice(0, 5),
      R.filter(R.compose(R.test(new RegExp(value, "i")), R.prop("title"))),
      R.reject(R.contains(R.__, addedTags))
    )(TAGS) // TODO: Replace with proper call to tags db
  : [];

// LAZY MODULE
export class TagSearch {
  constructor(initialProps) {
    this.store = R.merge({
        addedTags: [],
        value: "",
        selectedPossibleTag: 0,
        possibleTags: []
      },
      initialProps
    ); // a developer could add arbitrary props with this setup. Care?

    this.actions = {
      update: ({ value }) => () => ({ value }),
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

      calcPossibleTags: value => store => {
        debugger;
        return ({
          value,
          possibleTags: getPossibilitiesFromTAGS(value, store.addedTags),
          selectedPossibleTag: 0
        });
      },

      clickDeleteTag: id => store => ({
        addedTags: R.remove(
          R.findIndex(R.propEq("id", id), store.addedTags),
          1,
          store.addedTags
        )
      }),

      backspaceTag: value => store => {
        debugger;
        return ({
          possibleTags: getPossibilitiesFromTAGS(value, store.addedTags),
          addedTags: store.value.length === 0 && store.addedTags.length > 0 ?
            R.init(store.addedTags) :
            store.addedTags
        })
      },

      selectNextSuggestedTag: () => store => ({
        selectedPossibleTag: store.selectedPossibleTag < store.possibleTags.length - 1 ?
          store.selectedPossibleTag + 1 :
          store.possibleTags.length > 0 ? store.possibleTags.length - 1 : 0
      }),

      selectPreviousSuggestedTag: () => store => ({
        selectedPossibleTag: store.selectedPossibleTag > 0 ? store.selectedPossibleTag - 1 : 0
      })
    };
  }
}