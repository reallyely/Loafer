import React from "react";
import { render } from "react-dom";
import * as R from "ramda";
import style from "../../style/tagSearch.scss";

import { react as reactCoupling } from "../../coupling";
import { TagSearch } from "../../lazyModules/TagSearch.js";

import { TAGS } from "../../data/tags.js";

const dotPath = R.useWith(R.path, [R.split(".")]);
const propsDotPath = R.useWith(R.ap, [R.map(dotPath), R.of]);
const pluckEventVal = R.compose(R.head, propsDotPath(["target.value"]));
const propEqKey = R.propEq("key");
const preventDefault = e => e.preventDefault();
console.log(style);
const AddedTag = ({ clickTag, tag }) => (
  <div
    onMouseDown={e => e.preventDefault()}
    onClick={clickTag.bind(null, tag.id)}
    className={style.addedTag}
  >
    {tag.title ? tag.title : "no title"}
  </div>
);

const SuggestedTags = ({ clickTag, selected, tags }) => (
  <div className={style.suggestedContainer}>
    {tags.map((tag, i) => (
      <SuggestedTag
        clickTag={clickTag}
        key={tag.id}
        tag={tag}
        selected={selected === i}
      />
    ))}
  </div>
);

const SuggestedTag = ({ clickTag, tag, selected }) => (
  <div
    onmousedown={e => e.preventDefault()}
    onClick={clickTag}
    className={`${style.suggestedTag} ${selected ? style.selected : ""} `}
  >
    <div className={`${style.header}`}>
      <div className={style.id}>{tag.title}</div>
      {/* <div className={style.class}>{tag.class}</div> */}
    </div>
    <div className={style.body}>
      <div className={style.definition}>{tag.definition}</div>
    </div>
  </div>
);

class ReactAppImplementation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { lazyModule: { store, actions, updateStore } } = this.props;
    const props = this.props;
    const keyBindings = props => actions =>
      R.cond([
        [
          propEqKey("ArrowDown"),
          R.compose(
            actions.selectNextSuggestedTag,
            pluckEventVal,
            preventDefault
          )
        ],
        [
          propEqKey("ArrowUp"),
          R.compose(
            actions.selectPreviousSuggestedTag,
            pluckEventVal,
            preventDefault
          )
        ],
        [
          propEqKey(" "),
          R.compose(updateStore(actions.addTag), pluckEventVal, preventDefault)
        ],
        [
          propEqKey("Enter"),
          R.compose(updateStore(actions.addTag), pluckEventVal, preventDefault)
        ],
        [
          propEqKey("Tab"),
          R.compose(updateStore(actions.addTag), pluckEventVal, preventDefault)
        ],
        [
          propEqKey("Backspace"),
          R.compose(updateStore(actions.backspaceTag), pluckEventVal)
        ],
        [
          propEqKey("Escape"),
          R.compose(updateStore(actions.clearPossibleTags), pluckEventVal)
        ]
      ]);

    return (
      <div>
        <div>
          {store.addedTags.map(t => (
            <AddedTag
              tag={t}
              clickTag={R.compose(updateStore(actions.clickDeleteTag))}
            />
          ))}
        </div>

        <div>
          <input
            value={store.value}
            onInput={R.compose(
              updateStore(actions.calcPossibleTags),
              pluckEventVal
            )}
            onKeyDown={keyBindings(props)(actions)}
            placeholder="I want ..."
          />
          {R.isEmpty(store.possibleTags) ? null : (
            <SuggestedTags
              tags={store.possibleTags}
              selected={store.selectedPossibleTag}
              clickTag={R.compose(updateStore(actions.addTag), pluckEventVal)}
            />
          )}
        </div>
      </div>
    );
  }
}

export const ReactApp = reactCoupling(TagSearch)(ReactAppImplementation);
