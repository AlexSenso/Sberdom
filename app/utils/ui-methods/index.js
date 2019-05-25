/**
 * Scroll To Section function
 * @param e
 * @param behavior
 * @param block
 */
export function scrollTo(e, behavior = 'smooth', block = 'start') {
  e.preventDefault();
  const { section } = e.target.dataset;
  document.getElementsByClassName(section)[0].scrollIntoView({
    behavior,
    block,
  });
}
