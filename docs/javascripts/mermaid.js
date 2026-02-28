// Re-render Mermaid diagrams after each Material page navigation.
document$.subscribe(function () {
  mermaid.initialize({ startOnLoad: false });
  mermaid.run({ querySelector: '.mermaid' });
});
