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

  // Cartoons — 80s
  {
    title: 'Transformers',
    type: 'cartoon',
    decade: '80s',
    characters: ['Optimus Prime', 'Bumblebee', 'Megatron', 'Starscream', 'Soundwave', 'Ironhide'],
  },
  {
    title: 'G.I. Joe',
    type: 'cartoon',
    decade: '80s',
    characters: ['Duke', 'Snake Eyes', 'Scarlett', 'Cobra Commander', 'Destro', 'Storm Shadow'],
  },
  {
    title: 'He-Man and the Masters of the Universe',
    type: 'cartoon',
    decade: '80s',
    characters: ['He-Man', 'Skeletor', 'Teela', 'Man-At-Arms', 'Orko', 'Battle Cat'],
  },
  {
    title: 'ThunderCats',
    type: 'cartoon',
    decade: '80s',
    characters: ['Lion-O', 'Tygra', 'Cheetara', 'Panthro', 'Snarf', 'Mumm-Ra'],
  },
  {
    title: 'Teenage Mutant Ninja Turtles',
    type: 'cartoon',
    decade: '80s',
    characters: ['Leonardo', 'Michelangelo', 'Donatello', 'Raphael', 'Splinter', 'Shredder'],
  },
  {
    title: 'DuckTales',
    type: 'cartoon',
    decade: '80s',
    characters: ['Scrooge McDuck', 'Huey', 'Dewey', 'Louie', 'Launchpad McQuack', 'Darkwing Duck'],
  },
  {
    title: 'Inspector Gadget',
    type: 'cartoon',
    decade: '80s',
    characters: ['Inspector Gadget', 'Penny', 'Brain', 'Dr. Claw', 'Chief Quimby'],
  },
  {
    title: 'The Smurfs',
    type: 'cartoon',
    decade: '80s',
    characters: ['Papa Smurf', 'Smurfette', 'Brainy Smurf', 'Clumsy Smurf', 'Gargamel', 'Azrael'],
  },
  {
    title: 'Jem and the Holograms',
    type: 'cartoon',
    decade: '80s',
    characters: ['Jem', 'Kimber', 'Aja', 'Shana', 'Raya', 'Pizzazz'],
  },
  {
    title: 'Care Bears',
    type: 'cartoon',
    decade: '80s',
    characters: ['Tenderheart Bear', 'Cheer Bear', 'Funshine Bear', 'Grumpy Bear', 'Love-a-Lot Bear'],
  },

  // Cartoons — 90s
  {
    title: 'Animaniacs',
    type: 'cartoon',
    decade: '90s',
    characters: ['Yakko Warner', 'Wakko Warner', 'Dot Warner', 'Pinky', 'The Brain', 'Hello Nurse'],
  },
  {
    title: 'Rugrats',
    type: 'cartoon',
    decade: '90s',
    characters: ['Tommy Pickles', 'Chuckie Finster', 'Phil DeVille', 'Lil DeVille', 'Angelica Pickles', 'Susie Carmichael'],
  },
  {
    title: 'Hey Arnold!',
    type: 'cartoon',
    decade: '90s',
    characters: ['Arnold', 'Helga Pataki', 'Gerald', 'Phoebe', 'Sid', 'Stinky'],
  },
  {
    title: "Rocko's Modern Life",
    type: 'cartoon',
    decade: '90s',
    characters: ['Rocko', 'Heffer Wolfe', 'Filburt', 'Dr. Hutchison', 'Ed Bighead'],
  },
  {
    title: 'The Powerpuff Girls',
    type: 'cartoon',
    decade: '90s',
    characters: ['Blossom', 'Bubbles', 'Buttercup', 'Mojo Jojo', 'Him', 'Princess Morbucks'],
  },
  {
    title: "Dexter's Laboratory",
    type: 'cartoon',
    decade: '90s',
    characters: ['Dexter', 'Dee Dee', 'Mom', 'Dad', 'Mandark'],
  },
  {
    title: 'Johnny Bravo',
    type: 'cartoon',
    decade: '90s',
    characters: ['Johnny Bravo', 'Suzy', 'Carl', 'Little Suzy'],
  },
  {
    title: 'Ed, Edd n Eddy',
    type: 'cartoon',
    decade: '90s',
    characters: ['Ed', 'Edd', 'Eddy', 'Kevin', 'Nazz', 'Rolf'],
  },
  {
    title: 'Courage the Cowardly Dog',
    type: 'cartoon',
    decade: '90s',
    characters: ['Courage', 'Muriel Bagge', 'Eustace Bagge', 'Katz', 'Le Quack'],
  },
  {
    title: 'Recess',
    type: 'cartoon',
    decade: '90s',
    characters: ['T.J. Detweiler', 'Spinelli', 'Gretchen Grundler', 'Mikey Blumberg', 'Vince LaSalle', 'Gus Griswald'],
  },

  // Cartoons — 00s
  {
    title: 'Kim Possible',
    type: 'cartoon',
    decade: '00s',
    characters: ['Kim Possible', 'Ron Stoppable', 'Wade', 'Shego', 'Dr. Drakken', 'Rufus'],
  },
  {
    title: 'Danny Phantom',
    type: 'cartoon',
    decade: '00s',
    characters: ['Danny Fenton', 'Sam Manson', 'Tucker Foley', 'Jazz Fenton', 'Vlad Masters', 'Skulker'],
  },
  {
    title: "Foster's Home for Imaginary Friends",
    type: 'cartoon',
    decade: '00s',
    characters: ['Mac', 'Bloo', 'Wilt', 'Eduardo', 'Coco', 'Frankie Foster'],
  },
  {
    title: 'Codename Kids Next Door',
    type: 'cartoon',
    decade: '00s',
    characters: ['Numbuh 1', 'Numbuh 2', 'Numbuh 3', 'Numbuh 4', 'Numbuh 5', 'Father'],
  },
  {
    title: 'Samurai Jack',
    type: 'cartoon',
    decade: '00s',
    characters: ['Samurai Jack', 'Aku', 'The Scotsman', 'Ashi', 'The Daughters of Aku'],
  },
  {
    title: 'The Boondocks',
    type: 'cartoon',
    decade: '00s',
    characters: ['Huey Freeman', 'Riley Freeman', 'Robert Freeman', 'Tom DuBois', 'Uncle Ruckus'],
  },
  {
    title: 'American Dragon Jake Long',
    type: 'cartoon',
    decade: '00s',
    characters: ['Jake Long', 'Trixie Carter', 'Arthur Spudinski', 'Grandpa', 'Fu Dog', 'Rose'],
  },

  // Cartoons — 10s
  {
    title: 'Regular Show',
    type: 'cartoon',
    decade: '10s',
    characters: ['Mordecai', 'Rigby', 'Benson', 'Pops', 'Skips', 'Muscle Man'],
  },
  {
    title: 'The Amazing World of Gumball',
    type: 'cartoon',
    decade: '10s',
    characters: ['Gumball Watterson', 'Darwin Watterson', 'Anais Watterson', 'Nicole Watterson', 'Richard Watterson', 'Penny'],
  },
  {
    title: 'Star vs. the Forces of Evil',
    type: 'cartoon',
    decade: '10s',
    characters: ['Star Butterfly', 'Marco Diaz', 'Tom Lucitor', 'Janna', 'Buff Frog', 'Toffee'],
  },
  {
    title: 'We Bare Bears',
    type: 'cartoon',
    decade: '10s',
    characters: ['Grizzly Bear', 'Panda Bear', 'Ice Bear', 'Chloe Park', 'Charlie'],
  },
  {
    title: 'Miraculous Ladybug',
    type: 'cartoon',
    decade: '10s',
    characters: ['Marinette Dupain-Cheng', 'Adrien Agreste', 'Alya Césaire', 'Nino Lahiffe', 'Hawk Moth', 'Luka Couffaine'],
  },
  {
    title: 'Voltron: Legendary Defender',
    type: 'cartoon',
    decade: '10s',
    characters: ['Shiro', 'Keith', 'Lance', 'Pidge', 'Hunk', 'Princess Allura'],
  },
  {
    title: 'She-Ra and the Princesses of Power',
    type: 'cartoon',
    decade: '10s',
    characters: ['Adora', 'Catra', 'Glimmer', 'Bow', 'Scorpia', 'Entrapta'],
  },
  {
    title: 'The Loud House',
    type: 'cartoon',
    decade: '10s',
    characters: ['Lincoln Loud', 'Lori Loud', 'Leni Loud', 'Luna Loud', 'Luan Loud', 'Lana Loud'],
  },
  {
    title: 'Amphibia',
    type: 'cartoon',
    decade: '10s',
    characters: ['Anne Boonchuy', 'Sprig Plantar', 'Polly Plantar', 'Hop Pop Plantar', 'Marcy Wu', 'Sasha Waybright'],
  },
  {
    title: 'The Owl House',
    type: 'cartoon',
    decade: '10s',
    characters: ['Luz Noceda', 'Eda Clawthorne', 'King', 'Amity Blight', 'Willow Park', 'Gus Porter'],
  },

  // Cartoons — 20s
  {
    title: 'Arcane',
    type: 'cartoon',
    decade: '20s',
    characters: ['Jinx', 'Vi', 'Jayce', 'Viktor', 'Silco', 'Caitlyn'],
  },
  {
    title: 'Blue Eye Samurai',
    type: 'cartoon',
    decade: '20s',
    characters: ['Mizu', 'Taigen', 'Akemi', 'Ringo', 'Fowler'],
  },
  {
    title: 'Hilda',
    type: 'cartoon',
    decade: '20s',
    characters: ['Hilda', 'Johanna', 'Frida', 'David', 'Alfur', 'Tontu'],
  },

  // Anime — 80s
  {
    title: 'Dragon Ball',
    type: 'anime',
    decade: '80s',
    characters: ['Goku (kid)', 'Bulma', 'Yamcha', 'Krillin', 'Tien', 'Master Roshi'],
  },
  {
    title: 'Fist of the North Star',
    type: 'anime',
    decade: '80s',
    characters: ['Kenshiro', 'Raoh', 'Toki', 'Jagi', 'Rei', 'Mamiya'],
  },
  {
    title: 'Mobile Suit Gundam',
    type: 'anime',
    decade: '80s',
    characters: ['Amuro Ray', 'Char Aznable', 'Bright Noa', 'Sayla Mass', 'Lalah Sune'],
  },
  {
    title: 'Captain Tsubasa',
    type: 'anime',
    decade: '80s',
    characters: ['Tsubasa Ozora', 'Genzo Wakabayashi', 'Kojiro Hyuga', 'Roberto Hongo', 'Taro Misaki'],
  },
  {
    title: 'Macross',
    type: 'anime',
    decade: '80s',
    characters: ['Hikaru Ichijyo', 'Lynn Minmay', 'Roy Focker', 'Misa Hayase', 'Maximilian Jenius'],
  },

  // Anime — 90s
  {
    title: 'Rurouni Kenshin',
    type: 'anime',
    decade: '90s',
    characters: ['Kenshin Himura', 'Kaoru Kamiya', 'Yahiko Myojin', 'Sanosuke Sagara', 'Aoshi Shinomori', 'Shishio Makoto'],
  },
  {
    title: 'Yu Yu Hakusho',
    type: 'anime',
    decade: '90s',
    characters: ['Yusuke Urameshi', 'Kazuma Kuwabara', 'Hiei', 'Kurama', 'Koenma', 'Keiko Yukimura'],
  },
  {
    title: 'Inuyasha',
    type: 'anime',
    decade: '90s',
    characters: ['Inuyasha', 'Kagome Higurashi', 'Miroku', 'Sango', 'Shippo', 'Sesshomaru'],
  },
  {
    title: 'Cardcaptor Sakura',
    type: 'anime',
    decade: '90s',
    characters: ['Sakura Kinomoto', 'Syaoran Li', 'Tomoyo Daidouji', 'Kero', 'Yukito Tsukishiro', 'Meiling Li'],
  },
  {
    title: 'Digimon',
    type: 'anime',
    decade: '90s',
    characters: ['Tai Kamiya', 'Agumon', 'Matt Ishida', 'Gabumon', 'Sora Takenouchi', 'Izzy Izumi'],
  },
  {
    title: 'Yu-Gi-Oh!',
    type: 'anime',
    decade: '90s',
    characters: ['Yugi Muto', 'Seto Kaiba', 'Joey Wheeler', 'Téa Gardner', 'Tristan Taylor', 'Yami Yugi'],
  },
  {
    title: 'Trigun',
    type: 'anime',
    decade: '90s',
    characters: ['Vash the Stampede', 'Meryl Strife', 'Milly Thompson', 'Nicholas D. Wolfwood', 'Knives'],
  },
  {
    title: 'Outlaw Star',
    type: 'anime',
    decade: '90s',
    characters: ['Gene Starwind', 'Jim Hawking', 'Melfina', 'Aisha Clan-Clan', 'Suzuka', 'Hot Ice Hilda'],
  },
  {
    title: 'Revolutionary Girl Utena',
    type: 'anime',
    decade: '90s',
    characters: ['Utena Tenjou', 'Anthy Himemiya', 'Touga Kiryuu', 'Saionji Kyouichi', 'Juri Arisugawa'],
  },

  // Anime — 00s
  {
    title: 'Code Geass',
    type: 'anime',
    decade: '00s',
    characters: ['Lelouch vi Britannia', 'C.C.', 'Kallen Stadtfeld', 'Suzaku Kururugi', 'Nunnally vi Britannia', 'Jeremiah Gottwald'],
  },
  {
    title: 'Gurren Lagann',
    type: 'anime',
    decade: '00s',
    characters: ['Simon', 'Kamina', 'Yoko Littner', 'Nia Teppelin', 'Viral', 'Lord Genome'],
  },
  {
    title: 'Ouran High School Host Club',
    type: 'anime',
    decade: '00s',
    characters: ['Haruhi Fujioka', 'Tamaki Suoh', 'Kyoya Ootori', 'Hikaru Hitachiin', 'Kaoru Hitachiin', 'Mori Senpai'],
  },
  {
    title: 'The Melancholy of Haruhi Suzumiya',
    type: 'anime',
    decade: '00s',
    characters: ['Haruhi Suzumiya', 'Kyon', 'Yuki Nagato', 'Mikuru Asahina', 'Itsuki Koizumi'],
  },
  {
    title: 'Soul Eater',
    type: 'anime',
    decade: '00s',
    characters: ['Maka Albarn', 'Soul Evans', 'Death the Kid', 'Liz Thompson', 'Patty Thompson', 'Black Star'],
  },
  {
    title: 'Fairy Tail',
    type: 'anime',
    decade: '00s',
    characters: ['Natsu Dragneel', 'Lucy Heartfilia', 'Erza Scarlet', 'Gray Fullbuster', 'Happy', 'Wendy Marvell'],
  },
  {
    title: 'Black Lagoon',
    type: 'anime',
    decade: '00s',
    characters: ['Rock', 'Revy', 'Dutch', 'Benny', 'Balalaika', 'Roberta'],
  },
  {
    title: 'Elfen Lied',
    type: 'anime',
    decade: '00s',
    characters: ['Lucy', 'Kouta', 'Yuka', 'Nana', 'Mayu', 'Kurama'],
  },
  {
    title: 'Toradora',
    type: 'anime',
    decade: '00s',
    characters: ['Ryuji Takasu', 'Taiga Aisaka', 'Minori Kushieda', 'Yusaku Kitamura', 'Ami Kawashima'],
  },
  {
    title: 'Clannad',
    type: 'anime',
    decade: '00s',
    characters: ['Tomoya Okazaki', 'Nagisa Furukawa', 'Kyou Fujibayashi', 'Ryou Fujibayashi', 'Kotomi Ichinose', 'Fuko Ibuki'],
  },

  // Anime — 10s
  {
    title: 'One Punch Man',
    type: 'anime',
    decade: '10s',
    characters: ["Saitama", 'Genos', "Speed-o'-Sound Sonic", 'Mumen Rider', 'Tatsumaki', 'Bang'],
  },
  {
    title: 'Mob Psycho 100',
    type: 'anime',
    decade: '10s',
    characters: ['Shigeo Kageyama', 'Reigen Arataka', 'Dimple', 'Ritsu Kageyama', 'Ekubo', 'Teruki Hanazawa'],
  },
  {
    title: 'Re:Zero',
    type: 'anime',
    decade: '10s',
    characters: ['Subaru Natsuki', 'Emilia', 'Rem', 'Ram', 'Beatrice', 'Roswaal'],
  },
  {
    title: 'Konosuba',
    type: 'anime',
    decade: '10s',
    characters: ['Kazuma Satou', 'Aqua', 'Megumin', 'Darkness', 'Wiz', 'Vanir'],
  },
  {
    title: 'No Game No Life',
    type: 'anime',
    decade: '10s',
    characters: ['Sora', 'Shiro', 'Jibril', 'Stephanie Dola', 'Fil Nilvalen'],
  },
  {
    title: 'Kill la Kill',
    type: 'anime',
    decade: '10s',
    characters: ['Ryuko Matoi', 'Satsuki Kiryuin', 'Mako Mankanshoku', 'Nui Harime', 'Ragyo Kiryuin', 'Senketsu'],
  },
  {
    title: 'Puella Magi Madoka Magica',
    type: 'anime',
    decade: '10s',
    characters: ['Madoka Kaname', 'Homura Akemi', 'Sayaka Miki', 'Mami Tomoe', 'Kyoko Sakura', 'Kyubey'],
  },
  {
    title: 'Overlord',
    type: 'anime',
    decade: '10s',
    characters: ['Ainz Ooal Gown', 'Albedo', 'Shalltear Bloodfallen', 'Demiurge', 'Cocytus', 'Narberal Gamma'],
  },
  {
    title: 'That Time I Got Reincarnated as a Slime',
    type: 'anime',
    decade: '10s',
    characters: ['Rimuru Tempest', 'Shion', 'Benimaru', 'Shuna', 'Milim Nava', 'Diablo'],
  },
  {
    title: 'Haikyuu!!',
    type: 'anime',
    decade: '10s',
    characters: ['Shoyo Hinata', 'Tobio Kageyama', 'Daichi Sawamura', 'Koshi Sugawara', 'Asahi Azumane', 'Kei Tsukishima'],
  },
  {
    title: 'Psycho-Pass',
    type: 'anime',
    decade: '10s',
    characters: ['Akane Tsunemori', 'Shinya Kogami', 'Nobuchika Ginoza', 'Shogo Makishima', 'Tomomi Masaoka'],
  },
  {
    title: 'Vinland Saga',
    type: 'anime',
    decade: '10s',
    characters: ['Thorfinn', 'Askeladd', 'Bjorn', 'Thors', 'Canute', 'Floki'],
  },
  {
    title: 'The Promised Neverland',
    type: 'anime',
    decade: '10s',
    characters: ['Emma', 'Norman', 'Ray', 'Isabella', 'Phil', 'Gilda'],
  },
  {
    title: 'Dr. Stone',
    type: 'anime',
    decade: '10s',
    characters: ['Senku Ishigami', 'Taiju Oki', 'Chrome', 'Gen Asagiri', 'Kohaku', 'Tsukasa Shishio'],
  },
  {
    title: "JoJo's Bizarre Adventure",
    type: 'anime',
    decade: '10s',
    characters: ['Jonathan Joestar', 'Joseph Joestar', 'Jotaro Kujo', 'Dio Brando', 'Giorno Giovanna', 'Yoshikage Kira'],
  },

  // Anime — 20s
  {
    title: 'Jujutsu Kaisen',
    type: 'anime',
    decade: '20s',
    characters: ['Yuji Itadori', 'Megumi Fushiguro', 'Nobara Kugisaki', 'Satoru Gojo', 'Ryomen Sukuna', 'Aoi Todo'],
  },
  {
    title: 'Chainsaw Man',
    type: 'anime',
    decade: '20s',
    characters: ['Denji', 'Power', 'Aki Hayakawa', 'Makima', 'Pochita', 'Himeno'],
  },
  {
    title: 'Spy x Family',
    type: 'anime',
    decade: '20s',
    characters: ['Loid Forger', 'Yor Forger', 'Anya Forger', 'Franky Franklin', 'Yuri Briar', 'Sylvia Sherwood'],
  },
  {
    title: 'Oshi no Ko',
    type: 'anime',
    decade: '20s',
    characters: ['Aqua Hoshino', 'Ruby Hoshino', 'Ai Hoshino', 'Kana Arima', 'Mem-cho', 'Akane Kurokawa'],
  },
  {
    title: 'Blue Lock',
    type: 'anime',
    decade: '20s',
    characters: ['Yoichi Isagi', 'Meguru Bachira', 'Rensuke Kunigami', 'Hyoma Chigiri', 'Seishiro Nagi', 'Reo Mikage'],
  },
  {
    title: "Frieren: Beyond Journey's End",
    type: 'anime',
    decade: '20s',
    characters: ['Frieren', 'Fern', 'Stark', 'Himmel', 'Eisen', 'Heiter'],
  },
  {
    title: 'Bocchi the Rock',
    type: 'anime',
    decade: '20s',
    characters: ['Hitori Gotoh', 'Nijika Ijichi', 'Ryo Yamada', 'Ikuyo Kita', 'Seika Ijichi'],
  },
  {
    title: 'Mushoku Tensei',
    type: 'anime',
    decade: '20s',
    characters: ['Rudeus Greyrat', 'Roxy Migurdia', 'Sylphiette', 'Eris Boreas Greyrat', 'Paul Greyrat'],
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
