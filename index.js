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

// Endpoint para obtener los partidos
app.get('/api/matches', async (req, res) => {
  const url = 'https://livescore.soccersapi.com/components/league/overview?league_id=637&season_id=14341';

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
      const homeTeamImage = $(element).find('.home img').attr('src');
      const awayTeamImage = $(element).find('.away img').attr('src');

      // Crear el objeto del partido y agregarlo al array
      matches.push({
        id: index + 1,  // Agregar un identificador único
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


app.get('/api/matches/uefa', async (req, res) => {
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



app.get('/api/matches/live', async (req, res) => {
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



app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
