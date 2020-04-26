import { Message } from "discord.js";
import { GET_SCORE, SET_SCORE, GET_DAILY, SET_DAILY } from "../../src/setup_tables";
import * as moment from 'moment';

export default {
  desc: 'Collect your daily clownbucks.',
  name: 'daily',
  args: '',
  run: (message: Message) => {
    if(!message.guild) return;
    const G_ID = message.guild.id;
    const daily = GET_DAILY.get(message.author.id, G_ID);
    const u_daily = daily ? moment(daily.daily) : moment();
    const today = moment();
    
    let user_score = GET_SCORE.get(message.author.id, G_ID);
    let user_daily = daily
    
    if(!user_score) {
      user_score = { id: `${message.author.id}-${G_ID}`, user: message.author.id, guild: G_ID, points: 0 };
      user_score.points += 10;
      message.reply(`you claimed 10 clownbucks for today.`);
      SET_SCORE.run(user_score);
      SET_DAILY.run(user_daily);
    } else {
      const daily_expire = moment(u_daily).add(1, 'd');
      const until_next = moment.duration(daily_expire.diff(today));

      if(daily && (until_next.asDays() > 0 || until_next.asHours() > 0)) {
        return message.reply(`you need to wait ${Math.round(until_next.asHours())} hours until you can claim.`);
      }

      user_score.points += 10;
      message.reply(`you gained 10 clownbucks for today.`);
      user_daily.daily = moment().toString();
      SET_SCORE.run(user_score);
      SET_DAILY.run(user_daily);
    }

    return;
  }
}