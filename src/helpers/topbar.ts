export const linksMenu = {
  urlHome: '/',
  urlNews: '/news',
  urlTeams: '/teams',
  urlPlayers: '/players',
  urlChampionship: '/championships',
  urlAbout: '/about',
  urlLogin: '/login'
}

export const controlPanel = '/control-panel'

export const linksControlPanel = {
  urlDashboard: `${controlPanel}/dashboard`,
  urlTeams: `${controlPanel}/teams`,
  urlCreateTeams: `${controlPanel}/create-teams`,
  urlEditTeams: `${controlPanel}/edit-teams`,
  urlNews: `${controlPanel}/news`,
  urlCreateNews: `${controlPanel}/create-news`,
  urlPlayers: `${controlPanel}/players`,
  urlCreatePlayers: `${controlPanel}/create-players`,
  urlCreateChampionship: `${controlPanel}/create-championship`,
  urlChampionship: `${controlPanel}/championships`
}

export const menuItems = [
  {
    id: 1,
    name: 'Home',
    url: linksMenu.urlHome
  },
  {
    id: 2,
    name: 'Notícias',
    url: linksMenu.urlNews
  },
  {
    id: 3,
    name: 'Teams LOL',
    url: linksMenu.urlTeams
  },
  {
    id: 4,
    name: 'Players',
    url: linksMenu.urlPlayers
  },
  {
    id: 5,
    name: 'Campeonatos',
    url: linksMenu.urlChampionship
  },
  {
    id: 6,
    name: 'Sobre',
    url: linksMenu.urlAbout
  }
]
