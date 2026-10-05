const { Events, PermissionFlagsBits } = require('discord.js');

module.exports = {
    name: Events.MessageCreate,
    once: false, // This needs to run every time a message is sent
    async execute(message) {
        // 1. Ignore bots
        if (message.author.bot) return;

        const forbiddenWord = '67';

        // 2. Check for the word
        if (message.content.toLowerCase().includes(forbiddenWord)) {
            
            // 3. Safety Check: Can the bot actually ban?
            if (!message.guild.members.me.permissions.has(PermissionFlagsBits.BanMembers)) {
                return console.log("Missing 'Ban Members' permission.");
            }

            try {
                // 4. Ban the user
                // await message.guild.members.ban(message.author, { 
                //     reason: `Banned for saying: ${forbiddenWord}` 
                // });
                await message.channel.send(`${message.author}, no sayign that lol`);
                await message.author.send(`${message.author}, NO 67`);
                // 5. Cleanup and confirm
                await message.delete();
                await message.channel.send(`Banned ${message.author.tag} for using forbidden language.`);
                
            } catch (error) {
                console.error('Error during auto-ban:', error);
            }
        }
    },
};