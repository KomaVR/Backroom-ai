// components/HorrorScene.js
import { useEffect, useState } from 'react';

function HorrorScene() {
  const [room, setRoom] = useState([]);
  const [event, setEvent] = useState('');
  const [wallTexture, setWallTexture] = useState('');
  const [floorTexture, setFloorTexture] = useState('');
  const [soundUrl, setSoundUrl] = useState('');

  useEffect(() => {
    const fetchRoomAndEvent = async () => {
      const response = await fetch('/api/generateEvent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ situation: 'Player enters a dark room' }),
      });

      const data = await response.json();
      setRoom(data.room);
      setEvent(data.event);
      setWallTexture(data.wallTexture);
      setFloorTexture(data.floorTexture);
      setSoundUrl(data.sound);
    };

    fetchRoomAndEvent();
  }, []);

  return (
    <div>
      <h2>Backrooms Encounter</h2>
      <p>{event}</p>
      <div>
        <h3>Room Layout</h3>
        <pre>{JSON.stringify(room, null, 2)}</pre>
      </div>
      {soundUrl && <audio controls src={soundUrl} autoPlay />}
    </div>
  );
}

export default HorrorScene;
