import { useEffect, useRef, useState } from 'react'
import { Chessboard, type PieceDropHandlerArgs } from 'react-chessboard';
import { Chess } from 'chess.js'

const fetchposition = async () => {
  const response = await fetch('https://lichess.org/api/puzzle/next', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' +import.meta.env.VITE_Lichess_API
    }
  });
  console.log("here")
  const data = await response.json();
  console.log('Fetched Position:', data);
  const position = data.puzzle.fen;
  return position;
}

function App() {

   const chessGameRef = useRef(new Chess());
   const chessGame = chessGameRef.current;

  // track the current position of the chess game in state to trigger a re-render of the chessboard
  const [chessPosition, setChessPosition] = useState(chessGame.fen());

  useEffect(() => {
    const fetchInitialPosition = async () => {
      const initialPosition = await fetchposition();
      console.log('Initial Position:', initialPosition);
      chessGame.load(initialPosition);
      setChessPosition(chessGame.fen());
    };

    fetchInitialPosition();
  }, [chessGame]);

      // handle piece drop
    const onPieceDrop = ({
      sourceSquare,
      targetSquare
    }: PieceDropHandlerArgs)  => {
      // type narrow targetSquare potentially being null (e.g. if dropped off board)
      if (!targetSquare) {
        return false;
      }

      const move = {
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q',
      }
      console.log(move);
      // try to make the move according to chess.js logic
      try {
        chessGame.move(move);

        // update the position state upon successful move to trigger a re-render of the chessboard
        setChessPosition(chessGame.fen());

        // make random cpu move after a short delay
        // setTimeout(makeRandomMove, 500);

        // return true as the move was successful
        return true;
      } catch {
        // return false as the move was not successful
        return false;
      }
    }

    // set the chessboard options

  const chessboardOptions = {
    position: chessPosition,
    onPieceDrop: onPieceDrop,
    // your config options here
  };
  return (
    <>
      
        
      <section className="w-96 h-96 flex justify-center items-center bg-black">
        <Chessboard options={chessboardOptions} />

      </section>
    </>
  )
}

export default App
