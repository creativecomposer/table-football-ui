import React, { FunctionComponent, useState } from 'react';
import './selector.component.scss';

type SelectorProps = {
  label?: string;
  name?: string;
  onChange: (name: string, value: string) => void;
  onNew: (name: string, value: string) => void;
  options: string[];
  value: string;
};

export const Selector: FunctionComponent<SelectorProps> = (props: SelectorProps) => {
  const { label, name, onChange, onNew, options, value } = props;
  const [showNewItemPopup, setShowNewItemPopup] = useState(false);
  const [itemName, setItemName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onValueChange = (event: React.FormEvent<HTMLSelectElement>): void => {
    const eventTarget = event.currentTarget;
    onChange(name || '', eventTarget.value);
  };

  const onNameChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const eventTarget = event.currentTarget;
    setItemName(eventTarget.value);
    setErrorMessage('');
  };

  const onNewItem = () => {
    setShowNewItemPopup(true);
  };

  const createNewItem = () => {
    if (itemName.length < 2) {
      setErrorMessage(`${label} name should atleast be 2 characters long`);
      return;
    }

    const isUnique = options.reduce((accumulator: boolean, currentValue: string) => {
      if (accumulator === false) {
        return false;
      }
      if (currentValue.toLowerCase() === itemName.toLowerCase()) {
        return false;
      }
      return true;
    }, true);

    if (!isUnique) {
      setErrorMessage(`${label} already exists`);
      return;
    }

    setShowNewItemPopup(false);
    onNew(name || '', itemName);
    setItemName('');
  };

  const cancel = () => {
    setShowNewItemPopup(false);
    setItemName('');
    setErrorMessage('');
  };

  return (
    <div>
      <div>
        <label>
          {label}
          <select className="select selector__margin" onChange={onValueChange} value={value}>
            <option value="">--Please choose an option--</option>
            {options.map((option: string) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <input type="button" className="button" value="+" onClick={onNewItem} />
      </div>
      <aside className={showNewItemPopup ? 'selector__popup selector__popup--show' : 'selector__popup'}>
        <div className="selector__new-item">
          <h4 className="selector__new-item-title">New {label}</h4>
          <label className="selector__new-item-name">
            Name
            <input
              type="text"
              className="edit selector__margin"
              maxLength={20}
              value={itemName}
              onChange={onNameChange}
            />
          </label>
          {errorMessage !== '' && <p className="error selector__error-message">{errorMessage}</p>}
          <button type="button" className="button button--primary selector__create-new" onClick={createNewItem}>
            Create
          </button>
          <button type="button" className="button selector__cancel" onClick={cancel}>
            Cancel
          </button>
        </div>
      </aside>
    </div>
  );
};

Selector.defaultProps = {
  label: '',
  name: '',
};
