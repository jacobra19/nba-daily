#!/usr/bin/env node
import { getDocument, parseAndLogTables, getDateQuery } from './functions.js';
import { logHeader, logInfo } from './logger.js';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';


const { date } = yargs(hideBin(process.argv)).argv;

// 'https://www.basketball-reference.com/boxscores/?month=5&day=19&year=2019' // 2OT EXAMPLE
// 'https://www.basketball-reference.com/boxscores/?month=4&day=19&year=2021' // 9 games EXAMPLE



const init = async () => {
    const dateQuery = getDateQuery(date);
    const document = await getDocument(
        `https://www.basketball-reference.com/boxscores/${dateQuery}`
    );

    logHeader('nba-daily');
    parseAndLogTables(document);
};

init();
