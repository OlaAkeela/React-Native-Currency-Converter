import React, { Component } from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import PropTypes from 'prop-types';

const connectAlert = (WrappedComponent) => {
  // eslint-disable-next-line react/prefer-stateless-function
  class ConnectedAlert extends Component {
    render() {
      const { alertWithType, alert } = this.context;
      return (
        <WrappedComponent
          {...this.props}
          alertWithType={alertWithType}
          alert={alert}
        />
      );
    }
  }

  ConnectedAlert.contextTypes = {
    alertWithType: PropTypes.func,
    alert: PropTypes.func,
  };

  return hoistNonReactStatic(ConnectedAlert, WrappedComponent);
};

export default connectAlert;
