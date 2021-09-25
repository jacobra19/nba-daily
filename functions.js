import fetch from 'node-fetch';
import jsdom from 'jsdom';

// dayjs
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime.js';
import isToday from 'dayjs/plugin/isToday.js';
import isYesterday from 'dayjs/plugin/isYesterday.js';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';

import { teamsMap } from './utils.js';
import { logTables } from './logger.js';
import chalk from 'chalk';

dayjs.extend(relativeTime);
dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(customParseFormat);

const { JSDOM } = jsdom;

const getDocument = async (url) => {
    const response = await fetch(url);
    const html = await response.text();
    const dom = new JSDOM(html);
    return dom.window.document;
};

const getDateQuery = (date) => {
    if (!date) return '';
    const DATE_FORMAT = 'DD/MM/YYYY';
    const dateObj = dayjs(date, DATE_FORMAT);
    const isValidDate = dateObj.isValid() && date.length === DATE_FORMAT.length;
    const isBeforeToday = dateObj.isBefore(dayjs());
    const isToday = dateObj.isSame(dayjs());
    if (isValidDate && (isBeforeToday || isToday)) {
        return `?month=${
            dateObj.month() + 1
        }&day=${dateObj.date()}&year=${dateObj.year()}`;
    } else {
        console.log(
            '\n',
            chalk.yellow(`Invalid date: ${date}`),
            '\n',
            chalk.yellow(`Please use a valid date format (${DATE_FORMAT})`)
        );
        process.exit(1);
    }
};

const getDateMessage = (document) => {
    const rawDate = document
        .getElementById('content')
        ?.firstElementChild?.innerHTML?.split('NBA Games Played on ')?.[1];
    const currentDocumentDate = dayjs(rawDate);

    if (currentDocumentDate.isToday() || currentDocumentDate.isYesterday()) {
        return null;
    }
    const relativeTime = dayjs().to(currentDocumentDate);
    return `The last games were played ${relativeTime} (${currentDocumentDate.format(
        'DD/MM/YY'
    )}):`;
};

const parseAndLogTables = (document) => {
    const contentElement = document.getElementById('content');
    const gameTablesElement =
        contentElement.getElementsByClassName('game_summary');
    const iterable = [...gameTablesElement];
    let message;
    if (iterable.length === 0) {
        message = 'No games were played on this date';
    } else if (iterable.length === 1) {
        message = 'Found 1 game';
    } else {
        message = `Found ${iterable.length} games`;
    }
    console.log(chalk.blueBright(message));

    iterable.map((el) => {
        return extractDataAndLogTable(el.children[1]);
    });
};

const extractDataAndLogTable = (tableElement) => {
    let keys = [
        'Team',
        ...[...tableElement.firstElementChild.firstElementChild.children].map(
            (item) => item.innerHTML
        ),
        'Total',
    ].filter(Boolean);

    let totalTeamA = 0;
    let valuesTeamA = [
        ...tableElement.lastElementChild.firstElementChild.children,
    ].map((item, index) => {
        const team = teamsMap.get(item?.firstElementChild?.innerHTML?.trim());
        if (index === 0) return team?.full || item.firstElementChild.innerHTML;
        totalTeamA += parseInt(item.innerHTML);
        return parseInt(item.innerHTML);
    });
    valuesTeamA.push(totalTeamA);

    let totalTeamB = 0;
    let valuesTeamB = [
        ...tableElement.lastElementChild.lastElementChild.children,
    ].map((item, index) => {
        const team = teamsMap.get(item?.firstElementChild?.innerHTML?.trim());
        if (index === 0) return team?.full || item.firstElementChild.innerHTML;
        totalTeamB += parseInt(item.innerHTML);
        return parseInt(item.innerHTML);
    });
    valuesTeamB.push(totalTeamB);

    logTables(keys, [valuesTeamA, valuesTeamB]);
};

export { getDocument, getDateMessage, parseAndLogTables, getDateQuery };
