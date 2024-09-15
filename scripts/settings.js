/**
 * Update the theme based on the user's system preference.
 * If the user prefers a dark color scheme, apply dark mode styles.
 * Otherwise, apply light mode styles.
 */
export function updateTheme() {
  // Check if the user prefers a dark color scheme
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // Set the theme to 'night' for dark mode
      document.querySelector('[data-settings-theme]').value = 'night';
      // Update CSS custom properties for dark mode
      document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
      document.documentElement.style.setProperty('--color-light', '10, 10, 20');
  } else {
      // Set the theme to 'day' for light mode
      document.querySelector('[data-settings-theme]').value = 'day';
      // Update CSS custom properties for light mode
      document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
      document.documentElement.style.setProperty('--color-light', '255, 255, 255');
  }
}

/**
 * Handle the submission of the settings form to change the theme.
 * Prevents the default form submission behavior and updates the theme based on user selection.
 * @param {Event} event - The form submission event.
 */
export function handleSettingsFormSubmit(event) {
  event.preventDefault(); // Prevent default form submission behavior
  const formData = new FormData(event.target); // Create a FormData object from the form
  const { theme } = Object.fromEntries(formData); // Extract the theme value from the form data

  // Apply the selected theme
  if (theme === 'night') {
      document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
      document.documentElement.style.setProperty('--color-light', '10, 10, 20');
  } else {
      document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
      document.documentElement.style.setProperty('--color-light', '255, 255, 255');
  }

  // Close the settings overlay
  document.querySelector('[data-settings-overlay]').open = false;
}
