(() => {
  const projectId = 'yqjnlg0o72';

  window.clarity = window.clarity || function clarity() {
    (window.clarity.q = window.clarity.q || []).push(arguments);
  };

  const clarityTag = document.createElement('script');
  clarityTag.async = true;
  clarityTag.src = `https://www.clarity.ms/tag/${projectId}`;

  const firstScript = document.getElementsByTagName('script')[0];
  firstScript.parentNode.insertBefore(clarityTag, firstScript);
})();
