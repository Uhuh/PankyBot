import bot from './bot'

const Panky = new bot()

Panky.start().catch((e) => {
  console.log(e)
})