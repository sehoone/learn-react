
// type Props = {}
import './index.less';
import Player from '@/components/tic-tac-toe/Player'
import GameBoard from '@/components/tic-tac-toe/GameBoard';
import { useState } from 'react';
export type PlayerSymbol = 'X' | 'O' | null;
export interface Turn {
  square: { row: number; cell: number };
  player: PlayerSymbol;
}
const deriveActivePlayer = (gameTurn: Turn[]): PlayerSymbol => {
  let currentPlayer: PlayerSymbol = 'X';
  if (gameTurn.length > 0 && gameTurn[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
}

const TicTacToePage = () => {
  const [gameTurn, setGameTurn] = useState<Turn[]>([]);
  // const [activePlayer, setActivePlayer] = useState<PlayerSymbol>('X');
  const activePlayer = deriveActivePlayer(gameTurn);

  const handleSelectSquare = (rowIndex: number, cellIndex: number) => {
    // setActivePlayer((currActivePlayer) => currActivePlayer === 'X' ? 'O' : 'X');

    setGameTurn((prevGameTurn) => {
      const currentPlayer = deriveActivePlayer(prevGameTurn);

      const updatedTurns: Turn[] = [
        { square: { row: rowIndex, cell: cellIndex }, player: currentPlayer },
        ...prevGameTurn
      ];
      return updatedTurns;
    });
  }

  return (
    <main>
      <div id='game-container'>
        <ol id='players' className='highlight-player'>
          <Player name='Player1' symbol='X' isActive={activePlayer === 'X'} />
          <Player name='Player1' symbol='O' isActive={activePlayer === 'O'} />
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} turn={gameTurn} />
      </div>
    </main>
  )
}

export default TicTacToePage