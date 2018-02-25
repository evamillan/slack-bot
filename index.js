const Botkit = require('botkit');

const controller = Botkit.slackbot({
  debug: false
});

controller.spawn({
  token: "xoxb-318800768193-w0Jnm2UUOJ7oWlTPUG4MOHEe"
}).startRTM(err => {
  if (err) {
    throw new Error(err);
  }
});

let session = {};

controller.hears('gordify start', 'ambient', (bot, message) => {
  if (!session.active) {
    session.active = true;
    session.initialMessage = message;
    session.people = [];

    bot.reply(message, 'Ey! Who is going to have lunch out today?', (bot, response) => {
      session.botReplyId = response.ts;
    });

  } else {
    bot.reply(message, 'But I already asked!');
  }
});

controller.on('reaction_added', (bot, reaction) => {
  let foundUser = session.people.find(user => user == reaction.user);

  if (session.active) {
    if (reaction.item.ts === session.botReplyId && !foundUser) {
      session.people.push(reaction.user);
    }
  }
});

controller.hears('gordify stop', 'ambient', (bot, message) => {
  if (session.active) {
    let groups = makeGroups(session.people);
    let reply = buildMessage(groups);

    bot.reply(session.initialMessage, reply);

    session = {
      active: false,
      initialMessage: {},
      botReplyId: '',
      people: [],
    };
  }
});

let makeGroups = (people) => {
  let numberOfGroups = Math.ceil(people.length/7);
  let peopleInEachGroup = Math.ceil(people.length/numberOfGroups);

  let randomizedPeople = people.sort(() => Math.random() * 2 - 1);
  let groups = [];

  for (let i = 0; i < numberOfGroups; i++) {
    groups.push(randomizedPeople.slice(i * peopleInEachGroup, i * peopleInEachGroup + peopleInEachGroup));
  };

  return groups
};

let buildMessage = (groups) => {
  let reply = '';

  for (let i = 0; i < groups.length; i++) {
    let leader = groups[i].pop();
    reply += `Group ${i + 1}: \n \t <@${leader}> :crown: \n`;
    groups[i].map(person => reply += `\t <@${person}>\n`);
  };

  return reply
};
