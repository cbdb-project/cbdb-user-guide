// Keep visual numbering continuous for split ordered lists in Chapter 2 overview,
// without modifying source Markdown authored content.
document$.subscribe(function () {
  var path = window.location.pathname;
  if (!path.includes('/chapter_2_the_structure_of_cbdb/')) return;

  var content = document.querySelector('.md-content__inner');
  if (!content) return;

  var headings = content.querySelectorAll('h3');
  var startHeading = null;
  for (var i = 0; i < headings.length; i++) {
    if (headings[i].textContent.trim().startsWith('A. An Overview of the Entities in the Database')) {
      startHeading = headings[i];
      break;
    }
  }
  if (!startHeading) return;

  var next = startHeading.nextElementSibling;
  var counter = 1;

  while (next && next.tagName !== 'H3') {
    if (next.tagName === 'OL') {
      next.setAttribute('start', String(counter));
      counter += next.querySelectorAll(':scope > li').length;
    }
    next = next.nextElementSibling;
  }
});
