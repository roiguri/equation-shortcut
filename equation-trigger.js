/**
 * Modular equation trigger functionality for Google Docs
 * This file contains the core logic for inserting equations
 */

/**
 * Attempts to trigger equation insertion in Google Docs
 * Finds and clicks the equation button using mouse events
 *
 * @returns {boolean} True if successful, false otherwise
 */
function triggerEquationInsertion() {
  console.log('[Equation Shortcut] Attempting to insert equation...');

  if (tryDirectButtonClick()) {
    console.log('[Equation Shortcut] Successfully triggered equation insertion');
    return true;
  }

  console.warn('[Equation Shortcut] Failed to find equation button');
  return false;
}

/**
 * Strategy 1: Attempt to find and click the equation button in the toolbar
 * This searches for common selectors used by Google Docs
 *
 * @returns {boolean} True if button found and clicked
 */
function tryDirectButtonClick() {
  // Common selectors for the equation button in Google Docs
  // Priority order: ID selector first (most reliable), then fallbacks
  const selectors = [
    '#insert-equation-button',
    'div[aria-label*="Equation"]',
    'div[aria-label*="equation"]',
    'div[data-tooltip*="Equation"]',
    'div[data-tooltip*="equation"]',
    '.docs-icon-equation',
    '[role="button"][aria-label*="Equation"]'
  ];

  for (const selector of selectors) {
    const button = document.querySelector(selector);
    if (button) {
      console.log(`[Equation Shortcut] Found equation button with selector: ${selector}`);

      // Google Docs requires full mouse event sequence
      const mouseDownEvent = new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
        view: window
      });
      button.dispatchEvent(mouseDownEvent);

      const clickEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      });
      button.dispatchEvent(clickEvent);

      const mouseUpEvent = new MouseEvent('mouseup', {
        bubbles: true,
        cancelable: true,
        view: window
      });
      button.dispatchEvent(mouseUpEvent);

      return true;
    }
  }

  return false;
}

// Export for use in content script
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { triggerEquationInsertion };
}
