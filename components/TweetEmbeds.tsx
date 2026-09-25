'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    twttr?: { widgets: { load: (el?: HTMLElement) => void } };
  }
}

// Renders <blockquote class="twitter-tweet"> embeds found in markdown content
export default function TweetEmbeds() {
  useEffect(() => {
    if (!document.querySelector('.twitter-tweet')) return;

    if (window.twttr?.widgets) {
      window.twttr.widgets.load();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return null;
}
