require("dotenv").config();
var twit = require("twit");

const Bot = new twit({
    consumer_key: process.env.API_KEY,
    consumer_secret: process.env.API_SECRET_KEY,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    timeout_ms: 15*1000,
});

function BotInit(){
    var query = {
        q: 'ufes universidade do espirito santo', 
    }

    Bot.get("search/tweets", query, BotGotLatestTweet)
    function BotGotLatestTweet(error, data, response){
        if(error){
            console.log("Bot não conseguiu os ultimos tweets")
        }else{
            var id = {
                id: data.statuses[0].id_str,
            }
        }
        Bot.post("statuses/retweet/:id", id, BotRetweet)
        
        function BotRetweet(error, response){
            if(error){
                console.log("Bot não retwetou " + error)
            }else{
                console.log("Bot retweetou " + id.id)
            }
        }
    }
}
setInterval(BotInit, 1*15*1000)
BotInit()