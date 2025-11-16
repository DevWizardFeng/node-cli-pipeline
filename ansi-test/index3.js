import ansiEscapes from 'ansi-escapes';

const log = process.stdout.write.bind(process.stdout);

log(ansiEscapes.cursorTo(10, 1) + '111');
log(ansiEscapes.cursorTo(7, 2) + '222');
log(ansiEscapes.cursorTo(5, 3) + '333');


// setTimeout(() => {
//   log(ansiEscapes.cursorTo(0,2)+ ansiEscapes.eraseLine + 'ZZZ');
//   log(ansiEscapes.cursorTo(5,3)+ 'BBB');
// }, 1000);`·