/**
 * Chat Preview Messages
 *
 * HOW TO EDIT:
 * - Add a new message: copy any line and change user/color/text
 * - Remove a message: delete the entire { ... } line
 * - Add emotes after text: add  emotes: ['KEKW']  (must match a key in EMOTE_MAP)
 * - Mark as subscriber: add  badges: ['sub']
 * - Mark as moderator: add  badges: ['mod', 'sub']
 * - Mark as bot: add  isBot: true
 *
 * No build step needed — just save and refresh.
 */

export interface PreviewMessage {
  user: string;
  color: string;
  text: string;
  badges?: ('mod' | 'sub')[];
  emotes?: string[];
  isBot?: boolean;
}

/** Emote name → image URL. Local files in /public/emotes/ or 7tv CDN. */
export const EMOTE_MAP: Record<string, string> = {
  KEKW: '/emotes/kekw.png',
  PepeLaugh: '/emotes/pepelaugh.gif',
  catJAM: '/emotes/catjam.gif',
  PartyKirby: '/emotes/partykirby.gif',
  Sniffa: '/emotes/sniffa.gif',
  Chatting: '/emotes/chatting.webp',
  LULW: '/emotes/lulw.webp',
  Clueless: '/emotes/clueless.webp',
  COPIUM: '/emotes/copium.webp',
  Sadge: '/emotes/sadge.webp',
  peepoClap: '/emotes/peepoclap.webp',
  NODDERS: '/emotes/nodders.webp',
  monkaS: '/emotes/monkas.webp',
  xdd: '/emotes/xdd.webp',
  OMEGALUL: '/emotes/omegalul.webp',
};

/** Badge type → image path */
export const BADGE_MAP: Record<string, string> = {
  mod: '/emotes/badge-moderator.png',
  sub: '/emotes/badge-subscriber.png',
};

/* ────────────────────────────────────────────────
 *  Messages — ~200 entries
 *  Grouped by type for readability, but rendered randomly.
 * ──────────────────────────────────────────────── */

export const PREVIEW_MESSAGES: PreviewMessage[] = [
  // ── General chat ──────────────────────────────

  { user: 'GoldenViewer', color: '#e6a817', text: 'gg wp that was insane' },
  { user: 'PixelQueen', color: '#ff69b4', text: 'first time here, love the vibes' },
  { user: 'ChillGuy99', color: '#00bfff', text: 'just got here whats happening' },
  { user: 'NightOwl42', color: '#9370db', text: 'cant sleep so here i am' },
  { user: 'ToasterBath', color: '#ff6347', text: 'my internet is held together by prayers', emotes: ['Sadge'] },
  { user: 'VibinTom', color: '#2e8b57', text: 'this stream is the reason im failing my classes', emotes: ['LULW'] },
  { user: 'SneakyPete', color: '#ff8c00', text: 'I should be working rn but here we are', emotes: ['Clueless'] },
  { user: 'CloudSurfer', color: '#6495ed', text: 'whos cutting onions in here', emotes: ['Sadge'] },
  { user: 'SpicyNoodle', color: '#dc143c', text: 'this chat moves faster than my brain', emotes: ['Chatting'] },
  { user: 'ZeroChill', color: '#00ff7f', text: 'actual content lets gooo', emotes: ['peepoClap'] },
  { user: 'MoonWalker', color: '#daa520', text: 'imagine sleeping when this stream is live', emotes: ['NODDERS'] },
  { user: 'BagelBoss', color: '#fa8072', text: 'chat im eating a bagel rn' },
  { user: 'TurboNerd', color: '#4169e1', text: 'anyone else watching on their phone in bed' },
  { user: 'SaltyPretzel', color: '#f08080', text: 'my cat just sat on my keyboard' },
  { user: 'CouchPotato', color: '#32cd32', text: 'been here for 4 hours no regrets', emotes: ['COPIUM'] },
  { user: 'WaffleKing', color: '#ff4500', text: 'WAFFLES > PANCAKES and thats a fact', emotes: ['NODDERS'] },
  { user: 'QuietStorm', color: '#5f9ea0', text: 'lurking since 2019' },
  { user: 'FizzyPop', color: '#ee82ee', text: 'hydration check drink water chat' },
  { user: 'RamenLord', color: '#ff7f50', text: 'making ramen while watching this W' },
  { user: 'NapTime', color: '#20b2aa', text: 'one more game then i sleep (lie)', emotes: ['COPIUM'] },
  { user: 'DiscoBall', color: '#ffd700', text: 'this is the best timeline', emotes: ['peepoClap'] },
  { user: 'JellyBean', color: '#ff1493', text: 'chat i just stubbed my toe send help', emotes: ['Sadge'] },
  { user: 'ThunderCat', color: '#8a2be2', text: 'W STREAM W CHAT W EVERYTHING', emotes: ['peepoClap'] },
  { user: 'PaperPlane', color: '#00ced1', text: 'just got back from getting food what did i miss' },
  { user: 'BrickWall', color: '#b22222', text: 'this is the content i pay internet for' },
  { user: 'SkyDiver', color: '#1e90ff', text: 'POV: you have good taste in streams' },
  { user: 'GummyBear', color: '#ff69b4', text: 'can we get a W in chat' },
  { user: 'IronChef', color: '#cd853f', text: 'cooking dinner and watching stream multitask king' },
  { user: 'LavaLamp', color: '#ff4500', text: 'this hits different at 3am', emotes: ['NODDERS'] },
  { user: 'SnowFlake', color: '#87ceeb', text: 'cozy stream cozy chat cozy life' },
  { user: 'TacoTuesday', color: '#e67e22', text: 'its always taco tuesday if you believe' },
  { user: 'BlueMoon', color: '#4169e1', text: 'yo chat is this real life' },
  { user: 'PizzaRat', color: '#ff6347', text: 'just ordered pizza because of this stream' },
  { user: 'StarDust', color: '#daa520', text: 'sending good vibes from australia' },
  { user: 'CheeseWhiz', color: '#ffa500', text: 'chat im stuck in a meeting but i have you guys' },
  { user: 'OceanWave', color: '#00bfff', text: 'this is my therapy' },
  { user: 'RocketMan', color: '#dc143c', text: 'LETS GOOOOOO', emotes: ['peepoClap'] },
  { user: 'PeachFuzz', color: '#ffb6c1', text: 'i love this community fr' },
  { user: 'CopperFox', color: '#b87333', text: 'hello from germany' },
  { user: 'NeonSign', color: '#7fff00', text: 'glhf' },
  { user: 'VelvetRope', color: '#9b59b6', text: 'my dog is watching too she says hi' },
  { user: 'MarbleSlab', color: '#708090', text: 'chat be normal for 5 seconds challenge impossible', emotes: ['Clueless'] },
  { user: 'TinFoil', color: '#c0c0c0', text: 'i knew it', emotes: ['monkaS'] },
  { user: 'WildCard', color: '#ff4500', text: 'called it' },
  { user: 'GreenTea', color: '#2e8b57', text: 'chill vibes only please' },
  { user: 'RedVelvet', color: '#dc143c', text: 'ok that was actually hilarious', emotes: ['OMEGALUL'] },
  { user: 'SilverLion', color: '#c0c0c0', text: 'been watching for 6 hours straight no cap' },
  { user: 'CrystalBall', color: '#e0b0ff', text: 'i predict a W' },
  { user: 'MintChip', color: '#3eb489', text: 'chat what are we eating for dinner' },
  { user: 'SunFlower', color: '#ffd700', text: 'good morning from japan!' },

  // ── Gameplay reactions ────────────────────────

  { user: 'ProGamerX', color: '#ff0000', text: 'NO WAY HE HIT THAT', emotes: ['OMEGALUL'] },
  { user: 'xXSlayerXx', color: '#ff4500', text: 'CLIP IT CLIP IT CLIP IT', emotes: ['peepoClap'] },
  { user: 'AimBot3000', color: '#00ff7f', text: 'that aim is suspicious ngl', emotes: ['monkaS'] },
  { user: 'ClutchKing', color: '#ffd700', text: 'THE CLUTCH??? HELLO???', emotes: ['OMEGALUL'] },
  { user: 'RageQuit', color: '#dc143c', text: 'bro just uninstall', emotes: ['xdd'] },
  { user: 'GGnoRe', color: '#4169e1', text: 'ez clap', emotes: ['LULW'] },
  { user: 'FragMaster', color: '#32cd32', text: 'actual god gamer' },
  { user: 'CriticalHit', color: '#ff8c00', text: 'one more game', emotes: ['COPIUM'] },
  { user: 'LootGoblin', color: '#9370db', text: 'THE LOOT THE LOOT' },
  { user: 'BossMode', color: '#b22222', text: 'he makes it look so easy' },
  { user: 'Respawning', color: '#6495ed', text: 'skill diff honestly' },
  { user: 'LastStand', color: '#ff6347', text: 'THATS ILLEGAL', emotes: ['monkaS'] },
  { user: 'OneShot', color: '#00bfff', text: 'one tap machine' },
  { user: 'TiltProof', color: '#2e8b57', text: 'chat hes gaming' },
  { user: 'FlankGod', color: '#ff1493', text: 'the flank was nasty' },
  { user: 'HeadshotOnly', color: '#e6a817', text: 'literally aimbot' },
  { user: 'NoScope420', color: '#8a2be2', text: 'DID HE JUST', emotes: ['OMEGALUL'] },
  { user: 'BarrelStuff', color: '#fa8072', text: 'DESTROYED', emotes: ['xdd'] },
  { user: 'GameSense', color: '#20b2aa', text: 'the game sense is unreal' },
  { user: 'PogChamp99', color: '#ff7f50', text: 'PLAY OF THE YEAR', emotes: ['peepoClap'] },
  { user: 'WallBang', color: '#daa520', text: 'through the wall??? excuse me???', emotes: ['monkaS'] },
  { user: 'SpawnPeek', color: '#dc143c', text: 'how does he keep getting away with it', emotes: ['Clueless'] },
  { user: 'DragonSlayer', color: '#ff4500', text: 'LETS GOOOOO', emotes: ['peepoClap'] },
  { user: 'IceVeins', color: '#87ceeb', text: 'so calm under pressure its scary' },
  { user: 'FullSend', color: '#00ff7f', text: 'FULL SEND NO BRAKES', emotes: ['NODDERS'] },
  { user: 'DeathFromAbove', color: '#9b59b6', text: 'aerial ace' },
  { user: 'SmokeScreen', color: '#708090', text: 'the reads are insane today' },
  { user: 'BlastZone', color: '#ff0000', text: 'BOOM HEADSHOT', emotes: ['LULW'] },
  { user: 'DodgeThis', color: '#1e90ff', text: 'literally unhittable' },
  { user: 'ComboBreaker', color: '#ffa500', text: 'the combo was disgusting' },

  // ── Subscriber messages ───────────────────────

  { user: 'LoyalFan', color: '#ff69b4', text: 'subbed for 2 years love this stream', badges: ['sub'] },
  { user: 'TrueBeliever', color: '#9370db', text: 'best money i ever spent', badges: ['sub'] },
  { user: 'DiamondHands', color: '#00bfff', text: 'never unsubbing', badges: ['sub'] },
  { user: 'VIPVibes', color: '#ffd700', text: 'the sub emotes are so good', badges: ['sub'] },
  { user: 'PrimeGaming', color: '#6495ed', text: 'using my prime sub here every month', badges: ['sub'] },
  { user: 'SubHype', color: '#ff4500', text: 'just resubbed for month 14!!', badges: ['sub'] },
  { user: 'EmoteCollector', color: '#32cd32', text: 'i only subbed for the emotes ngl', badges: ['sub'], emotes: ['Clueless'] },
  { user: 'TierThree', color: '#e6a817', text: 'tier 3 sub btw', badges: ['sub'] },
  { user: 'GiftedSub', color: '#ff8c00', text: 'thank you for the gifted!', badges: ['sub'] },
  { user: 'OGSubscriber', color: '#b22222', text: 'been here since day one', badges: ['sub'] },
  { user: 'SubSunday', color: '#ff1493', text: 'happy sub sunday everyone', badges: ['sub'] },
  { user: 'HypeTrainConductor', color: '#ff6347', text: 'ALL ABOARD THE HYPE TRAIN', badges: ['sub'], emotes: ['peepoClap'] },
  { user: 'BadgeCollector', color: '#8a2be2', text: 'love my loyalty badge', badges: ['sub'] },
  { user: 'SupportMain', color: '#2e8b57', text: 'supporting the best streamer', badges: ['sub'] },
  { user: 'FanNumber1', color: '#dc143c', text: 'literally the best stream on twitch', badges: ['sub'] },
  { user: 'PurpleArmy', color: '#9b59b6', text: 'purple army rise up', badges: ['sub'] },
  { user: 'ChatElite', color: '#daa520', text: 'sub badge looking fresh', badges: ['sub'] },
  { user: 'StreamSniper', color: '#00ff7f', text: 'caught every stream this week', badges: ['sub'] },
  { user: 'MerchKing', color: '#fa8072', text: 'bought the merch AND the sub im all in', badges: ['sub'] },
  { user: 'NotifGang', color: '#4169e1', text: 'notifications always on', badges: ['sub'] },
  { user: 'HighRoller', color: '#ff7f50', text: '5 gifted subs lets keep it going', badges: ['sub'] },
  { user: 'DaySub', color: '#20b2aa', text: 'first sub ever and its here', badges: ['sub'] },
  { user: 'SubAlert', color: '#e0b0ff', text: 'the sub sound is so clean', badges: ['sub'] },
  { user: 'MonthStreak', color: '#b87333', text: '24 month streak baby', badges: ['sub'] },
  { user: 'PogSub', color: '#ff0000', text: 'subbing was the best decision today', badges: ['sub'], emotes: ['NODDERS'] },

  // ── Moderator messages ────────────────────────

  { user: 'YourModerator', color: '#b565e0', text: 'chat behave or i start timing out', badges: ['mod', 'sub'] },
  { user: 'ModSquad', color: '#00ad03', text: 'remember to be nice to each other', badges: ['mod', 'sub'] },
  { user: 'TimeoutHammer', color: '#ff4500', text: 'i saw that message. deleted.', badges: ['mod', 'sub'] },
  { user: 'RuleKeeper', color: '#1e90ff', text: 'no spoilers please!', badges: ['mod', 'sub'] },
  { user: 'ChatGuardian', color: '#ffd700', text: 'welcome to all the new viewers!', badges: ['mod', 'sub'] },
  { user: 'PeaceKeeper', color: '#9370db', text: 'slow mode on for a sec', badges: ['mod'] },
  { user: 'LinkPatrol', color: '#2e8b57', text: 'no links in chat please', badges: ['mod', 'sub'] },
  { user: 'BanHammer', color: '#dc143c', text: 'try me', badges: ['mod', 'sub'] },
  { user: 'NightMod', color: '#6495ed', text: 'holding it down on the night shift', badges: ['mod'] },
  { user: 'FriendlyMod', color: '#ff69b4', text: 'great stream tonight everyone', badges: ['mod', 'sub'] },
  { user: 'ModCheck', color: '#00bfff', text: 'mods are here dont worry', badges: ['mod', 'sub'] },
  { user: 'SwordOfJustice', color: '#ff8c00', text: 'chat rules are in the panels below', badges: ['mod', 'sub'] },
  { user: 'ShieldBearer', color: '#8a2be2', text: 'follow the channel to stay updated!', badges: ['mod'] },
  { user: 'CleanChat', color: '#32cd32', text: 'keeping chat clean one message at a time', badges: ['mod', 'sub'] },
  { user: 'TrustAndSafety', color: '#e6a817', text: 'report any issues to a mod', badges: ['mod', 'sub'] },

  // ── Bot messages ──────────────────────────────

  { user: 'Nightbot', color: '#aaaaaa', text: 'Check out the socials! Links below', isBot: true },
  { user: 'Nightbot', color: '#aaaaaa', text: 'Follow the stream to get notified!', isBot: true },
  { user: 'Nightbot', color: '#aaaaaa', text: 'Join the Discord! Link in panels', isBot: true },
  { user: 'StreamElements', color: '#aaaaaa', text: 'Top chatter this stream: GoldenViewer', isBot: true },
  { user: 'StreamElements', color: '#aaaaaa', text: 'Current watchstreak: 47 viewers', isBot: true },
  { user: 'StreamElements', color: '#aaaaaa', text: 'Song request: Chill Beats Radio', isBot: true },
  { user: 'Moobot', color: '#aaaaaa', text: 'Remember to hydrate!', isBot: true },
  { user: 'Moobot', color: '#aaaaaa', text: 'Stream has been live for 3 hours', isBot: true },
  { user: 'Nightbot', color: '#aaaaaa', text: 'Schedule: Mon/Wed/Fri 7pm EST', isBot: true },
  { user: 'StreamElements', color: '#aaaaaa', text: 'GiftedSub just tipped $5!', isBot: true },

  // ── Emote reactions ───────────────────────────

  { user: 'EmoteAndy', color: '#ff4500', text: 'absolutely perfect', emotes: ['KEKW'] },
  { user: 'LaughingAndy', color: '#00ad03', text: 'no way', emotes: ['PepeLaugh'] },
  { user: 'VibeCheck', color: '#9b59b6', text: 'the vibes rn', emotes: ['catJAM'] },
  { user: 'PartyTime', color: '#ff69b4', text: 'LETS PARTY', emotes: ['PartyKirby'] },
  { user: 'SniffaGuy', color: '#6495ed', text: 'hmm something smells', emotes: ['Sniffa'] },
  { user: 'KEKWatcher', color: '#e6a817', text: 'I CANT', emotes: ['KEKW'] },
  { user: 'PepeFan', color: '#32cd32', text: 'oh no no no', emotes: ['PepeLaugh'] },
  { user: 'CatLover', color: '#ff1493', text: 'banger song', emotes: ['catJAM'] },
  { user: 'PartyAnimal', color: '#ffd700', text: 'party time!!', emotes: ['PartyKirby'] },
  { user: 'SniffKing', color: '#00bfff', text: 'sniffa', emotes: ['Sniffa'] },
  { user: 'LOLmaster', color: '#dc143c', text: 'BRO IM DEAD', emotes: ['KEKW', 'KEKW'] },
  { user: 'GiggleBox', color: '#ff8c00', text: 'that face gets me every time', emotes: ['PepeLaugh'] },
  { user: 'DanceFloor', color: '#8a2be2', text: 'whole chat vibing', emotes: ['catJAM', 'catJAM'] },
  { user: 'PartyStarter', color: '#2e8b57', text: 'W STREAM', emotes: ['PartyKirby', 'PartyKirby'] },
  { user: 'Sherlock', color: '#b87333', text: 'i smell cap', emotes: ['Sniffa'] },
  { user: 'HappyViewer', color: '#fa8072', text: 'this made my day', emotes: ['catJAM'] },
  { user: 'YourModerator', color: '#b565e0', text: 'Nice stream!', badges: ['mod', 'sub'], emotes: ['KEKW'] },
  { user: 'SubHype', color: '#ff4500', text: 'W W W', badges: ['sub'], emotes: ['PartyKirby'] },
  { user: 'LoyalFan', color: '#ff69b4', text: 'love it here', badges: ['sub'], emotes: ['catJAM'] },
  { user: 'ModSquad', color: '#00ad03', text: 'even the mods are vibing', badges: ['mod', 'sub'], emotes: ['catJAM'] },

  // ── Emote-only messages ───────────────────────

  { user: 'EmoteOnly1', color: '#ff4500', text: '', emotes: ['KEKW', 'KEKW', 'KEKW'] },
  { user: 'EmoteOnly2', color: '#32cd32', text: '', emotes: ['PepeLaugh', 'PepeLaugh'] },
  { user: 'EmoteOnly3', color: '#9370db', text: '', emotes: ['catJAM', 'catJAM', 'catJAM', 'catJAM'] },
  { user: 'EmoteOnly4', color: '#00bfff', text: '', emotes: ['PartyKirby', 'PartyKirby', 'PartyKirby'] },
  { user: 'EmoteOnly5', color: '#e6a817', text: '', emotes: ['Sniffa'] },

  // ── Emote spam ────────────────────────────────

  { user: 'CatVibes420', color: '#1e90ff', text: '', emotes: ['catJAM', 'catJAM', 'catJAM', 'catJAM', 'catJAM', 'catJAM', 'catJAM', 'catJAM'] },
  { user: 'KEKWspammer', color: '#ff0000', text: '', emotes: ['KEKW', 'KEKW', 'KEKW', 'KEKW', 'KEKW', 'KEKW'] },
  { user: 'PartyBus', color: '#ff69b4', text: '', emotes: ['PartyKirby', 'PartyKirby', 'PartyKirby', 'PartyKirby', 'PartyKirby'] },
  { user: 'PepeCrew', color: '#00ad03', text: '', emotes: ['PepeLaugh', 'PepeLaugh', 'PepeLaugh', 'PepeLaugh', 'PepeLaugh'] },
  { user: 'SniffSquad', color: '#b87333', text: '', emotes: ['Sniffa', 'Sniffa', 'Sniffa', 'Sniffa'] },

  // ── Memes & copypasta-lite ────────────────────

  { user: 'CopyPasta1', color: '#ff4500', text: 'if streamer sees this i mass unsub my 200 accounts' },
  { user: 'Conspiracy', color: '#9370db', text: 'chat is the stream delayed or am i from the future' },
  { user: 'BigBrain', color: '#ffd700', text: '5Head ah yes of course', emotes: ['Clueless'] },
  { user: 'SmolBrain', color: '#ff6347', text: 'wait what just happened someone explain', emotes: ['xdd'] },
  { user: 'Philosopher', color: '#6495ed', text: 'if you think about it chat is just talking to yourself' },
  { user: 'TimeTravel', color: '#00ff7f', text: 'hello from 2030 this stream is legendary' },
  { user: 'Prophecy', color: '#daa520', text: 'i predict something crazy happens in the next 30 seconds', emotes: ['monkaS'] },
  { user: 'FlatEarther', color: '#8a2be2', text: 'the earth is flat and so is this gameplay', emotes: ['Chatting'] },
  { user: 'AlienWatcher', color: '#32cd32', text: 'greetings from area 51 wifi is decent', emotes: ['xdd'] },
  { user: 'MatrixGlitch', color: '#00bfff', text: 'deja vu i swear this happened before', emotes: ['monkaS'] },
  { user: 'PoliteFrog', color: '#2e8b57', text: 'good stream sir may i have another' },
  { user: 'Detective', color: '#dc143c', text: 'something is off i can feel it', emotes: ['monkaS'] },
  { user: 'Narrator', color: '#708090', text: 'and at that moment he knew he messed up', emotes: ['LULW'] },
  { user: 'Weatherman', color: '#87ceeb', text: 'forecast: 100% chance of Ws', emotes: ['NODDERS'] },
  { user: 'Accountant', color: '#b87333', text: 'ive calculated the odds and theyre in our favor', emotes: ['COPIUM'] },

  // ── Questions & engagement ────────────────────

  { user: 'NewViewer', color: '#20b2aa', text: 'is this live?', emotes: ['Clueless'] },
  { user: 'CuriousCat', color: '#ff8c00', text: 'what game is this?' },
  { user: 'HelpMe', color: '#fa8072', text: 'how do you get so good' },
  { user: 'QandA', color: '#4169e1', text: 'whats the discord link?' },
  { user: 'SettingsAndy', color: '#b22222', text: 'what keyboard do you use' },
  { user: 'TechSupport', color: '#ff1493', text: 'is the audio scuffed or is it just me', emotes: ['Chatting'] },
  { user: 'ScheduleCheck', color: '#ffa500', text: 'when is next stream?' },
  { user: 'SongRequest', color: '#7fff00', text: 'can you play some lofi beats' },
  { user: 'Resolution', color: '#e0b0ff', text: 'what resolution do you stream at' },
  { user: 'Follower99', color: '#3eb489', text: 'just followed! looking forward to more streams' },

  // ── Longer messages (wrap testing) ────────────

  { user: 'StoryTime', color: '#ff4500', text: 'ok so basically what happened was i was in a ranked game and my teammate just walked off the edge for no reason and we lost the round because of it' },
  { user: 'RantKing', color: '#9370db', text: 'i have been watching this stream for three hours straight and i have zero regrets about the homework i am not doing right now honestly worth it', emotes: ['COPIUM'] },
  { user: 'LongMessage1', color: '#00bfff', text: 'bro that play was absolutely insane i literally jumped out of my chair and scared my cat who was sleeping on my desk she knocked over my water bottle onto my keyboard', emotes: ['OMEGALUL'] },
  { user: 'EssayAndy', color: '#e6a817', text: 'i think the problem with that strategy is you have to commit too early and if the other team reads it you are completely out of position with no way to recover', emotes: ['Chatting'] },
  { user: 'DebateMe', color: '#32cd32', text: 'actually if you look at the stats from last tournament the winrate for that comp is only like 43 percent so its really not as good as people think it is' },
  { user: 'Paragraphs', color: '#dc143c', text: 'just got home from work and this is exactly what i needed to unwind honestly this community is so chill compared to other streams ive been to' },
  { user: 'NovellaPete', color: '#ff69b4', text: 'my friend told me about this stream and at first i was skeptical but now ive been here every day for two weeks straight and i cant stop watching help', emotes: ['Sadge'] },
  { user: 'WallOfText', color: '#8a2be2', text: 'the thing about this game is that it rewards patience but nobody wants to be patient everyone just wants to rush in and get kills and then they wonder why they lose every round' },
  { user: 'BookWorm', color: '#ff8c00', text: 'unpopular opinion but i think the old map was better because it had more flanking routes and it wasnt just about who could hold the choke point the longest' },
  { user: 'ChatNovel', color: '#2e8b57', text: 'honestly the biggest issue is that people dont communicate enough like just use your mic and call out where the enemies are its not that hard and it wins games' },
  { user: 'RecapAndy', color: '#ffd700', text: 'for everyone who just joined: streamer has been popping off all night, we had a crazy clutch in round 7, and chat has been absolutely unhinged the entire time', emotes: ['Chatting'] },
  { user: 'AnalystDesk', color: '#6495ed', text: 'if you watch the replay closely you can see the crosshair placement was already perfect before the enemy even peeked, thats thousands of hours of muscle memory right there' },
  { user: 'BackseatGamer', color: '#fa8072', text: 'ok hear me out what if instead of going A site every round we try a B split with two people going through mid and the rest pushing from tunnels' },
  { user: 'OpinionHaver', color: '#ff1493', text: 'i know everyone is saying that was lucky but honestly the positioning was so good that even if the shot missed the trade would have been easy for the teammate' },
  { user: 'TypeFast', color: '#00ff7f', text: 'the amount of content this streamer puts out is honestly insane like every stream is different and there is always something happening that makes you want to clip it' },
  { user: 'TwitchScholar', color: '#b87333', text: 'ive been on twitch since 2014 and i can confidently say this is one of the most entertaining channels ive ever found and i have watched a LOT of streams' },
  { user: 'TheReviewer', color: '#ff6347', text: 'production quality is top tier, the overlays are clean, the alerts are not annoying, chat is active but not toxic, and the gameplay is actually good unlike most streamers' },
  { user: 'SoapBox', color: '#4169e1', text: 'people who backseat game in chat are the worst like just let the streamer play their own game they know what theyre doing better than you do trust me' },
  { user: 'DeepDive', color: '#daa520', text: 'the meta has shifted so much in the last patch that most of the old strategies dont work anymore and everyone is still figuring out what the new optimal plays are' },
  { user: 'MidnightRambler', color: '#20b2aa', text: 'its 4am and im still watching this stream i have to wake up in three hours for work but future me can deal with that problem present me is vibing', emotes: ['COPIUM'] },
  { user: 'OverSharer', color: '#ff4500', text: 'just ate an entire pizza by myself while watching this stream and honestly no shame about it at all this is peak human experience right here', emotes: ['NODDERS'] },
  { user: 'TechNerd', color: '#87ceeb', text: 'what monitor are you using because the colors look incredible on stream and i have been looking for a new one for months but cant decide which one to get' },
  { user: 'GrammarPolice', color: '#708090', text: 'i love how chat just completely ignores punctuation and grammar when theyre excited its like watching language evolve in real time honestly fascinating' },
  { user: 'EmoteExpert', color: '#9b59b6', text: 'the emote game in this channel is actually S tier like every single emote is usable and perfectly fits different situations thats rare for a channel this size' },
  { user: 'ClipChimp', color: '#ff7f50', text: 'someone please tell me they clipped that because i was tabbed out for literally five seconds and i missed what everyone is losing their minds about in chat right now', emotes: ['Sadge'] },
  { user: 'VeteranViewer', color: '#b22222', text: 'been watching since there were only 12 viewers in the stream and seeing how much this channel has grown makes me genuinely happy for the streamer they deserve it' },
  { user: 'PhiloGamer', color: '#00ced1', text: 'if you really think about it gaming is just problem solving with extra steps and streaming is just hanging out with friends except the friends are thousands of strangers' },
  { user: 'CoachAndy', color: '#ffa500', text: 'the key to winning this matchup is controlling the tempo early because if you let them set up their economy they will outscale you in the late rounds every single time' },
  { user: 'MemoryLane', color: '#e0b0ff', text: 'this reminds me of that stream from like six months ago where everything went wrong but it ended up being one of the funniest streams ever does anyone else remember that' },
  { user: 'PlotTwist', color: '#c0c0c0', text: 'i just realized ive been watching for so long that the sun went down and came back up again and im not even mad about it this stream is that good', emotes: ['xdd'] },
  { user: 'ReviewBomb', color: '#3eb489', text: 'production value is insane the transitions are smooth the camera angles are perfect and the audio mixing is chef kiss honestly better than most professional broadcasts' },
  { user: 'HotTake', color: '#dc143c', text: 'controversial opinion incoming but i think this game was better before the last three updates because they keep adding stuff that nobody asked for and ignoring actual bugs', emotes: ['Chatting'] },
  { user: 'SubStory', color: '#ff69b4', text: 'i subbed three months ago and it was the best decision ever the community is so welcoming and the sub discord is actually active unlike most streamer discords', badges: ['sub'] },
  { user: 'ModEssay', color: '#00ad03', text: 'just a reminder for everyone in chat that the rules exist for a reason and if you are not sure about something just ask a mod before posting we are here to help', badges: ['mod', 'sub'] },
  { user: 'LoreExpert', color: '#e6a817', text: 'actually the lore behind this map is really interesting because it was originally designed as a training facility before it got repurposed into a competitive arena' },
  { user: 'CriticAndy', color: '#ff0000', text: 'ok im gonna be honest the first half of the stream was a bit slow but ever since that comeback round the energy has been absolutely electric and im here for it' },
  { user: 'PatchNotes', color: '#4169e1', text: 'they nerfed the weapon again in the latest patch which means the entire meta is going to shift towards SMGs and shotguns which honestly makes the game way more aggressive and fun' },
  { user: 'StreamDiary', color: '#9370db', text: 'day 47 of watching every single stream and i still havent been noticed in chat but thats ok because the content is fire and i am entertained regardless', emotes: ['Sadge'] },
  { user: 'TheExplainer', color: '#2e8b57', text: 'for the new viewers in chat: the streamer always does a warmup game first then ranked matches then viewer games at the end so stick around it gets even better' },
  { user: 'FoodReview', color: '#ff8c00', text: 'eating sushi while watching the stream and honestly the combo of raw fish and sick gameplay is something i never knew i needed in my life but here we are' },
  { user: 'LifeUpdate', color: '#00bfff', text: 'i just got accepted into college today and the first thing i did was come to this stream to celebrate with chat because you guys are basically my second family at this point' },
  { user: 'SnackReport', color: '#fa8072', text: 'chat what snacks should i get from the gas station i am going during the break and i need suggestions that pair well with watching absolute gaming excellence' },
  { user: 'TimeZoneAndy', color: '#32cd32', text: 'watching from the other side of the world where its currently 6am and yes i woke up specifically for this stream because the VODs just dont hit the same as live' },
  { user: 'ReturnViewer', color: '#daa520', text: 'havent been able to catch a stream in like two weeks because of work and coming back to see how much has changed is wild did i miss any drama fill me in' },
  { user: 'GameDesigner', color: '#8a2be2', text: 'as someone who actually works in game dev this stream is really interesting because you can see how players interact with systems in ways the developers never intended' },
  { user: 'ComfyViewer', color: '#ffb6c1', text: 'wrapped up in a blanket with some hot chocolate watching this stream on my TV and honestly this is the most relaxed ive been all week thank you for the content' },
  { user: 'StatTracker', color: '#b87333', text: 'i have been tracking the win rate across the last 20 streams and its actually trending upward which means the practice is paying off the improvement is real and measurable' },
  { user: 'PepTalk', color: '#7fff00', text: 'chat we need to send some positive energy right now because this next round is crucial and i genuinely believe that our collective vibes can influence the outcome somehow', emotes: ['COPIUM'] },
  { user: 'NightShift', color: '#6495ed', text: 'watching from work on the night shift and my coworker just asked what im watching and now there are two of us huddled around my phone in the break room', emotes: ['LULW'] },
  { user: 'Multilingual', color: '#ff1493', text: 'i love that this chat has people from all over the world all coming together to watch someone play video games the internet is beautiful when it wants to be' },
];
