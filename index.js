const Discord = require("discord.js");

const TOKEN = "NDE0NDEwMzkxMTc1NjkyMjk4.DWm9TA.VKafBkjEcTgDCvDRyryWp21aVpM";
const PREFIX = "+";

var fortunes = [
      "Yes, certainly.",
      "No, impossible.",
      "50, 50 Chance.",
      "You don't need it."
]

var bot = new Discord.Client();

bot.on("ready", function() {
  console.log("Dishan Bot is Ready!");
});

bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split(" ");

    switch(args[0].toLowerCase()) {

        case "help":
        var embedd = new Discord.RichEmbed()
            .setAuthor("Dishan Bot - All Commands!", "https://i.imgur.com/nIsjewJ.png")
            .addField("Fun Commands", "ping - Replys with 'Pong!'\nroll - Gives you a random number from 1-1000.\ndie - Replys with a randomized Death Wish directed towards the mentioned User.\nbless - Admins can bless a mentioned User.\nanswer - Ask a question, and you will recieve your Answers.\ninfo - Gets information on mentioned User!")
            .addField("Moderation Commands", "ban - Bans mentioned User!\nkick - Kicks mentioned User!\nmute - Mutes mentioned User!\nunmute - Unmutes mentioned User!")
        message.author.sendEmbed(embedd);
        break;

        case "ping":
            var embedd = new Discord.RichEmbed()
                .setAuthor("Dishan Bot", "https://i.imgur.com/nIsjewJ.png")
                .setDescription("Pong!")
            message.channel.sendEmbed(embedd);
            break;

        case "roll":
        var embedd = new Discord.RichEmbed()
            .setAuthor("Dishan Bot - You Rolled...", "https://i.imgur.com/nIsjewJ.png")
            .setDescription("``" + [Math.floor((Math.random() * 1000) + 1)] + "``")
        message.channel.sendEmbed(embedd)
        break;

        case "die":
        var member = message.mentions.members.first();
        var deathwishes = [
            "Go die, " + message.mentions.members.first().user + " you useless specimen.",
            "Go die, " + message.mentions.members.first().user + " you failed cumshot.",
            "Please go hang yourself " + message.mentions.members.first().user + " and do us all a favour.",
            "Please " + message.mentions.members.first().user + ", just drive yourself off a cliff.",
            message.mentions.members.first().user + ", " + "you should've been the dead body in Logan Paul's video."
      ]
        if (message.member.hasPermission("ADMINISTRATOR")) {
            var embedd = new Discord.RichEmbed()
            .setAuthor("Dishan Bot - Death Wish", "https://i.imgur.com/nIsjewJ.png")
            .setDescription(deathwishes[Math.floor(Math.random() * deathwishes.length)])
        message.channel.sendEmbed(embedd);
        } else {
            var embedd = new Discord.RichEmbed()
                .setAuthor("ERROR!", "https://i.imgur.com/nIsjewJ.png")
                .setDescription("You don't have permissions to do that!")
            message.channel.sendEmbed(embedd)
        };
        break;

        case "bless":
        if (message.member.hasPermission("ADMINISTRATOR")) {
        var member = message.mentions.members.first();
        var embedd = new Discord.RichEmbed()
            .setAuthor("Dishan Bot - Blessing", "https://i.imgur.com/nIsjewJ.png")
            .setDescription("🙏**You have recieved a special blessing** " + member.user + ", from " + message.author.user + "🙏")
            if (args[1]) message.channel.sendEmbed(embedd)
        } else {
            var embedd = new Discord.RichEmbed()
                .setAuthor("ERROR!", "https://i.imgur.com/nIsjewJ.png")
                .setDescription("You don't have permissions to do that!")
            message.channel.sendEmbed(embedd)
        };
        break;

        case "answer":
        var embedd = new Discord.RichEmbed()
            .setAuthor("Dishan Bot", "https://i.imgur.com/nIsjewJ.png")
            .setTitle("Your Answer is...")
            .setDescription(fortunes[Math.floor(Math.random() * fortunes.length)])
        if (args[1]) message.channel.sendEmbed(embedd);
        else var embedd = new Discord.RichEmbed()
                .setAuthor("ERROR!", "https://i.imgur.com/nIsjewJ.png")
                .setDescription("I can't read that!")
            message.channel.sendEmbed(embedd)
        break;

        case "info":
        var member = message.mentions.members.first();
        var embedd = new Discord.RichEmbed()
            .setAuthor("Dishan Bot - User Info", "https://i.imgur.com/nIsjewJ.png")
            .addField("Name:", String(member.user), true)
            .addField("ID:", "``" + String(member.user.id) + "``", true)
            .addField("Last Message:", "```" + String(member.lastMessage) + "```")
            .setThumbnail(member.user.avatarURL)
        if (args[1]) message.channel.sendEmbed(embedd);
        break;

        // Moderation Commands
        const modRole = message.guild.roles.find("name", "Moderator");
        
        case "kick":
        if (message.member.hasPermission("KICK_MEMBERS")) {
        var member = message.mentions.members.first();
        if (args[1]) member.kick();
        var embedd = new Discord.RichEmbed()
            .setAuthor("KICKED!", "https://i.imgur.com/nIsjewJ.png")
            .setDescription("👋**Kicked** " + member.user + "!👋")
        message.channel.sendEmbed(embedd)
        } else {
            var embedd = new Discord.RichEmbed()
                .setAuthor("ERROR!", "https://i.imgur.com/nIsjewJ.png")
                .setDescription("You don't have permissions to do that!")
            message.channel.sendEmbed(embedd)
        };
        break;

        case "ban":
        if (message.member.hasPermission("BAN_MEMBERS")) {
        var member = message.mentions.members.first();
        if (args[1]) member.ban();
        var embedd = new Discord.RichEmbed()
            .setAuthor("BANNED!", "https://i.imgur.com/nIsjewJ.png")
            .setDescription("🔨**Banned** " + member.user + "!🔨")
        message.channel.sendEmbed(embedd)
        } else {
            var embedd = new Discord.RichEmbed()
                .setAuthor("ERROR!", "https://i.imgur.com/nIsjewJ.png")
                .setDescription("You don't have permissions to do that!")
            message.channel.sendEmbed(embedd)
        };
        break;

        case "mute":
        if (message.member.hasPermission("MUTE_MEMBERS")) {
        var member = message.mentions.members.first();
        var MUTEDROLE = message.guild.roles.find("name", "Muted")
        if (args[1]) member.addRole(MUTEDROLE);
        var embedd = new Discord.RichEmbed()
            .setAuthor("MUTED!", "https://i.imgur.com/nIsjewJ.png")
            .setDescription("🙊**Muted** " + member.user + "!🙊")
        message.channel.sendEmbed(embedd)
        } else {
            var embedd = new Discord.RichEmbed()
                .setAuthor("ERROR!", "https://i.imgur.com/nIsjewJ.png")
                .setDescription("You don't have permissions to do that!")
            message.channel.sendEmbed(embedd)
        };
        break;

        case "unmute":
        if (message.member.hasPermission("MUTE_MEMBERS")) {
        var member = message.mentions.members.first();
        var MUTEDROLE = message.guild.roles.find("name", "Muted")
        if (args[1]) member.removeRole(MUTEDROLE);
        var embedd = new Discord.RichEmbed()
            .setAuthor("UNMUTED!", "https://i.imgur.com/nIsjewJ.png")
            .setDescription("🙉" + member.user + " is no longer Muted!🙉")
        message.channel.sendEmbed(embedd)
        } else {
            var embedd = new Discord.RichEmbed()
                .setAuthor("ERROR!", "https://i.imgur.com/nIsjewJ.png")
                .setDescription("You don't have permissions to do that!")
            message.channel.sendEmbed(embedd)
        };
        break;
    }
});

bot.login(TOKEN);
