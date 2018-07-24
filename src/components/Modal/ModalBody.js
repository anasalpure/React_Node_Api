import React from 'react';
import PropTypes from 'prop-types';
import { getClassNames } from '../utils';
import { mapToCssModules } from '../utils';

const propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  className: PropTypes.string,
  cssModule: PropTypes.object,
};

const defaultProps = {
  tag: 'div',
};

const ModalBody = (props) => {
  const {
    className,
    cssModule,
    tag: Tag,
    ...attributes } = props;
  const classes = mapToCssModules(getClassNames(
    className,
    'modal-body'
  ), cssModule);

  return (
    <Tag {...attributes} className={classes} />
  );
};

ModalBody.propTypes = propTypes;
ModalBody.defaultProps = defaultProps;

export default ModalBody;
