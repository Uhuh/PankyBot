import { Message } from "discord.js";

export default {
  desc: 'Sends a photo or gif of a random dog.',
  name: 'dog',
  args: '',
  run: async function (message: Message) {
    const request = require('request')
    const url = 'http://random.dog/woof'
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
              url: `http://random.dog/${body}`
            }
          }
        }).catch(err => {
          console.log(`Error with dog: ${err}`)
        })
      }
    })
  }
}
