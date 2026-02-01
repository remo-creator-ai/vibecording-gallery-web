
import React, { useEffect } from 'react';

const CoffeeWidget: React.FC = () => {
  useEffect(() => {
    // Prevent double injection
    if (document.getElementById('bmc-wbtn') || document.querySelector('script[data-id="remoimagevo"]')) {
      return;
    }

    const script = document.createElement('script');
    const div = document.getElementById('supportByBMC');
    
    script.setAttribute('data-name', 'BMC-Widget');
    script.setAttribute('data-cfasync', 'false');
    script.src = 'https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js';
    script.setAttribute('data-id', 'remoimagevo');
    script.setAttribute('data-description', 'Support me on Buy me a coffee!');
    script.setAttribute(
      'data-message',
      'Thank you for visiting skyfishb. If you enjoy the colorful cat and jungle cat series, consider buying me a coffee! ✨🎨'
    );
    script.setAttribute('data-color', '#5F7FFF'); // Changed to match site accent color
    script.setAttribute('data-position', 'Right');
    script.setAttribute('data-x_margin', '18');
    script.setAttribute('data-y_margin', '18');
    script.async = true;
    
    if (div) {
      document.head.appendChild(script);
      
      script.onload = function () {
        const evt = document.createEvent('Event');
        evt.initEvent('DOMContentLoaded', false, false);
        window.dispatchEvent(evt);
      };

      div.appendChild(script);
    }

    return () => {
      // Cleanup on unmount
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      const widget = document.getElementById('bmc-wbtn');
      if (widget) widget.remove();
      const widgetFrame = document.querySelector('iframe[id*="bmc-widget"]');
      if (widgetFrame) widgetFrame.remove();
      
      // Also remove any stylesheet injected by the widget
      const widgetStyle = document.querySelector('style[id*="bmc-widget"]');
      if (widgetStyle) widgetStyle.remove();
    };
  }, []);

  return <div id="supportByBMC"></div>;
};

export default CoffeeWidget;
