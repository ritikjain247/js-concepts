self.onmessage = function(event) {
  if (event.data === 'start') {
    // Simulate a heavy computation task
    let result = 0;
    for (let i = 0; i < 1e9; i++) {
      result += i;
    }

    // Send the result back to the main thread
    self.postMessage(result);
  }
};