import { Message } from 'discord.js';
import {
  GET_SCORE,
  SET_SCORE,
  SET_WEEKLY,
  GET_WEEKLY,
} from '../../src/setup_tables';
import * as moment from 'moment';

export default {
  desc: 'Collect your weekly clownbucks.',
  name: 'weekly',
  args: '',
  type: 'economy',
  run: (message: Message) => {
    if (!message.guild) return;
    const G_ID = message.guild.id;
    const weekly = GET_WEEKLY.get(message.author.id, G_ID) || {
      id: `${message.author.id}-${G_ID}`,
      user: message.author.id,
      guild: G_ID,
      weekly: undefined,
      daily: undefined,
    };
    const u_weekly = weekly.weekly ? moment(weekly.weekly) : moment();
    const today = moment();

    let user_score = GET_SCORE(message.author.id, G_ID, 'points');
    let user_weekly = weekly;

    if (!user_score) {
      user_score = {
        id: `${message.author.id}-${G_ID}`,
        user: message.author.id,
        guild: G_ID,
        points: 0,
      };
      user_score.points += 500;
      message.reply(`you claimed 500 clownbucks this week.`);
      user_weekly.weekly = today.toString();
      SET_SCORE(user_score, 'points');
      SET_WEEKLY.run(user_weekly);
    } else {
      const weekly_expire = moment(u_weekly).add(7, 'days');
      const until_next = moment.duration(weekly_expire.diff(today));

      if (
        weekly.weekly &&
        (until_next.asDays() > 0 || until_next.asHours() > 0)
      ) {
        return message.reply(
          `you need to wait ${Math.round(
            until_next.asDays()
          )} days until you can claim.`
        );
      }

      user_score.points += 500;
      message.reply(`you gained 500 clownbucks for today.`);
      user_weekly.weekly = today.toString();
      SET_SCORE(user_score, 'points');
      SET_WEEKLY.run(user_weekly);
    }

    return;
  },
};
