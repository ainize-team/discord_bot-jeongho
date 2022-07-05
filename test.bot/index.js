const Discord = require('discord.js');
const fetch = require('node-fetch');
const FormData = require('form-data');
const fs = require('fs');
const client = new Discord.Client();
const config = require('./config.json');
const { fileURLToPath } = require('url');


client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', async (message) => {
		if (message.content === 'how?') {
			message.channel.send('openchat > !hi\ndalle_mini > $fire in the house\nugotit > %{upload image}');
		}

		else if (message.content[0] === `${config.openchat}`) {
			const formData = new FormData();
			formData.append('bot_id', '');
			formData.append('topic', '');
			formData.append('text', message.content.slice(1,));
			formData.append('agent', 'DIALOGPT.MEDIUM');
			
		
			const request = await fetch('https://main-openchat-fpem123.endpoint.ainize.ai/send/S2lt', {
				method: 'POST',
				body: formData});
	
			const response = await request.json();
			message.channel.send(response['output']);
		}
	
		else if (message.content[0] === `${config.dalle_mini}`) {
			const json_data = JSON.stringify({
				text: message.content.slice(1, ),
				num_images: 1
			});
			
			const request = await fetch('https://main-dalle-server-scy6500.endpoint.ainize.ai/generate', {
				method: 'POST', 
				headers: {"Content-Type": "application/json"},
				body: json_data, });
	
			const response = await request.json();
			let buff = new Buffer(response[0], 'base64');
			message.channel.send('', {files: [buff]});
		}

		else if (message.content[0] === `${config.ugotit}`) {
			const url = message.attachments.first().url; 
			const fu = await fetch(url);
			const buffer = await fu.buffer();
			fs.writeFileSync('selfie.jpeg', buffer);

			const image = fs.readFileSync('selfie.jpeg');
			const formData = new FormData();
			formData.append('file', image, 'selfie.jpeg');
			const response = await fetch('https://master-ugatit-kmswlee.endpoint.ainize.ai/selfie2anime', {
				method: 'POST',
				body: formData});
			
			const rb = await response.blob();
			const blob = rb[Object.getOwnPropertySymbols(rb)[1]];
			message.channel.send('', {files: [blob]});
		}
});

client.login(config.token);