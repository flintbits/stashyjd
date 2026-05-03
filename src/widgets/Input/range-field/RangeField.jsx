import React from "react";
import "./RangeField.css";

const RangeField = ({
  id,
  label,
  required = false,
  value,
  onChange,
  error = "",
}) => {
  // If value isn't provided, use a default range for the UI representation
  const valArray = Array.isArray(value) ? value : [120000, 160000];

  return (
    <div className={`range-field ${error ? "has-error" : ""}`}>
      {label && (
        <label className="range-label">
          {label} {required && <span>*</span>}
        </label>
      )}

      <div className="range-wrapper">
        <div className="range-input-box">
          <span className="currency-symbol">$</span>
          <input 
            type="text" 
            value={valArray[0].toLocaleString()} 
            onChange={(e) => {
              // placeholder logic for min value
            }}
            className="range-number-input"
          />
        </div>

        <div className="range-slider-container">
          {/* Simple placeholder slider track and thumbs */}
          <div className="slider-track"></div>
          <div className="slider-fill" style={{ left: '20%', right: '30%' }}></div>
          <div className="slider-thumb" style={{ left: '20%' }}></div>
          <div className="slider-thumb" style={{ left: '70%' }}></div>
        </div>

        <div className="range-input-box">
          <span className="currency-symbol">$</span>
          <input 
            type="text" 
            value={valArray[1].toLocaleString()} 
            onChange={(e) => {
              // placeholder logic for max value
            }}
            className="range-number-input"
          />
        </div>
      </div>

      {error && <p className="range-error">{error}</p>}
    </div>
  );
};

export default RangeField;
