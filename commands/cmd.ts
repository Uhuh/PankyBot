import ping from './ping'
import dog from './dog'
import leaderBoard from './leaderBoard'
import source from './source';

export default new Map<string, any>(
  [
    ['ping', ping],
    ['dog', dog],
    ['leaderboard', leaderBoard],
    ['github', source]
  ]
)