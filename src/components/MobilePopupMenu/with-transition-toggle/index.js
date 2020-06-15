import React from "react";

const withTransitionToggle = Wrapped =>
  class TransitionManager extends React.Component {
    state = {
      shouldRender: true,
      isFirstRender: true
    };

    componentDidUpdate(prevProps) {
      /*
        This should take care of showing the transition once it
        has already been removed from the DOM
        Only when coming from a `closed` to `open` state 🙌
      */
      if (!prevProps.open && this.props.open) {
        this.setState({ shouldRender: true });
      }
    }

    hideTransition = () => {
      /*
        We only check for `close` state when it's the first render,
        so we can skip rendering it altogether 🔥
      */
      this.setState({ shouldRender: false, isFirstRender: false });
    };

    hideIfNotOpen = () => {
      const { open } = this.props;
      if (!open) {
        this.hideTransition();
      }
    };

    getSpringProps = () => {
      const { open } = this.props;
      const { isFirstRender } = this.state;

      return {
        onStart: () => {
          if (isFirstRender) {
            this.hideIfNotOpen();
          }
        },
        onRest: this.hideIfNotOpen
      };
    };

    render() {
      return (
        this.state.shouldRender && (
          <Wrapped
            {...this.props}
            afterClose={this.hideTransition}
            isFirstRender={this.state.isFirstRender}
            springProps={this.getSpringProps()}
          />
        )
      );
    }
  };

export default withTransitionToggle;
