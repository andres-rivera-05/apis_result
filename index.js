const getExpeditiousCache = require('express-expeditious');
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const apicache = require('apicache');
const cors = require('cors');
const app = express();
const PORT = 7823;

const corsOptions = {
  origin: '*',
  credentials: true,
};

app.use(cors(corsOptions));
// Configuración de apicache
const cache = apicache.middleware;

const cacheServer = getExpeditiousCache({
  namespace: 'expresscache',
  defaultTtl: '1 minute'
});
// Endpoint para obtener los partidos laliga
app.get('/api/matches', cacheServer, async (req, res) => {
  const url = 'https://livescore.soccersapi.com/components/league/overview?league_id=637&season_id=14341';

  try {
    const { data } = await axios.get(url);
    const matches = [];

    // Procesar los datos
    const $ = cheerio.load(data);
    $('')

    $('.match.i').each((index, element) => {
      const id_partido = $(element).data('match');
      const homeTeam = $(element).find('.home').text().trim();
      const awayTeam = $(element).find('.away').text().trim();
      const stateInfo = $(element).find('.status_info').text().trim();
      const homeScore = $(element).find('[data-home-score]').attr('data-home-score');
      const awayScore = $(element).find('[data-away-score]').attr('data-away-score');
      const matchTime = $(element).find('.time').text().trim();
      const matchDateTime = $(element).data('datetime');
      const homeTeamImage = $(element).find('.home img').attr('src');
      const awayTeamImage = $(element).find('.away img').attr('src');

      // Crear el objeto del partido y agregarlo al array
      matches.push({
        id: index + 1,
        id_partido,
        homeTeam,
        awayTeam,
        homeScore,
        awayScore,
        matchTime,
        stateInfo,
        matchDateTime,
        homeTeamImage,
        awayTeamImage,
      });
    });

    // Obtener la fecha actual y establecerla a medianoche para comparar solo la fecha
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    // Clasificar los partidos en tres grupos sin duplicados
    const todayMatches = [];
    const futureMatches = [];
    const pastMatches = [];

    matches.forEach(match => {
      const matchDate = new Date(match.matchDateTime);
      matchDate.setHours(0, 0, 0, 0);

      if (matchDate.getTime() === currentDate.getTime()) {
        todayMatches.push(match);
      } else if (matchDate > currentDate) {
        futureMatches.push(match);
      } else {
        pastMatches.push(match);
      }
    });

    // Ordenar cada grupo de forma cronológica
    todayMatches.sort((a, b) => new Date(a.matchDateTime) - new Date(b.matchDateTime));
    futureMatches.sort((a, b) => new Date(a.matchDateTime) - new Date(b.matchDateTime));
    pastMatches.sort((a, b) => new Date(a.matchDateTime) - new Date(b.matchDateTime));

    // Combinar los grupos en el orden deseado
    const orderedMatches = [...todayMatches, ...futureMatches, ...pastMatches];

    // Enviar el array ordenado de objetos
    res.json(orderedMatches);
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    res.status(500).json({ error: 'Error al obtener los partidos' });
  }
});
// Endpoint para obtener los partidos concacaf liga de naciones
app.get('/api/matches/concacaf', cacheServer, async(req, res)=>{
  const url = 'https://livescore.soccersapi.com/components/league/overview?league_id=339&season_id=14344';
  try {
    const { data } = await axios.get(url);
    const matches = [];

    // Procesar los datos
    const $ = cheerio.load(data);
    $('')

    $('.match.i').each((index, element) => {
      const id_partido = $(element).data('match');
      const homeTeam = $(element).find('.home').text().trim();
      const awayTeam = $(element).find('.away').text().trim();
      const stateInfo = $(element).find('.status_info').text().trim();
      const homeScore = $(element).find('[data-home-score]').attr('data-home-score');
      const awayScore = $(element).find('[data-away-score]').attr('data-away-score');
      const matchTime = $(element).find('.time').text().trim();
      const matchDateTime = $(element).data('datetime');
      const homeTeamImage = $(element).find('.home img').attr('src');
      const awayTeamImage = $(element).find('.away img').attr('src');

      // Crear el objeto del partido y agregarlo al array
      matches.push({
        id: index + 1,
        id_partido,
        homeTeam,
        awayTeam,
        homeScore,
        awayScore,
        matchTime,
        stateInfo,
        matchDateTime,
        homeTeamImage,
        awayTeamImage,
      });
    });

    // Obtener la fecha actual y establecerla a medianoche para comparar solo la fecha
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    // Clasificar los partidos en tres grupos sin duplicados
    const todayMatches = [];
    const futureMatches = [];
    const pastMatches = [];

    matches.forEach(match => {
      const matchDate = new Date(match.matchDateTime);
      matchDate.setHours(0, 0, 0, 0);

      if (matchDate.getTime() === currentDate.getTime()) {
        todayMatches.push(match);
      } else if (matchDate > currentDate) {
        futureMatches.push(match);
      } else {
        pastMatches.push(match);
      }
    });

    // Ordenar cada grupo de forma cronológica
    todayMatches.sort((a, b) => new Date(a.matchDateTime) - new Date(b.matchDateTime));
    futureMatches.sort((a, b) => new Date(a.matchDateTime) - new Date(b.matchDateTime));
    pastMatches.sort((a, b) => new Date(a.matchDateTime) - new Date(b.matchDateTime));

    // Combinar los grupos en el orden deseado
    const orderedMatches = [...todayMatches, ...futureMatches, ...pastMatches];

    // Enviar el array ordenado de objetos
    res.json(orderedMatches);
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    res.status(500).json({ error: 'Error al obtener los partidos' });
  }
})
// Endpoint para obtener los partidos uefa nations league
app.get('/api/matches/euro', cacheServer, async (req, res) => {
  const url = 'https://livescore.soccersapi.com/components/league/overview?league_id=366&season_id=14154';
  try {
    const { data } = await axios.get(url);
    const matches = [];

    // Procesar los datos
    const $ = cheerio.load(data);
    $('')

    $('.match.i').each((index, element) => {
      const id_partido = $(element).data('match');
      const homeTeam = $(element).find('.home').text().trim();
      const awayTeam = $(element).find('.away').text().trim();
      const stateInfo = $(element).find('.status_info').text().trim();
      const homeScore = $(element).find('[data-home-score]').attr('data-home-score');
      const awayScore = $(element).find('[data-away-score]').attr('data-away-score');
      const matchTime = $(element).find('.time').text().trim();
      const matchDateTime = $(element).data('datetime');
      const homeTeamImage = $(element).find('.home img').attr('src');
      const awayTeamImage = $(element).find('.away img').attr('src');

      // Crear el objeto del partido y agregarlo al array
      matches.push({
        id: index + 1,
        id_partido,
        homeTeam,
        awayTeam,
        homeScore,
        awayScore,
        matchTime,
        stateInfo,
        matchDateTime,
        homeTeamImage,
        awayTeamImage,
      });
    });

    // Obtener la fecha actual y establecerla a medianoche para comparar solo la fecha
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    // Clasificar los partidos en tres grupos sin duplicados
    const todayMatches = [];
    const futureMatches = [];
    const pastMatches = [];

    matches.forEach(match => {
      const matchDate = new Date(match.matchDateTime);
      matchDate.setHours(0, 0, 0, 0);

      if (matchDate.getTime() === currentDate.getTime()) {
        todayMatches.push(match);
      } else if (matchDate > currentDate) {
        futureMatches.push(match);
      } else {
        pastMatches.push(match);
      }
    });

    // Ordenar cada grupo de forma cronológica
    todayMatches.sort((a, b) => new Date(a.matchDateTime) - new Date(b.matchDateTime));
    futureMatches.sort((a, b) => new Date(a.matchDateTime) - new Date(b.matchDateTime));
    pastMatches.sort((a, b) => new Date(a.matchDateTime) - new Date(b.matchDateTime));

    // Combinar los grupos en el orden deseado
    const orderedMatches = [...todayMatches, ...futureMatches, ...pastMatches];

    // Enviar el array ordenado de objetos
    res.json(orderedMatches);
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    res.status(500).json({ error: 'Error al obtener los partidos' });
  }
})
// Endpoint para obtener los partidos conmebol
app.get('/api/matches/conmebol', cacheServer, async (req, res) => {
  const url = 'https://livescore.soccersapi.com/components/league/overview?league_id=369&season_id=13649';
  try {
    const { data } = await axios.get(url);
    const matches = [];

    // Procesar los datos
    const $ = cheerio.load(data);
    $('')

    $('.match.i').each((index, element) => {
      const id_partido = $(element).data('match');
      const homeTeam = $(element).find('.home').text().trim();
      const awayTeam = $(element).find('.away').text().trim();
      const stateInfo = $(element).find('.status_info').text().trim();
      const homeScore = $(element).find('[data-home-score]').attr('data-home-score');
      const awayScore = $(element).find('[data-away-score]').attr('data-away-score');
      const matchTime = $(element).find('.time').text().trim();
      const matchDateTime = $(element).data('datetime');
      const homeTeamImage = $(element).find('.home img').attr('src');
      const awayTeamImage = $(element).find('.away img').attr('src');

      // Crear el objeto del partido y agregarlo al array
      matches.push({
        id: index + 1,
        id_partido,
        homeTeam,
        awayTeam,
        homeScore,
        awayScore,
        matchTime,
        stateInfo,
        matchDateTime,
        homeTeamImage,
        awayTeamImage,
      });
    });

    // Obtener la fecha actual y establecerla a medianoche para comparar solo la fecha
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    // Clasificar los partidos en tres grupos sin duplicados
    const todayMatches = [];
    const futureMatches = [];
    const pastMatches = [];

    matches.forEach(match => {
      const matchDate = new Date(match.matchDateTime);
      matchDate.setHours(0, 0, 0, 0);

      if (matchDate.getTime() === currentDate.getTime()) {
        todayMatches.push(match);
      } else if (matchDate > currentDate) {
        futureMatches.push(match);
      } else {
        pastMatches.push(match);
      }
    });

    // Ordenar cada grupo de forma cronológica
    todayMatches.sort((a, b) => new Date(a.matchDateTime) - new Date(b.matchDateTime));
    futureMatches.sort((a, b) => new Date(a.matchDateTime) - new Date(b.matchDateTime));
    pastMatches.sort((a, b) => new Date(a.matchDateTime) - new Date(b.matchDateTime));

    // Combinar los grupos en el orden deseado
    const orderedMatches = [...todayMatches, ...futureMatches, ...pastMatches];

    // Enviar el array ordenado de objetos
    res.json(orderedMatches);
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    res.status(500).json({ error: 'Error al obtener los partidos' });
  }
})
// Endpoint para obtener los partidos uefa
app.get('/api/matches/uefa', cacheServer, async (req, res) => {
  const url = 'https://livescore.soccersapi.com/components/league/overview?league_id=539&season_id=14354';

  try {
    const { data } = await axios.get(url);
    const matches = [];

    // Procesar los datos
    const $ = cheerio.load(data);

    $('.match.i').each((index, element) => {
      const homeTeam = $(element).find('.home').text().trim();
      const awayTeam = $(element).find('.away').text().trim();
      const stateInfo = $(element).find('.status_info').text().trim();
      const homeScore = $(element).find('[data-home-score]').attr('data-home-score');
      const awayScore = $(element).find('[data-away-score]').attr('data-away-score');
      const matchTime = $(element).find('.time').text().trim();
      const matchDateTime = $(element).data('datetime');
      const matchTm = $(element).data('match');
      const homeTeamImage = $(element).find('.home img').attr('src');
      const awayTeamImage = $(element).find('.away img').attr('src');

      // Crear el objeto del partido y agregarlo al array
      matches.push({
        id: index + 1,
        matchTm,
        homeTeam,
        awayTeam,
        homeScore,
        awayScore,
        matchTime,
        stateInfo,
        matchDateTime,
        homeTeamImage,
        awayTeamImage,
      });
    });

    // Obtener la fecha actual y establecerla a medianoche para comparar solo la fecha
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    // Clasificar los partidos en tres grupos sin duplicados
    const todayMatches = [];
    const futureMatches = [];
    const pastMatches = [];

    matches.forEach(match => {
      const matchDate = new Date(match.matchDateTime);
      matchDate.setHours(0, 0, 0, 0);

      if (matchDate.getTime() === currentDate.getTime()) {
        todayMatches.push(match);
      } else if (matchDate > currentDate) {
        futureMatches.push(match);
      } else {
        pastMatches.push(match);
      }
    });

    // Ordenar cada grupo de forma cronológica
    todayMatches.sort((a, b) => new Date(a.matchDateTime) - new Date(b.matchDateTime));
    futureMatches.sort((a, b) => new Date(a.matchDateTime) - new Date(b.matchDateTime));
    pastMatches.sort((a, b) => new Date(a.matchDateTime) - new Date(b.matchDateTime));

    // Combinar los grupos en el orden deseado
    const orderedMatches = [...todayMatches, ...futureMatches, ...pastMatches];

    // Enviar el array ordenado de objetos
    res.json(orderedMatches);
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    res.status(500).json({ error: 'Error al obtener los partidos' });
  }
});
// Endpoint para obtener los partidos en vivo
app.get('/api/matches/live', cacheServer, async (req, res) => {
  const url = 'https://livescore.soccersapi.com/components/fixtures/schedule?d=live';

  try {
    const { data } = await axios.get(url);
    const matches = [];

    // Procesar los datos
    const $ = cheerio.load(data);

    $('.match.i').each((index, element) => {
      const country = $(element).find('[data-country-name]').attr('data-country-name');
      const league = $(element).find('[data-league-name]').attr('data-league-name');
      const homeTeam = $(element).find('.home').text().trim();
      const awayTeam = $(element).find('.away').text().trim();
      const stateInfo = $(element).find('.status_info span:first').text().trim();
      const matchDateTime = $(element).data('datetime');
      const matchTm = $(element).data('match');
      const homeTeamImage = $(element).find('.home img').attr('src');
      const awayTeamImage = $(element).find('.away img').attr('src');

      // Crear el objeto del partido y agregarlo al array
      matches.push({
        id: index + 1,
        country,
        league,
        matchTm,
        homeTeam,
        awayTeam,
        stateInfo,
        matchDateTime,
        homeTeamImage,
        awayTeamImage,
      });
    });

    // Obtener la fecha actual y establecerla a medianoche para comparar solo la fecha
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    // Clasificar los partidos en tres grupos sin duplicados
    const todayMatches = [];
    const futureMatches = [];
    const pastMatches = [];

    matches.forEach(match => {
      const matchDate = new Date(match.matchDateTime);
      matchDate.setHours(0, 0, 0, 0);

      if (matchDate.getTime() === currentDate.getTime()) {
        todayMatches.push(match);
      } else if (matchDate > currentDate) {
        futureMatches.push(match);
      } else {
        pastMatches.push(match);
      }
    });

    // Ordenar cada grupo de forma cronológica
    todayMatches.sort((a, b) => new Date(a.matchDateTime) - new Date(b.matchDateTime));
    futureMatches.sort((a, b) => new Date(a.matchDateTime) - new Date(b.matchDateTime));
    pastMatches.sort((a, b) => new Date(a.matchDateTime) - new Date(b.matchDateTime));

    // Combinar los grupos en el orden deseado
    const orderedMatches = [...todayMatches, ...futureMatches, ...pastMatches];

    // Enviar el array ordenado de objetos
    res.json(orderedMatches);
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    res.status(500).json({ error: 'Error al obtener los partidos' });
  }
});
// Endpoint para obtener la tabla de posiciones laliga
app.get('/api/matches/tabla', cache('10 minutes'), async (req, res) => {
  const url = 'https://livescore.soccersapi.com/components/league/standings?league_id=637&season_id=14341&stage_id=1&round_id=182348&group=round&ltype=topscorers&news_type=league&id=637&is_cup=0&nk=laliga';

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // Procesar y extraer datos de cada equipo
    const teamsData = [];
    $('a').each((index, element) => {
      if (index < 23) { // Limitar a los primeros 20 equipos
        const position = $(element).find('.st.pos > span').text().trim() || 'Unknown';
        const name = $(element).find('.st.name').text().trim() || 'Unknown';
        const imgUrl = $(element).find('.st.name img').attr('src') || '';
        const teamUrl = $(element).attr('href') || '';
        const gamesPlayed = $(element).find('.st.int.gp').text().trim() || '0';
        const won = $(element).find('.st.int.won').text().trim() || '0';
        const draw = $(element).find('.st.int.draw').text().trim() || '0';
        const lost = $(element).find('.st.int.lost').text().trim() || '0';
        const goals = $(element).find('.st.int.goals').text().trim() || '0:0';
        const goalDifference = $(element).find('.st.int.gdiff').text().trim() || '0';
        const points = $(element).find('.st.int.points').text().trim() || '0';

        teamsData.push({
          position,
          name,
          imgUrl,
          teamUrl,
          gamesPlayed,
          won,
          draw,
          lost,
          goals,
          goalDifference,
          points
        });
      }
    });

    const filteredTeamsData = teamsData.slice(3);

    // Enviar los datos procesados
    res.json(filteredTeamsData);
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    res.status(500).json({ error: 'Error al obtener la tabla de posiciones' });
  }
});
// Endpoint para obtener las estadisticas de cada partido
app.get('/api/matches/status/:id', cacheServer, async (req, res) => {
  const { id } = req.params;
  const url = `https://livescore.soccersapi.com/components/match/stats?id=${id}`;

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const matchStats = {
      possession: {},
      ataques: {},
      ataques_peligrosos: {},
      Ball_Safe: {},
      disparos: {},
      tiros_a_porteria: {},
      tiros_a_fuera: {},
      tiros_de_esquina: {},
    };

    // Extraer los valores utilizando los selectores de Cheerio
    matchStats.possession.home = parseInt($(".stats_type .home .count").eq(0).text().trim()) || 0;
    matchStats.possession.away = parseInt($(".stats_type .away .count").eq(0).text().trim()) || 0;
    matchStats.possession.stats_name = $(".stats_name").eq(0).text().trim() || null
    matchStats.ataques.home = parseInt($(".stats_type .home .count").eq(1).text().trim()) || 0;
    matchStats.ataques.away = parseInt($(".stats_type .away .count").eq(1).text().trim()) || 0;
    matchStats.ataques.name_type = $(".stats_name").eq(1).text().trim() || null
    matchStats.ataques_peligrosos.home = parseInt($(".stats_type .home .count").eq(2).text().trim()) || 0;
    matchStats.ataques_peligrosos.away = parseInt($(".stats_type .away .count").eq(2).text().trim()) || 0;
    matchStats.ataques_peligrosos.name_type = $(".stats_name").eq(2).text().trim() || null
    matchStats.Ball_Safe.name_type = $(".stats_name").eq(3).text().trim() || null
    matchStats.Ball_Safe.home = parseInt($(".stats_type .home .count").eq(3).text().trim()) || 0;
    matchStats.Ball_Safe.away = parseInt($(".stats_type .away .count").eq(3).text().trim()) || 0;
    matchStats.disparos.name_type = $(".stats_name").eq(4).text().trim() || null
    matchStats.disparos.home = parseInt($(".stats_type .home .count").eq(4).text().trim()) || 0;
    matchStats.disparos.away = parseInt($(".stats_type .away .count").eq(4).text().trim()) || 0;
    matchStats.tiros_a_porteria.name_type = $(".stats_name").eq(5).text().trim() || null
    matchStats.tiros_a_porteria.home = parseInt($(".stats_type .home .count").eq(5).text().trim()) || 0;
    matchStats.tiros_a_porteria.away = parseInt($(".stats_type .away .count").eq(5).text().trim()) || 0;
    matchStats.tiros_a_fuera.name_type = $(".stats_name").eq(6).text().trim() || null
    matchStats.tiros_a_fuera.home = parseInt($(".stats_type .home .count").eq(6).text().trim()) || 0;
    matchStats.tiros_a_fuera.away = parseInt($(".stats_type .away .count").eq(6).text().trim()) || 0;
    matchStats.tiros_de_esquina.name_type = $(".stats_name").eq(7).text().trim() || null
    matchStats.tiros_de_esquina.home = parseInt($(".stats_type .home .count").eq(7).text().trim()) || 0;
    matchStats.tiros_de_esquina.away = parseInt($(".stats_type .away .count").eq(7).text().trim()) || 0;

    res.json(matchStats);
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    res.status(500).json({ error: 'Error al obtener las estadísticas del partido' });
  }
});
// Endpoint para obtener el marcador de cada partido
app.get('/api/matches/status/partido/:id', cacheServer, async (req, res) => {
  const { id } = req.params;
  const url = `https://livescore.soccersapi.com/components/match/info-simple?id=${id}&update=1`;

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const propiedades = {
      goles: {},
      logos: {},
      equipo: {},
      tiempo: {}
    }
    propiedades.tiempo = parseInt($(".time").text().trim()) || 0;
    propiedades.goles.home = parseInt($(".score_home").eq(0).text().trim()) || 0;
    propiedades.goles.away = parseInt($(".score_away").eq(0).text().trim()) || 0;
    propiedades.logos.home = $('img').eq(0).attr('src');
    propiedades.logos.away = $('img').eq(1).attr('src');
    propiedades.equipo.home = $('.home-name').text().trim() || NaN;
    propiedades.equipo.away = $('.away-name').text().trim() || NaN;
    res.json(propiedades);
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    res.status(500).json({ error: 'Error al obtener las estadísticas del partido' });
  }
});

app.get('/api/matches/formation/:id', cache('10 minutes'), async (req, res) => {
  const { id } = req.params;
  const url = `https://livescore.soccersapi.com/components/match/lineups?id=${id}`

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    $('script').remove();
    $('style').remove();
    //console.log($.html())
    const propiedades = {
      equipo_home: {},
      equipo_away: {}
    }
    const formationText = $('.left').text();
    const formationTextRight = $('.right').text();
    const formationArray = formationText.split('-').map(Number);
    const formationArrayText = formationTextRight.split('-').map(Number);
    const formation_home = [1, ...formationArray];
    const formation_away = [1, ...formationArrayText];

    propiedades.equipo_home.formation_home = formation_home;
    propiedades.equipo_home.player = [
      {
        name: $('.formation_player_name').eq(0).text().trim() || NaN,
        img: $('img').eq(0).attr('src') || NaN
      },
      {
        name: $('.formation_player_name').eq(1).text().trim() || NaN,
        img: $('img').eq(1).attr('src') || NaN
      },
      {
        name: $('.formation_player_name').eq(2).text().trim() || NaN,
        img: $('img').eq(2).attr('src') || NaN
      },
      {
        name: $('.formation_player_name').eq(3).text().trim() || NaN,
        img: $('img').eq(3).attr('src') || NaN
      },
      {
        name: $('.formation_player_name').eq(4).text().trim() || NaN,
        img: $('img').eq(4).attr('src') || NaN
      },
      {
        name: $('.formation_player_name').eq(5).text().trim() || NaN,
        img: $('img').eq(5).attr('src') || NaN
      },
      {
        name: $('.formation_player_name').eq(6).text().trim() || NaN,
        img: $('img').eq(6).attr('src') || NaN
      },
      {
        name: $('.formation_player_name').eq(7).text().trim() || NaN,
        img: $('img').eq(7).attr('src') || NaN
      },
      {
        name: $('.formation_player_name').eq(8).text().trim() || NaN,
        img: $('img').eq(8).attr('src') || NaN
      },
      {
        name: $('.formation_player_name').eq(9).text().trim() || NaN,
        img: $('img').eq(9).attr('src') || NaN
      },
      {
        name: $('.formation_player_name').eq(10).text().trim() || NaN,
        img: $('img').eq(10).attr('src') || NaN
      }
    ]
    propiedades.equipo_away.formation_away = formation_away;
    propiedades.equipo_away.player = [
      {
        name: $('.formation_player_name').eq(11).text().trim() || NaN,
        img: $('img').eq(11).attr('src') || NaN
      },
      {
        name: $('.formation_player_name').eq(12).text().trim() || NaN,
        img: $('img').eq(12).attr('src') || NaN
      },
      {
        name: $('.formation_player_name').eq(13).text().trim() || NaN,
        img: $('img').eq(13).attr('src') || NaN
      },
      {
        name: $('.formation_player_name').eq(14).text().trim() || NaN,
        img: $('img').eq(14).attr('src') || NaN
      },
      {
        name: $('.formation_player_name').eq(15).text().trim() || NaN,
        img: $('img').eq(15).attr('src') || NaN
      },
      {
        name: $('.formation_player_name').eq(16).text().trim() || NaN,
        img: $('img').eq(16).attr('src') || NaN
      },
      {
        name: $('.formation_player_name').eq(17).text().trim() || NaN,
        img: $('img').eq(17).attr('src') || NaN
      },
      {
        name: $('.formation_player_name').eq(18).text().trim() || NaN,
        img: $('img').eq(18).attr('src') || NaN
      },
      {
        name: $('.formation_player_name').eq(19).text().trim() || NaN,
        img: $('img').eq(19).attr('src') || NaN
      },
      {
        name: $('.formation_player_name').eq(20).text().trim() || NaN,
        img: $('img').eq(20).attr('src') || NaN
      },
      {
        name: $('.formation_player_name').eq(21).text().trim() || NaN,
        img: $('img').eq(21).attr('src') || NaN
      }
    ]

    res.json(propiedades)
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    res.status(500).json({ error: 'Error al obtener las estadísticas del partido' });
  }
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor escuchando en el puerto: ${PORT}`);
});
