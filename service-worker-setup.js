if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Unregister all old service workers
    navigator.serviceWorker.getRegistrations().then(registrations => {
      registrations.forEach(registration => {
        registration.unregister().then(success => {
          if (success) {
            console.log('Old Service Worker unregistered:', registration);
          } else {
            console.log('Failed to unregister old Service Worker:', registration);
          }
        });
      });
    });

    // Register the new service worker
    navigator.serviceWorker.register('./service-worker.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);

        // Listen for messages from the service worker
        navigator.serviceWorker.addEventListener('message', event => {
          console.log('Message from Service Worker:', event.data);

          // Update the HTML with the message
          const logList = document.getElementById('log-list');
          if (logList) {
            const listItem = document.createElement('li');
            listItem.textContent = event.data;
            logList.appendChild(listItem);
          }
        });
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  });
} else {
  console.log('Service Workers are not supported in this browser.');
}
