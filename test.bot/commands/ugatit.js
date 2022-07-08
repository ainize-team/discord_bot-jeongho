const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ugatit')
        .setDescription('Change selfie to anime!')
        .addAttachmentOption(option => 
            option
                .setName('image')
                .setDescription('Change selfie to anime!')
                .setRequired(true))        
};