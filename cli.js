#!/usr/bin/env node
import {getDocument,getDateMessage} from './functions.js';
const [, , ...args] = process.argv;

const init = async () => {
    const document = await getDocument('https://www.basketball-reference.com/boxscores');
    const dateMessage = getDateMessage(document);
    console.log(`dateMessage`, dateMessage)
    dateMessage && console.log(dateMessage);
    // TODO: parse the html
    // TODO: display the date
}

init();