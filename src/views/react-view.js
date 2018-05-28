import React from "react";
import { render } from "react-dom";
import * as R from "ramda";
import style from "../style/tagSearch.scss";

const dotPath = R.useWith(R.path, [R.split(".")]);
const propsDotPath = R.useWith(R.ap, [R.map(dotPath), R.of]);
const pluckEventVal = R.compose(R.head, propsDotPath(["target.value"]));
const propEqKey = R.propEq("key");
const preventDefault = e => e.preventDefault();
const keyBindings = props => R.cond([
  [
    propEqKey("ArrowDown"),
    R.compose(
      props.selectNextSuggestedTag,
      pluckEventVal,
      preventDefault
    )
  ],
  [
    propEqKey("ArrowUp"),
    R.compose(
      props.selectPreviousSuggestedTag,
      pluckEventVal,
      preventDefault
    )
  ],
  [
    propEqKey(" "),
    R.compose(props.addTag, pluckEventVal, preventDefault)
  ],
  [
    propEqKey("Enter"),
    R.compose(props.addTag, pluckEventVal, preventDefault)
  ],
  [
    propEqKey("Tab"),
    R.compose(props.addTag, pluckEventVal, preventDefault)
  ],
  [
    propEqKey("Backspace"),
    R.compose(props.backspaceTag, pluckEventVal)
  ],
  [
    propEqKey("Escape"),
    R.compose(props.clearPossibleTags, pluckEventVal)
  ]
]);

const AddedTag = ({ clickTag, tag }) => (
  <div
    className={style.searchTags__addedTag}
    onMouseDown={e => e.preventDefault()}
    onClick={clickTag.bind(null, tag.id)}
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
    onMouseDown={e => e.preventDefault()}
    onClick={clickTag}
    className={`${style.suggestedContainer__suggestedTag} ${selected ? style["suggestedContainer__suggestedTag--selected"] : ""} `}
  >
    <div className={`${style.suggestedContainer__header}`}>
      <div className={style.suggestedContainer__id}>{tag.title}</div>
      {/* <div className={style.suggestedContainer__class}>{tag.class}</div> */}
    </div>
    <div className={style.suggestedContainer__body}>
      <div className={style.suggestedContainer__definition}>
        {tag.definition}
      </div>
    </div>
  </div>
);

export const TagSearch = (props) => {
  if (props.allTags.length > 0) {
    return (
      <div className={style.searchTags}>
        <div className={style.searchTags__addedTags}>
          {props.addedTags.map(tag => (
            <AddedTag
              key={tag.id}
              tag={tag}
              clickTag={props.clickDeleteTag}
            />
          ))}
        </div>

        <div className={style.searchTags__inputGroup}>
          <input
            value={props.value}
            onInput={R.compose(
              props.calcPossibleTags,
              pluckEventVal
            )}
            onKeyDown={keyBindings(props)}
            placeholder="I want ..."
          />
          {R.isEmpty(props.possibleTags)
            ? null
            : <SuggestedTags
                tags={props.possibleTags}
                selected={props.selectedPossibleTag}
                clickTag={props.addTag}
              />
          }
        </div>
      </div>
    );
  }
  return <div><button onClick={() => props.getAllTags(1)}>Get Tags</button></div>
}