import React from "react";

export const react = LazyModule => Component => {
  return class LazyContainer extends React.Component {
    constructor(props) {
      super(props);

      const lazyModule = new LazyModule();
      this.state = lazyModule.store;
      this.actions = lazyModule.actions;
      this.updateStore = this.updateStore.bind(this)
    }

    updateStore(action) {
      return (...values) => this.setState(prevState => action(...values)(prevState));
    }

    render() {
      return React.createElement(Component, {
        lazyModule: {
          store: this.state,
          actions: this.actions,
          updateStore: this.updateStore
        }
      });
    }
  };
};
