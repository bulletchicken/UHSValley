import discord
import random

TOKEN = 'MTAzMDk2MDQ5MTQwMjYyNTExNA.GANYtk.UssRJ6OdE5ezyADDQZKlNPtEwqprEDl_H7OmgM'

client = discord.Client(intents=discord.Intents.all())

@client.event
async def on_ready():
    print('WE have logged in as {0.user}'.format(client))


@client.event
async def on_message(message):
    username = str(message.author).split('#')[0]
    user_message = str(message.content)
    channel = str(message.channel.name)
    print(f'{username}:{user_message} ({channel})')

    if message.author == client.user:
        return 
    
    if message.channel.name == 'discord-bot':
        if user_message.lower() == '!help':
            await message.channel.send(f'LIST OF COMMANDS:\n!hello\n!bye\n!information\n!angry\n!sad\n!happy\n!eyes\n!break\n!tired\n!angrygif\n!happygif\n!sadgif')
            return        
        elif user_message.lower() == '!hello':
            await message.channel.send(f'Hello {username}!')
            return
        elif user_message.lower() =='!bye':
            await message.channel.send(f'See you later {username}!')
            return
        elif user_message.lower() == '!information':
            await message.channel.send(f'Our website: yourhp.tech')
            return
        elif user_message.lower() == '!angry':
            await message.channel.send(f'Try meditating!')
            return
        elif user_message.lower() == '!sad':
            await message.channel.send(f'Take some time to selfcare')
            return    
        elif user_message.lower() == '!happy':
            await message.channel.send(f'Keep doing what you\'re doing')
            return
        elif user_message.lower() == '!eyes':
            await message.channel.send(f'Too much bluelight will damage your eyes, take a break!')
            return
        elif user_message.lower() == '!break':
            text = ["Go for a walk", "Eat some food", "Do some work"]
            num = random.randrange(0, 3)
            await message.channel.send(text[num])
            return
        elif user_message.lower() == '!tired':
            await message.channel.send(f'Consider getting some sleep!')
            return
        elif user_message.lower() == '!angrygif':
            gif = ["https://giphy.com/gifs/disneypixar-disney-pixar-11tTNkNy1SdXGg", "https://giphy.com/gifs/angry-frustrated-annoyed-p8Uw3hzdAE2dO", "https://giphy.com/gifs/Vi4MRwWi9sYpi", "https://giphy.com/gifs/angry-mad-frustrated-6xgslyYQCyLa8"]
            num = random.randrange(0, 4)
            await message.channel.send(gif[num])
            return
        elif user_message.lower() == '!sadgif':
            gif = ["https://giphy.com/gifs/true-detective-final-episode-2rtQMJvhzOnRe", "https://giphy.com/gifs/pokemon-anime-7SF5scGB2AFrgsXP63", "https://giphy.com/gifs/house-boyfriends-qQdL532ZANbjy", "https://giphy.com/gifs/sad-comedy-the-office-goQ4bc8X0Lh6w"]
            num = random.randrange(0, 4)
            await message.channel.send(gif[num])
            return
        elif user_message.lower() == '!happygif':
            gif = ["https://giphy.com/gifs/happy-smile-smiling-1136UBdSNn6Bu8", "https://giphy.com/gifs/minions-minions-2-rise-of-gru-chzz1FQgqhytWRWbp3", "https://giphy.com/gifs/3NtY188QaxDdC", "https://giphy.com/gifs/happy-cat-ToCRja2miF3Xi"]
            num = random.randrange(0, 4)
            await message.channel.send(gif[num])
            return
client.run(TOKEN)