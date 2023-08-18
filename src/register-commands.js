require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

const commands = [
    {
        name: 'transliterate',
        description: 'Transliterate your sentence!',
        options: [
            {
                name: 'kind',
                description: 'Mode of transliteratation.',
                type: ApplicationCommandOptionType.String,
                choices: [
                    {
                        name: 'English to Hindi',
                        value: 'eng-to-hin',
                    },
                    {
                        name: 'Hinglish to Hindi',
                        value: 'hing-to-hin',
                    }
                ],
                required: true,
            },
            {
                name: 'sentence',
                description: 'Your sentence.',
                type: ApplicationCommandOptionType.String,
                options: [
                    {
                        name: 'Hi! This is an example english sentence',
                        value: 'Hi! This is an example english sentence',
                    },
                    {
                        name: 'Another Example',
                        value: 'Why did the chicken cross the road?',
                    }
                ],
                required: true,
            },
        ]
    },
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);


(async () => {
    try {
        console.log('Registering slash commands...');

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, 
                process.env.GUILD_ID),
            { body: commands }
        );

        console.log('Slash commands were registered successfully!');
    } catch (error) {
        console.log('There was an error: ${error}');
    }
})();