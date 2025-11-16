import readLine from "node:readline";

readLine.emitKeypressEvents(process.stdin);

if (process.stdin.setRawMode) {
  process.stdin.setRawMode(true);
}

process.stdin.on("keypress", (str, key) => {
  console.log(`You pressed the "${str}" key, key info:`, key);

  if (key.ctrl && key.name === 'c') {
    console.log('\nCtrl+C pressed, exiting...');
    process.exit();
  }
});

console.log('Press Ctrl+C to exit...');
