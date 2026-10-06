(() => {
  const projectId = 'yqjnlg0o72';
  const localHosts = new Set(['localhost', '127.0.0.1', '[::1]']);

  // Keep automated/local QA traffic out of the production Clarity project.
  if (localHosts.has(window.location.hostname)) return;

  window.clarity = window.clarity || function clarity() {
    (window.clarity.q = window.clarity.q || []).push(arguments);
  };

  const clarityTag = document.createElement('script');
  clarityTag.async = true;
  clarityTag.src = `https://www.clarity.ms/tag/${projectId}`;

  const firstScript = document.getElementsByTagName('script')[0];
  firstScript.parentNode.insertBefore(clarityTag, firstScript);
})();
