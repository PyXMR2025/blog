// Vercel Analytics initialization
// This script initializes both Vercel Speed Insights and Web Analytics on the client side only
if (typeof window !== 'undefined') {
  // Initialize Vercel Speed Insights
  import('@vercel/speed-insights').then(({ injectSpeedInsights }) => {
    injectSpeedInsights();
  }).catch(err => {
    console.warn('Failed to load Vercel Speed Insights:', err);
  });

  // Initialize Vercel Web Analytics
  import('@vercel/analytics').then(({ inject }) => {
    inject();
  }).catch(err => {
    console.warn('Failed to load Vercel Web Analytics:', err);
  });
}
