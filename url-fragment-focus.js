/**
 * Better focusing with url fragments
 * Author: Will Christenson
 * Adapted from https://github.com/selfthinker/dokuwiki_template_writr/blob/master/js/skip-link-focus-fix.js
 */

// Check if this element is already focusable
const isFocusable = function(element) {
  return (element.matches('input:enabled') || element.matches('a[href]') || element.matches('area[href]') ||
    element.matches('button') || element.matches('select') || element.matches('textarea') || element.matches('object')
    || element.matches('[tabindex]:not([tabindex="-1"])')) && element.offsetParent !== null;
}

// Focus on a given element
function focusOnElement(element) {
  if (!element) return;

  if (!isFocusable(element)) {
    // add tabindex to make focusable and remove again, when focus changes
    element.setAttribute('tabindex', -1);
    element.addEventListener('blur', removeTabindex);
    element.addEventListener('focusout', removeTabindex);
  }

  element.focus();
}

const removeTabindex = function(element) {
  this.removeAttribute('tabindex');
};

document.addEventListener('DOMContentLoaded',function() {
  // if there is a '#' in the URL (someone linking directly to a page with an anchor)
  if (document.location.hash) {
    const focusElement = document.getElementById(document.location.hash.substring(1));

    focusOnElement(focusElement);
  }

  // if the hash has been changed (activation of an in-page link)
  window.addEventListener('hashchange', function() {
    const hash = window.location.hash.replace(/^#/,'');
    const focusElement = document.getElementById(hash);

    focusOnElement(focusElement);
  });
});
