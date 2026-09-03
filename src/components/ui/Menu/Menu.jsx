'use client';

import { createPortal } from 'react-dom';
import { useMenu } from './Menu.js';
import './Menu.css';

export default function Menu({
  trigger,
  options = [],
  selectedValue,
  onSelect,
  label,
  align = 'start',
}) {
  const {
    isOpen,
    menuContainerRef,
    panelRef,
    optionRefs,
    panelPosition,
    toggleMenu,
    selectOption,
    handleMenuKeyDown,
  } = useMenu({ options, selectedValue, onSelect, align });

  const isSelectionMenu = selectedValue !== undefined;

  const menuPanel =
    isOpen && typeof document !== 'undefined'
      ? createPortal(
          <div
            ref={panelRef}
            className="menu__panel"
            style={panelPosition}
            role="menu"
            aria-label={label}
            onKeyDown={handleMenuKeyDown}
          >
            {options.map((option, index) => {
              const isSelected = option.value === selectedValue;

              return (
                <button
                  className="menu__option"
                  type="button"
                  role={isSelectionMenu ? 'menuitemradio' : 'menuitem'}
                  aria-checked={isSelectionMenu ? isSelected : undefined}
                  aria-disabled={option.disabled || undefined}
                  disabled={option.disabled}
                  key={option.value}
                  ref={(element) => {
                    optionRefs.current[index] = element;
                  }}
                  onClick={() => selectOption(option)}
                >
                  {option.label}
                </button>
              );
            })}
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <div className="menu" ref={menuContainerRef}>
        {trigger({ isOpen, toggleMenu })}
      </div>
      {menuPanel}
    </>
  );
}
