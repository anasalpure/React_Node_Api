import React from 'react';
import PropTypes from 'prop-types';
import {  getClassNames} from '../../utils';

const propTypes = {
  right: PropTypes.bool,
  flip: PropTypes.bool,
  modifiers: PropTypes.object,
  className: PropTypes.string,
  persist: PropTypes.bool,
  isOpen :PropTypes.bool,
};

const defaultProps = {
  flip: true,
  isOpen:false,
};



const noFlipModifier = { flip: { enabled: false } };

const directionPositionMap = {
  up: 'top',
  left: 'left',
  right: 'right',
  down: 'bottom',
};

const DropdownMenu = (props, context) => {
  const { className , right , flip, modifiers, persist ,isOpen, ...attrs } = props;
  const classes = getClassNames(
    className,
    'dropdown-menu',
    {
      'dropdown-menu-right': right,
      show: isOpen,
    }
  );

  const ariaLabel = props['aria-label'] || 'Dropdown menu';



  if (persist || isOpen ) {

    const position1 = directionPositionMap[context.direction] || 'bottom';
    const position2 = right ? 'end' : 'start';
    attrs.placement = `${position1}-${position2}`;
    attrs.modifiers = !flip ? {
      ...modifiers,
      ...noFlipModifier,
    } : modifiers;
  }

  return (
    <div
      tabIndex="-1"
      role="menu"
      {...attrs}
      aria-hidden={!isOpen}
      className={classes}
      x-placement={attrs.placement} 
      aria-label={ariaLabel}
    >
    
      <a className="dropdown-item" href="#">Action</a>
      <a className="dropdown-item" href="#">Another action</a>
      <div className="dropdown-divider"></div>
      <a className="dropdown-item" href="#">Something else here</a>
      
    </div>
  );
};

DropdownMenu.propTypes = propTypes;
DropdownMenu.defaultProps = defaultProps;


export default DropdownMenu;


/*
 <li className="nav-item dropdown">
    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Dropdown
    </a>
    **************************************************************************************
    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
      <a className="dropdown-item" href="#">Action</a>
      <a className="dropdown-item" href="#">Another action</a>
      <div className="dropdown-divider"></div>
      <a className="dropdown-item" href="#">Something else here</a>
    </div>
    ***************************************************************************************
</li>
 */