import Game from './components/Game';

const data = {
  Germany: 'Berlin',
  France: 'Paris',
  Italy: 'Rome',
};

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <Game data={data} />
    </main>
  );
}
