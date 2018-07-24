import ping from './ping'
import dog from './dog'
import source from './source';
import getName from './getName';
import setName from './setName'
import getActivity from './getActivity';

export default new Map<string, any>(
  [
    ['ping', ping],
    ['dog', dog],
    ['github', source],
    ['whois', getName],
    ['setname', setName],
    ['getactivity', getActivity]
  ]
)