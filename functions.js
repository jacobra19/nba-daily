import fetch from 'node-fetch';
import jsdom from 'jsdom';

// dayjs
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime.js';
import isToday from 'dayjs/plugin/isToday.js';
import isYesterday from 'dayjs/plugin/isYesterday.js';

dayjs.extend(relativeTime);
dayjs.extend(isToday);
dayjs.extend(isYesterday);

const { JSDOM } = jsdom;

// 'https://www.basketball-reference.com/boxscores/?month=5&day=19&year=2019' // 2OT EXAMPLE
// 'https://www.basketball-reference.com/boxscores/?month=4&day=19&year=2021' // 9 games EXAMPLE

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
    const currentDocumentDate = dayjs(rawDate)

    if (currentDocumentDate.isToday() || currentDocumentDate.isYesterday()) {
        return null;
    }
    const relativeTime = dayjs().to(currentDocumentDate);
    return `The last games were played ${relativeTime} (${currentDocumentDate.format('DD/MM/YY')}).`;
};

export { getDocument, getDateMessage };
