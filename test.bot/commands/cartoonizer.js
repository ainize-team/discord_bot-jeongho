const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cartoonizer')
        .setDescription('Change selfie cartoonize!')
        .addAttachmentOption(option => 
            option
                .setName('image')
                .setDescription('Change selfie cartoonize!')
                .setRequired(true))        
};