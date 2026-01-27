/* global CONFIG, dataLayer, gtag */

if (!CONFIG.google_analytics.only_pageview) {
  if (CONFIG.hostname === location.hostname) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      dataLayer.push(arguments);
    };
    gtag('js', new Date());
    gtag('config', CONFIG.google_analytics.tracking_id);

    document.addEventListener('pjax:success', () => {
      gtag('event', 'page_view', {
        page_location: location.href,
        page_path    : location.pathname,
        page_title   : document.title
      });
    });
  }
} else {
  const generateSecureUid = () => {
    if (window.crypto && window.crypto.getRandomValues) {
      const bytes = new Uint8Array(16);
      window.crypto.getRandomValues(bytes);
      return Array.from(bytes).map(b => ('0' + b.toString(16)).slice(-2)).join('');
    }
    // Fallback for environments without crypto; retains previous behavior
    return Math.random() + '.' + Math.random();
  };

  const sendPageView = () => {
    if (CONFIG.hostname !== location.hostname) return;
    const uid = localStorage.getItem('uid') || generateSecureUid();
    localStorage.setItem('uid', uid);
    fetch(
      'https://www.google-analytics.com/mp/collect?' + new URLSearchParams({
        api_secret    : CONFIG.google_analytics.measure_protocol_api_secret,
        measurement_id: CONFIG.google_analytics.tracking_id
      }),
      {
        method : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          client_id: uid,
          events   : [
            {
              name  : 'page_view',
              params: {
                page_location: location.href,
                page_title   : document.title
              }
            }
          ]
        }),
        mode: 'no-cors'
      }
    );
  };
  document.addEventListener('pjax:complete', sendPageView);
  sendPageView();
}
