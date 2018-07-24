import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';
import {  omit, pick , getClassNames } from '../utils';
import {TransitionTimeouts, TransitionPropTypeHooks , TransitionStatuses} from '../TransConst';
// omit function Returns a new object with the key/value pairs from `obj` that are not in the array `omitKeys`.
// pick function Returns a filtered copy of an object with only the specified keys.
 
const onTopStyle={
  position: 'absolute',
  top: '100%',
  background: 'rgba(62, 54, 54, 0.92)',
  zIndex: 3,
  width: '100%',
  margin: 0,
  padding: 'inherit',
  left: 0,
}

const propTypes = {
  ...Transition.propTypes,
  isOpen: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  className: PropTypes.node,
  navbar: PropTypes.bool,
  cssModule: PropTypes.object,
  innerRef: PropTypes.object,
  onTop: PropTypes.bool,
};

const defaultProps = {
  ...Transition.defaultProps,
  isOpen: false,
  appear: false,
  enter: true,
  exit: true,
  timeout: TransitionTimeouts.Collapse,
  onTop : true,
};

const transitionClassOf = {
  [TransitionStatuses.ENTERING]: 'collapsing',
  [TransitionStatuses.ENTERED]: 'collapse show',
  [TransitionStatuses.EXITING]: 'collapsing',
  [TransitionStatuses.EXITED]: 'collapse',
};

function getTransitionClass(status) {
  return transitionClassOf[status] || 'collapse';
}

function getHeight(node) {
  return node.scrollHeight;
}

class Collapse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      height: null
    };

    ['onEntering', 'onEntered', 'onExit', 'onExiting', 'onExited'].forEach((name) => {
      this[name] = this[name].bind(this);
    });
  }

  onEntering(node, isAppearing) { 
    this.setState({ height: getHeight(node) });
    this.props.onEntering(node, isAppearing);  //hooks
  }

  onEntered(node, isAppearing) {
    this.setState({ height: null });
    this.props.onEntered(node, isAppearing);  //hooks
  }

  onExit(node) {
    this.setState({ height: getHeight(node) });
    this.props.onExit(node);  //hooks
  }

  onExiting(node) {
    // getting this variable triggers a reflow
    const _unused = node.offsetHeight; // eslint-disable-line no-unused-vars
    this.setState({ height: 0 });
    this.props.onExiting(node);  //hooks
  }

  onExited(node) {
    this.setState({ height: null });
    this.props.onExited(node);  //hooks
  }

  render() {
    const {
      isOpen,
      className,
      navbar,
      cssModule,
      children,
      innerRef,
      onTop,
      ...otherProps
    } = this.props;

    const { height } = this.state;

    // In NODE_ENV=production the Transition.propTypes are wrapped which results in an
    // empty object "{}". This is the result of the `react-transition-group` babel
    // configuration settings. Therefore, to ensure that production builds work without
    // error, we can either explicitly define keys or use the Transition.defaultProps.
    // Using the Transition.defaultProps excludes any required props. Thus, the best
    // solution is to explicitly define required props in our utilities and reference these.
    // This also gives us more flexibility in the future to remove the prop-types
    // dependency in distribution builds (Similar to how `react-transition-group` does).
    // Note: Without omitting the `react-transition-group` props, the resulting child
    // element which results in errors/warnings for non-valid attributes.
    const transitionProps = pick(otherProps, TransitionPropTypeHooks);
    const childProps = omit(otherProps, TransitionPropTypeHooks);
    return (
      <Transition
        {...transitionProps}
        in={isOpen}
        onEntering={this.onEntering}
        onEntered={this.onEntered}
        onExit={this.onExit}
        onExiting={this.onExiting}
        onExited={this.onExited}
      >
        {(status) => {
          
          let collapseClass = getTransitionClass(status);

          const classes = getClassNames(
            className,
            collapseClass,
            navbar && 'navbar-collapse'
          );

          let style = height === null ? null : { height };
          if (onTop && status!='exited')  style={...style , ...onTopStyle}  ;

          return (
            <div
              {...childProps}
              style={{ ...childProps.style, ...style  }}
              className={classes}
              ref={this.props.innerRef}
            >
              {children}
            </div>
          );
        }}
      </Transition>
    );
  }
}

Collapse.propTypes = propTypes;
Collapse.defaultProps = defaultProps;
export default Collapse;
