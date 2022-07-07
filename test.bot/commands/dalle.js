const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dalle')
        .setDescription('Draw a picture using your message!')
        .addStringOption(option => 
            option
                .setName('input')
                .setDescription('Draw a picture using your message!')
                .setRequired(true))        
};