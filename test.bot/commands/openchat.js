const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('openchat')
        .setDescription('Reply with your message!')
        .addStringOption(option => 
            option.setName('input')
            .setDescription('Reply with your message!')
            .setRequired(true))        
};

