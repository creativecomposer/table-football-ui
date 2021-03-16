import { useSelector } from 'react-redux';
import { GenericKeyValuePair, RootState } from 'definitions';

export const usePlayers = (): GenericKeyValuePair => {
  const objPlayers: GenericKeyValuePair = useSelector<RootState>(
    (reduxState) => reduxState.players
  ) as GenericKeyValuePair;
  return objPlayers;
};
