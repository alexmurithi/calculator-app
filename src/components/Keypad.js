import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const StyledButton = styled(Button)`
  width: 110px;
  height: 65px;
  border-radius: 10px;
  box-shadow: inset 0px -4px 0px #3a4663;

  &.del {
    background-color: #647198;
  }

  &.reset {
    width: 230px;
    background-color: #647198;
  }

  &.equalsTo {
    width: 230px;
    background-color: #d03f2f;
  }
`;

const StyledButtonText = styled(Typography)`
  color: #ffff;
`;

const Keypad = ({ onClick, children, buttonprops, uncommon }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <StyledButton variant="contained" className={`${buttonprops}`} onClick={onClick}>
      <StyledButtonText variant={isSmallScreen ? 'h5' : 'h4'} className={uncommon ? '' : ''}>
        <b>{children}</b>
      </StyledButtonText>
    </StyledButton>
  );
};

Keypad.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.element,
  buttonprops: PropTypes.any,
  uncommon: PropTypes.any
};

export default Keypad;
