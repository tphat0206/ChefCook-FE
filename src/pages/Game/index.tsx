import { useEffect, useRef } from 'react';
import { useWebsocket } from '../../websocket';
import { useSelector } from 'react-redux';
import { selectPlayers } from '../../redux/game/selectors';
import { Player } from '../../types';
import { useParams } from 'react-router-dom';

const GamePage = () => {
  const players = useSelector(selectPlayers);
  const ws = useRef<WebSocket | null>(null);
  const { room, user } = useParams();
  //   0198ab42-e2a7-40ee-b96a-0e7de771d5ff
  ws.current = useWebsocket({
    room: room ?? '',
    user: user ?? '',
  });
  const handleDocumentClick = (event: MouseEvent) => {
    const newLeft = event.clientX - 25;
    const newTop = event.clientY - 25;
    ws.current?.send(
      JSON.stringify({
        message: { y: newTop, x: newLeft },
      })
    );
  };

  useEffect(() => {
    console.log(ws);
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);
  console.log(players);
  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <p
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          color: 'black',
        }}
      >
        Click anywhere on the screen to move the blue circle!
      </p>
      {players.map((player: Player) => {
        return (
          <div
            key={player.name}
            style={{
              position: 'absolute',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              backgroundColor: 'pink',
              border: '1px solid black',
              cursor: 'pointer',
              transition: 'top 0.3s ease-out, left 0.3s ease-out',
              top: `${player.cur_position.y}px`,
              left: `${player.cur_position.x}px`,
              alignContent: 'center',
              textAlign: 'center'
            }}
          >{player.name}</div>
        );
      })}
    </div>
  );
};

export default GamePage;
