'use client';
import React from 'react';

type GameProps = {
  data: Record<string, string>;
};

type Item = {
  value: string;
  state: 'idle' | 'selected' | 'wrong';
};

const Game = ({ data }: GameProps): JSX.Element => {
  const [items, setItems] = React.useState<Item[]>([]);
  const selectedItems = items.filter((item) => item.state === 'selected');

  React.useEffect(() => {
    setItems(getItems(data));
  }, [data]);

  const handleSelect = (item: Item) => {
    if (item.state === 'selected') return;

    if (selectedItems.length === 2) {
      if (
        data[selectedItems[0].value] === selectedItems[1].value ||
        data[selectedItems[1].value] === selectedItems[0].value
      ) {
        setItems((i) => i.filter((item) => item.state !== 'selected'));
      } else {
        setItems((s) =>
          s.map((i) => {
            if (i.state === 'selected') {
              return { ...i, state: 'wrong' };
            }
            return i;
          })
        );
      }

      return;
    }

    setItems((s) =>
      s.map((i) => {
        if (i.value === item.value) {
          return { ...i, state: 'selected' };
        }
        if (i.state === 'wrong') {
          return { ...i, state: 'idle' };
        }

        return i;
      })
    );
  };

  return (
    <div className='container'>
      <h1 className='text-lg font-bold text-slate-800'>Game</h1>
      <p className='text-slate-500'>Select Country/Capital</p>

      {items.length === 2 && selectedItems.length === 2 && (
        <p className='text-slate-500'>You won 🥂</p>
      )}

      <ul className='mt-8 flex gap-8'>
        {items.map((item) => (
          <li key={item.value}>
            <button
              className={`text-white rounded px-4 py-2 hover:bg-slate-700 transition-all ${mapBgColor(
                item.state
              )}`}
              onClick={() => handleSelect(item)}
            >
              {item.value}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Game;

function getItems(data: Record<string, string>) {
  let items: Item[] = [];
  for (let key in data) {
    items.push({
      value: key,
      state: 'idle',
    });
    items.push({
      value: data[key],
      state: 'idle',
    });
  }

  // Shuffle items
  items.sort(() => Math.random() - 0.5);

  return items;
}

const mapBgColor = (state: Item['state']) => {
  switch (state) {
    case 'idle':
      return 'bg-slate-800';
    case 'selected':
      return 'bg-blue-700';
    case 'wrong':
      return 'bg-red-800';
  }
};
