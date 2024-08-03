document.addEventListener('DOMContentLoaded', () => {
  const notificationsDiv = document.getElementById('notifications');

  // Create a new EventSource object
  const eventSource = new EventSource('http://localhost:3000/events');

  // Listen for messages from the server
  eventSource.onmessage = (event) => {
    console.log('notification recieved', event)
    const newNotification = document.createElement('p');
    newNotification.textContent = event.data;
    notificationsDiv.appendChild(newNotification);
  };

  // Handle connection errors
  eventSource.onerror = (error) => {
    console.error('EventSource failed:', error);
  };
});
