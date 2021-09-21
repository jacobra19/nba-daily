#!/usr/bin/env node

import { getDocument, getDateMessage } from './functions.js';
import { logHeader, logInfo } from './logger.js';
const [, , ...args] = process.argv;

const init = async () => {
    const document = await getDocument(
        'https://www.basketball-reference.com/boxscores'
    );
    const dateMessage = getDateMessage(document);
    logHeader('nba');
    logInfo(dateMessage);
    // TODO: parse the html
    // TODO: display the date
};

init();
