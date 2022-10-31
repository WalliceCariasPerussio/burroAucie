const { REST, Routes ,Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const TOKEN = 'ODYxNjIxMTc4NDk3MjM3MDIy.GH9s3h.yCratB21kyRxTfpb6Hac0wO1mqLZRA44FXs_S8';
const CLIENT_ID = '861621178497237022';

const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
  {
    name: 'senhafdc',
    description: 'Replies with a random Senha FDC!',
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

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }else if (interaction.commandName === 'senhafdc') {
    // senha e 004420 dia + 20 mes + 11
    const DIA = new Date().getDate() + 20;
    const MES = new Date().getMonth() + 11;
    await interaction.reply(`A senha do dia é: 004420${DIA}${MES}`);
  }
});

client.login(TOKEN);