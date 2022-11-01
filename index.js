import { REST, Routes ,Client, GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv'; config();
import commands from './commands.js';
import interactions from './interaction.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
  try {
    console.log('Iniciado a atualização dos comandos do aplicativo (/).');

    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

    console.log('Comandos de aplicativo (/) recarregados com sucesso.');
  } catch (error) {
    console.error(error);
  }
})();

client.on('ready', () => {
  console.log(`Logado como ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (commands.map((num) =>  num.name === interaction.commandName)) {
    if (interactions[interaction.commandName] != undefined) {
      await interaction.reply( await interactions[interaction.commandName]());
    }else{
      await interaction.reply('Interação não existe!');
    }
  }else{
    await interaction.reply('Comando não existe!');
  }

});

client.login(TOKEN);