import React, { useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import includes from 'lodash/includes';
import { Box, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import KeyPad from './Keypad';
import Header from './Header';
import { BASE_URL } from '../utils/Constants';

import styled from '@emotion/styled';

const Root = styled(Box)(({ theme }) => ({
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
  height: '100vh',
  backgroundColor: theme.palette.primary.light,
  color: '#000000'
}));

const StyledTextField = styled(TextField)(({ checked, theme }) => ({
  marginTop: 10,
  marginBottom: 20,
  direction: 'rtl',
  borderRadius: 10,
  backgroundColor: checked ? theme.palette.primary.dark : theme.palette.secondary.dark,
  '& input': {
    color: checked ? '#ffff' : '#000000',
    fontSize: 48
  }
}));

const ButtonBox = styled(Box)(({ checked, theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: checked ? theme.palette.primary.main : theme.palette.secondary.main,
  borderRadius: 10,
  padding: 25,
  gap: 25,
  [theme.breakpoints.down('sm')]: {
    padding: 15,
    gap: 15
  }
}));

const ButtonSecondaryBox = styled(Box)({
  display: 'flex',
  gap: 25
});

const StyledKeyPad = styled(KeyPad)(() => ({
  width: 110,
  height: 65,
  borderRadius: 10,
  boxShadow: 'inset 0px -4px 0px #3a4663',
  '&.del': {
    backgroundColor: '#647198'
  },
  '&.reset': {
    width: 230,
    backgroundColor: '#647198'
  },
  '&.equalsTo': {
    width: 230,
    backgroundColor: '#D03F2F'
  }
}));

const Calculator = () => {
  const [value, setValue] = useState(0);
  const [operator, setOperator] = useState('');
  const [firstTerm, setFirstTerm] = useState(0);
  const [secondTerm, setSecondTerm] = useState(0);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const saveCalculation = async () => {
    try {
      const data = {
        operand1: firstTerm,
        operand2: secondTerm,
        operator: operator
      };

      const response = await fetch(`${BASE_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        console.log('Data saved successfully.');
      } else {
        console.error('Failed to save data to the database.');
      }
    } catch (error) {
      console.error('Error while saving data:', error);
    }
  };

  const performOperation = (op) => {
    if (!isEmpty(operator)) {
      return;
    } else {
      setOperator(op);
    }
  };

  const handleClick = (num) => {
    if (isEmpty(operator)) {
      if (value === 0) {
        setValue(num);
        setFirstTerm(num);
      } else if (num === 'dot') {
        if (includes(value, '.')) {
          return;
        }
        setValue(value + '.');
      } else {
        setValue('' + value + num);
        setFirstTerm('' + value + num);
      }
    } else {
      if (secondTerm === 0) {
        setValue(num);
        setSecondTerm(num);
      } else if (num === 'dot') {
        if (includes(value, '.')) {
          return;
        }
        setFirstTerm(value);
        setSecondTerm('' + secondTerm + '.');
        setValue('' + secondTerm + '.');
      } else {
        setSecondTerm('' + secondTerm + num);
        setValue('' + secondTerm + num);
      }
    }
  };

  const getResult = () => {
    if (!isEmpty(operator)) {
      let result;
      if (operator === '+') {
        result = parseFloat(firstTerm) + parseFloat(secondTerm);
        setValue(result);
      } else if (operator === '-') {
        result = parseFloat(firstTerm) - parseFloat(secondTerm);
        setValue(result);
      } else if (operator === '*') {
        result = parseFloat(firstTerm) * parseFloat(secondTerm);
        setValue(result);
      } else if (operator === '/') {
        result = parseFloat(firstTerm) / parseFloat(secondTerm);
        setValue(result);
      } else {
        setValue(0);
      }
      saveCalculation();
      setOperator('');
      setFirstTerm(result);
      setSecondTerm(0);
    }
  };

  const reset = () => {
    setValue(0);
    setFirstTerm(0);
    setOperator('');
    setSecondTerm(0);
  };

  const val = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return (
    <>
      <Header />

      <Root>
        <Box display="flex" flexDirection="column" width={isSmallScreen ? 350 : 540}>
          <Box display="flex" justifyContent="space-between"></Box>
          <StyledTextField fullWidth variant="outlined" value={val} disabled />
          <ButtonBox>
            <ButtonSecondaryBox>
              <StyledKeyPad onClick={() => handleClick(7)}>7</StyledKeyPad>
              <StyledKeyPad onClick={() => handleClick(8)}>8</StyledKeyPad>
              <StyledKeyPad onClick={() => handleClick(9)}>9</StyledKeyPad>
              <StyledKeyPad
                onClick={() => setValue(Math.floor(value / 10))}
                buttonprops="del"
                uncommon>
                Del
              </StyledKeyPad>
            </ButtonSecondaryBox>
            <ButtonSecondaryBox>
              <StyledKeyPad onClick={() => handleClick(4)}>4</StyledKeyPad>
              <StyledKeyPad onClick={() => handleClick(5)}>5</StyledKeyPad>
              <StyledKeyPad onClick={() => handleClick(6)}>6</StyledKeyPad>
              <StyledKeyPad onClick={() => performOperation('+')}>+</StyledKeyPad>
            </ButtonSecondaryBox>
            <ButtonSecondaryBox>
              <StyledKeyPad onClick={() => handleClick(1)}>1</StyledKeyPad>
              <StyledKeyPad onClick={() => handleClick(2)}>2</StyledKeyPad>
              <StyledKeyPad onClick={() => handleClick(3)}>3</StyledKeyPad>
              <StyledKeyPad onClick={() => performOperation('-')}>-</StyledKeyPad>
            </ButtonSecondaryBox>
            <ButtonSecondaryBox>
              <StyledKeyPad onClick={() => handleClick('dot')}>.</StyledKeyPad>
              <StyledKeyPad onClick={() => handleClick(0)}>0</StyledKeyPad>
              <StyledKeyPad onClick={() => performOperation('/')}>/</StyledKeyPad>
              <StyledKeyPad onClick={() => performOperation('*')}>×</StyledKeyPad>
            </ButtonSecondaryBox>
            <ButtonSecondaryBox>
              <StyledKeyPad onClick={reset} buttonprops="reset" uncommon>
                RESET
              </StyledKeyPad>
              <StyledKeyPad onClick={getResult} buttonprops="equalsTo" uncommon>
                =
              </StyledKeyPad>
            </ButtonSecondaryBox>
          </ButtonBox>
        </Box>
      </Root>
    </>
  );
};

Calculator.propTypes = {
  // Define your propTypes here
};

export default Calculator;
