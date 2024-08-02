
if (window.Worker) {
  const worker = new Worker('web-worker.js');

  document.getElementById('startWorker').addEventListener('click', () => {
    worker.postMessage('start');
  });

  worker.onmessage = function (event) {
    document.getElementById('result').textContent = 'Result: ' + event.data;
  };
} else {
  console.log('Your browser doesn\'t support Web Workers.');
}