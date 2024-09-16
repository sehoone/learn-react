
// type Props = {}
import './index.less';
import Player from '@/components/tic-tac-toe/Player'
import GameBoard from '@/components/tic-tac-toe/GameBoard';
import { useState } from 'react';
type PlayerSymbol = 'X' | 'O' | null;

const TicTacToePage = () => {
  const [activePlayer, setActivePlayer] = useState<PlayerSymbol>('X');

  const handleSelectSquare = () => {
    setActivePlayer((currActivePlayer) => currActivePlayer === 'X' ? 'O' : 'X');
  }

  return (
    <main>
      <div id='game-container'>
        <ol id='players' className='highlight-player'>
          <Player name='Player1' symbol='X' isActive={activePlayer === 'X'} />
          <Player name='Player1' symbol='O' isActive={activePlayer === 'O'} />
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer} />
      </div>
    </main>
  )
}

export default TicTacToePage