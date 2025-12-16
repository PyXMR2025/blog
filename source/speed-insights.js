// Vercel Speed Insights initialization
// This script initializes Vercel Speed Insights on the client side only
if (typeof window !== 'undefined') {
  import('@vercel/speed-insights').then(({ injectSpeedInsights }) => {
    injectSpeedInsights();
  }).catch(err => {
    console.warn('Failed to load Vercel Speed Insights:', err);
  });
}
