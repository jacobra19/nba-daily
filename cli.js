#!/usr/bin/env node
import { getDocument, getDateMessage, parseAndLogTables } from './functions.js';
import { logHeader, logInfo } from './logger.js';
const [, , ...args] = process.argv;

// 'https://www.basketball-reference.com/boxscores/?month=5&day=19&year=2019' // 2OT EXAMPLE
// 'https://www.basketball-reference.com/boxscores/?month=4&day=19&year=2021' // 9 games EXAMPLE

const init = async () => {
    const document = await getDocument(
        'https://www.basketball-reference.com/boxscores'
    );
    const dateMessage = getDateMessage(document);
    logHeader('nba-daily');
    logInfo(dateMessage);
    parseAndLogTables(document);
};

init();
