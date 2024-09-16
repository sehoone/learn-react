import { useState } from 'react';

type PlayerSymbol = 'X' | 'O' | null;

const initialGameBoard: PlayerSymbol[][] = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

type Props = {
  onSelectSquare: () => void, activePlayerSymbol: PlayerSymbol
}

const GameBoard = (prop: Props) => {
  const [gameBoard, setGameBoard] = useState(initialGameBoard);

  const handleSelectSquare = (rowIndex: number, cellIndex: number) => {
    setGameBoard((prevGameBoard) => {
      // 상태감지를 위해 깊은복사를 통해 독립적인 새로운 배열을 생성. 
      const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
      updatedBoard[rowIndex][cellIndex] = prop.activePlayerSymbol;
      return updatedBoard;

    });

    prop.onSelectSquare();
  }

  return (
    <ol id='game-board'>
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, cellIndex) => (
              <li key={cellIndex}>
                <button onClick={() => handleSelectSquare(rowIndex, cellIndex)}>{playerSymbol}</button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  )
}

export default GameBoard