import { Message } from "discord.js";

export default {
  desc: 'Guess zuckwatch\'s password.',
  name: 'zuck',
  args: '<some words>',
  run: (message: Message, args: string[]) => {
    const request = require('request');
    const url = 'https://k1ozwahixa.execute-api.us-east-1.amazonaws.com/dev/password';
    request({
      url: url,
      json: {'password': args.join(" ")}
    }, function (error: string, response: any) {
      if (!error) {
        message.channel.send({
          embed: {
            title: `Password: ${args.join(" ")}\nStatus: ${response.statusCode}`,
            description: response.statusCode === 200 ? "Nice" : "Try again :("
          }
        }).catch(console.error)
      }
    })
  }
}