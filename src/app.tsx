import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import './app.scss';
import './reset.css';

function parseInput(value: string): ReadonlySet<string> {
  return new Set([...value.matchAll(/href="([^"]+)"/g)].map(([_, found]) => found));
}

function App() {
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');
  const [result, setResult] = useState<string[]>([]);

  function processInputs() {
    const fromHrefs = parseInput(fromValue);
    const toHrefs = parseInput(toValue);
    setResult([...fromHrefs].filter(href => !toHrefs.has(href)));
  }

  return (
    <div className='main'>
      <div className='main__header'>
        Instagram friends comparer<sub>(if you know how to use it, lol)</sub>
      </div>
      <div className='main__inputs'>
        <div className='main__input-wrapper'>
          <TextField
            multiline={true}
            fullWidth={true}
            placeholder={'Insert from html here'}
            rows={10}
            value={fromValue}
            onChange={(ev) => setFromValue(ev.target.value)}
          />
        </div>
        <div className='main__buttons'>
          <Button
            variant='contained'
            disabled={fromValue.trim().length === 0 || toValue.trim().length === 0}
            onClick={processInputs}
            disableElevation
          >
            Process
          </Button>
          <Button
            variant='outlined'
            disabled={fromValue.trim().length === 0 && toValue.trim().length === 0}
            onClick={() => {
              setFromValue('');
              setToValue('');
            }}
          >
            Clear
          </Button>
          <Button
            onClick={() => {
              const oldFrom = fromValue;
              setFromValue(toValue);
              setToValue(oldFrom);
            }}
          >
            Swap
          </Button>
        </div>
        <div className='main__input-wrapper'>
          <TextField
            multiline={true}
            fullWidth={true}
            value={toValue}
            placeholder={'Insert to html here'}
            rows={10}
            onChange={(ev) => setToValue(ev.target.value)}
          />
        </div>
      </div>
      {
        result.length !== 0 && (
          <div className='main__list'>
            <div className='main__list-header'>
              Here they are
            </div>
            <List>
              {
                result && result.map(link => (
                  <ListItemButton
                    key={link}
                    onClick={() => {
                      window.open(`https://www.instagram.com${link}`, '_blank');
                    }}
                  >
                    {link.substring(1)}
                  </ListItemButton>
                ))
              }
            </List>
          </div>
        )
      }
    </div>
  );
}

export default App;
