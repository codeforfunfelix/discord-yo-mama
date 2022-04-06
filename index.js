const { Client, Intents, Permissions } = require('discord.js');
const { token } = require('./config.json');

const CambDict = require("camb-dict");
const dictionary = new CambDict.Dictionary();

const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		'GUILD_MEMBERS', 
		'GUILD_MESSAGES',
		'GUILD_MESSAGE_REACTIONS'
	]
});

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
    if (message.author.bot) return;

    let content = message.content;
    for (let word of content.split(" ")) {
        word = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
        dictionary.meaning(word)
            .then(definition => {
                if (definition.type == "ADJECTIVE") {
                    message.channel.send(`Yo mama's ${word}!`)
                }
            })
            .catch(err => {});
    }
});

client.login(token);