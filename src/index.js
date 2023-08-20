require('dotenv').config();
const {Client, IntentsBitField, ActivityType} = require('discord.js');
// const OpenAI = require('openai-api');
// import { Configuration, OpenAIApi } from "openai";
// const configuration = new Configuration({
//     organization: "org-jYsZmjWG5d37f7GG9YUjjXYd",
//     apiKey: process.env.API_KEY,
// });
// const openai = new OpenAIApi(configuration);
// const OPENAI_API_KEY = process.env.API_KEY;
// const openai = new OpenAI(OPENAI_API_KEY);

const { OpenAIClient } = require('@fern-api/openai');

const openclient = new OpenAIClient({
  token: process.env.API_KEY,
});


const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

let status = [
    {
        name: "children!",
        type: ActivityType.Watching,
    },
    {
        name: "with women!",
        type: ActivityType.Playing,
    },
    {
        name: "Roblox",
    },
    {
        name: "Death Grips",
        type: ActivityType.Listening,
    },
    {
        name: "black midi",
        type: ActivityType.Listening,
    },
    {
        name: "Danny Brown",
        type: ActivityType.Listening,
    },
    {
        name: "Hypixel Bedwars",
        type: ActivityType.Playing,
    },
]

client.on('ready', () => {
    console.log("The bot is online");
    client.user.setActivity(status[0]);
    setInterval(() => {
        let random = Math.floor(Math.random() * status.length);
        client.user.setActivity(status[random]);
    }, 300000);
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'transliterate') {
        const kind_str = interaction.options.get('kind').value;
        const input_str = interaction.options.get('sentence').value;

        if (kind_str === 'eng-to-hin') { // english to hindi
            console.log(input_str);
            let url = 'https://alokhe.herokuapp.com/' + input_str;
            var reply;
            fetch(url)
            .then(res => res.json())
            .then(out => {
                reply = out;
            }).then(() => {
                interaction.reply('The transliterated sentence is' + reply[0].text.hinout);
            })
            .catch(err => { throw err });
        } else if (kind_str === 'hing-to-hin') { // hinglish to hindi
            let conversationLog = [{role: 'system', content: 'hey can you transliterate the \
            // following hindi-english sentence into devanagari\nsentence: '}];

            conversationLog.push({
                role: 'user',
                content: input_str,
            });

            const result = await openclient.chat.createCompletion({
                model: "gpt-3.5-turbo",
                messages: conversationLog,
            })

            interaction.reply('The transliteration sentence is ' 
            + result.choices[0].message.content);

            // interaction.reply(result.data.choices[0].message);
        }
    }
});

client.login(process.env.TOKEN);
