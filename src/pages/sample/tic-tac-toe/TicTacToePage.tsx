
// type Props = {}
import './index.less';
import Player from '@/components/tic-tac-toe/Player'
import GameBoard from '@/components/tic-tac-toe/GameBoard';

const ticTacToePage = () => {
  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player name="Player1" symbol='o' />
          <Player name="Player1" symbol='x' />
        </ol>
        <GameBoard />
      </div>
    </main>
  )
}

export default ticTacToePage