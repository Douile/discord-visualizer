import React from 'react';
import ReactDOM from 'react-dom/server';
import DiscordView from './components/discordview';

const arg = process.argv.find((v) => v.trim().startsWith('['));

let data = [{ username: 'Example', content: 'Example message' }];
if (arg) {
  data = JSON.parse(arg);
}

console.error('Compiling', data);

const e = <DiscordView 
  messages={data}
  webhookMode={false}
  darkTheme={true}
  compactMode={false}
    />;

const r = ReactDOM.renderToString(e);

console.log(r);
