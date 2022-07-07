const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ugotit')
        .setDescription('Change selfie to anime!')
        .addAttachmentOption(option => 
            option
                .setName('input')
                .setDescription('Change selfie to anime!')
                .setRequired(true))        
};