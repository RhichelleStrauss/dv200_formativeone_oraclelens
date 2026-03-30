# Formative One: Oracle Lens 
<img src="../src/images/OracleLensGithubBanner-01.png" alt="Header image" width="100%" height="auto">

# About Oracle Lens
Oracle Lens is a Single Page React Application that visualizes data from the game League of Legends's esports. The esports community within League of Legends has a lot of data surrounding professional games. The application shows you the 10 upcomning matches for any league of your choosing, you can compare teams, and analyse a timeline for both teams and players.

# Built With
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

![React Bootstrap](https://img.shields.io/badge/React_Bootstrap-7952B3?style=for-the-badge&logo=react-bootstrap&logoColor=white)

![Chart.js](https://img.shields.io/badge/chart.js-F5788D.svg?style=for-the-badge&logo=chart.js&logoColor=white)

![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)

![React Bits](https://img.shields.io/badge/React_Bits-04D9D9?style=for-the-badge&logo=react&logoColor=black)

![MaterialUI](https://img.shields.io/badge/Material%20UI-%23FFFFFF?style=for-the-badge&logo=MUI&logoColor=#007FFF)

![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

# Table of Contents
- [Deployment](#deployment)
- [What This Project Does](#what-this-project-does)
- [Projects pages](#projects-pages)
- [FAQ](#faq)
- [Acknowledgements](#acknowledgements)
- [API Reference](#api-reference)
- [License](#license)

## Deployment
To try this webapp locally, follow these steps:

Clone The Repo

```text
[https://github.com/RhichelleStrauss/dv200_formativeone_oraclelens.git]
```
In your terminal run the following

```
npm install
```
```
npm install react-bootstrap bootstrap
```

```
npm install react-router-dom
```

```
npm install chart.js react-chartjs-2 react
```

```
npm install axios
```
```
npm install @mui/material @emotion/react @emotion/styled
```

React Bits dependencies
```
npm install three
```

```
npm install ogl
```

```
cd frontend
```

And at long last
```
npm start
```

## What this project does

- Select a League of Legends esports League and view the upcoming matches for that league. View any teams small description & recent Win/Losses
- Compare Two Teams different statistics and playstyle 
- View Team info as well as Team's current roster alongside their role, age, and nationality.
-View a player or teams recent 20 games performance across 5 different categories(each).

## Project pages 
#### Dashboard page

Allows a user to view a detailed overview, and overview of League of Legends esports. Also allows a user to choose from over 100 leagues and view the next 10 upcoming matches as well as the details on the matches. User can click on a team to view the team details and recent form(past 5 games).
<img src="../dv200_formativeone_oraclelens/src/images/Oracle_Dashboard.jpg" alt="Header image" width="100%" height="auto">
<img src="../dv200_formativeone_oraclelens/src/images/Oracle_Dashboard2.jpg" alt="Header image" width="100%" height="auto">

#### Compare Page

User can compare 2 teams in LoL esports, where they can view team details (name, acronym, region & logo), as well as the teams current roster (name, role, age, nationality). You can view and compare the teams winrate, playstyle profile and recent game durations.
<img src="../dv200_formativeone_oraclelens/src/images/Oracle_compare1.jpg" alt="Header image" width="100%" height="auto">
<img src="../dv200_formativeone_oraclelens/src/images/Oracle_compare2.jpg" alt="Header image" width="100%" height="auto">
<img src="../dv200_formativeone_oraclelens/src/images/Oracle_compare3.jpg" alt="Header image" width="100%" height="auto">
<img src="../dv200_formativeone_oraclelens/src/images/Oracle_compare4.jpg" alt="Header image" width="100%" height="auto">

#### Timeline Page

User can toggle between Player and Team statistics over a 20 game period. User can search for team and player respectively and choose from 5 categories to view. 
<img src="../dv200_formativeone_oraclelens/src/images/Oracle_timeline1.jpg" alt="Header image" width="100%" height="auto">
<img src="../dv200_formativeone_oraclelens/src/images/Oracle_timeline2.jpg" alt="Header image" width="100%" height="auto">

## FAQ

#### Who is the goat? 
G2 Caps 

#### Why is LoL esports the most viewed and best esports
LoL esports is simply the greatest... watching is better than playing.

#### Will teemo be picked in Worlds?
no.


## Acknowledgements

- [Tsungai Katsuro](https://github.com/TsungaiKats) - top tier lecturer for teaching me
- [PandaScore](https://www.pandascore.co/)
- [Leaguepedia](https://lol.fandom.com/wiki/Help:ACS_archive_%26_post-game_JSONs#Library_support)
- [ReactBits](https://reactbits.dev/) - for my background, navbar background and spotlight effect on hover.

## API reference

#### Pandascore API
Official Documentation: https://docs.pandascore.co/

#### Leaguepedia API
Leaguepedia Cargo API. https://lol.fandom.com/wiki/Help:Cargo

#### Get all LoL Leagues 
Used to populate the dashboard dropdown filter.

```http
GET /lol/leagues?per_page=100
```

#### Get Upcoming matches
Used to display the schedule on the dashboard.

```http
GET /lol/matches/upcoming?filter[league_id]=${leagueID}&sort=begin_at&per_page=10
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `leagueID`      | `int` | **Required**. The PandaScore ID of the selected league |

#### Get Team Match History
Used in the Team Overview modal to calculate the 'W/L' streak.

```http
GET /lol/matches/past?filter[opponent_id]=${teamID}&per_page=5
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `teamID`      | `int` | **Required**.  ID of the team to fetch results for |

#### Get Team League History

```http
GET /teams/${teamID}/leagues
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `teamID`      | `int` | **Required**.  ID of the team to fetch results for |

#### Get Playstyle data
Used to calculate percentages for the Radar Chart (Sweep rate, Comebacks).

```http
GET /teams/${teamID}/matches?per_page=50
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `teamID`      | `int` | **Required**.  ID of the team to analyze |


#### Get Historical Timeline (Cargo)
Used via local proxy to fetch 20 games of historical stats for line charts.

```http
GET /api/cargo?tables=${table}&fields=${fields}&where=${where}&limit=20
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `table`      | `string` | **Required**.  Either ScoreboardGames or ScoreboardPlayers to analyze |
| `fields`      | `int` | **Required**.  Columns to fetch (Kills, Gold, etc.) |
| `where`      | `string` | **Required**.  SQL filter (e.g. Link = 'Faker') to analyze |

#### Environment variables
To run this project, you will need to add the following environment variables to your .env file:

REACT_APP_PANDASCORE_TOKEN

PORT (Default: 5000 for the Cargo Proxy)

## License
[MIT](https://choosealicense.com/licenses/mit/)
