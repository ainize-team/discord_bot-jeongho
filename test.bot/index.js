const fs = require('fs');
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const config = require('./config.json');
const fetch = require('node-fetch');
const FormData = require('form-data');
const { waitForDebugger } = require('inspector');

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const commands = [];
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({version: '9'}).setToken(config.token);
(async () => {
	try {
		await rest.put(
				Routes.applicationCommands(config.client_id), 
				{ body: commands },
		);
	} catch (error) {
		if (error) console.error(error);
	}
})();

client.once('ready', () => {console.log('Ready!');});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

    if (interaction.commandName === 'openchat') {

		const formData = new FormData();
		formData.append('bot_id', '');
		formData.append('topic', '');
		formData.append('text', interaction.options['_hoistedOptions'][0]['value']);
		formData.append('agent', 'DIALOGPT.MEDIUM');
		
		const request = await fetch('https://main-openchat-fpem123.endpoint.ainize.ai/send/S2lt', {
			method: 'POST',
			body: formData});

		const response = await request.json();
		await interaction.reply(response['output']);		
		
	}

	else if (interaction.commandName === 'dalle') {
	
		const json_data = JSON.stringify({
			text: interaction.options['_hoistedOptions'][0]['value'],
			num_images: 1
		});

		await interaction.deferReply();
		const request = await fetch('https://main-dalle-server-scy6500.endpoint.ainize.ai/generate', {
			method: 'POST', 
			headers: {"Content-Type": "application/json"},
			body: json_data, });

		const response = await request.json();
		const blob = Buffer.from(response[0], 'base64');
		await interaction.editReply({files: [blob]});

	}

	else if (interaction.commandName === 'ugotit') {

		const url = interaction.options['_hoistedOptions'][0]['attachment']['attachment']; 
		const fu = await fetch(url);
		const buffer = await fu.buffer();
		fs.writeFileSync('selfie.jpeg', buffer);

		const image = fs.readFileSync('selfie.jpeg');
		const formData = new FormData();
		formData.append('file', image, 'selfie.jpeg');

		await interaction.deferReply();
		const response = await fetch('https://master-ugatit-kmswlee.endpoint.ainize.ai/selfie2anime', {
			method: 'POST',
			body: formData});
		
		const rb = await response.blob();
		const blob = rb[Object.getOwnPropertySymbols(rb)[1]];
		await interaction.editReply({files: [blob]});

	}

	else if (interaction.commandName === 'cartoonizer') {

		const url = interaction.options['_hoistedOptions'][0]['attachment']['attachment']; 
		const fu = await fetch(url);
		const buffer = await fu.buffer();
		fs.writeFileSync('selfie.jpeg', buffer);

		const image = fs.readFileSync('selfie.jpeg');
		const formData = new FormData();
		formData.append('source', image, 'selfie.jpeg');
		formData.append('file_type', 'image');

		await interaction.deferReply();
		const response = await fetch('https://master-white-box-cartoonization-psi1104.endpoint.ainize.ai/predict', {
			method: 'POST',
			body: formData});
		
		const rb = await response.blob();
		const blob = rb[Object.getOwnPropertySymbols(rb)[1]];
		await interaction.editReply({files: [blob]});

	}
});

client.login(config.token);