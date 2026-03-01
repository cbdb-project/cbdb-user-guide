// Keep visual numbering continuous for split ordered lists in Chapter 2 overview,
// without modifying source Markdown authored content.
document$.subscribe(function () {
  var path = window.location.pathname;
  var content = document.querySelector('.md-content__inner');
  if (!content) return;

  function applyContinuousOl(startNode, stopTagName) {
    if (!startNode) return;
    var next = startNode.nextElementSibling;
    var counter = 1;

    while (next && next.tagName !== stopTagName) {
      if (next.tagName === 'OL') {
        next.setAttribute('start', String(counter));
        counter += next.querySelectorAll(':scope > li').length;
      }
      next = next.nextElementSibling;
    }
  }

  if (path.includes('/chapter_2_the_structure_of_cbdb/')) {
    // Match the shared explicit anchor in both English/Chinese docs.
    var structureHeading = content.querySelector('h3#a-overview');
    applyContinuousOl(structureHeading, 'H3');
    return;
  }

  if (path.includes('/chapter_2_summary_of_tables_in_cbdb/')) {
    // Continue numbering for the section list (1..6) split by intervening tables.
    var summaryHeading = content.querySelector('h2');
    applyContinuousOl(summaryHeading, 'H2');
  }
});
