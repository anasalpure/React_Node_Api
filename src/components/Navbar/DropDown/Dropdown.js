import React from 'react';
import PropTypes from 'prop-types';
import {  getClassNames} from '../../utils';
import DropdownMenu from './DropdownMenu';

const propTypes = {
  caret: PropTypes.bool,
  color: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  'aria-haspopup': PropTypes.bool,
  split: PropTypes.bool,

  nav: PropTypes.bool,
};

const defaultProps = {
  'aria-haspopup': true,
  color: 'secondary',
};



class Dropdown extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      isOpen: false
    };

    this.toggle = this.toggle.bind(this);
    this.onClick = this.onClick.bind(this);

  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  onClick(e) {
    if (this.props.disabled) {
      e.preventDefault();
      return;
    }

    if (this.props.nav ) {
      e.preventDefault();
    }

    if (this.props.onClick) {  //hooks
      this.props.onClick(e);
    }

    this.toggle();
  }

  render() {
    const { className, color, caret, split, nav , ...props } = this.props;
    const ariaLabel = props['aria-label'] || 'Toggle Dropdown';

    const classes = getClassNames(
      className,
      'dropdown-toggle',
      {
        'dropdown-toggle-split': split,
        'nav-link': nav
      }
    );




  
      return (


        <li className="nav-item dropdown">

          <a
            {...props}
            className={classes}
            onClick={this.onClick}
            aria-expanded={this.state.isOpen}
            aria-label ={ariaLabel}
          > anas </a>

          <DropdownMenu isOpen={this.state.isOpen} />
        </li>
      );
    


  }
}

Dropdown.propTypes = propTypes;
Dropdown.defaultProps = defaultProps;

export default Dropdown;