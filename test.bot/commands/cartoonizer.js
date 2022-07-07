const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cartoonizer')
        .setDescription('Change selfie cartoonize!')
        .addAttachmentOption(option => 
            option
                .setName('input')
                .setDescription('Change selfie cartoonize!')
                .setRequired(true))        
};