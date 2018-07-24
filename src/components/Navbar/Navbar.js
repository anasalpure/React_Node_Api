import React from 'react';
import PropTypes from 'prop-types';
import {  deprecated ,getClassNames } from '../utils';

const propTypes = {
  light: PropTypes.bool,
  dark: PropTypes.bool,
  inverse: deprecated(PropTypes.bool, 'Please use the prop "dark"'),
  full: PropTypes.bool,
  fixed: PropTypes.string,
  sticky: PropTypes.string,
  color: PropTypes.string,
  role: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  className: PropTypes.string,
  cssModule: PropTypes.object,
  toggleable: deprecated(PropTypes.oneOfType([PropTypes.bool, PropTypes.string]), 'Please use the prop "expand"'),
  expand: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

const defaultProps = {
  tag: 'nav',
  expand: false,
};

const getExpandClass = (expand) => {
  if (expand === false) {
    return false;
  } else if (expand === true || expand === 'sm') {
    return 'navbar-expand';
  }
  // 'md','lg', 'xl'
  return `navbar-expand-${expand}`;
};





const Navbar = (props) => {
  const {
    toggleable,
    expand,
    className,
    cssModule,
    light,
    dark,
    inverse,
    fixed,
    sticky,
    color,
    tag: Tag,
    ...attributes
  } = props;

  const classes = getClassNames(
    className,
    'navbar',
    getExpandClass(expand) ,
    {
      'navbar-light': light,
      'navbar-dark': inverse || dark,
      [`bg-${color}`]: color,
      [`fixed-${fixed}`]: fixed,
      [`sticky-${sticky}`]: sticky,
    }
  );

  return (
    <Tag {...attributes}  className={classes} />
  );
};

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;

export default Navbar;
