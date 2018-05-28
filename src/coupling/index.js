import React from "react";

export const react = LazyModule => Component => {
  return class LazyContainer extends React.Component {
    constructor(props) {
      super(props);
      const lazyModule = new LazyModule();

      this.state = lazyModule.store;
      this.actions = lazyModule.actions;
      this.asyncActions = lazyModule.asyncActions;
      this.updateStore = this.updateStore.bind(this)
      this.execAsync = this.execAsync.bind(this)
    }

    updateStore(action) {
      return (...values) => this.setState(prevState =>
        action(...values)(prevState, this.actions, this.asyncActions)
      );
    }

    execAsync(asyncAction) {
      return (...values) => asyncAction(...values)(this.state, this.actions, this.asyncActions)
    }

    render() {
      return React.createElement(Component, {
        lazyModule: {
          store: this.state,
          actions: this.actions,
          asyncActions: this.asyncActions,
          updateStore: this.updateStore,
          execAsync: this.execAsync
        }
      });
    }
  };
};
