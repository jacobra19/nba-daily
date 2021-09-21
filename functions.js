import fetch from 'node-fetch';
import jsdom from 'jsdom';

// dayjs
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime.js';
import isToday from 'dayjs/plugin/isToday.js';
import isYesterday from 'dayjs/plugin/isYesterday.js';

import { teamsMap } from './utils.js';
import { logTables } from './logger.js';

dayjs.extend(relativeTime);
dayjs.extend(isToday);
dayjs.extend(isYesterday);

const { JSDOM } = jsdom;

const getDocument = async (url) => {
    const response = await fetch(url);
    const html = await response.text();
    const dom = new JSDOM(html);
    return dom.window.document;
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
    [...gameTablesElement].map((el) => {
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

export { getDocument, getDateMessage, parseAndLogTables };
