import React from 'react';
import PropTypes from 'prop-types';
import { getClassNames } from '../utils';

const propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  className: PropTypes.string,
  cssModule: PropTypes.object,
};

const defaultProps = {
  tag: 'a'
};

const NavbarBrand = (props) => {
  const {
    className,
    cssModule,
    tag: Tag,
    ...attributes
  } = props;

  const classes =getClassNames(
    className,
    'navbar-brand'
  );

  return (
    <Tag {...attributes} className={classes} />
  );
};

NavbarBrand.propTypes = propTypes;
NavbarBrand.defaultProps = defaultProps;

export default NavbarBrand;
