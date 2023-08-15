require('dotenv').config();
const {Client, IntentsBitField, ActivityType} = require('discord.js');

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

    setInterval(() => {
        let random = Math.floor(Math.random() * status.length);
        client.user.setActivity(status[random]);
    }, 300000);
});

client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'transliterate') {
        const input_str = interaction.options.get('sentence').value;

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
    }
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith('!')) return;
    
    // ;(async function() {
    //     let url = 'https://alokhe.herokuapp.com/' + message.content;
    //     reply = await fetch(url)
    //     .then(res => res.json())
    //     .then(out =>
    //       console.log(out[0].text.hinout))
    //     .catch(err => { throw err });
    // })()
    
    let url = 'https://alokhe.herokuapp.com/' + message.content;
    var reply;
    fetch(url)
    .then(res => res.json())
    .then(out => {
      reply = out;
    }).then(() => {
        message.reply(reply[0].text.hinout);
    })
    .catch(err => { throw err });

    console.log(message);
    // console.log(reply);

    await message.channel.sendTyping();
    // message.reply(reply[0].text.hinout);
});

client.login(process.env.TOKEN);
