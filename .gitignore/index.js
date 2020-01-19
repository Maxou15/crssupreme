const Discord = require('discord.js');
const bot = new Discord.Client();
let Words = require('./bannedWords.json');
var countReport = 0;

bot.login(process.env.TOKEN);
 
bot.on ('message' , message =>  {
 
bot.user.setActivity("Frapper des gilets jaunes", {type : "PLAYING"});

const channel = message.channel.name

if(message.author.bot != true){

if(message.content == '!channel'){
    message.channel.send("Vous êtes dans le channel "+ channel);
};
 
if(channel == 'truc'){
    if(message.content == "!addToBannedWords"){
        message.channel.send("Quel mot voulez vous ban ?");
        const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 8000 });
collector.on('collect', message => {
            var wordAddToBannedWords = message.content;
            var count = 0;
            if(wordAddToBannedWords == message.content){
              for(l = 0; l< Words["bannedWords"].length; l++){
                if(wordAddToBannedWords == Words["bannedWords"][l]){
                  count++;
                  message.channel.send('Le mot '+ wordAddToBannedWords+ ' est déjà banni');
             };
              };
              if(count == 0){
            Words["bannedWords"].push(wordAddToBannedWords);
            message.channel.send("C'est bon ! Le mot "+ wordAddToBannedWords +" a été banni !");
            message.channel.send("Il y a désormais "+ Words["bannedWords"].length+ " mots bannis !");
              };
            };
        });  
    }; 
    if(message.content == '!deleteBannedWord'){
      if(Words["bannedWords"].length == 0){
        message.channel.send("Il n\'y a pas de mots bannis");
      }else
        message.channel.send('Quel mot voulez vous retirer de la liste des bans ?')
        const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time : 8000 });
        collector.on('collect', message => {
          var wordDeleteBannedWord = message.content;
          var count = 0;
          if(wordDeleteBannedWord == message.content){
            for(d = 0; d < Words["bannedWords"].length; d++){
              if(wordDeleteBannedWord == Words["bannedWords"][d]){
                Words["bannedWords"].splice(d, 1);
                count++;
                message.channel.send('Le mot '+ wordDeleteBannedWord+ ' a été retiré de liste des mots bannis !');
                message.channel.send('Il reste '+ Words["bannedWords"].length+ ' mots bannis');
              };
            };
            if(count == 0){
              message.channel.send('Le mot '+ wordDeleteBannedWord+ ' n\'est pas banni');
            };
          };
        });
    };
};
 

if(message.content == "!bannedWordsList"){
  if(Words["bannedWords"].length == 0){
    message.channel.send('Il n\'y a pas de mots bannis');
  }else
  message.channel.send("Les mots bannis sont :");
  for(w = 0; w < Words["bannedWords"].length;w++){
    message.channel.send(Words["bannedWords"][w]);
    };
  };

  if(channel != 'salon-anarchique' && channel != 'truc'){
    var res = message.content.split(" ");
    for(p = 0; p<res.length; p++){
for(u = 0; u<Words["bannedWords"].length; u++){
  if(res[p].toLowerCase() == Words["bannedWords"][u].toLowerCase()){
    message.channel.send("Ta déviance va être signalé aux hauts dirigeants "+ message.author);
    message.delete();
    countReport++;
    const channel = bot.channels.find('name', 'rapports');
    var bannedWordsEmbed = new Discord.RichEmbed()
        .setTitle("Cas d'injure n°"+countReport)
        .setDescription(message.author+ "\n Motif du report : \""+Words["bannedWords"][u]+"\"");
    channel.sendMessage(bannedWordsEmbed);
        };
      };
    };
  }; 
  
};
});
