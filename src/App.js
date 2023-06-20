import "./styles.css";
import { useState } from "react";

function App() {
  // State variables
  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");

  // Array of operators
  const ops = ['/', '*', '+', '-', '.'];

  // Update the calculation and result based on button clicks
  const updateCalc = value => {
    // Check for invalid input sequences
    if (
      (ops.includes(value) && calc === '') ||
      (ops.includes(value) && ops.includes(calc.slice(-1)))
    ) {
      return;
    }

    setCalc(calc + value);

    // Evaluate the calculation and update the result
    if (!ops.includes(value)) {
      setResult(eval(calc + value).toString());
    }
  };

  // Generate digit buttons
  const createDigits = () => {
    const digits = [];

    for (let i = 1; i < 10; i++) {
      digits.push(
        <button onClick={() => updateCalc(i.toString())} key={i}>
          {i}
        </button>
      );
    }

    return digits;
  };

  // Perform the calculation
  const calculate = () => {
    setCalc(eval(calc).toString());
  };

  // Delete the last character from the calculation
  const deleteLast = () => {
    if (calc === '') {
      return;
    }

    const value = calc.slice(0, -1);
    setCalc(value);
  };

  return (
    <div className="App">
      <div className="calculator">
        <div className="display">
          {/* Display the result in parentheses if it exists */}
          {result ? <span>({result})</span> : ''}
          {/* Display the calculation or '0' if it's empty */}
          {calc || "0"}
        </div>
        <div className="operators">
          {/* Operator buttons */}
          <button onClick={() => updateCalc('/')}>/</button>
          <button onClick={() => updateCalc('*')}>*</button>
          <button onClick={() => updateCalc('+')}>+</button>
          <button onClick={() => updateCalc('-')}>-</button>
          <button onClick={deleteLast}>DEL</button>
        </div>
        <div className="digits">
          {/* Digit buttons */}
          {createDigits()}
          <button onClick={() => updateCalc('0')}>0</button>
          <button onClick={() => updateCalc('.')}>.</button>
          <button onClick={calculate}>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;
