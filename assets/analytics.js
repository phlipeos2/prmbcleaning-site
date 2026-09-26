(() => {
  const measurementId = 'G-QRXZ5P920F';

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    send_page_view: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false
  });

  const googleTag = document.createElement('script');
  googleTag.async = true;
  googleTag.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(googleTag);

  const sendEvent = (name, parameters = {}) => {
    window.gtag('event', name, {
      transport_type: 'beacon',
      ...parameters
    });
  };

  window.prmbTrackLead = (method, service) => {
    sendEvent('generate_lead', {
      method,
      service: service || 'not_specified'
    });
  };

  document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', (event) => {
      const link = event.target.closest('a[href]');
      if (!link) return;

      const href = link.getAttribute('href') || '';
      if (href.startsWith('tel:')) {
        sendEvent('click_to_call', { link_url: href });
      } else if (href.startsWith('sms:')) {
        sendEvent('click_to_text', { link_url: href });
      } else if (href.startsWith('mailto:')) {
        sendEvent('click_to_email', { link_url: href.split('?')[0] });
      }
    });
  });
})();
