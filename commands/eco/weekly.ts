import { Message } from "discord.js";
import { GET_SCORE, SET_SCORE, SET_WEEKLY, GET_WEEKLY } from "../../src/setup_tables";
import * as moment from 'moment';

export default {
  desc: 'Collect your weekly clownbucks.',
  name: 'weekly',
  args: '',
  run: (message: Message) => {
    if(!message.guild) return;
    const G_ID = message.guild.id;
    const weekly = GET_WEEKLY.get(message.author.id, G_ID);
    const u_weekly = weekly ? moment(weekly.weekly) : moment();
    console.log(weekly);
    const today = moment();
    
    let user_score = GET_SCORE.get(message.author.id, G_ID);
    let user_weekly = weekly;
    
    if(!user_score) {
      user_score = { id: `${message.author.id}-${G_ID}`, user: message.author.id, guild: G_ID, points: 0 };
      user_score.points += 70;
      message.reply(`you claimed 70 clownbucks this week.`);
      SET_SCORE.run(user_score);
      SET_WEEKLY.run(user_weekly);
    } else {
      const weekly_expire = moment(u_weekly).add(7, 'days');
      const until_next = moment.duration(weekly_expire.diff(today));

      if(weekly && (until_next.asDays() > 0 || until_next.asHours() > 0)) {
        return message.reply(`you need to wait ${Math.round(until_next.asDays())} days until you can claim.`);
      }

      user_score.points += 70;
      message.reply(`you gained 70 clownbucks for today.`);
      user_weekly.weekly = moment().toString();
      SET_SCORE.run(user_score);
      SET_WEEKLY.run(user_weekly);
    }

    return;
  }
}