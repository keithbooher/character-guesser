import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const seedData = [
  // TV Shows
  {
    title: 'The Office',
    type: 'tv',
    decade: '00s',
    characters: ['Michael Scott', 'Dwight Schrute', 'Jim Halpert', 'Pam Beesly', 'Kevin Malone', 'Ryan Howard'],
  },
  {
    title: 'Friends',
    type: 'tv',
    decade: '90s',
    characters: ['Ross Geller', 'Rachel Green', 'Chandler Bing', 'Monica Geller', 'Joey Tribbiani', 'Phoebe Buffay'],
  },
  {
    title: 'Breaking Bad',
    type: 'tv',
    decade: '00s',
    characters: ['Walter White', 'Jesse Pinkman', 'Hank Schrader', 'Saul Goodman', 'Gustavo Fring', 'Skyler White'],
  },
  {
    title: 'Game of Thrones',
    type: 'tv',
    decade: '10s',
    characters: ['Jon Snow', 'Daenerys Targaryen', 'Tyrion Lannister', 'Cersei Lannister', 'Arya Stark', 'Ned Stark'],
  },
  {
    title: 'Stranger Things',
    type: 'tv',
    decade: '10s',
    characters: ['Eleven', 'Mike Wheeler', 'Dustin Henderson', 'Will Byers', 'Jim Hopper', 'Max Mayfield'],
  },
  {
    title: 'The Simpsons',
    type: 'tv',
    decade: '90s',
    characters: ['Homer Simpson', 'Marge Simpson', 'Bart Simpson', 'Lisa Simpson', 'Ned Flanders', 'Mr. Burns'],
  },
  {
    title: 'South Park',
    type: 'tv',
    decade: '90s',
    characters: ['Eric Cartman', 'Stan Marsh', 'Kyle Broflovski', 'Kenny McCormick', 'Randy Marsh', 'Butters Stotch'],
  },
  {
    title: 'Rick and Morty',
    type: 'tv',
    decade: '10s',
    characters: ['Rick Sanchez', 'Morty Smith', 'Beth Smith', 'Jerry Smith', 'Summer Smith', 'Mr. Meeseeks'],
  },
  {
    title: 'Brooklyn Nine-Nine',
    type: 'tv',
    decade: '10s',
    characters: ['Jake Peralta', 'Amy Santiago', 'Raymond Holt', 'Rosa Diaz', 'Charles Boyle', 'Gina Linetti'],
  },
  {
    title: 'Parks and Recreation',
    type: 'tv',
    decade: '10s',
    characters: ['Leslie Knope', 'Ron Swanson', 'Ben Wyatt', 'April Ludgate', 'Andy Dwyer', 'Tom Haverford'],
  },
  {
    title: 'Arrested Development',
    type: 'tv',
    decade: '00s',
    characters: ['Michael Bluth', 'George Michael Bluth', 'Tobias Fünke', 'Buster Bluth', 'Lucille Bluth', 'Gob Bluth'],
  },
  {
    title: 'Seinfeld',
    type: 'tv',
    decade: '90s',
    characters: ['Jerry Seinfeld', 'George Costanza', 'Cosmo Kramer', 'Elaine Benes', 'Newman', 'Frank Costanza'],
  },
  {
    title: "It's Always Sunny in Philadelphia",
    type: 'tv',
    decade: '00s',
    characters: ['Charlie Kelly', 'Dennis Reynolds', 'Mac McDonald', 'Dee Reynolds', 'Frank Reynolds'],
  },
  {
    title: 'The Wire',
    type: 'tv',
    decade: '00s',
    characters: ['Jimmy McNulty', 'Omar Little', 'Stringer Bell', 'Bunk Moreland', 'Avon Barksdale'],
  },
  {
    title: "Grey's Anatomy",
    type: 'tv',
    decade: '00s',
    characters: ['Meredith Grey', 'Cristina Yang', 'Derek Shepherd', 'Alex Karev', 'Miranda Bailey'],
  },
  {
    title: 'Lost',
    type: 'tv',
    decade: '00s',
    characters: ['Jack Shephard', 'Kate Austen', 'Sawyer Ford', 'John Locke', 'Hurley Reyes', 'Sayid Jarrah'],
  },
  {
    title: 'How I Met Your Mother',
    type: 'tv',
    decade: '00s',
    characters: ['Ted Mosby', 'Barney Stinson', 'Marshall Eriksen', 'Lily Aldrin', 'Robin Scherbatsky'],
  },
  {
    title: 'New Girl',
    type: 'tv',
    decade: '10s',
    characters: ['Jess Day', 'Nick Miller', 'Schmidt', 'Winston Bishop', 'Cece Parekh'],
  },
  {
    title: 'The Walking Dead',
    type: 'tv',
    decade: '10s',
    characters: ['Rick Grimes', 'Daryl Dixon', 'Michonne', 'Glenn Rhee', 'Negan', 'Carol Peletier'],
  },
  {
    title: 'Dexter',
    type: 'tv',
    decade: '00s',
    characters: ['Dexter Morgan', 'Debra Morgan', 'Angel Batista', 'James Doakes', 'Harrison Morgan'],
  },

  // Movies
  {
    title: 'Harry Potter',
    type: 'movie',
    decade: '00s',
    characters: ['Harry Potter', 'Hermione Granger', 'Ron Weasley', 'Albus Dumbledore', 'Severus Snape', 'Draco Malfoy'],
  },
  {
    title: 'Star Wars',
    type: 'movie',
    decade: '80s',
    characters: ['Luke Skywalker', 'Darth Vader', 'Han Solo', 'Princess Leia', 'Obi-Wan Kenobi', 'Yoda'],
  },
  {
    title: 'The Lord of the Rings',
    type: 'movie',
    decade: '00s',
    characters: ['Frodo Baggins', 'Gandalf', 'Aragorn', 'Legolas', 'Gimli', 'Samwise Gamgee'],
  },
  {
    title: 'The Avengers',
    type: 'movie',
    decade: '10s',
    characters: ['Iron Man', 'Captain America', 'Thor', 'Black Widow', 'Hulk', 'Hawkeye'],
  },
  {
    title: 'The Dark Knight',
    type: 'movie',
    decade: '00s',
    characters: ['Batman', 'The Joker', 'Harvey Dent', 'Alfred Pennyworth', 'Lucius Fox', 'Commissioner Gordon'],
  },
  {
    title: 'Jurassic Park',
    type: 'movie',
    decade: '90s',
    characters: ['Alan Grant', 'Ellie Sattler', 'Ian Malcolm', 'John Hammond', 'Dennis Nedry'],
  },
  {
    title: 'Indiana Jones',
    type: 'movie',
    decade: '80s',
    characters: ['Indiana Jones', 'Marion Ravenwood', 'Sallah', 'Short Round', 'Henry Jones Sr.'],
  },
  {
    title: 'Shrek',
    type: 'movie',
    decade: '00s',
    characters: ['Shrek', 'Fiona', 'Donkey', 'Puss in Boots', 'Lord Farquaad', 'Gingy'],
  },
  {
    title: 'The Matrix',
    type: 'movie',
    decade: '90s',
    characters: ['Neo', 'Morpheus', 'Trinity', 'Agent Smith', 'Oracle', 'Tank'],
  },
  {
    title: 'Toy Story',
    type: 'movie',
    decade: '90s',
    characters: ['Woody', 'Buzz Lightyear', 'Jessie', 'Rex', 'Hamm', 'Mr. Potato Head'],
  },
  {
    title: 'Frozen',
    type: 'movie',
    decade: '10s',
    characters: ['Elsa', 'Anna', 'Olaf', 'Kristoff', 'Hans', 'Sven'],
  },
  {
    title: 'The Lion King',
    type: 'movie',
    decade: '90s',
    characters: ['Simba', 'Mufasa', 'Scar', 'Nala', 'Timon', 'Pumbaa'],
  },
  {
    title: 'Finding Nemo',
    type: 'movie',
    decade: '00s',
    characters: ['Nemo', 'Marlin', 'Dory', 'Gill', 'Crush', 'Darla'],
  },
  {
    title: 'Back to the Future',
    type: 'movie',
    decade: '80s',
    characters: ['Marty McFly', 'Doc Brown', 'Biff Tannen', 'Jennifer Parker', 'George McFly'],
  },
  {
    title: 'Pirates of the Caribbean',
    type: 'movie',
    decade: '00s',
    characters: ['Jack Sparrow', 'Will Turner', 'Elizabeth Swann', 'Davy Jones', 'Barbossa'],
  },
  {
    title: 'Ghostbusters',
    type: 'movie',
    decade: '80s',
    characters: ['Peter Venkman', 'Egon Spengler', 'Ray Stantz', 'Winston Zeddemore', 'Slimer'],
  },
  {
    title: 'Mean Girls',
    type: 'movie',
    decade: '00s',
    characters: ['Cady Heron', 'Regina George', 'Gretchen Wieners', 'Karen Smith', 'Janis Ian', 'Damian'],
  },
  {
    title: 'The Princess Bride',
    type: 'movie',
    decade: '80s',
    characters: ['Westley', 'Buttercup', 'Inigo Montoya', 'Vizzini', 'Fezzik', 'Humperdinck'],
  },
  {
    title: 'Pulp Fiction',
    type: 'movie',
    decade: '90s',
    characters: ['Vincent Vega', 'Jules Winnfield', 'Mia Wallace', 'Butch Coolidge', 'Winston Wolfe'],
  },
  {
    title: 'Spider-Man',
    type: 'movie',
    decade: '00s',
    characters: ['Peter Parker', 'Mary Jane Watson', 'Harry Osborn', 'Norman Osborn', 'J. Jonah Jameson'],
  },

  // Video Games
  {
    title: 'Super Mario Bros',
    type: 'game',
    decade: '80s',
    characters: ['Mario', 'Luigi', 'Princess Peach', 'Bowser', 'Toad', 'Yoshi'],
  },
  {
    title: 'The Legend of Zelda',
    type: 'game',
    decade: '80s',
    characters: ['Link', 'Princess Zelda', 'Ganondorf', 'Impa', 'Navi', 'Midna'],
  },
  {
    title: 'Pokémon',
    type: 'game',
    decade: '90s',
    characters: ['Pikachu', 'Ash Ketchum', 'Misty', 'Brock', 'Mewtwo', 'Team Rocket'],
  },
  {
    title: 'Minecraft',
    type: 'game',
    decade: '10s',
    characters: ['Steve', 'Alex', 'Creeper', 'Enderman', 'Herobrine', 'Skeleton'],
  },
  {
    title: 'Fortnite',
    type: 'game',
    decade: '10s',
    characters: ['Jonesy', 'Peely', 'Midas', 'Fishstick', 'Raven', 'Master Chief'],
  },
  {
    title: 'Grand Theft Auto V',
    type: 'game',
    decade: '10s',
    characters: ['Michael De Santa', 'Trevor Philips', 'Franklin Clinton', 'Lamar Davis', 'Lester Crest'],
  },
  {
    title: 'Halo',
    type: 'game',
    decade: '00s',
    characters: ['Master Chief', 'Cortana', 'Arbiter', 'Sergeant Johnson', 'Commander Miranda Keyes'],
  },
  {
    title: 'The Last of Us',
    type: 'game',
    decade: '10s',
    characters: ['Joel Miller', 'Ellie Williams', 'Tess', 'Tommy Miller', 'Marlene', 'Riley Abel'],
  },
  {
    title: 'Overwatch',
    type: 'game',
    decade: '10s',
    characters: ['Tracer', 'Genji', 'Mercy', 'Widowmaker', "D.Va", 'McCree'],
  },
  {
    title: 'League of Legends',
    type: 'game',
    decade: '10s',
    characters: ['Jinx', 'Ezreal', 'Lux', 'Yasuo', 'Vi', 'Ahri'],
  },
  {
    title: 'Street Fighter',
    type: 'game',
    decade: '90s',
    characters: ['Ryu', 'Ken Masters', 'Chun-Li', 'Blanka', 'Zangief', 'Guile'],
  },
  {
    title: 'Mortal Kombat',
    type: 'game',
    decade: '90s',
    characters: ['Scorpion', 'Sub-Zero', 'Liu Kang', 'Sonya Blade', 'Raiden', 'Kano'],
  },
  {
    title: 'Super Smash Bros',
    type: 'game',
    decade: '90s',
    characters: ['Kirby', 'Fox McCloud', 'Pikachu', 'Samus', 'Captain Falcon', 'Ness'],
  },
  {
    title: 'Stardew Valley',
    type: 'game',
    decade: '10s',
    characters: ['The Farmer', 'Penny', 'Sebastian', 'Abigail', 'Harvey', 'Robin'],
  },
  {
    title: 'Among Us',
    type: 'game',
    decade: '20s',
    characters: ['The Crewmate', 'The Impostor'],
  },

  // Anime
  {
    title: 'Naruto',
    type: 'anime',
    decade: '00s',
    characters: ['Naruto Uzumaki', 'Sasuke Uchiha', 'Sakura Haruno', 'Kakashi Hatake', 'Itachi Uchiha', 'Hinata Hyuga'],
  },
  {
    title: 'One Piece',
    type: 'anime',
    decade: '00s',
    characters: ['Monkey D. Luffy', 'Roronoa Zoro', 'Nami', 'Sanji', 'Usopp', 'Nico Robin'],
  },
  {
    title: 'Dragon Ball Z',
    type: 'anime',
    decade: '90s',
    characters: ['Goku', 'Vegeta', 'Gohan', 'Piccolo', 'Frieza', 'Bulma'],
  },
  {
    title: 'Attack on Titan',
    type: 'anime',
    decade: '10s',
    characters: ['Eren Yeager', 'Mikasa Ackerman', 'Armin Arlert', 'Levi Ackerman', 'Hange Zoë', 'Erwin Smith'],
  },
  {
    title: 'Death Note',
    type: 'anime',
    decade: '00s',
    characters: ['Light Yagami', 'L Lawliet', 'Misa Amane', 'Near', 'Ryuk', 'Rem'],
  },
  {
    title: 'Demon Slayer',
    type: 'anime',
    decade: '20s',
    characters: ['Tanjiro Kamado', 'Nezuko Kamado', 'Zenitsu Agatsuma', 'Inosuke Hashibira', 'Giyu Tomioka'],
  },
  {
    title: 'My Hero Academia',
    type: 'anime',
    decade: '10s',
    characters: ['Izuku Midoriya', 'Katsuki Bakugo', 'Ochaco Uraraka', 'Shoto Todoroki', 'All Might', 'Tenya Iida'],
  },
  {
    title: 'Fullmetal Alchemist',
    type: 'anime',
    decade: '00s',
    characters: ['Edward Elric', 'Alphonse Elric', 'Roy Mustang', 'Winry Rockbell', 'Riza Hawkeye', 'Envy'],
  },
  {
    title: 'Bleach',
    type: 'anime',
    decade: '00s',
    characters: ['Ichigo Kurosaki', 'Rukia Kuchiki', 'Orihime Inoue', 'Uryu Ishida', 'Kisuke Urahara', 'Renji Abarai'],
  },
  {
    title: 'Sailor Moon',
    type: 'anime',
    decade: '90s',
    characters: ['Sailor Moon', 'Sailor Mercury', 'Sailor Mars', 'Sailor Jupiter', 'Sailor Venus', 'Tuxedo Mask'],
  },
  {
    title: 'Cowboy Bebop',
    type: 'anime',
    decade: '90s',
    characters: ['Spike Spiegel', 'Jet Black', 'Faye Valentine', 'Ed', 'Ein'],
  },
  {
    title: 'Neon Genesis Evangelion',
    type: 'anime',
    decade: '90s',
    characters: ['Shinji Ikari', 'Rei Ayanami', 'Asuka Langley', 'Misato Katsuragi', 'Gendo Ikari'],
  },
  {
    title: 'Hunter x Hunter',
    type: 'anime',
    decade: '10s',
    characters: ['Gon Freecss', 'Killua Zoldyck', 'Kurapika', 'Leorio Paradinight', 'Hisoka', 'Meruem'],
  },
  {
    title: 'Sword Art Online',
    type: 'anime',
    decade: '10s',
    characters: ['Kirito', 'Asuna', 'Sinon', 'Leafa', 'Klein', 'Yui'],
  },

  // Cartoons
  {
    title: 'Avatar: The Last Airbender',
    type: 'cartoon',
    decade: '00s',
    characters: ['Aang', 'Katara', 'Sokka', 'Zuko', 'Toph', 'Iroh'],
  },
  {
    title: 'Teen Titans',
    type: 'cartoon',
    decade: '00s',
    characters: ['Robin', 'Starfire', 'Raven', 'Cyborg', 'Beast Boy', 'Terra'],
  },
  {
    title: 'Gravity Falls',
    type: 'cartoon',
    decade: '10s',
    characters: ['Dipper Pines', 'Mabel Pines', 'Grunkle Stan', 'Bill Cipher', 'Soos', 'Wendy'],
  },
  {
    title: 'Adventure Time',
    type: 'cartoon',
    decade: '10s',
    characters: ['Finn', 'Jake', 'Princess Bubblegum', 'Marceline', 'Ice King', 'Lumpy Space Princess'],
  },
  {
    title: 'Steven Universe',
    type: 'cartoon',
    decade: '10s',
    characters: ['Steven Universe', 'Pearl', 'Amethyst', 'Garnet', 'Lapis Lazuli', 'Peridot'],
  },
  {
    title: 'Batman: The Animated Series',
    type: 'cartoon',
    decade: '90s',
    characters: ['Batman', 'Robin', 'Catwoman', 'The Joker', 'Harley Quinn', 'Two-Face'],
  },
  {
    title: 'Scooby-Doo',
    type: 'cartoon',
    decade: '70s',
    characters: ['Scooby-Doo', 'Shaggy Rogers', 'Fred Jones', 'Daphne Blake', 'Velma Dinkley'],
  },
  {
    title: 'SpongeBob SquarePants',
    type: 'cartoon',
    decade: '00s',
    characters: ['SpongeBob', 'Patrick Star', 'Squidward Tentacles', 'Sandy Cheeks', 'Mr. Krabs', 'Plankton'],
  },
  {
    title: 'Phineas and Ferb',
    type: 'cartoon',
    decade: '00s',
    characters: ['Phineas Flynn', 'Ferb Fletcher', 'Candace Flynn', 'Perry the Platypus', 'Dr. Doofenshmirtz'],
  },
  {
    title: 'The Fairly OddParents',
    type: 'cartoon',
    decade: '00s',
    characters: ['Timmy Turner', 'Wanda', 'Cosmo', 'Poof', 'Mr. Turner', 'Vicky'],
  },
];

async function main() {
  console.log('Seeding database...');

  // Clear existing data
  await prisma.selection.deleteMany();
  await prisma.session.deleteMany();
  await prisma.character.deleteMany();
  await prisma.iP.deleteMany();

  for (const item of seedData) {
    await prisma.iP.create({
      data: {
        title: item.title,
        type: item.type,
        decade: item.decade,
        characters: {
          create: item.characters.map((name) => ({ name })),
        },
      },
    });
  }

  const ipCount = await prisma.iP.count();
  const charCount = await prisma.character.count();
  console.log(`Seeded ${ipCount} IPs and ${charCount} characters.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
