import type { NextApiRequest, NextApiResponse } from 'next';

import axios from 'axios';
import cheerio from 'cheerio';

function minifyModString(mods: String) {
  let minifiedModString = mods
    .trim()
    .replace(' ', '')
    .replace(/,/g, '')
    .replace('DoubleTime', 'DT')
    .replace('Hidden', 'HD')
    .replace('HardRock', 'HR')
    .replace('Hidden', 'HD')
    .replace('HardRock', 'HR')
    .replace('Precise', 'PR')
    .replace('NoFail', 'NF')
    .replace('Easy', 'EZ')
    .replace('NightCore', 'NC')
    .replace('Precise', 'PR')
    .replace('None', 'NM')
    .replace(',', '');

  if (!minifiedModString) {
    minifiedModString = 'NM';
  }

  return minifiedModString;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const endpoint = 'http://ops.dgsrz.com/profile.php';
  const { uid } = req.query;

  if (req.method === 'GET' && uid) {
    let error = null;
    let playerRaw = null;

    try {
      const odRes = await axios.get(`${endpoint}?uid=${uid}`);
      playerRaw = odRes.data;
    } catch (err) {
      error = err;
    } finally {
      if (error || !playerRaw) {
        res.status(500).end();
      } else {
        const $ = cheerio.load(playerRaw);
        const username = $('div.h3.m-t-xs.m-b-xs').text();
        const avatar = $('div.text-center.m-b.m-t').find('img').attr('src');
        const country = $('small.text-muted').first().text();
        const rank_score = $('span.m-b-xs.h4.block').first().text();
        const technicalAnalysis = $('span.pull-right');
        const total_score = parseInt(
          technicalAnalysis.eq(-5).text().replace(/,/g, '')
        );
        const overall_acc = parseFloat(technicalAnalysis.eq(-4).text());
        const play_count = parseInt(technicalAnalysis.eq(-3).text());
        const recent_plays = $('li.list-group-item')
          .toArray()
          .map((element) => {
            const cheerioElement = $(element);
            const title = cheerioElement.find('strong.block').text();
            const smallData = cheerioElement.find('small').text();
            if (smallData) {
              const smallDataArray = smallData.split('/');
              const timestamp = new Date(smallDataArray[0]);
              const score = parseInt(smallDataArray[1].replace(',', ''));
              const mods = minifyModString(smallDataArray[2]);
              const combo = parseInt(smallDataArray[3].replace('x', ''));
              const accuracy = parseFloat(smallDataArray[4].replace('%', ''));
              return {
                title,
                timestamp,
                score,
                mods,
                combo,
                accuracy
              };
            } else {
              return null;
            }
          })
          .filter((play) => play !== null);

        const exists = username.length !== 0 ? true : false;
        res.status(200).send({
          id: uid,
          username,
          avatar,
          country,
          rank_score,
          total_score,
          overall_acc,
          play_count,
          exists,
          recent_plays
        });
      }
    }
  } else {
    res.status(400).end();
  }
};
