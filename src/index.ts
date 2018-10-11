import PankyBot from './bot';

const Panky = new PankyBot();

Panky.start().catch(e => {
  console.log(e);
});
