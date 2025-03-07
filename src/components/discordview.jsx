import React from 'react';
import Moment from 'moment';
import Embed from './embed';
import { parse, parseAllowLinks, jumboify } from './markdown';


class MessageTimestamp extends React.Component {
  static defaultProps = { compactMode: false }

  componentDidMount() {
    this.timer = setInterval(() => this.tick(), 1000 * 60);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick() {
    this.forceUpdate();
  }

  render() {
    const { compactMode } = this.props;
    const m = Moment();
    const computed = compactMode ? m.format('LT') : m.calendar();

    return <span className='timestamp'>{computed}</span>;
  }
}

const MessageBody = ({ compactMode, username, content, webhookMode, bot }) => {
  if (compactMode) {
    return (
      <div className='markup'>
        <MessageTimestamp compactMode={compactMode} />
        <span className='username-wrapper v-btm'>
          <strong className='user-name'>{username}</strong>
          {bot !== false ? <span className='bot-tag'>BOT</span> : ''}
        </span>
        <span className='highlight-separator'> - </span>
        <span className='message-content'>{content && parse(content, true, {}, jumboify)}</span>
      </div>
    );
  } else if (content) {
    if (webhookMode) {
      return <div className='markup'>{parseAllowLinks(content, true, {}, jumboify)}</div>;
    }

    return <div className='markup'>{parse(content, true, {}, jumboify)}</div>;
  }

  return null;
};

const CozyMessageHeader = ({ compactMode, username, bot }) => {
  if (compactMode) {
    return null;
  }

  return (
    <h2 style={{ lineHeight: '16px' }}>
      <span className='username-wrapper v-btm'>
        <strong className='user-name'>{username}</strong>
        {bot !== false ? <span className='bot-tag'>BOT</span> : ''}
      </span>
      <span className='highlight-separator'> - </span>
      <MessageTimestamp compactMode={compactMode} />
    </h2>
  );
};

const Avatar = ({ compactMode, url }) => {
  if (compactMode) {
    return null;
  }

  return <div className='avatar-large animate' style={{ backgroundImage: `url('${url}')` }} />;
};

const ErrorHeader = ({ error }) => {
  if (!error) {
    return null;
  }

  return <header className='f6 bg-red br2 pa2 br--top w-100 code pre-wrap'>{error}</header>;
};

const DiscordViewWrapper = ({ darkTheme, children }) => {
  // yikes
  // we could actually just flatten the styling out on the respective elements,
  // but copying directly from discord is a lot easier than that
  return (
    <div className='w-100 h-100 overflow-auto pa2 discord-view'>
      <div className={`flex-vertical whitney ${darkTheme && 'theme-dark'}`}>
        <div className='chat flex-vertical flex-spacer'>
          <div className='content flex-spacer flex-horizontal'>
            <div className='flex-spacer flex-vertical messages-wrapper'>
              <div className='scroller-wrap'>
                <div className='scroller messages'>
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

class DiscordView extends React.Component {
  static defaultProps = {
    messages: [],
    defaults: {
      username: 'Discord bot',
      avatar_url: 'https://cdn.discordapp.com/embed/avatars/0.png',
    },
    darkTheme: true,
    compactMode: false
  }

  render() {
    const {
      compactMode, darkTheme, webhookMode,
      error, messages, defaults,
    } = this.props;

    const bgColor = darkTheme ? 'bg-discord-dark' : 'bg-discord-light';
    const cls = `w-100 h-100 br2 flex flex-column white overflow-hidden ${bgColor}`;

    return (
      <div className={cls}>
        <ErrorHeader error={error} />
        <DiscordViewWrapper darkTheme={darkTheme}>
          {messages.map(({username, avatar_url, content, embed, embeds, bot }, index) => {
            return <div className={`message-group hide-overflow ${compactMode ? 'compact' : ''}`} key={index}>
              <Avatar url={avatar_url || defaults.avatar_url} compactMode={compactMode} />
              <div className='comment'>
                <div className='message first'>
                  <CozyMessageHeader username={username || defaults.username} compactMode={compactMode} bot={bot}/>
                  <div className='message-text'>
                    <MessageBody
                      content={content}
                      username={username || defaults.username}
                      compactMode={compactMode}
                      webhookMode={webhookMode}
                      bot={bot}
                    />
                  </div>
                  {embed ? <Embed {...embed} /> : (embeds && embeds.map((e, i) => <Embed key={i} {...e} />))}
                </div>

              </div>
            </div>;
          })}
        </DiscordViewWrapper>
      </div>
    );
  }
}


export default DiscordView;
