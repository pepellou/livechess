const date = require('date-and-time')
const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const msg = (user, channel, text) => {
	const now = new Date();
	console.log('[' + date.format(now, 'HH:mm:ss') + '] ' + user + '@' + channel + '> ' + text);
};

client.once('ready', (client) => {
	msg(client.user.username, 'server', '[connected]');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	} else if (commandName === 'user') {
		await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
	} else if (commandName === 'live') {
		await interaction.reply(`Thanks for asking <@${interaction.user.id}>, but we're currently not following any games yet :speak_no_evil:`);
	} else if (commandName === 'tv') {
		const nickname = interaction.options.getString('nickname');
		await interaction.reply(`Following user ${nickname} as requested by <@${interaction.user.id}>`);
	}
});

client.on('messageCreate', async message => {
	msg(message.author.username, message.channel.name, message.content);
});

client.login(token);
