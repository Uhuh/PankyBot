import { Message } from "discord.js";

export default {
  desc: 'Get inspired',
  name: 'inspire',
  args: '',
  type: 'general',
  run: async function (message: Message) {
    const request = require('request');
    const url = 'https://inspirobot.me/api?generate=true';
    request({
      url: url,
      json: false
    }, function (error: string, response: any, body: string) {
      if (!error && response.statusCode === 200) {
        message.channel.send({
          embed: {
            title: '',
            description: '',
            image: {
              url: body
            }
          }
        }).catch(console.error)
      }
    })
  }
}