import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Trait keys:
// bald, glasses, beard, blonde, redhead, white_hair, green
// animal, robot, supernatural
// villain, parent, royalty, dies, twin
// has_powers, magic, genius, fighter, scientist, child, elderly

const traitMap: Record<string, string[]> = {
  // ── The Office ──────────────────────────────
  'Michael Scott': ['parent'],
  'Dwight Schrute': ['fighter'],
  'Jim Halpert': [],
  'Pam Beesly': ['parent'],
  'Kevin Malone': [],
  'Ryan Howard': [],

  // ── Friends ─────────────────────────────────
  'Ross Geller': ['scientist', 'genius', 'parent'],
  'Rachel Green': [],
  'Chandler Bing': ['parent'],
  'Monica Geller': ['parent'],
  'Joey Tribbiani': [],
  'Phoebe Buffay': [],

  // ── Breaking Bad ────────────────────────────
  'Walter White': ['bald', 'villain', 'genius', 'scientist', 'parent'],
  'Jesse Pinkman': [],
  'Hank Schrader': [],
  'Saul Goodman': ['glasses'],
  'Gustavo Fring': ['villain', 'genius'],
  'Skyler White': ['parent', 'blonde'],

  // ── Supernatural ────────────────────────────
  'Dean Winchester': [],
  'Sam Winchester': [],
  'Castiel': ['supernatural', 'parent'],
  'Bobby Singer': ['glasses', 'beard', 'parent'],
  'Crowley': ['supernatural', 'villain'],
  'Lucifer': ['supernatural', 'villain'],

  // ── Game of Thrones ─────────────────────────
  'Jon Snow': ['royalty', 'dies', 'fighter', 'beard'],
  'Daenerys Targaryen': ['royalty', 'blonde', 'has_powers', 'parent'],
  'Tyrion Lannister': ['genius', 'royalty'],
  'Cersei Lannister': ['royalty', 'villain', 'parent', 'blonde'],
  'Arya Stark': ['fighter', 'royalty'],
  'Ned Stark': ['royalty', 'dies', 'beard', 'parent', 'fighter'],

  // ── Stranger Things ─────────────────────────
  'Eleven': ['has_powers', 'child', 'bald'],
  'Mike Wheeler': ['child'],
  'Dustin Henderson': ['child'],
  'Will Byers': ['child'],
  'Jim Hopper': ['parent'],
  'Max Mayfield': ['child', 'redhead'],

  // ── The Simpsons ────────────────────────────
  'Homer Simpson': ['parent', 'bald'],
  'Marge Simpson': ['parent'],
  'Bart Simpson': ['child'],
  'Lisa Simpson': ['child', 'genius'],
  'Ned Flanders': ['parent', 'beard'],
  'Mr. Burns': ['villain', 'elderly', 'bald'],

  // ── South Park ──────────────────────────────
  'Eric Cartman': ['child', 'villain'],
  'Stan Marsh': ['child'],
  'Kyle Broflovski': ['child'],
  'Kenny McCormick': ['child', 'dies'],
  'Randy Marsh': ['parent'],
  'Butters Stotch': ['child'],

  // ── Rick and Morty ──────────────────────────
  'Rick Sanchez': ['genius', 'scientist', 'white_hair', 'parent'],
  'Morty Smith': ['child'],
  'Beth Smith': ['parent', 'scientist'],
  'Jerry Smith': ['parent'],
  'Summer Smith': ['child'],
  'Mr. Meeseeks': ['supernatural', 'dies'],

  // ── Brooklyn Nine-Nine ──────────────────────
  'Jake Peralta': [],
  'Amy Santiago': ['genius', 'parent'],
  'Raymond Holt': [],
  'Rosa Diaz': [],
  'Charles Boyle': [],
  'Gina Linetti': [],

  // ── Parks and Recreation ────────────────────
  'Leslie Knope': ['genius'],
  'Ron Swanson': ['beard', 'parent'],
  'Ben Wyatt': ['glasses'],
  'April Ludgate': [],
  'Andy Dwyer': [],
  'Tom Haverford': [],

  // ── Arrested Development ────────────────────
  'Michael Bluth': ['parent'],
  'George Michael Bluth': ['child'],
  'Tobias Fünke': ['scientist'],
  'Buster Bluth': [],
  'Lucille Bluth': ['parent', 'villain'],
  'Gob Bluth': ['magic'],

  // ── Seinfeld ────────────────────────────────
  'Jerry Seinfeld': [],
  'George Costanza': ['bald'],
  'Cosmo Kramer': [],
  'Elaine Benes': [],
  'Newman': [],
  'Frank Costanza': ['parent'],

  // ── Always Sunny ────────────────────────────
  'Charlie Kelly': [],
  'Dennis Reynolds': ['villain', 'parent'],
  'Mac McDonald': ['fighter'],
  'Dee Reynolds': [],
  'Frank Reynolds': ['villain', 'parent', 'bald'],

  // ── The Wire ────────────────────────────────
  'Jimmy McNulty': [],
  'Omar Little': ['fighter'],
  'Stringer Bell': ['villain', 'genius'],
  'Bunk Moreland': [],
  'Avon Barksdale': ['villain'],

  // ── Grey's Anatomy ──────────────────────────
  'Meredith Grey': ['scientist', 'parent'],
  'Cristina Yang': ['scientist', 'genius'],
  'Derek Shepherd': ['scientist', 'parent'],
  'Alex Karev': ['scientist', 'parent'],
  'Miranda Bailey': ['scientist', 'parent'],

  // ── Lost ────────────────────────────────────
  'Jack Shephard': ['scientist', 'parent'],
  'Kate Austen': [],
  'Sawyer Ford': ['blonde'],
  'John Locke': ['dies', 'bald'],
  'Hurley Reyes': [],
  'Sayid Jarrah': ['fighter', 'dies'],

  // ── How I Met Your Mother ───────────────────
  'Ted Mosby': ['parent'],
  'Barney Stinson': ['genius', 'parent'],
  'Marshall Eriksen': ['parent'],
  'Lily Aldrin': ['parent'],
  'Robin Scherbatsky': [],

  // ── New Girl ────────────────────────────────
  'Jess Day': ['glasses'],
  'Nick Miller': [],
  'Schmidt': [],
  'Winston Bishop': [],
  'Cece Parekh': [],

  // ── The Walking Dead ────────────────────────
  'Rick Grimes': ['parent', 'fighter', 'beard'],
  'Daryl Dixon': ['fighter'],
  'Michonne': ['fighter'],
  'Glenn Rhee': ['parent', 'dies'],
  'Negan': ['villain', 'beard'],
  'Carol Peletier': ['parent', 'fighter', 'dies'],

  // ── Dexter ──────────────────────────────────
  'Dexter Morgan': ['villain', 'genius', 'scientist', 'parent'],
  'Debra Morgan': ['dies'],
  'Angel Batista': ['parent'],
  'James Doakes': ['dies'],
  'Harrison Morgan': ['child'],

  // ── Harry Potter ────────────────────────────
  'Harry Potter': ['has_powers', 'magic', 'glasses', 'dies', 'parent'],
  'Hermione Granger': ['genius', 'magic', 'has_powers', 'parent'],
  'Ron Weasley': ['magic', 'has_powers', 'redhead', 'parent'],
  'Albus Dumbledore': ['magic', 'has_powers', 'genius', 'beard', 'white_hair', 'elderly', 'dies'],
  'Severus Snape': ['magic', 'has_powers', 'dies'],
  'Draco Malfoy': ['magic', 'has_powers', 'blonde', 'villain', 'royalty'],

  // ── Star Wars ───────────────────────────────
  'Luke Skywalker': ['has_powers', 'fighter', 'dies'],
  'Darth Vader': ['villain', 'has_powers', 'fighter', 'parent', 'bald', 'dies'],
  'Han Solo': ['fighter', 'parent', 'dies'],
  'Princess Leia': ['royalty', 'parent', 'dies'],
  'Obi-Wan Kenobi': ['has_powers', 'fighter', 'genius', 'dies', 'beard'],
  'Yoda': ['has_powers', 'fighter', 'genius', 'elderly', 'green', 'dies'],

  // ── Lord of the Rings ───────────────────────
  'Frodo Baggins': [],
  'Gandalf': ['magic', 'has_powers', 'genius', 'beard', 'white_hair', 'elderly', 'dies'],
  'Aragorn': ['royalty', 'fighter', 'parent', 'beard'],
  'Legolas': ['fighter', 'has_powers', 'blonde', 'royalty'],
  'Gimli': ['fighter', 'beard'],
  'Samwise Gamgee': ['parent'],

  // ── The Avengers ────────────────────────────
  'Iron Man': ['genius', 'scientist', 'has_powers', 'parent', 'dies'],
  'Captain America': ['has_powers', 'fighter'],
  'Thor': ['has_powers', 'royalty', 'parent', 'blonde', 'beard', 'dies'],
  'Black Widow': ['fighter', 'dies'],
  'Hulk': ['has_powers', 'scientist', 'genius', 'green'],
  'Hawkeye': ['fighter', 'parent'],

  // ── The Dark Knight ─────────────────────────
  'Batman': ['fighter', 'genius'],
  'The Joker': ['villain', 'genius'],
  'Harvey Dent': ['villain', 'dies'],
  'Alfred Pennyworth': ['elderly'],
  'Lucius Fox': ['genius', 'scientist'],
  'Commissioner Gordon': ['beard', 'glasses'],

  // ── Jurassic Park ───────────────────────────
  'Alan Grant': ['scientist', 'glasses'],
  'Ellie Sattler': ['scientist', 'blonde'],
  'Ian Malcolm': ['scientist', 'genius', 'glasses'],
  'John Hammond': ['elderly', 'genius'],
  'Dennis Nedry': ['villain'],

  // ── Indiana Jones ───────────────────────────
  'Indiana Jones': ['scientist', 'genius', 'fighter'],
  'Marion Ravenwood': [],
  'Sallah': ['beard'],
  'Short Round': ['child'],
  'Henry Jones Sr.': ['elderly', 'scientist', 'beard', 'glasses', 'parent'],

  // ── Shrek ───────────────────────────────────
  'Shrek': ['green', 'parent'],
  'Fiona': ['royalty', 'parent', 'fighter'],
  'Donkey': ['animal', 'parent'],
  'Puss in Boots': ['animal', 'fighter'],
  'Lord Farquaad': ['villain', 'royalty', 'bald'],
  'Gingy': [],

  // ── The Matrix ──────────────────────────────
  'Neo': ['has_powers', 'fighter', 'dies'],
  'Morpheus': ['fighter', 'bald'],
  'Trinity': ['fighter', 'dies'],
  'Agent Smith': ['villain', 'has_powers', 'dies'],
  'Oracle': ['genius', 'elderly'],
  'Tank': [],

  // ── Toy Story ───────────────────────────────
  'Woody': ['parent'],
  'Buzz Lightyear': ['has_powers'],
  'Jessie': ['redhead'],
  'Rex': ['animal'],
  'Hamm': ['animal'],
  'Mr. Potato Head': [],

  // ── Frozen ──────────────────────────────────
  'Elsa': ['has_powers', 'magic', 'royalty', 'white_hair'],
  'Anna': ['royalty', 'redhead'],
  'Olaf': ['supernatural', 'dies'],
  'Kristoff': ['blonde'],
  'Hans': ['villain', 'royalty'],
  'Sven': ['animal'],

  // ── The Lion King ───────────────────────────
  'Simba': ['animal', 'royalty', 'parent'],
  'Mufasa': ['animal', 'royalty', 'parent', 'dies'],
  'Scar': ['animal', 'villain', 'royalty', 'dies'],
  'Nala': ['animal', 'royalty', 'parent'],
  'Timon': ['animal'],
  'Pumbaa': ['animal'],

  // ── Finding Nemo ────────────────────────────
  'Nemo': ['animal', 'child'],
  'Marlin': ['animal', 'parent'],
  'Dory': ['animal'],
  'Gill': ['animal'],
  'Crush': ['animal', 'parent'],
  'Darla': ['child'],

  // ── Back to the Future ──────────────────────
  'Marty McFly': ['child'],
  'Doc Brown': ['genius', 'scientist', 'white_hair', 'elderly', 'parent'],
  'Biff Tannen': ['villain'],
  'Jennifer Parker': [],
  'George McFly': ['glasses', 'parent'],

  // ── Pirates of the Caribbean ────────────────
  'Jack Sparrow': ['fighter', 'dies', 'beard'],
  'Will Turner': ['fighter', 'parent', 'dies'],
  'Elizabeth Swann': ['royalty', 'parent'],
  'Davy Jones': ['villain', 'dies', 'supernatural', 'beard'],
  'Barbossa': ['villain', 'dies', 'beard'],

  // ── Ghostbusters ────────────────────────────
  'Peter Venkman': ['scientist'],
  'Egon Spengler': ['scientist', 'genius', 'glasses'],
  'Ray Stantz': ['scientist'],
  'Winston Zeddemore': [],
  'Slimer': ['supernatural', 'green'],

  // ── Mean Girls ──────────────────────────────
  'Cady Heron': ['genius'],
  'Regina George': ['villain', 'blonde'],
  'Gretchen Wieners': ['blonde'],
  'Karen Smith': ['blonde'],
  'Janis Ian': [],
  'Damian': [],

  // ── The Princess Bride ──────────────────────
  'Westley': ['dies', 'fighter', 'blonde'],
  'Buttercup': ['has_powers', 'magic', 'fighter', 'child', 'royalty', 'blonde'],
  'Inigo Montoya': ['fighter'],
  'Vizzini': ['genius', 'bald'],
  'Fezzik': ['fighter'],
  'Humperdinck': ['villain', 'royalty'],

  // ── Pulp Fiction ────────────────────────────
  'Vincent Vega': ['dies'],
  'Jules Winnfield': ['bald'],
  'Mia Wallace': ['dies'],
  'Butch Coolidge': ['fighter'],
  'Winston Wolfe': ['genius'],

  // ── Spider-Man ──────────────────────────────
  'Peter Parker': ['has_powers', 'genius', 'scientist', 'glasses', 'dies'],
  'Mary Jane Watson': ['redhead'],
  'Harry Osborn': ['dies', 'villain'],
  'Norman Osborn': ['villain', 'dies', 'genius', 'scientist'],
  'J. Jonah Jameson': [],

  // ── Super Mario Bros ────────────────────────
  'Mario': ['fighter', 'has_powers', 'beard'],
  'Luigi': ['fighter', 'has_powers', 'beard'],
  'Princess Peach': ['royalty', 'blonde'],
  'Bowser': ['villain', 'royalty', 'parent'],
  'Toad': [],
  'Yoshi': ['animal'],

  // ── Legend of Zelda ─────────────────────────
  'Link': ['has_powers', 'fighter', 'royalty', 'blonde'],
  'Princess Zelda': ['royalty', 'has_powers', 'magic', 'blonde'],
  'Ganondorf': ['villain', 'has_powers', 'magic'],
  'Impa': ['fighter'],
  'Navi': ['supernatural', 'has_powers'],
  'Midna': ['supernatural', 'has_powers'],

  // ── Pokémon ─────────────────────────────────
  'Pikachu': ['animal', 'has_powers'],
  'Ash Ketchum': ['child'],
  'Misty': ['redhead', 'child'],
  'Brock': ['child'],
  'Mewtwo': ['has_powers', 'genius', 'supernatural'],
  'Team Rocket': ['villain'],

  // ── Minecraft ───────────────────────────────
  'Steve': [],
  'Alex': ['redhead'],
  'Creeper': ['villain'],
  'Enderman': ['supernatural', 'villain'],
  'Herobrine': ['supernatural', 'villain'],
  'Skeleton': ['supernatural'],

  // ── Fortnite ────────────────────────────────
  'Jonesy': [],
  'Peely': [],
  'Midas': ['genius'],
  'Fishstick': [],
  'Raven': ['has_powers', 'magic', 'fighter', 'supernatural'],
  'Master Chief': ['fighter', 'has_powers', 'bald'],

  // ── Grand Theft Auto V ──────────────────────
  'Michael De Santa': ['parent', 'villain'],
  'Trevor Philips': ['villain'],
  'Franklin Clinton': [],
  'Lamar Davis': [],
  'Lester Crest': ['genius', 'glasses'],

  // ── Halo ────────────────────────────────────
  // 'Master Chief' already listed above
  'Cortana': ['genius', 'supernatural'],
  'Arbiter': ['fighter', 'royalty'],
  'Sergeant Johnson': ['dies', 'fighter'],
  'Commander Miranda Keyes': ['dies'],

  // ── The Last of Us ──────────────────────────
  'Joel Miller': ['parent', 'fighter', 'dies'],
  'Ellie Williams': ['child', 'fighter', 'has_powers'],
  'Tess': ['dies', 'fighter'],
  'Tommy Miller': ['parent', 'fighter'],
  'Marlene': ['dies'],
  'Riley Abel': ['dies', 'child'],

  // ── Overwatch ───────────────────────────────
  'Tracer': ['has_powers', 'fighter'],
  'Genji': ['has_powers', 'fighter', 'robot'],
  'Mercy': ['has_powers', 'scientist', 'blonde'],
  'Widowmaker': ['villain', 'fighter'],
  "D.Va": ['child', 'fighter'],
  'McCree': ['fighter', 'beard'],

  // ── League of Legends ───────────────────────
  'Jinx': ['villain', 'fighter', 'blonde'],
  'Ezreal': ['genius', 'fighter', 'blonde'],
  'Lux': ['magic', 'has_powers', 'blonde'],
  'Yasuo': ['fighter'],
  'Vi': ['fighter'],
  'Ahri': ['supernatural', 'has_powers', 'magic'],

  // ── Street Fighter ──────────────────────────
  'Ryu': ['fighter'],
  'Ken Masters': ['fighter', 'blonde'],
  'Chun-Li': ['fighter'],
  'Blanka': ['green', 'has_powers', 'fighter'],
  'Zangief': ['fighter', 'beard'],
  'Guile': ['fighter', 'blonde'],

  // ── Mortal Kombat ───────────────────────────
  'Scorpion': ['fighter', 'supernatural', 'dies'],
  'Sub-Zero': ['fighter', 'supernatural'],
  'Liu Kang': ['fighter', 'dies'],
  'Sonya Blade': ['fighter', 'blonde'],
  'Raiden': ['fighter', 'supernatural', 'has_powers', 'white_hair', 'dies'],
  'Kano': ['fighter', 'villain'],

  // ── Super Smash Bros ────────────────────────
  'Kirby': ['has_powers', 'child'],
  'Fox McCloud': ['fighter', 'has_powers'],
  'Samus': ['fighter', 'has_powers', 'blonde'],
  'Captain Falcon': ['fighter'],
  'Ness': ['has_powers', 'child'],

  // ── Stardew Valley ──────────────────────────
  'The Farmer': [],
  'Penny': ['child', 'redhead'],
  'Sebastian': [],
  'Abigail': [],
  'Harvey': ['scientist', 'glasses', 'beard'],
  'Robin': ['fighter', 'genius', 'child'],

  // ── Among Us ────────────────────────────────
  'The Crewmate': [],
  'The Impostor': ['villain'],

  // ── Naruto ──────────────────────────────────
  'Naruto Uzumaki': ['has_powers', 'blonde', 'fighter', 'parent', 'child', 'royalty'],
  'Sasuke Uchiha': ['has_powers', 'fighter', 'villain', 'parent'],
  'Sakura Haruno': ['has_powers', 'fighter', 'parent'],
  'Kakashi Hatake': ['has_powers', 'fighter', 'white_hair', 'genius'],
  'Itachi Uchiha': ['villain', 'has_powers', 'fighter', 'genius', 'dies'],
  'Hinata Hyuga': ['has_powers', 'fighter', 'parent'],

  // ── One Piece ───────────────────────────────
  'Monkey D. Luffy': ['has_powers', 'fighter', 'child'],
  'Roronoa Zoro': ['has_powers', 'fighter'],
  'Nami': ['redhead'],
  'Sanji': ['fighter', 'blonde'],
  'Usopp': ['fighter'],
  'Nico Robin': ['fighter', 'genius', 'scientist'],

  // ── Dragon Ball Z ───────────────────────────
  'Goku': ['has_powers', 'fighter', 'parent', 'dies'],
  'Vegeta': ['has_powers', 'fighter', 'royalty', 'villain', 'parent'],
  'Gohan': ['has_powers', 'fighter', 'child', 'parent', 'glasses'],
  'Piccolo': ['has_powers', 'fighter', 'villain', 'green'],
  'Frieza': ['villain', 'has_powers', 'royalty', 'dies'],
  'Bulma': ['genius', 'scientist', 'blonde'],

  // ── Attack on Titan ─────────────────────────
  'Eren Yeager': ['has_powers', 'fighter', 'villain', 'dies', 'child'],
  'Mikasa Ackerman': ['fighter', 'has_powers'],
  'Armin Arlert': ['genius', 'blonde'],
  'Levi Ackerman': ['fighter', 'has_powers'],
  'Hange Zoë': ['scientist', 'glasses', 'dies'],
  'Erwin Smith': ['genius', 'dies', 'beard'],

  // ── Death Note ──────────────────────────────
  'Light Yagami': ['genius', 'villain', 'dies'],
  'L Lawliet': ['genius', 'dies'],
  'Misa Amane': ['villain', 'blonde'],
  'Near': ['genius', 'white_hair', 'child'],
  'Ryuk': ['supernatural', 'villain'],
  'Rem': ['supernatural', 'has_powers', 'magic', 'dies', 'twin'],

  // ── Demon Slayer ────────────────────────────
  'Tanjiro Kamado': ['fighter', 'has_powers', 'child'],
  'Nezuko Kamado': ['supernatural', 'child', 'has_powers', 'fighter'],
  'Zenitsu Agatsuma': ['fighter', 'has_powers', 'blonde', 'child'],
  'Inosuke Hashibira': ['fighter', 'has_powers', 'child'],
  'Giyu Tomioka': ['fighter', 'has_powers'],

  // ── My Hero Academia ────────────────────────
  'Izuku Midoriya': ['has_powers', 'fighter', 'genius', 'child'],
  'Katsuki Bakugo': ['has_powers', 'fighter', 'child', 'blonde'],
  'Ochaco Uraraka': ['has_powers', 'fighter', 'child'],
  'Shoto Todoroki': ['has_powers', 'fighter', 'child', 'white_hair'],
  'All Might': ['has_powers', 'fighter', 'blonde', 'bald'],
  'Tenya Iida': ['has_powers', 'fighter', 'child', 'glasses'],

  // ── Fullmetal Alchemist ─────────────────────
  'Edward Elric': ['magic', 'has_powers', 'fighter', 'genius', 'child', 'blonde', 'dies'],
  'Alphonse Elric': ['magic', 'has_powers', 'fighter', 'child', 'robot'],
  'Roy Mustang': ['magic', 'has_powers', 'fighter'],
  'Winry Rockbell': ['scientist', 'blonde'],
  'Riza Hawkeye': ['fighter'],
  'Envy': ['supernatural', 'villain', 'dies', 'has_powers'],

  // ── Bleach ──────────────────────────────────
  'Ichigo Kurosaki': ['has_powers', 'fighter', 'redhead', 'supernatural'],
  'Rukia Kuchiki': ['has_powers', 'fighter', 'supernatural'],
  'Orihime Inoue': ['has_powers', 'fighter'],
  'Uryu Ishida': ['has_powers', 'fighter', 'glasses'],
  'Kisuke Urahara': ['has_powers', 'genius', 'fighter'],
  'Renji Abarai': ['has_powers', 'fighter', 'redhead'],

  // ── Sailor Moon ─────────────────────────────
  'Sailor Moon': ['has_powers', 'magic', 'fighter', 'royalty', 'blonde', 'child'],
  'Sailor Mercury': ['has_powers', 'magic', 'fighter', 'genius', 'child'],
  'Sailor Mars': ['has_powers', 'magic', 'fighter', 'child'],
  'Sailor Jupiter': ['has_powers', 'magic', 'fighter', 'child'],
  'Sailor Venus': ['has_powers', 'magic', 'fighter', 'child', 'blonde'],
  'Tuxedo Mask': ['has_powers', 'royalty', 'dies'],

  // ── Cowboy Bebop ────────────────────────────
  'Spike Spiegel': ['fighter', 'dies'],
  'Jet Black': ['fighter', 'bald', 'beard', 'parent'],
  'Faye Valentine': ['fighter'],
  'Ed': ['genius', 'child'],
  'Ein': ['animal', 'genius'],

  // ── Neon Genesis Evangelion ─────────────────
  'Shinji Ikari': ['has_powers', 'child'],
  'Rei Ayanami': ['has_powers', 'supernatural', 'child', 'dies', 'white_hair'],
  'Asuka Langley': ['has_powers', 'child', 'redhead'],
  'Misato Katsuragi': ['parent'],
  'Gendo Ikari': ['villain', 'glasses', 'beard', 'parent'],

  // ── Hunter x Hunter ─────────────────────────
  'Gon Freecss': ['has_powers', 'fighter', 'child'],
  'Killua Zoldyck': ['has_powers', 'fighter', 'child', 'white_hair'],
  'Kurapika': ['has_powers', 'fighter', 'blonde'],
  'Leorio Paradinight': ['genius', 'scientist', 'glasses'],
  'Hisoka': ['fighter', 'villain', 'has_powers'],
  'Meruem': ['villain', 'genius', 'has_powers', 'dies', 'bald'],

  // ── Sword Art Online ────────────────────────
  'Kirito': ['has_powers', 'fighter'],
  'Asuna': ['has_powers', 'fighter'],
  'Sinon': ['fighter', 'has_powers'],
  'Leafa': ['fighter', 'has_powers', 'blonde'],
  'Klein': ['fighter', 'redhead'],
  'Yui': ['child', 'supernatural'],

  // ── Avatar: The Last Airbender ──────────────
  'Aang': ['has_powers', 'magic', 'fighter', 'bald', 'child', 'royalty'],
  'Katara': ['has_powers', 'magic', 'fighter', 'parent'],
  'Sokka': ['fighter'],
  'Zuko': ['has_powers', 'magic', 'fighter', 'royalty', 'villain', 'parent'],
  'Toph': ['has_powers', 'magic', 'fighter', 'child'],
  'Iroh': ['has_powers', 'magic', 'fighter', 'elderly', 'parent', 'genius', 'beard'],

  // ── Teen Titans ─────────────────────────────
  'Starfire': ['has_powers', 'fighter', 'royalty', 'redhead'],
  'Cyborg': ['has_powers', 'fighter', 'robot'],
  'Beast Boy': ['has_powers', 'fighter', 'green'],
  'Terra': ['has_powers', 'fighter', 'villain', 'blonde', 'dies'],

  // ── Gravity Falls ───────────────────────────
  'Dipper Pines': ['child', 'genius'],
  'Mabel Pines': ['child'],
  'Grunkle Stan': ['parent', 'glasses'],
  'Bill Cipher': ['villain', 'supernatural', 'has_powers', 'genius'],
  'Soos': [],
  'Wendy': ['redhead'],

  // ── Adventure Time ──────────────────────────
  'Finn': ['child', 'fighter', 'blonde'],
  'Jake': ['has_powers', 'animal', 'parent', 'supernatural'],
  'Princess Bubblegum': ['royalty', 'genius', 'scientist', 'parent'],
  'Marceline': ['supernatural', 'has_powers', 'dies'],
  'Ice King': ['villain', 'magic', 'white_hair', 'elderly', 'beard'],
  'Lumpy Space Princess': ['royalty', 'supernatural'],

  // ── Steven Universe ─────────────────────────
  'Steven Universe': ['has_powers', 'magic', 'fighter', 'child', 'royalty'],
  'Pearl': ['has_powers', 'magic', 'fighter', 'supernatural'],
  'Amethyst': ['has_powers', 'magic', 'fighter', 'supernatural'],
  'Garnet': ['has_powers', 'magic', 'fighter', 'supernatural', 'genius'],
  'Lapis Lazuli': ['has_powers', 'magic', 'supernatural', 'dies'],
  'Peridot': ['has_powers', 'magic', 'supernatural', 'villain', 'genius', 'glasses'],

  // ── Batman: The Animated Series ─────────────
  // 'Batman' already listed above
  // 'Robin' already listed
  'Catwoman': ['fighter', 'villain'],
  'Harley Quinn': ['villain'],
  'Two-Face': ['villain'],

  // ── Scooby-Doo ──────────────────────────────
  'Scooby-Doo': ['animal', 'supernatural'],
  'Shaggy Rogers': ['child', 'beard'],
  'Fred Jones': ['blonde'],
  'Daphne Blake': ['redhead'],
  'Velma Dinkley': ['genius', 'glasses'],

  // ── SpongeBob ───────────────────────────────
  'SpongeBob': ['supernatural', 'child'],
  'Patrick Star': ['supernatural', 'bald'],
  'Squidward Tentacles': ['supernatural'],
  'Sandy Cheeks': ['scientist', 'genius'],
  'Mr. Krabs': ['supernatural', 'villain', 'parent'],
  'Plankton': ['villain', 'genius', 'supernatural'],

  // ── Phineas and Ferb ────────────────────────
  'Phineas Flynn': ['genius', 'child'],
  'Ferb Fletcher': ['genius', 'child', 'green'],
  'Candace Flynn': ['child', 'redhead'],
  'Perry the Platypus': ['animal', 'fighter'],
  'Dr. Doofenshmirtz': ['scientist', 'villain', 'parent', 'genius'],

  // ── The Fairly OddParents ───────────────────
  'Timmy Turner': ['child', 'has_powers'],
  'Wanda': ['supernatural', 'has_powers', 'magic', 'redhead', 'parent'],
  'Cosmo': ['supernatural', 'has_powers', 'magic', 'parent', 'blonde'],
  'Poof': ['supernatural', 'child'],
  'Mr. Turner': ['parent'],
  'Vicky': ['villain', 'redhead'],

  // ── Transformers ────────────────────────────
  'Optimus Prime': ['robot', 'has_powers', 'fighter', 'royalty', 'dies'],
  'Bumblebee': ['robot', 'has_powers', 'fighter'],
  'Megatron': ['robot', 'villain', 'has_powers', 'fighter'],
  'Starscream': ['robot', 'villain', 'has_powers', 'fighter'],
  'Soundwave': ['robot', 'villain', 'has_powers'],
  'Ironhide': ['robot', 'fighter', 'dies'],

  // ── G.I. Joe ────────────────────────────────
  'Duke': ['fighter', 'blonde'],
  'Snake Eyes': ['fighter'],
  'Scarlett': ['fighter', 'redhead'],
  'Cobra Commander': ['villain'],
  'Destro': ['villain', 'bald'],
  'Storm Shadow': ['fighter', 'villain', 'white_hair'],

  // ── He-Man ──────────────────────────────────
  'He-Man': ['fighter', 'has_powers', 'blonde', 'royalty'],
  'Skeletor': ['villain', 'has_powers', 'magic', 'bald'],
  'Teela': ['fighter', 'redhead'],
  'Man-At-Arms': ['scientist', 'fighter', 'beard', 'parent'],
  'Orko': ['magic', 'supernatural'],
  'Battle Cat': ['animal', 'has_powers'],

  // ── ThunderCats ─────────────────────────────
  'Lion-O': ['royalty', 'fighter', 'has_powers', 'redhead'],
  'Tygra': ['fighter', 'has_powers'],
  'Cheetara': ['fighter', 'has_powers', 'blonde'],
  'Panthro': ['fighter', 'has_powers', 'bald', 'beard'],
  'Snarf': ['animal'],
  'Mumm-Ra': ['villain', 'supernatural', 'magic', 'bald', 'elderly'],

  // ── TMNT ────────────────────────────────────
  'Leonardo': ['fighter', 'has_powers', 'royalty', 'green'],
  'Michelangelo': ['fighter', 'has_powers', 'green'],
  'Donatello': ['fighter', 'has_powers', 'green', 'scientist', 'genius'],
  'Raphael': ['fighter', 'has_powers', 'green'],
  'Splinter': ['animal', 'fighter', 'elderly', 'parent', 'beard'],
  'Shredder': ['villain', 'fighter'],

  // ── DuckTales ───────────────────────────────
  'Scrooge McDuck': ['animal', 'elderly', 'parent', 'genius'],
  'Huey': ['animal', 'child'],
  'Dewey': ['animal', 'child'],
  'Louie': ['animal', 'child'],
  'Launchpad McQuack': ['animal'],
  'Darkwing Duck': ['animal', 'fighter'],

  // ── Inspector Gadget ────────────────────────
  'Inspector Gadget': ['robot', 'has_powers', 'parent'],
  'Brain': ['animal', 'genius'],
  'Dr. Claw': ['villain'],
  'Chief Quimby': [],

  // ── The Smurfs ──────────────────────────────
  'Papa Smurf': ['parent', 'magic', 'elderly', 'beard'],
  'Smurfette': ['blonde'],
  'Brainy Smurf': ['genius', 'glasses'],
  'Clumsy Smurf': [],
  'Gargamel': ['villain', 'magic', 'scientist', 'bald', 'elderly'],
  'Azrael': ['animal'],

  // ── Jem and the Holograms ───────────────────
  'Jem': ['has_powers'],
  'Kimber': ['redhead'],
  'Aja': ['has_powers'],
  'Shana': [],
  'Raya': [],
  'Pizzazz': ['villain', 'blonde'],

  // ── Care Bears ──────────────────────────────
  'Tenderheart Bear': ['has_powers', 'animal', 'parent'],
  'Cheer Bear': ['has_powers', 'animal'],
  'Funshine Bear': ['has_powers', 'animal', 'blonde'],
  'Grumpy Bear': ['has_powers', 'animal'],
  'Love-a-Lot Bear': ['has_powers', 'animal'],

  // ── Animaniacs ──────────────────────────────
  'Yakko Warner': ['child'],
  'Wakko Warner': ['child'],
  'Dot Warner': ['child'],
  'Pinky': ['supernatural'],
  'The Brain': ['genius', 'villain', 'scientist', 'supernatural'],
  'Hello Nurse': ['blonde'],

  // ── Rugrats ─────────────────────────────────
  'Tommy Pickles': ['child'],
  'Chuckie Finster': ['child', 'redhead', 'glasses'],
  'Phil DeVille': ['child', 'twin'],
  'Lil DeVille': ['child', 'twin'],
  'Angelica Pickles': ['child', 'villain', 'blonde'],
  'Susie Carmichael': ['child'],

  // ── Hey Arnold! ─────────────────────────────
  'Arnold': ['child', 'blonde'],
  'Helga Pataki': ['child', 'blonde'],
  'Gerald': ['child'],
  'Phoebe': ['child', 'glasses', 'genius'],
  'Sid': ['child'],
  'Stinky': ['child'],

  // ── Rocko's Modern Life ─────────────────────
  'Rocko': ['animal'],
  'Heffer Wolfe': ['animal'],
  'Filburt': ['animal', 'glasses'],
  'Dr. Hutchison': ['animal', 'scientist'],
  'Ed Bighead': ['animal', 'villain'],

  // ── The Powerpuff Girls ─────────────────────
  'Blossom': ['has_powers', 'magic', 'fighter', 'child', 'genius', 'redhead'],
  'Bubbles': ['has_powers', 'magic', 'fighter', 'child', 'blonde'],
  'Mojo Jojo': ['villain', 'genius', 'scientist', 'bald'],
  'Him': ['villain', 'supernatural', 'has_powers'],
  'Princess Morbucks': ['villain', 'royalty', 'has_powers', 'child'],

  // ── Dexter's Laboratory ─────────────────────
  'Dexter': ['genius', 'scientist', 'child', 'glasses'],
  'Dee Dee': ['child', 'blonde'],
  'Mom': ['parent'],
  'Dad': ['parent'],
  'Mandark': ['genius', 'villain', 'scientist', 'glasses', 'child'],

  // ── Johnny Bravo ────────────────────────────
  'Johnny Bravo': ['blonde', 'fighter'],
  'Suzy': ['child'],
  'Carl': ['genius', 'child', 'glasses'],
  'Little Suzy': ['child'],

  // ── Ed, Edd n Eddy ──────────────────────────
  'Edd': ['child', 'genius'],
  'Eddy': ['child', 'villain'],
  'Kevin': ['child'],
  'Nazz': ['child', 'blonde'],
  'Rolf': ['child'],

  // ── Courage the Cowardly Dog ────────────────
  'Courage': ['animal', 'child'],
  'Muriel Bagge': ['glasses', 'elderly', 'parent'],
  'Eustace Bagge': ['glasses', 'elderly', 'parent', 'villain', 'bald'],
  'Katz': ['villain', 'animal'],
  'Le Quack': ['villain', 'animal'],

  // ── Recess ──────────────────────────────────
  'T.J. Detweiler': ['child'],
  'Spinelli': ['child'],
  'Gretchen Grundler': ['child', 'genius', 'glasses'],
  'Mikey Blumberg': ['child'],
  'Vince LaSalle': ['child'],
  'Gus Griswald': ['child', 'glasses'],

  // ── Kim Possible ────────────────────────────
  'Kim Possible': ['has_powers', 'fighter', 'redhead'],
  'Ron Stoppable': [],
  'Wade': ['genius', 'child'],
  'Shego': ['villain', 'fighter', 'has_powers'],
  'Dr. Drakken': ['villain', 'scientist', 'genius'],
  'Rufus': ['animal', 'bald'],

  // ── Danny Phantom ───────────────────────────
  'Danny Fenton': ['has_powers', 'supernatural', 'fighter', 'child', 'white_hair'],
  'Sam Manson': ['child'],
  'Tucker Foley': ['child', 'genius'],
  'Jazz Fenton': ['child', 'genius', 'redhead'],
  'Vlad Masters': ['villain', 'supernatural', 'has_powers'],
  'Skulker': ['villain', 'robot', 'has_powers'],

  // ── Foster's Home ───────────────────────────
  'Mac': ['child', 'genius'],
  'Bloo': ['supernatural'],
  'Wilt': ['supernatural'],
  'Eduardo': ['supernatural'],
  'Coco': ['supernatural'],
  'Frankie Foster': ['redhead', 'parent'],

  // ── Codename Kids Next Door ─────────────────
  'Numbuh 1': ['child', 'bald', 'genius'],
  'Numbuh 2': ['child', 'genius', 'glasses'],
  'Numbuh 3': ['child'],
  'Numbuh 4': ['child', 'blonde', 'fighter'],
  'Numbuh 5': ['child'],
  'Father': ['villain', 'has_powers', 'parent'],

  // ── Samurai Jack ────────────────────────────
  'Samurai Jack': ['fighter', 'royalty'],
  'Aku': ['villain', 'supernatural', 'has_powers', 'magic'],
  'The Scotsman': ['fighter', 'redhead', 'beard'],
  'Ashi': ['fighter', 'supernatural', 'dies'],
  'The Daughters of Aku': ['fighter'],

  // ── The Boondocks ───────────────────────────
  'Huey Freeman': ['child', 'genius'],
  'Riley Freeman': ['child'],
  'Robert Freeman': ['parent', 'elderly'],
  'Tom DuBois': ['parent'],
  'Uncle Ruckus': ['villain'],

  // ── American Dragon ─────────────────────────
  'Jake Long': ['child', 'has_powers', 'supernatural'],
  'Trixie Carter': ['child'],
  'Arthur Spudinski': ['child'],
  'Grandpa': ['elderly', 'parent'],
  'Fu Dog': ['animal', 'supernatural', 'parent'],
  'Rose': ['child', 'villain', 'blonde'],

  // ── Regular Show ────────────────────────────
  'Mordecai': ['animal', 'supernatural'],
  'Rigby': ['animal', 'supernatural'],
  'Benson': ['supernatural'],
  'Pops': ['elderly'],
  'Skips': ['supernatural', 'has_powers', 'fighter', 'elderly', 'bald'],
  'Muscle Man': ['supernatural'],

  // ── Amazing World of Gumball ────────────────
  'Gumball Watterson': ['child', 'supernatural'],
  'Darwin Watterson': ['child', 'supernatural', 'animal'],
  'Anais Watterson': ['child', 'genius'],
  'Nicole Watterson': ['parent', 'fighter', 'supernatural'],
  'Richard Watterson': ['parent'],

  // ── Star vs. the Forces of Evil ─────────────
  'Star Butterfly': ['has_powers', 'magic', 'child', 'royalty', 'blonde'],
  'Marco Diaz': ['child', 'fighter'],
  'Tom Lucitor': ['child', 'supernatural', 'has_powers'],
  'Janna': ['child', 'magic'],
  'Buff Frog': ['animal', 'supernatural', 'parent'],
  'Toffee': ['villain', 'supernatural', 'dies'],

  // ── We Bare Bears ───────────────────────────
  'Grizzly Bear': ['animal', 'parent'],
  'Panda Bear': ['animal'],
  'Ice Bear': ['animal', 'fighter', 'genius'],
  'Chloe Park': ['child', 'genius'],
  'Charlie': ['supernatural'],

  // ── Miraculous Ladybug ──────────────────────
  'Marinette Dupain-Cheng': ['has_powers', 'magic', 'child'],
  'Adrien Agreste': ['has_powers', 'magic', 'child', 'blonde'],
  'Alya Césaire': ['child'],
  'Nino Lahiffe': ['child'],
  'Hawk Moth': ['villain', 'has_powers', 'magic', 'parent'],
  'Luka Couffaine': ['child'],

  // ── Voltron ─────────────────────────────────
  'Shiro': ['fighter', 'white_hair', 'child', 'genius'],
  'Keith': ['fighter', 'child'],
  'Lance': ['fighter', 'child'],
  'Pidge': ['child', 'genius', 'glasses'],
  'Hunk': ['fighter'],
  'Princess Allura': ['royalty', 'has_powers', 'dies'],

  // ── She-Ra ──────────────────────────────────
  'Adora': ['has_powers', 'fighter', 'royalty', 'blonde'],
  'Catra': ['has_powers', 'fighter', 'villain'],
  'Glimmer': ['has_powers', 'magic', 'royalty', 'child'],
  'Bow': ['fighter', 'child'],
  'Scorpia': ['villain', 'has_powers', 'fighter'],
  'Entrapta': ['genius', 'scientist', 'villain', 'blonde'],

  // ── The Loud House ──────────────────────────
  'Lincoln Loud': ['child', 'white_hair'],
  'Lori Loud': ['child', 'blonde'],
  'Leni Loud': ['child', 'blonde'],
  'Luna Loud': ['child'],
  'Luan Loud': ['child'],
  'Lana Loud': ['child'],

  // ── Amphibia ────────────────────────────────
  'Anne Boonchuy': ['child', 'fighter'],
  'Sprig Plantar': ['child', 'animal'],
  'Polly Plantar': ['child', 'animal'],
  'Hop Pop Plantar': ['animal', 'parent', 'elderly'],
  'Marcy Wu': ['child', 'genius', 'dies'],
  'Sasha Waybright': ['child', 'villain', 'fighter', 'blonde'],

  // ── The Owl House ───────────────────────────
  'Luz Noceda': ['child', 'magic', 'has_powers'],
  'Eda Clawthorne': ['magic', 'has_powers', 'white_hair', 'parent'],
  'King': ['child', 'supernatural'],
  'Amity Blight': ['child', 'magic', 'has_powers'],
  'Willow Park': ['child', 'magic', 'has_powers', 'glasses'],
  'Gus Porter': ['child', 'magic', 'has_powers'],

  // ── Arcane ──────────────────────────────────
  'Jayce': ['genius', 'scientist'],
  'Viktor': ['genius', 'scientist', 'glasses'],
  'Silco': ['villain', 'parent', 'dies'],
  'Caitlyn': ['royalty', 'blonde'],

  // ── Blue Eye Samurai ────────────────────────
  'Mizu': ['fighter'],
  'Taigen': ['fighter', 'blonde'],
  'Akemi': ['royalty'],
  'Ringo': ['child', 'glasses'],
  'Fowler': ['villain'],

  // ── Hilda ───────────────────────────────────
  'Hilda': ['child'],
  'Johanna': ['parent'],
  'Frida': ['child'],
  'David': ['child'],
  'Alfur': ['supernatural'],
  'Tontu': ['supernatural'],

  // ── Dragon Ball (80s) ───────────────────────
  'Goku (kid)': ['child', 'has_powers', 'fighter'],
  'Yamcha': ['fighter'],
  'Krillin': ['fighter', 'bald', 'has_powers'],
  'Tien': ['fighter', 'has_powers', 'bald'],
  'Master Roshi': ['fighter', 'has_powers', 'elderly', 'bald', 'beard', 'genius', 'glasses'],

  // ── Fist of the North Star ──────────────────
  'Kenshiro': ['fighter', 'has_powers'],
  'Raoh': ['fighter', 'has_powers', 'villain'],
  'Toki': ['fighter', 'has_powers'],
  'Jagi': ['fighter', 'villain', 'dies'],
  'Rei': ['fighter', 'dies', 'blonde'],
  'Mamiya': ['fighter', 'redhead'],

  // ── Mobile Suit Gundam ──────────────────────
  'Amuro Ray': ['child', 'has_powers', 'fighter'],
  'Char Aznable': ['villain', 'has_powers', 'fighter', 'blonde'],
  'Bright Noa': ['parent', 'fighter'],
  'Sayla Mass': ['blonde'],
  'Lalah Sune': ['has_powers', 'supernatural', 'dies'],

  // ── Captain Tsubasa ─────────────────────────
  'Tsubasa Ozora': ['child', 'genius'],
  'Genzo Wakabayashi': ['child'],
  'Kojiro Hyuga': ['child'],
  'Roberto Hongo': ['parent', 'blonde'],
  'Taro Misaki': ['child', 'blonde'],

  // ── Macross ─────────────────────────────────
  'Hikaru Ichijyo': ['fighter', 'child'],
  'Lynn Minmay': ['child'],
  'Roy Focker': ['fighter', 'blonde', 'dies'],
  'Misa Hayase': [],
  'Maximilian Jenius': ['fighter', 'blonde'],

  // ── Rurouni Kenshin ─────────────────────────
  'Kenshin Himura': ['fighter', 'has_powers', 'redhead'],
  'Kaoru Kamiya': ['fighter', 'parent'],
  'Yahiko Myojin': ['child', 'fighter'],
  'Sanosuke Sagara': ['fighter'],
  'Aoshi Shinomori': ['fighter', 'villain', 'white_hair'],
  'Shishio Makoto': ['villain', 'fighter', 'dies'],

  // ── Yu Yu Hakusho ───────────────────────────
  'Yusuke Urameshi': ['has_powers', 'fighter', 'child', 'supernatural', 'dies'],
  'Kazuma Kuwabara': ['has_powers', 'fighter', 'child'],
  'Hiei': ['has_powers', 'fighter', 'child', 'supernatural', 'white_hair'],
  'Kurama': ['has_powers', 'magic', 'fighter', 'redhead', 'supernatural'],
  'Koenma': ['child', 'royalty'],
  'Keiko Yukimura': ['child'],

  // ── Inuyasha ────────────────────────────────
  'Inuyasha': ['has_powers', 'fighter', 'supernatural', 'white_hair'],
  'Kagome Higurashi': ['has_powers', 'magic', 'child'],
  'Miroku': ['has_powers', 'magic', 'fighter', 'parent'],
  'Sango': ['fighter', 'parent'],
  'Shippo': ['child', 'supernatural', 'has_powers'],
  'Sesshomaru': ['villain', 'supernatural', 'has_powers', 'fighter', 'white_hair'],

  // ── Cardcaptor Sakura ───────────────────────
  'Sakura Kinomoto': ['has_powers', 'magic', 'child', 'blonde'],
  'Syaoran Li': ['has_powers', 'magic', 'child', 'fighter'],
  'Tomoyo Daidouji': ['child'],
  'Kero': ['animal', 'has_powers'],
  'Yukito Tsukishiro': ['supernatural', 'white_hair'],
  'Meiling Li': ['child', 'fighter'],

  // ── Digimon ─────────────────────────────────
  'Tai Kamiya': ['child'],
  'Agumon': ['animal', 'child'],
  'Matt Ishida': ['child', 'blonde'],
  'Gabumon': ['animal', 'child'],
  'Sora Takenouchi': ['child', 'redhead'],
  'Izzy Izumi': ['child', 'genius'],

  // ── Yu-Gi-Oh! ───────────────────────────────
  'Yugi Muto': ['child', 'has_powers', 'royalty'],
  'Seto Kaiba': ['child', 'genius', 'blonde'],
  'Joey Wheeler': ['child', 'blonde'],
  'Téa Gardner': ['child'],
  'Tristan Taylor': ['child'],
  'Yami Yugi': ['supernatural', 'royalty', 'has_powers'],

  // ── Trigun ──────────────────────────────────
  'Vash the Stampede': ['has_powers', 'fighter', 'blonde', 'dies'],
  'Meryl Strife': [],
  'Milly Thompson': ['blonde'],
  'Nicholas D. Wolfwood': ['fighter', 'dies', 'parent'],
  'Knives': ['villain', 'has_powers', 'blonde'],

  // ── Outlaw Star ─────────────────────────────
  'Gene Starwind': ['fighter', 'redhead'],
  'Jim Hawking': ['child', 'genius'],
  'Melfina': ['supernatural', 'robot'],
  'Aisha Clan-Clan': ['fighter', 'has_powers', 'supernatural'],
  'Suzuka': ['fighter'],
  'Hot Ice Hilda': ['dies', 'fighter', 'redhead'],

  // ── Revolutionary Girl Utena ────────────────
  'Utena Tenjou': ['child', 'fighter', 'royalty'],
  'Anthy Himemiya': ['has_powers', 'magic', 'supernatural'],
  'Touga Kiryuu': ['fighter', 'redhead'],
  'Saionji Kyouichi': ['fighter', 'villain'],
  'Juri Arisugawa': ['fighter', 'redhead'],

  // ── Code Geass ──────────────────────────────
  'Lelouch vi Britannia': ['genius', 'villain', 'royalty', 'dies', 'has_powers'],
  'C.C.': ['supernatural', 'has_powers', 'white_hair'],
  'Kallen Stadtfeld': ['fighter', 'has_powers', 'redhead'],
  'Suzaku Kururugi': ['fighter', 'has_powers'],
  'Nunnally vi Britannia': ['royalty', 'child'],
  'Jeremiah Gottwald': ['villain', 'fighter', 'bald'],

  // ── Gurren Lagann ───────────────────────────
  'Simon': ['child', 'has_powers', 'fighter'],
  'Kamina': ['fighter', 'dies', 'has_powers'],
  'Yoko Littner': ['fighter', 'redhead'],
  'Nia Teppelin': ['supernatural', 'has_powers', 'blonde', 'royalty', 'dies'],
  'Viral': ['villain', 'supernatural', 'animal'],
  'Lord Genome': ['villain', 'dies', 'bald', 'beard', 'parent'],

  // ── Ouran Host Club ─────────────────────────
  'Haruhi Fujioka': ['child', 'genius'],
  'Tamaki Suoh': ['child', 'royalty', 'blonde'],
  'Kyoya Ootori': ['child', 'genius', 'glasses'],
  'Hikaru Hitachiin': ['child', 'redhead', 'twin'],
  'Kaoru Hitachiin': ['child', 'redhead', 'twin'],
  'Mori Senpai': ['child', 'fighter'],

  // ── Haruhi Suzumiya ─────────────────────────
  'Haruhi Suzumiya': ['child', 'has_powers'],
  'Kyon': ['child'],
  'Yuki Nagato': ['child', 'supernatural', 'has_powers', 'genius'],
  'Mikuru Asahina': ['child', 'supernatural'],
  'Itsuki Koizumi': ['child', 'has_powers', 'supernatural'],

  // ── Soul Eater ──────────────────────────────
  'Maka Albarn': ['child', 'has_powers', 'fighter', 'blonde'],
  'Soul Evans': ['child', 'has_powers', 'fighter', 'white_hair'],
  'Death the Kid': ['child', 'has_powers', 'fighter', 'royalty', 'white_hair'],
  'Liz Thompson': ['child', 'has_powers', 'blonde', 'twin'],
  'Patty Thompson': ['child', 'has_powers', 'blonde', 'twin'],
  'Black Star': ['child', 'has_powers', 'fighter'],

  // ── Fairy Tail ──────────────────────────────
  'Natsu Dragneel': ['has_powers', 'magic', 'fighter', 'child'],
  'Lucy Heartfilia': ['has_powers', 'magic', 'fighter', 'child', 'blonde'],
  'Erza Scarlet': ['has_powers', 'magic', 'fighter', 'royalty', 'redhead'],
  'Gray Fullbuster': ['has_powers', 'magic', 'fighter', 'child'],
  'Happy': ['animal', 'has_powers', 'supernatural'],
  'Wendy Marvell': ['has_powers', 'magic', 'fighter', 'child'],

  // ── Black Lagoon ────────────────────────────
  'Rock': [],
  'Revy': ['fighter'],
  'Dutch': ['bald', 'fighter'],
  'Benny': ['genius', 'blonde'],
  'Balalaika': ['villain', 'blonde', 'fighter'],
  'Roberta': ['villain', 'fighter', 'glasses'],

  // ── Elfen Lied ──────────────────────────────
  'Lucy': ['has_powers', 'villain', 'child', 'redhead', 'dies'],
  'Kouta': ['child'],
  'Yuka': ['child'],
  'Nana': ['has_powers', 'child', 'redhead'],
  'Mayu': ['child'],

  // ── Toradora ────────────────────────────────
  'Ryuji Takasu': ['child'],
  'Taiga Aisaka': ['child', 'fighter', 'blonde'],
  'Minori Kushieda': ['child', 'redhead'],
  'Yusaku Kitamura': ['child', 'glasses'],
  'Ami Kawashima': ['child', 'blonde'],

  // ── Clannad ─────────────────────────────────
  'Tomoya Okazaki': ['child', 'parent', 'dies'],
  'Nagisa Furukawa': ['child', 'parent', 'dies'],
  'Kyou Fujibayashi': ['child', 'redhead', 'twin'],
  'Ryou Fujibayashi': ['child', 'redhead', 'twin'],
  'Kotomi Ichinose': ['child', 'genius', 'glasses'],
  'Fuko Ibuki': ['child', 'supernatural', 'dies'],

  // ── One Punch Man ───────────────────────────
  'Saitama': ['has_powers', 'fighter', 'bald'],
  'Genos': ['robot', 'has_powers', 'fighter', 'blonde'],
  "Speed-o'-Sound Sonic": ['fighter'],
  'Mumen Rider': ['fighter'],
  'Tatsumaki': ['has_powers', 'magic', 'fighter', 'child'],
  'Bang': ['fighter', 'elderly', 'white_hair', 'genius'],

  // ── Mob Psycho 100 ──────────────────────────
  'Shigeo Kageyama': ['has_powers', 'child'],
  'Reigen Arataka': ['genius'],
  'Dimple': ['supernatural', 'has_powers'],
  'Ritsu Kageyama': ['child', 'has_powers'],
  'Teruki Hanazawa': ['has_powers', 'child', 'blonde'],

  // ── Re:Zero ─────────────────────────────────
  'Subaru Natsuki': ['child', 'has_powers'],
  'Emilia': ['has_powers', 'magic', 'white_hair', 'royalty'],
  'Ram': ['supernatural', 'has_powers', 'twin'],
  'Beatrice': ['supernatural', 'has_powers', 'magic', 'blonde'],
  'Roswaal': ['magic', 'has_powers', 'parent', 'villain'],

  // ── Konosuba ────────────────────────────────
  'Kazuma Satou': ['child'],
  'Aqua': ['supernatural', 'has_powers', 'magic'],
  'Megumin': ['magic', 'has_powers', 'child', 'redhead'],
  'Darkness': ['fighter', 'has_powers', 'royalty', 'blonde'],
  'Wiz': ['magic', 'has_powers', 'supernatural'],
  'Vanir': ['supernatural', 'has_powers'],

  // ── No Game No Life ─────────────────────────
  'Sora': ['child', 'genius'],
  'Jibril': ['supernatural', 'has_powers', 'white_hair'],
  'Stephanie Dola': ['child', 'royalty', 'redhead'],
  'Fil Nilvalen': ['supernatural', 'has_powers'],

  // ── Kill la Kill ────────────────────────────
  'Ryuko Matoi': ['has_powers', 'fighter', 'child'],
  'Satsuki Kiryuin': ['has_powers', 'fighter', 'child', 'villain'],
  'Mako Mankanshoku': ['child'],
  'Nui Harime': ['villain', 'has_powers', 'blonde', 'dies'],
  'Ragyo Kiryuin': ['villain', 'has_powers', 'white_hair', 'parent'],
  'Senketsu': ['supernatural'],

  // ── Puella Magi Madoka Magica ───────────────
  'Madoka Kaname': ['has_powers', 'magic', 'child', 'supernatural', 'dies'],
  'Homura Akemi': ['has_powers', 'magic', 'child', 'glasses', 'villain'],
  'Sayaka Miki': ['has_powers', 'magic', 'child', 'dies'],
  'Mami Tomoe': ['has_powers', 'magic', 'child', 'blonde', 'dies'],
  'Kyoko Sakura': ['has_powers', 'magic', 'child', 'redhead', 'dies'],
  'Kyubey': ['supernatural', 'animal', 'villain'],

  // ── Overlord ────────────────────────────────
  'Ainz Ooal Gown': ['villain', 'magic', 'has_powers', 'supernatural', 'genius', 'bald', 'royalty'],
  'Albedo': ['supernatural', 'has_powers', 'magic', 'villain', 'white_hair'],
  'Shalltear Bloodfallen': ['supernatural', 'has_powers', 'villain', 'blonde', 'dies'],
  'Demiurge': ['supernatural', 'has_powers', 'villain'],
  'Cocytus': ['supernatural', 'has_powers'],
  'Narberal Gamma': ['supernatural', 'has_powers'],

  // ── Reincarnated as a Slime ─────────────────
  'Rimuru Tempest': ['has_powers', 'magic', 'genius', 'royalty', 'dies', 'white_hair'],
  'Shion': ['has_powers', 'fighter', 'dies'],
  'Benimaru': ['has_powers', 'fighter'],
  'Shuna': ['has_powers', 'magic'],
  'Milim Nava': ['royalty', 'has_powers', 'magic', 'blonde', 'child'],
  'Diablo': ['supernatural', 'has_powers', 'villain'],

  // ── Haikyuu!! ───────────────────────────────
  'Shoyo Hinata': ['child', 'redhead'],
  'Tobio Kageyama': ['child'],
  'Daichi Sawamura': ['child'],
  'Koshi Sugawara': ['child'],
  'Asahi Azumane': ['child', 'beard'],
  'Kei Tsukishima': ['child', 'glasses', 'blonde'],

  // ── Psycho-Pass ─────────────────────────────
  'Akane Tsunemori': ['genius'],
  'Shinya Kogami': ['fighter'],
  'Nobuchika Ginoza': ['glasses'],
  'Shogo Makishima': ['villain', 'genius', 'white_hair'],
  'Tomomi Masaoka': ['parent', 'beard'],

  // ── Vinland Saga ────────────────────────────
  'Thorfinn': ['child', 'fighter'],
  'Askeladd': ['villain', 'fighter', 'dies', 'blonde', 'beard'],
  'Bjorn': ['fighter', 'beard', 'dies'],
  'Thors': ['fighter', 'dies', 'parent', 'beard'],
  'Canute': ['child', 'royalty', 'blonde'],
  'Floki': ['villain', 'beard'],

  // ── The Promised Neverland ──────────────────
  'Emma': ['child', 'genius'],
  'Norman': ['child', 'genius', 'white_hair'],
  'Ray': ['child', 'genius'],
  'Isabella': ['villain', 'parent'],
  'Phil': ['child'],
  'Gilda': ['child', 'glasses'],

  // ── Dr. Stone ───────────────────────────────
  'Senku Ishigami': ['genius', 'scientist', 'child', 'white_hair'],
  'Taiju Oki': ['child'],
  'Chrome': ['child', 'scientist'],
  'Gen Asagiri': ['child', 'genius'],
  'Kohaku': ['child', 'fighter', 'blonde'],
  'Tsukasa Shishio': ['villain', 'fighter'],

  // ── JoJo's Bizarre Adventure ────────────────
  "Jonathan Joestar": ['fighter', 'has_powers', 'dies'],
  'Joseph Joestar': ['fighter', 'has_powers', 'genius'],
  'Jotaro Kujo': ['fighter', 'has_powers', 'parent'],
  'Dio Brando': ['villain', 'has_powers', 'supernatural', 'blonde', 'dies'],
  'Giorno Giovanna': ['has_powers', 'villain', 'blonde'],
  'Yoshikage Kira': ['villain', 'has_powers'],

  // ── Solo Leveling ───────────────────────────
  'Sung Jinwoo': ['has_powers', 'fighter'],
  'Cha Hae-In': ['fighter', 'has_powers'],
  'Go Gunhee': ['elderly', 'parent'],
  'Yoo Jinho': ['child'],
  'Thomas Andre': ['fighter', 'has_powers'],
  'Liu Zhiwei': ['villain', 'dies'],

  // ── Jujutsu Kaisen ──────────────────────────
  'Yuji Itadori': ['has_powers', 'fighter', 'child', 'supernatural'],
  'Megumi Fushiguro': ['has_powers', 'magic', 'fighter', 'child'],
  'Nobara Kugisaki': ['has_powers', 'magic', 'fighter', 'child', 'dies'],
  'Satoru Gojo': ['has_powers', 'magic', 'fighter', 'genius', 'white_hair'],
  'Ryomen Sukuna': ['villain', 'has_powers', 'magic', 'supernatural'],
  'Aoi Todo': ['fighter', 'has_powers', 'child'],

  // ── Chainsaw Man ────────────────────────────
  'Denji': ['has_powers', 'fighter', 'child', 'supernatural', 'blonde'],
  'Power': ['supernatural', 'has_powers', 'fighter', 'child', 'blonde'],
  'Aki Hayakawa': ['fighter', 'has_powers', 'dies'],
  'Makima': ['villain', 'supernatural', 'has_powers', 'dies'],
  'Pochita': ['animal', 'supernatural', 'dies'],
  'Himeno': ['dies'],

  // ── Spy x Family ────────────────────────────
  'Loid Forger': ['genius', 'parent', 'fighter', 'blonde'],
  'Yor Forger': ['fighter', 'parent', 'has_powers'],
  'Anya Forger': ['child', 'has_powers', 'supernatural'],
  'Franky Franklin': ['genius'],
  'Yuri Briar': [],
  'Sylvia Sherwood': [],

  // ── Oshi no Ko ──────────────────────────────
  'Aqua Hoshino': ['child', 'supernatural', 'genius'],
  'Ruby Hoshino': ['child', 'supernatural'],
  'Ai Hoshino': ['parent', 'dies'],
  'Kana Arima': ['child', 'blonde'],
  'Mem-cho': ['child'],
  'Akane Kurokawa': ['child'],

  // ── Blue Lock ───────────────────────────────
  'Yoichi Isagi': ['child'],
  'Meguru Bachira': ['child'],
  'Rensuke Kunigami': ['child', 'blonde'],
  'Hyoma Chigiri': ['child', 'redhead'],
  'Seishiro Nagi': ['child'],
  'Reo Mikage': ['child'],

  // ── Frieren ─────────────────────────────────
  "Frieren": ['magic', 'has_powers', 'supernatural', 'white_hair', 'genius', 'elderly'],
  'Fern': ['magic', 'has_powers', 'child'],
  'Stark': ['fighter', 'has_powers', 'child', 'redhead'],
  'Himmel': ['dies', 'fighter', 'blonde', 'royalty'],
  'Eisen': ['fighter', 'has_powers', 'beard', 'elderly'],
  'Heiter': ['magic', 'has_powers', 'dies', 'elderly', 'beard', 'parent'],

  // ── Bocchi the Rock ─────────────────────────
  'Hitori Gotoh': ['child', 'blonde'],
  'Nijika Ijichi': ['child', 'blonde'],
  'Ryo Yamada': ['child'],
  'Ikuyo Kita': ['child', 'redhead'],
  'Seika Ijichi': [],

  // ── Mushoku Tensei ──────────────────────────
  'Rudeus Greyrat': ['child', 'has_powers', 'magic', 'glasses', 'genius', 'parent'],
  'Roxy Migurdia': ['has_powers', 'magic', 'supernatural', 'white_hair'],
  'Sylphiette': ['has_powers', 'magic', 'white_hair'],
  'Eris Boreas Greyrat': ['child', 'fighter', 'royalty', 'redhead'],
  'Paul Greyrat': ['fighter', 'parent', 'beard'],

  // ── Fionna and Cake ─────────────────────────
  'Fionna': ['child', 'fighter', 'blonde'],
  'Cake': ['animal', 'has_powers'],
  'Prince Gumball': ['royalty', 'blonde'],
  'Marshall Lee': ['supernatural', 'has_powers'],
  'Ice Queen': ['magic', 'has_powers', 'villain', 'white_hair'],
  'Simon Petrikov': ['glasses', 'parent', 'elderly'],

  // ── Grim Adventures of Billy & Mandy ────────
  'Grim': ['supernatural', 'has_powers', 'dies'],
  'Billy': ['child'],
  'Mandy': ['child', 'villain', 'blonde'],
  'Irwin': ['child', 'glasses'],
  'Nergal': ['villain', 'supernatural', 'has_powers', 'parent'],
  'Hoss Delgado': ['fighter'],

  // ── Black Clover ────────────────────────────
  'Asta': ['child', 'has_powers', 'fighter', 'blonde'],
  'Yuno': ['child', 'has_powers', 'magic', 'fighter'],
  'Noelle Silva': ['child', 'has_powers', 'magic', 'royalty', 'redhead'],
  'Yami Sukehiro': ['fighter', 'has_powers', 'parent', 'beard'],
  'Magna Swing': ['child', 'has_powers', 'fighter', 'redhead'],
  'Luck Voltia': ['child', 'has_powers', 'fighter', 'blonde'],
};

async function main() {
  const characters = await prisma.character.findMany({ select: { id: true, name: true } });

  let updated = 0;
  let skipped = 0;

  for (const char of characters) {
    const traits = traitMap[char.name];
    if (traits === undefined) {
      skipped++;
      continue;
    }
    await prisma.character.update({
      where: { id: char.id },
      data: { traits: JSON.stringify(traits) },
    });
    updated++;
  }

  console.log(`Updated ${updated} characters with traits.`);
  console.log(`Skipped ${skipped} characters (not in trait map).`);

  // Stats per trait
  const all = await prisma.character.findMany({ select: { name: true, traits: true } });
  const counts: Record<string, number> = {};
  for (const c of all) {
    const t: string[] = JSON.parse(c.traits);
    for (const trait of t) {
      counts[trait] = (counts[trait] ?? 0) + 1;
    }
  }
  console.log('\nTrait counts:');
  Object.entries(counts).sort(([,a],[,b]) => b - a).forEach(([t,n]) => console.log(`  ${t}: ${n}`));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
