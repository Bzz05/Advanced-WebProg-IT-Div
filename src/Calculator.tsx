import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import SupportPage from './SupportPage';
import './App.css';

const Calculator: React.FC = () => {
  const [input, setInput] = useState<string>("0");
  const [history, setHistory] = useState<string[]>([]);
  const [evaluated, setEvaluated] = useState<boolean>(false);
  const [currentButton, setCurrentButton] = useState<string>('0');
  const supportLink = <Link to="/support" className="link-btn">?</Link>;

  function replaceX(expression: string): string {
    const expressionArray = expression.split('');
    for (let i = 0; i < expressionArray.length; i++) {
      if (expressionArray[i] === 'x') {
        expressionArray[i] = '*';
      }
    }
  
    return expressionArray.join('');
  }

  const evaluateExpression = (expression: string): string => {
    try {
      expression = replaceX(expression);
      const result = eval(expression);
      return Number.isInteger(result) ? result.toString() : result.toFixed(5);
    } catch (error) {
      return 'Infinity';
    }
  };

  const handleButtonClick = (value: string) => {
    if(evaluated && value >= '0' && value <= '9') return
    if (value === 'C') {
      setInput('0');
      setCurrentButton('0');
      setEvaluated(false);
    } else if (value === 'DEL') {
      setInput((prevInput) => prevInput.slice(0, -1) || '0');
      setCurrentButton((prevInput) => prevInput.slice(0, -1) || '0');
    } else if (value === '=') {
      const result = evaluateExpression(input);
      if (result !== 'Infinity') setHistory((prevHistory) => [...prevHistory, result]);
      setCurrentButton(result);
      setInput(result);
      setEvaluated(true);
    }else {
      setCurrentButton((prevInput) => {
        return !['x', '/', '+', '-'].includes(value) && !['x', '/', '+', '-'].includes(prevInput.slice(-1)) && prevInput != '0' ? prevInput + value : value;
      });
      setInput((prevInput) => {
        if (['x', '/', '+', '-'].includes(prevInput.slice(-1)) && ['x', '/', '+', '-'].includes(value)) {
          return prevInput.slice(0, -1) + value;
        }
        return prevInput === '0' ? value : prevInput + value;
      });

      setEvaluated(false);
    }
  };
  

  return (
      <>
      <div className="calculator">
        <div className="output-box">
          <div className="history-box">
            <ul>
              {history.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="current-input">{input === 'Infinity' ? 'Err' : currentButton}</div>
        </div>
        <div className="number-operator-box">
          {['C', 'DEL', supportLink , '/', '1', '2', '3', 'x', '4', '5', '6', '-', '7', '8', '9', '+', '0', '='].map((value, index) => (
          <button key={index} className={(value === 'C' || value === 'DEL' || (value >= '1' && value <= '9')) ? 'gray' : (value === '0') ? 'span-two-zero' : (value === '=') ? 'span-two-equal' : (value === 'x' || value === '/' || value === '+' || value === '-') ? 'yellow': 'question'} onClick={() => handleButtonClick(value.toString())}>
          {value}
        </button>
))}

        </div>
      </div>
      </>
  );
};

export default Calculator;
