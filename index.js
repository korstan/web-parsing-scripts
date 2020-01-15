import scriptList from './scriptList.js';
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.log('Enter the number of a script you want to run');
scriptList.forEach((script, i) => console.log(`${i+1}) ${script.name}`));
rl.on('line',(input) => {
    let scriptNumber = parseInt(input);
    scriptList[scriptNumber - 1].script();
    rl.close();
});