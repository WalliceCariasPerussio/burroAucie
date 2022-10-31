const { REST, Routes ,Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const axios  = require('axios');
require('dotenv').config()

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;

const commands = [
  {
    name: 'senhafdc',
    description: 'Senha do dia da FDC',
  },
  {
    name: 'inspire',
    description: 'Receba uma frase inspiradora',
  },
  {
    name: 'advice',
    description: 'Receba um conselho',
  },
];

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'senhafdc') {
    // senha e 004420 dia + 20 mes + 11
    const DIA = new Date().getDate() + 20;
    const MES = new Date().getMonth() + 11;
    await interaction.reply(`A senha do dia é: 004420${DIA}${MES}`);
  }else if (interaction.commandName === 'inspire') {
    const { data } = await axios.get('https://zenquotes.io/api/random');
    const quote = data[0]['q'] + ' -' + data[0]['a'];
    await interaction.reply(quote);
  }else if (interaction.commandName === 'advice') {
    const { data } = await axios.get('https://api.adviceslip.com/advice');
    await interaction.reply(data.slip.advice);
  }
});


client.login(TOKEN);