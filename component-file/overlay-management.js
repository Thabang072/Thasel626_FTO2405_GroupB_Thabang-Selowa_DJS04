/**
 * Set up event listeners for overlay controls and toggles.
 * This function attaches handlers to elements that control the visibility of various overlays,
 * such as search, settings, and book detail overlays.
 */
export function setupOverlayEventListeners() {
    // Set up event listener for the search overlay cancel button
    document.querySelector('[data-search-cancel]').addEventListener('click', () => {
        // Close the search overlay when the cancel button is clicked
        document.querySelector('[data-search-overlay]').open = false;
    });
  
    // Set up event listener for the settings overlay cancel button
    document.querySelector('[data-settings-cancel]').addEventListener('click', () => {
        // Close the settings overlay when the cancel button is clicked
        document.querySelector('[data-settings-overlay]').open = false;
    });
  
    // Set up event listener for the header search button
    document.querySelector('[data-header-search]').addEventListener('click', () => {
        // Open the search overlay when the search button is clicked
        document.querySelector('[data-search-overlay]').open = true;
        // Focus on the search input field within the search overlay
        document.querySelector('[data-search-title]').focus();
    });
  
    // Set up event listener for the header settings button
    document.querySelector('[data-header-settings]').addEventListener('click', () => {
        // Open the settings overlay when the settings button is clicked
        document.querySelector('[data-settings-overlay]').open = true;
    });
  
    // Set up event listener for the close button in the book details overlay
    document.querySelector('[data-list-close]').addEventListener('click', () => {
        // Close the book details overlay when the close button is clicked
        document.querySelector('[data-list-active]').open = false;
    });
  }
  