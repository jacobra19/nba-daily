import fetch from 'node-fetch';
import jsdom from 'jsdom';

import HtmlTableToJson from 'html-table-to-json';

import { teamsMap } from './utils.js';

const { JSDOM } = jsdom;
const results = [];
fetch(
    // 'https://www.basketball-reference.com/boxscores/?month=5&day=19&year=2019' // 2OT EXAMPLE
    'https://www.basketball-reference.com/boxscores/?month=4&day=19&year=2021' // 9 games EXAMPLE
)
    .then((response) => {
        return response.text();
    })
    .then((html) => {
        // let clean = DOMPurify.sanitize(html);
        const dom = new JSDOM(html);
        // console.log(`dom`, dom)
        const gameSummaryElements = [
            ...dom.window.document.getElementsByClassName('game_summary'),
        ];

        gameSummaryElements.forEach((gameSummaryElement) => {
            const children = [...gameSummaryElement?.children];
            const tableNode = children?.[1];
            // console.log(`tableNode`, tableNode);
            // console.log(`gameSummary`, gameSummary);
            const table = new HtmlTableToJson(dom.serialize(tableNode));
            results.push(table.results[1]);
            // const gameData = table.toJSON();
        });
        return 1
        // console.log(`results`, results);
        // const jsonTables = HtmlTableToJson.parse();
        // console.log(`teamsMap`, teamsMap);
        // console.dir(jsonTables.results[0]);
        // console.table(jsonTables.results[0]);
    })
    .then(() => {
        results.map(console.table);
        return 2
    });
