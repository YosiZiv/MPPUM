import React from 'react';
import './TextArea.css';
const textArea = props => {
  const {
    id,
    type,
    name,
    required,
    defaultValue,
    disabled,
    error,
    showTitle,
    className,
    validation,
    isValid,
  } = props;
  const isValidClass = !isValid ? ' invalid' : '';
  const handleKeyDown = event => {
    // Preventing from invalid characters to be inserted in the number input.
    if (type === 'number' && ['-', '+', 'e'].includes(event.key)) {
      event.preventDefault();
    }
  };

  const handleChange = event => {
    event.preventDefault();
    const { type } = props;
    const { value } = event.currentTarget;
    const formattedValue = type === 'number' ? Number(value) : value;
    const { id, inputChange } = props;
    inputChange({ id, value: formattedValue, validation });
  };

  return (
    <div className="text-input-container">
      {showTitle && (
        <h3>
          <strong>
            {name} {required && <span className="text-danger">*</span>}
          </strong>
        </h3>
      )}
      <textarea
        id={id}
        type={type}
        value={defaultValue}
        disabled={disabled}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={`Enter ${name}`}
        autoComplete="off"
        className={className + isValidClass}
      />
      <div className="text-input-error-message">
        {error && <small className="text-danger">{error}</small>}
      </div>
    </div>
  );
};

textArea.defaultProps = {
  type: 'text',
  error: null,
  required: false,
  disabled: false,
  showTitle: true,
  className: '',
  defaultValue: '',
};

export default textArea;
