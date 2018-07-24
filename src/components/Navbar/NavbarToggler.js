import React from 'react';
import PropTypes from 'prop-types';
import { mapToCssModules , getClassNames } from '../utils';

const propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};



const NavbarToggler = (props) => {
  const {
    className,
    children,
    ...attributes
  } = props;

  const classes =getClassNames(
    className,
    'navbar-toggler'
  );

  return (
        <div  {...attributes} className={classes} >
            <input   type="checkbox" aria-label="Toggle navigation" role="switch"  />  <span></span>
        </div>
  );
};

NavbarToggler.propTypes = propTypes;

export default NavbarToggler;
