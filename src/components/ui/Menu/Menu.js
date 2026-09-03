'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

export function useMenu({
  options = [],
  selectedValue,
  onSelect,
  align = 'start',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [panelPosition, setPanelPosition] = useState({
    top: 0,
    left: 0,
    visibility: 'hidden',
  });

  const menuContainerRef = useRef(null);
  const panelRef = useRef(null);
  const optionRefs = useRef([]);
  const triggerElementRef = useRef(null);

  function getEnabledOptionIndexes() {
    return options.reduce((indexes, option, index) => {
      if (!option.disabled) indexes.push(index);
      return indexes;
    }, []);
  }

  function focusOption(index) {
    optionRefs.current[index]?.focus();
  }

  function openMenu() {
    triggerElementRef.current = document.activeElement;
    setPanelPosition({ top: 0, left: 0, visibility: 'hidden' });
    setIsOpen(true);
  }

  function closeMenu(restoreTriggerFocus = false) {
    setIsOpen(false);

    if (restoreTriggerFocus) {
      requestAnimationFrame(() => triggerElementRef.current?.focus());
    }
  }

  function toggleMenu() {
    if (isOpen) {
      closeMenu();
      return;
    }

    openMenu();
  }

  function selectOption(option) {
    if (option.disabled) return;
    onSelect?.(option.value, option);
    closeMenu(true);
  }

  function handleMenuKeyDown(event) {
    const enabledIndexes = getEnabledOptionIndexes();
    if (enabledIndexes.length === 0) return;

    const currentIndex = optionRefs.current.findIndex(
      (optionElement) => optionElement === document.activeElement,
    );
    const currentEnabledPosition = enabledIndexes.indexOf(currentIndex);

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      const nextPosition =
        currentEnabledPosition === -1
          ? 0
          : (currentEnabledPosition + 1) % enabledIndexes.length;
      focusOption(enabledIndexes[nextPosition]);
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      const previousPosition =
        currentEnabledPosition <= 0
          ? enabledIndexes.length - 1
          : currentEnabledPosition - 1;
      focusOption(enabledIndexes[previousPosition]);
    }

    if (event.key === 'Home') {
      event.preventDefault();
      focusOption(enabledIndexes[0]);
    }

    if (event.key === 'End') {
      event.preventDefault();
      focusOption(enabledIndexes[enabledIndexes.length - 1]);
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      closeMenu(true);
    }

    if (event.key === 'Tab') closeMenu();
  }

  useEffect(() => {
    if (!isOpen) return;

    const selectedIndex = options.findIndex(
      (option) => option.value === selectedValue && !option.disabled,
    );
    const firstEnabledIndex = options.findIndex((option) => !option.disabled);
    const optionToFocus = selectedIndex >= 0 ? selectedIndex : firstEnabledIndex;

    requestAnimationFrame(() => focusOption(optionToFocus));
  }, [isOpen, options, selectedValue]);

  useEffect(() => {
    if (!isOpen) return undefined;

    function handleOutsideClick(event) {
      const clickedTrigger = menuContainerRef.current?.contains(event.target);
      const clickedPanel = panelRef.current?.contains(event.target);

      if (!clickedTrigger && !clickedPanel) closeMenu();
    }

    document.addEventListener('pointerdown', handleOutsideClick);
    return () => document.removeEventListener('pointerdown', handleOutsideClick);
  }, [isOpen]);

  useLayoutEffect(() => {
    if (!isOpen) return undefined;

    function updatePanelPosition() {
      const triggerElement = menuContainerRef.current;
      const panelElement = panelRef.current;
      if (!triggerElement || !panelElement) return;

      const triggerRect = triggerElement.getBoundingClientRect();
      const panelRect = panelElement.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const viewportGap = 16;
      const triggerGap = 8;

      const spaceBelow = viewportHeight - triggerRect.bottom - viewportGap;
      const spaceAbove = triggerRect.top - viewportGap;
      const shouldOpenAbove =
        spaceBelow < panelRect.height && spaceAbove > spaceBelow;

      let top = shouldOpenAbove
        ? triggerRect.top - panelRect.height - triggerGap
        : triggerRect.bottom + triggerGap;

      const maximumTop = viewportHeight - panelRect.height - viewportGap;
      top = Math.min(
        Math.max(top, viewportGap),
        Math.max(viewportGap, maximumTop),
      );

      let left =
        align === 'end'
          ? triggerRect.right - panelRect.width
          : triggerRect.left;

      const maximumLeft = viewportWidth - panelRect.width - viewportGap;
      left = Math.min(
        Math.max(left, viewportGap),
        Math.max(viewportGap, maximumLeft),
      );

      setPanelPosition({ top, left, visibility: 'visible' });
    }

    updatePanelPosition();
    window.addEventListener('resize', updatePanelPosition);
    window.addEventListener('scroll', updatePanelPosition, true);

    return () => {
      window.removeEventListener('resize', updatePanelPosition);
      window.removeEventListener('scroll', updatePanelPosition, true);
    };
  }, [isOpen, align, options]);

  return {
    isOpen,
    menuContainerRef,
    panelRef,
    optionRefs,
    panelPosition,
    toggleMenu,
    selectOption,
    handleMenuKeyDown,
  };
}
