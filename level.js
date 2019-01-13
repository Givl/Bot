
const Discord = require('discord.js');
const client = new Discord.Client();
const dl = require('discord-leveling');

client.login('NTI3NjEzNTYzMTgzODI0OTA2.DwWYGQ.56lXOU2KAL6zfTDJv9XlO6n2a4M');


var dl = require('discord-leveling')
dl.SetXp(UserID, toSet)
var dl = require('discord-leveling')
dl.SetLevel(UserID, toSet)
dl.AddXp(UserID, toAdd)
dl.Leaderboard({limit: NUMBER, search: 'UserID'})

client.on('message', async message => {


    const settings = {
        prefix: '!',
    }


    var command = message.content.toLowerCase().slice(settings.prefix.length).split(' ')[0];


    var args = message.content.split(' ').slice(1);

    if (message.author.bot) return;

    var profile = await dl.Fetch(message.author.id)
    dl.AddXp(command === 'xpadd')
    if (!message.guild.me.hasPermission(`ADMINISTRATION`)) return message.reply('Tu ne peux pas me contrôler')
    if (profile.xp + 10 > 100) {
        await dl.AddLevel(message.author.id, 1)
        message.reply(`You just leveled up!! You are now level: ${profile.level + 1}`)
    }

    if (!message.content.startsWith(tokens.prefix)) return;

    if (command === 'rank') {

        var user = message.mentions.users.first() || message.author

        var output = await dl.Fetch(user.id)
        message.channel.send(`Hey ${user.tag}! You have ${output.level} level(s)! and ${output.xp} xp!`);
    }

    if (command === 'setxp') {

        var amount = args[0]
        var user = message.mentions.users.first() || message.author
        if (!message.guild.me.hasPermission(`ADMINISTRATION`)) return message.reply('Tu ne peux pas me contrôler')
        var output = await dl.SetXp(user.id, amount)

    }

    if (command === 'setlevel') {

        var amount = args[0]
        var user = message.mentions.users.first() || message.author
        if (!message.guild.me.hasPermission(`ADMINISTRATION`)) return message.reply('Tu ne peux pas me contrôler')
        var output = await dl.SetLevel(user.id, amount)
        message.channel.send(`Hey ${user.tag}! You now have ${amount} levels!`);
    }

    if (command === 'rang') {


        if (message.mentions.users.first()) {

            var output = await dl.Leaderboard({
                search: message.mentions.users.first().id
            })
            message.channel.send(`The user ${message.mentions.users.first().tag} is number ${output.placement} on my leaderboard!`);


        } else {

            dl.Leaderboard({
                limit: 100
            }).then(async users => {

                var firstplace = await client.fetchUser(users[0].userid)
                var secondplace = await client.fetchUser(users[1].userid)
                var thirdplace = await client.fetchUser(users[2].userid)

                message.channel.send(`My leaderboard:
 
1 - ${firstplace.tag} : ${users[0].level} : ${users[0].xp}
2 - ${secondplace.tag} : ${users[1].level} : ${users[1].xp}
3 - ${thirdplace.tag} : ${users[2].level} : ${users[2].xp}`)

            })

        }
    }

    if (command == 'delete') {

        var user = message.mentions.users.first()
        if (!user) return message.reply('Qui dois-je supprimer ?')

        if (!message.guild.me.hasPermission(`ADMINISTRATION`)) return message.reply('Tu ne peux pas me contrôler')

        var output = await dl.Delete(user.id)
        if (output.deleted == true) return message.reply('Suppression résussite')

        message.reply('Error: Pas trouvé sorry')

    }

})

