let teams = [
    {
        location: 'Atlanta',
        franchise: 'Hawks',
        full: 'Atlanta Hawks',
    },
    {
        location: 'Boston',
        franchise: 'Celtics',
        full: 'Boston Celtics',
    },
    {
        location: 'Brooklyn',
        franchise: 'Nets',
        full: 'Brooklyn Nets',
    },
    {
        location: 'Charlotte',
        franchise: 'Hornets',
        full: 'Charlotte Hornets',
    },
    {
        location: 'Chicago',
        franchise: 'Bulls',
        full: 'Chicago Bulls',
    },
    {
        location: 'Cleveland',
        franchise: 'Cavaliers',
        full: 'Cleveland Cavaliers',
    },
    {
        location: 'Dallas',
        franchise: 'Mavericks',
        full: 'Dallas Mavericks',
    },
    {
        location: 'Denver',
        franchise: 'Nuggets',
        full: 'Denver Nuggets',
    },
    {
        location: 'Detroit',
        franchise: 'Pistons',
        full: 'Detroit Pistons',
    },
    {
        location: 'Golden State',
        franchise: 'Warriors',
        full: 'Golden State Warriors',
    },
    {
        location: 'Houston',
        franchise: 'Rockets',
        full: 'Houston Rockets',
    },
    {
        location: 'Indiana',
        franchise: 'Pacers',
        full: 'Indiana Pacers',
    },
    {
        location: 'Los Angeles',
        franchise: 'Clippers',
        full: 'Los Angeles Clippers',
    },
    {
        location: 'Los Angeles',
        franchise: 'Lakers',
        full: 'Los Angeles Lakers',
    },
    {
        location: 'Memphis',
        franchise: 'Grizzlies',
        full: 'Memphis Grizzlies',
    },
    {
        location: 'Miami',
        franchise: 'Heat',
        full: 'Miami Heat',
    },
    {
        location: 'Milwaukee',
        franchise: 'Bucks',
        full: 'Milwaukee Bucks',
    },
    {
        location: 'Minnesota',
        franchise: 'Timberwolves',
        full: 'Minnesota Timberwolves',
    },
    {
        location: 'New Orleans',
        franchise: 'Pelicans',
        full: 'New Orleans Pelicans',
    },
    {
        location: 'New York',
        franchise: 'Knicks',
        full: 'New York Knicks',
    },
    {
        location: 'Oklahoma City',
        franchise: 'Thunder',
        full: 'Oklahoma City Thunder',
    },
    {
        location: 'Orlando',
        franchise: 'Magic',
        full: 'Orlando Magic',
    },
    {
        location: 'Philadelphia',
        franchise: '76ers',
        full: 'Philadelphia 76ers',
    },
    {
        location: 'Phoenix',
        franchise: 'Suns',
        full: 'Phoenix Suns',
    },
    {
        location: 'Portland',
        franchise: 'Trail Blazers',
        full: 'Portland Trail Blazers',
    },
    {
        location: 'Sacramento',
        franchise: 'Kings',
        full: 'Sacramento Kings',
    },
    {
        location: 'San Antonio',
        franchise: 'Spurs',
        full: 'San Antonio Spurs',
    },
    {
        location: 'Toronto',
        franchise: 'Raptors',
        full: 'Toronto Raptors',
    },
    {
        location: 'Utah',
        franchise: 'Jazz',
        full: 'Utah Jazz',
    },
    {
        location: 'Washington',
        franchise: 'Wizards',
        full: 'Washington Wizards',
    },
];

const teamsMap = new Map();

teams.forEach((team) => {
    teamsMap.set(team.location, team);
});

export { teamsMap };
