import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Trait keys:
// bald, glasses, beard, blonde, redhead, white_hair, green, scar
// animal, robot, supernatural
// villain, antihero, redemption_arc, orphan, parent, royalty, dies, twin
// has_powers, magic, genius, fighter, scientist, child, elderly
// mentor, detective, spy, sidekick, comic_relief, musician, has_siblings

const traitMap: Record<string, string[]> = {
  // ── The Office ──────────────────────────────
  'Michael Scott': ['parent'],
  'Dwight Schrute': ['fighter'],
  'Jim Halpert': [],
  'Pam Beesly': ['parent'],
  'Kevin Malone': ['comic_relief'],
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
  'Bart Simpson': ['child', 'has_siblings', 'antihero'],
  'Lisa Simpson': ['child', 'genius', 'has_siblings', 'musician'],
  'Ned Flanders': ['parent', 'beard'],
  'Mr. Burns': ['villain', 'elderly', 'bald'],

  // ── South Park ──────────────────────────────
  'Eric Cartman': ['child', 'villain'],
  'Stan Marsh': ['child'],
  'Kyle Broflovski': ['child'],
  'Kenny McCormick': ['child', 'dies'],
  'Randy Marsh': ['parent'],
  'Butters Stotch': ['child', 'comic_relief'],

  // ── Rick and Morty ──────────────────────────
  'Rick Sanchez': ['genius', 'scientist', 'white_hair', 'parent'],
  'Morty Smith': ['child'],
  'Beth Smith': ['parent', 'scientist'],
  'Jerry Smith': ['parent'],
  'Summer Smith': ['child'],
  'Mr. Meeseeks': ['supernatural', 'dies'],

  // ── Brooklyn Nine-Nine ──────────────────────
  'Jake Peralta': ['detective'],
  'Amy Santiago': ['genius', 'parent', 'detective'],
  'Raymond Holt': ['detective'],
  'Rosa Diaz': ['detective'],
  'Charles Boyle': ['detective'],
  'Gina Linetti': ['detective'],

  // ── Parks and Recreation ────────────────────
  'Leslie Knope': ['genius'],
  'Ron Swanson': ['beard', 'parent'],
  'Ben Wyatt': ['glasses'],
  'April Ludgate': [],
  'Andy Dwyer': ['comic_relief'],
  'Tom Haverford': [],

  // ── Arrested Development ────────────────────
  'Michael Bluth': ['parent', 'has_siblings'],
  'George Michael Bluth': ['child'],
  'Tobias Fünke': ['scientist', 'comic_relief'],
  'Buster Bluth': ['has_siblings', 'comic_relief'],
  'Lucille Bluth': ['parent', 'villain'],
  'Gob Bluth': ['magic', 'has_siblings', 'comic_relief'],

  // ── Seinfeld ────────────────────────────────
  'Jerry Seinfeld': [],
  'George Costanza': ['bald', 'comic_relief'],
  'Cosmo Kramer': ['comic_relief'],
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
  'Jimmy McNulty': ['detective'],
  'Omar Little': ['fighter'],
  'Stringer Bell': ['villain', 'genius'],
  'Bunk Moreland': ['detective'],
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
  'Barney Stinson': ['genius', 'parent', 'comic_relief'],
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
  'Dexter Morgan': ['villain', 'genius', 'scientist', 'parent', 'antihero', 'detective'],
  'Debra Morgan': ['dies', 'detective'],
  'Angel Batista': ['parent', 'detective'],
  'James Doakes': ['dies', 'detective'],
  'Harrison Morgan': ['child'],

  // ── Harry Potter ────────────────────────────
  'Harry Potter': ['has_powers', 'magic', 'glasses', 'dies', 'parent', 'orphan', 'scar'],
  'Hermione Granger': ['genius', 'magic', 'has_powers', 'parent'],
  'Ron Weasley': ['magic', 'has_powers', 'redhead', 'parent', 'sidekick', 'has_siblings'],
  'Albus Dumbledore': ['magic', 'has_powers', 'genius', 'beard', 'white_hair', 'elderly', 'dies', 'mentor'],
  'Severus Snape': ['magic', 'has_powers', 'dies', 'redemption_arc'],
  'Draco Malfoy': ['magic', 'has_powers', 'blonde', 'villain', 'royalty', 'redemption_arc'],

  // ── Star Wars ───────────────────────────────
  'Luke Skywalker': ['has_powers', 'fighter', 'dies', 'orphan'],
  'Darth Vader': ['villain', 'has_powers', 'fighter', 'parent', 'bald', 'dies'],
  'Han Solo': ['fighter', 'parent', 'dies'],
  'Princess Leia': ['royalty', 'parent', 'dies', 'orphan'],
  'Obi-Wan Kenobi': ['has_powers', 'fighter', 'genius', 'dies', 'beard', 'mentor'],
  'Yoda': ['has_powers', 'fighter', 'genius', 'elderly', 'green', 'dies', 'mentor'],

  // ── Lord of the Rings ───────────────────────
  'Frodo Baggins': ['orphan'],
  'Gandalf': ['magic', 'has_powers', 'genius', 'beard', 'white_hair', 'elderly', 'dies', 'mentor'],
  'Aragorn': ['royalty', 'fighter', 'parent', 'beard'],
  'Legolas': ['fighter', 'has_powers', 'blonde', 'royalty'],
  'Gimli': ['fighter', 'beard'],
  'Samwise Gamgee': ['parent', 'sidekick'],

  // ── The Avengers ────────────────────────────
  'Iron Man': ['genius', 'scientist', 'has_powers', 'parent', 'dies'],
  'Captain America': ['has_powers', 'fighter'],
  'Thor': ['has_powers', 'royalty', 'parent', 'blonde', 'beard', 'dies', 'has_siblings'],
  'Black Widow': ['fighter', 'dies', 'spy'],
  'Hulk': ['has_powers', 'scientist', 'genius', 'green'],
  'Hawkeye': ['fighter', 'parent', 'spy'],

  // ── The Dark Knight ─────────────────────────
  'Batman': ['fighter', 'genius', 'orphan'],
  'The Joker': ['villain', 'genius'],
  'Harvey Dent': ['villain', 'dies'],
  'Alfred Pennyworth': ['elderly', 'mentor'],
  'Lucius Fox': ['genius', 'scientist'],
  'Commissioner Gordon': ['beard', 'glasses'],

  // ── Jurassic Park ───────────────────────────
  'Alan Grant': ['scientist', 'glasses'],
  'Ellie Sattler': ['scientist', 'blonde'],
  'Ian Malcolm': ['scientist', 'genius', 'glasses'],
  'John Hammond': ['elderly', 'genius'],
  'Dennis Nedry': ['villain'],

  // ── Indiana Jones ───────────────────────────
  'Indiana Jones': ['scientist', 'genius', 'fighter', 'mentor'],
  'Marion Ravenwood': [],
  'Sallah': ['beard'],
  'Short Round': ['child'],
  'Henry Jones Sr.': ['elderly', 'scientist', 'beard', 'glasses', 'parent'],

  // ── Shrek ───────────────────────────────────
  'Shrek': ['green', 'parent'],
  'Fiona': ['royalty', 'parent', 'fighter'],
  'Donkey': ['animal', 'parent', 'sidekick', 'comic_relief'],
  'Puss in Boots': ['animal', 'fighter'],
  'Lord Farquaad': ['villain', 'royalty', 'bald'],
  'Gingy': [],

  // ── The Matrix ──────────────────────────────
  'Neo': ['has_powers', 'fighter', 'dies'],
  'Morpheus': ['fighter', 'bald', 'mentor'],
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
  'Elsa': ['has_powers', 'magic', 'royalty', 'white_hair', 'orphan', 'has_siblings'],
  'Anna': ['royalty', 'redhead', 'orphan', 'has_siblings'],
  'Olaf': ['supernatural', 'dies'],
  'Kristoff': ['blonde', 'orphan'],
  'Hans': ['villain', 'royalty'],
  'Sven': ['animal'],

  // ── The Lion King ───────────────────────────
  'Simba': ['animal', 'royalty', 'parent', 'orphan'],
  'Mufasa': ['animal', 'royalty', 'parent', 'dies'],
  'Scar': ['animal', 'villain', 'royalty', 'dies', 'scar'],
  'Nala': ['animal', 'royalty', 'parent'],
  'Timon': ['animal', 'sidekick', 'comic_relief'],
  'Pumbaa': ['animal', 'sidekick', 'comic_relief'],

  // ── Finding Nemo ────────────────────────────
  'Nemo': ['animal', 'child'],
  'Marlin': ['animal', 'parent'],
  'Dory': ['animal'],
  'Gill': ['animal'],
  'Crush': ['animal', 'parent'],
  'Darla': ['child'],

  // ── Back to the Future ──────────────────────
  'Marty McFly': ['child'],
  'Doc Brown': ['genius', 'scientist', 'white_hair', 'elderly', 'parent', 'mentor'],
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
  'Peter Parker': ['has_powers', 'genius', 'scientist', 'glasses', 'dies', 'orphan'],
  'Mary Jane Watson': ['redhead'],
  'Harry Osborn': ['dies', 'villain'],
  'Norman Osborn': ['villain', 'dies', 'genius', 'scientist'],
  'J. Jonah Jameson': [],

  // ── Super Mario Bros ────────────────────────
  'Mario': ['fighter', 'has_powers', 'beard', 'has_siblings'],
  'Luigi': ['fighter', 'has_powers', 'beard', 'has_siblings'],
  'Princess Peach': ['royalty', 'blonde'],
  'Bowser': ['villain', 'royalty', 'parent'],
  'Toad': [],
  'Yoshi': ['animal', 'sidekick'],

  // ── Legend of Zelda ─────────────────────────
  'Link': ['has_powers', 'fighter', 'royalty', 'blonde', 'orphan'],
  'Princess Zelda': ['royalty', 'has_powers', 'magic', 'blonde'],
  'Ganondorf': ['villain', 'has_powers', 'magic'],
  'Impa': ['fighter'],
  'Navi': ['supernatural', 'has_powers', 'sidekick'],
  'Midna': ['supernatural', 'has_powers'],

  // ── Pokémon ─────────────────────────────────
  'Pikachu': ['animal', 'has_powers', 'sidekick'],
  'Ash Ketchum': ['child'],
  'Misty': ['redhead', 'child', 'sidekick'],
  'Brock': ['child', 'sidekick'],
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
  'Ellie Williams': ['child', 'fighter', 'has_powers', 'orphan', 'scar'],
  'Tess': ['dies', 'fighter'],
  'Tommy Miller': ['parent', 'fighter'],
  'Marlene': ['dies'],
  'Riley Abel': ['dies', 'child', 'orphan'],

  // ── Overwatch ───────────────────────────────
  'Tracer': ['has_powers', 'fighter'],
  'Genji': ['has_powers', 'fighter', 'robot', 'scar', 'redemption_arc'],
  'Mercy': ['has_powers', 'scientist', 'blonde'],
  'Widowmaker': ['villain', 'fighter', 'spy'],
  "D.Va": ['child', 'fighter'],
  'McCree': ['fighter', 'beard', 'scar', 'spy'],

  // ── League of Legends ───────────────────────
  'Jinx': ['villain', 'fighter', 'blonde'],
  'Ezreal': ['genius', 'fighter', 'blonde'],
  'Lux': ['magic', 'has_powers', 'blonde'],
  'Yasuo': ['fighter', 'scar', 'antihero'],
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
  'Raiden': ['fighter', 'supernatural', 'has_powers', 'white_hair', 'dies', 'antihero', 'redemption_arc'],
  'Kano': ['fighter', 'villain'],

  // ── Super Smash Bros ────────────────────────
  'Kirby': ['has_powers', 'child'],
  'Fox McCloud': ['fighter', 'has_powers'],
  'Samus': ['fighter', 'has_powers', 'blonde', 'orphan'],
  'Captain Falcon': ['fighter'],
  'Ness': ['has_powers', 'child'],

  // ── Stardew Valley ──────────────────────────
  'The Farmer': [],
  'Penny': ['child', 'redhead'],
  'Sebastian': ['sidekick'],
  'Abigail': [],
  'Harvey': ['scientist', 'glasses', 'beard'],
  'Robin': ['fighter', 'genius', 'child'],

  // ── Among Us ────────────────────────────────
  'The Crewmate': [],
  'The Impostor': ['villain'],

  // ── Naruto ──────────────────────────────────
  'Naruto Uzumaki': ['has_powers', 'blonde', 'fighter', 'parent', 'child', 'royalty', 'orphan'],
  'Sasuke Uchiha': ['has_powers', 'fighter', 'villain', 'parent', 'antihero', 'orphan', 'has_siblings', 'redemption_arc'],
  'Sakura Haruno': ['has_powers', 'fighter', 'parent'],
  'Kakashi Hatake': ['has_powers', 'fighter', 'white_hair', 'genius', 'mentor', 'scar'],
  'Itachi Uchiha': ['villain', 'has_powers', 'fighter', 'genius', 'dies', 'antihero', 'redemption_arc', 'has_siblings'],
  'Hinata Hyuga': ['has_powers', 'fighter', 'parent'],

  // ── One Piece ───────────────────────────────
  'Monkey D. Luffy': ['has_powers', 'fighter', 'child', 'orphan', 'has_siblings'],
  'Roronoa Zoro': ['has_powers', 'fighter', 'scar'],
  'Nami': ['redhead'],
  'Sanji': ['fighter', 'blonde'],
  'Usopp': ['fighter', 'comic_relief', 'sidekick'],
  'Nico Robin': ['fighter', 'genius', 'scientist'],

  // ── Dragon Ball Z ───────────────────────────
  'Goku': ['has_powers', 'fighter', 'parent', 'dies', 'orphan', 'has_siblings', 'mentor'],
  'Vegeta': ['has_powers', 'fighter', 'royalty', 'villain', 'parent', 'antihero', 'redemption_arc'],
  'Gohan': ['has_powers', 'fighter', 'child', 'parent', 'glasses', 'has_siblings'],
  'Piccolo': ['has_powers', 'fighter', 'villain', 'green', 'mentor'],
  'Frieza': ['villain', 'has_powers', 'royalty', 'dies'],
  'Bulma': ['genius', 'scientist', 'blonde'],

  // ── Attack on Titan ─────────────────────────
  'Eren Yeager': ['has_powers', 'fighter', 'villain', 'dies', 'child', 'antihero'],
  'Mikasa Ackerman': ['fighter', 'has_powers'],
  'Armin Arlert': ['genius', 'blonde'],
  'Levi Ackerman': ['fighter', 'has_powers'],
  'Hange Zoë': ['scientist', 'glasses', 'dies', 'scar'],
  'Erwin Smith': ['genius', 'dies', 'beard'],

  // ── Death Note ──────────────────────────────
  'Light Yagami': ['genius', 'villain', 'dies', 'antihero', 'has_siblings'],
  'L Lawliet': ['genius', 'dies', 'detective'],
  'Misa Amane': ['villain', 'blonde'],
  'Near': ['genius', 'white_hair', 'child', 'detective'],
  'Ryuk': ['supernatural', 'villain'],
  'Rem': ['supernatural', 'has_powers', 'magic', 'dies', 'twin'],

  // ── Demon Slayer ────────────────────────────
  'Tanjiro Kamado': ['fighter', 'has_powers', 'child', 'orphan', 'has_siblings', 'scar'],
  'Nezuko Kamado': ['supernatural', 'child', 'has_powers', 'fighter', 'orphan', 'has_siblings'],
  'Zenitsu Agatsuma': ['fighter', 'has_powers', 'blonde', 'child'],
  'Inosuke Hashibira': ['fighter', 'has_powers', 'child'],
  'Giyu Tomioka': ['fighter', 'has_powers'],

  // ── My Hero Academia ────────────────────────
  'Izuku Midoriya': ['has_powers', 'fighter', 'genius', 'child'],
  'Katsuki Bakugo': ['has_powers', 'fighter', 'child', 'blonde'],
  'Ochaco Uraraka': ['has_powers', 'fighter', 'child'],
  'Shoto Todoroki': ['has_powers', 'fighter', 'child', 'white_hair', 'scar'],
  'All Might': ['has_powers', 'fighter', 'blonde', 'bald', 'mentor'],
  'Tenya Iida': ['has_powers', 'fighter', 'child', 'glasses'],

  // ── Fullmetal Alchemist ─────────────────────
  'Edward Elric': ['magic', 'has_powers', 'fighter', 'genius', 'child', 'blonde', 'dies', 'orphan', 'has_siblings', 'scar'],
  'Alphonse Elric': ['magic', 'has_powers', 'fighter', 'child', 'robot', 'orphan', 'has_siblings'],
  'Roy Mustang': ['magic', 'has_powers', 'fighter', 'mentor'],
  'Winry Rockbell': ['scientist', 'blonde'],
  'Riza Hawkeye': ['fighter'],
  'Envy': ['supernatural', 'villain', 'dies', 'has_powers'],

  // ── Bleach ──────────────────────────────────
  'Ichigo Kurosaki': ['has_powers', 'fighter', 'redhead', 'supernatural', 'orphan', 'has_siblings'],
  'Rukia Kuchiki': ['has_powers', 'fighter', 'supernatural'],
  'Orihime Inoue': ['has_powers', 'fighter'],
  'Uryu Ishida': ['has_powers', 'fighter', 'glasses'],
  'Kisuke Urahara': ['has_powers', 'genius', 'fighter', 'mentor'],
  'Renji Abarai': ['has_powers', 'fighter', 'redhead'],

  // ── Sailor Moon ─────────────────────────────
  'Sailor Moon': ['has_powers', 'magic', 'fighter', 'royalty', 'blonde', 'child'],
  'Sailor Mercury': ['has_powers', 'magic', 'fighter', 'genius', 'child'],
  'Sailor Mars': ['has_powers', 'magic', 'fighter', 'child'],
  'Sailor Jupiter': ['has_powers', 'magic', 'fighter', 'child'],
  'Sailor Venus': ['has_powers', 'magic', 'fighter', 'child', 'blonde'],
  'Tuxedo Mask': ['has_powers', 'royalty', 'dies'],

  // ── Cowboy Bebop ────────────────────────────
  'Spike Spiegel': ['fighter', 'dies', 'antihero'],
  'Jet Black': ['fighter', 'bald', 'beard', 'parent'],
  'Faye Valentine': ['fighter', 'antihero'],
  'Ed': ['genius', 'child'],
  'Ein': ['animal', 'genius', 'sidekick'],

  // ── Neon Genesis Evangelion ─────────────────
  'Shinji Ikari': ['has_powers', 'child'],
  'Rei Ayanami': ['has_powers', 'supernatural', 'child', 'dies', 'white_hair'],
  'Asuka Langley': ['has_powers', 'child', 'redhead'],
  'Misato Katsuragi': ['parent'],
  'Gendo Ikari': ['villain', 'glasses', 'beard', 'parent'],

  // ── Hunter x Hunter ─────────────────────────
  'Gon Freecss': ['has_powers', 'fighter', 'child', 'orphan'],
  'Killua Zoldyck': ['has_powers', 'fighter', 'child', 'white_hair', 'antihero', 'has_siblings'],
  'Kurapika': ['has_powers', 'fighter', 'blonde'],
  'Leorio Paradinight': ['genius', 'scientist', 'glasses'],
  'Hisoka': ['fighter', 'villain', 'has_powers', 'antihero'],
  'Meruem': ['villain', 'genius', 'has_powers', 'dies', 'bald'],

  // ── Sword Art Online ────────────────────────
  'Kirito': ['has_powers', 'fighter', 'has_siblings'],
  'Asuna': ['has_powers', 'fighter'],
  'Sinon': ['fighter', 'has_powers'],
  'Leafa': ['fighter', 'has_powers', 'blonde', 'has_siblings'],
  'Klein': ['fighter', 'redhead'],
  'Yui': ['child', 'supernatural'],

  // ── Avatar: The Last Airbender ──────────────
  'Aang': ['has_powers', 'magic', 'fighter', 'bald', 'child', 'royalty', 'orphan'],
  'Katara': ['has_powers', 'magic', 'fighter', 'parent', 'has_siblings', 'mentor'],
  'Sokka': ['fighter', 'has_siblings', 'comic_relief'],
  'Zuko': ['has_powers', 'magic', 'fighter', 'royalty', 'villain', 'parent', 'antihero', 'redemption_arc', 'has_siblings', 'scar'],
  'Toph': ['has_powers', 'magic', 'fighter', 'child'],
  'Iroh': ['has_powers', 'magic', 'fighter', 'elderly', 'parent', 'genius', 'beard', 'mentor'],

  // ── Teen Titans ─────────────────────────────
  'Starfire': ['has_powers', 'fighter', 'royalty', 'redhead'],
  'Cyborg': ['has_powers', 'fighter', 'robot'],
  'Beast Boy': ['has_powers', 'fighter', 'green'],
  'Terra': ['has_powers', 'fighter', 'villain', 'blonde', 'dies'],

  // ── Gravity Falls ───────────────────────────
  'Dipper Pines': ['child', 'genius', 'has_siblings'],
  'Mabel Pines': ['child', 'has_siblings'],
  'Grunkle Stan': ['parent', 'glasses', 'antihero', 'mentor'],
  'Bill Cipher': ['villain', 'supernatural', 'has_powers', 'genius'],
  'Soos': [],
  'Wendy': ['redhead'],

  // ── Adventure Time ──────────────────────────
  'Finn': ['child', 'fighter', 'blonde'],
  'Jake': ['has_powers', 'animal', 'parent', 'supernatural'],
  'Princess Bubblegum': ['royalty', 'genius', 'scientist', 'parent'],
  'Marceline': ['supernatural', 'has_powers', 'dies', 'musician'],
  'Ice King': ['villain', 'magic', 'white_hair', 'elderly', 'beard'],
  'Lumpy Space Princess': ['royalty', 'supernatural'],

  // ── Steven Universe ─────────────────────────
  'Steven Universe': ['has_powers', 'magic', 'fighter', 'child', 'royalty'],
  'Pearl': ['has_powers', 'magic', 'fighter', 'supernatural'],
  'Amethyst': ['has_powers', 'magic', 'fighter', 'supernatural'],
  'Garnet': ['has_powers', 'magic', 'fighter', 'supernatural', 'genius', 'mentor'],
  'Lapis Lazuli': ['has_powers', 'magic', 'supernatural', 'dies'],
  'Peridot': ['has_powers', 'magic', 'supernatural', 'villain', 'genius', 'glasses'],

  // ── Batman: The Animated Series ─────────────
  // 'Batman' already listed above
  // 'Robin' already listed
  'Catwoman': ['fighter', 'villain'],
  'Harley Quinn': ['villain'],
  'Two-Face': ['villain'],

  // ── Scooby-Doo ──────────────────────────────
  'Scooby-Doo': ['animal', 'supernatural', 'detective', 'sidekick'],
  'Shaggy Rogers': ['child', 'beard'],
  'Fred Jones': ['blonde', 'detective'],
  'Daphne Blake': ['redhead', 'detective'],
  'Velma Dinkley': ['genius', 'glasses', 'detective'],

  // ── SpongeBob ───────────────────────────────
  'SpongeBob': ['supernatural', 'child'],
  'Patrick Star': ['supernatural', 'bald', 'sidekick', 'comic_relief'],
  'Squidward Tentacles': ['supernatural', 'comic_relief', 'musician'],
  'Sandy Cheeks': ['scientist', 'genius'],
  'Mr. Krabs': ['supernatural', 'villain', 'parent'],
  'Plankton': ['villain', 'genius', 'supernatural'],

  // ── Phineas and Ferb ────────────────────────
  'Phineas Flynn': ['genius', 'child'],
  'Ferb Fletcher': ['genius', 'child', 'green'],
  'Candace Flynn': ['child', 'redhead'],
  'Perry the Platypus': ['animal', 'fighter', 'spy'],
  'Dr. Doofenshmirtz': ['scientist', 'villain', 'parent', 'genius'],

  // ── The Fairly OddParents ───────────────────
  'Timmy Turner': ['child', 'has_powers'],
  'Wanda': ['supernatural', 'has_powers', 'magic', 'redhead', 'parent', 'sidekick'],
  'Cosmo': ['supernatural', 'has_powers', 'magic', 'parent', 'blonde', 'sidekick', 'comic_relief'],
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
  'Snake Eyes': ['fighter', 'spy'],
  'Scarlett': ['fighter', 'redhead', 'spy'],
  'Cobra Commander': ['villain'],
  'Destro': ['villain', 'bald'],
  'Storm Shadow': ['fighter', 'villain', 'white_hair', 'spy'],

  // ── He-Man ──────────────────────────────────
  'He-Man': ['fighter', 'has_powers', 'blonde', 'royalty'],
  'Skeletor': ['villain', 'has_powers', 'magic', 'bald'],
  'Teela': ['fighter', 'redhead'],
  'Man-At-Arms': ['scientist', 'fighter', 'beard', 'parent', 'mentor'],
  'Orko': ['magic', 'supernatural', 'sidekick', 'comic_relief'],
  'Battle Cat': ['animal', 'has_powers', 'sidekick'],

  // ── ThunderCats ─────────────────────────────
  'Lion-O': ['royalty', 'fighter', 'has_powers', 'redhead'],
  'Tygra': ['fighter', 'has_powers'],
  'Cheetara': ['fighter', 'has_powers', 'blonde'],
  'Panthro': ['fighter', 'has_powers', 'bald', 'beard'],
  'Snarf': ['animal', 'sidekick'],
  'Mumm-Ra': ['villain', 'supernatural', 'magic', 'bald', 'elderly'],

  // ── TMNT ────────────────────────────────────
  'Leonardo': ['fighter', 'has_powers', 'royalty', 'green'],
  'Michelangelo': ['fighter', 'has_powers', 'green'],
  'Donatello': ['fighter', 'has_powers', 'green', 'scientist', 'genius'],
  'Raphael': ['fighter', 'has_powers', 'green'],
  'Splinter': ['animal', 'fighter', 'elderly', 'parent', 'beard', 'mentor'],
  'Shredder': ['villain', 'fighter'],

  // ── DuckTales ───────────────────────────────
  'Scrooge McDuck': ['animal', 'elderly', 'parent', 'genius'],
  'Huey': ['animal', 'child', 'has_siblings'],
  'Dewey': ['animal', 'child', 'has_siblings'],
  'Louie': ['animal', 'child', 'has_siblings'],
  'Launchpad McQuack': ['animal'],
  'Darkwing Duck': ['animal', 'fighter'],

  // ── Inspector Gadget ────────────────────────
  'Inspector Gadget': ['robot', 'has_powers', 'parent', 'detective'],
  'Brain': ['animal', 'genius'],
  'Dr. Claw': ['villain'],
  'Chief Quimby': [],

  // ── The Smurfs ──────────────────────────────
  'Papa Smurf': ['parent', 'magic', 'elderly', 'beard', 'mentor'],
  'Smurfette': ['blonde'],
  'Brainy Smurf': ['genius', 'glasses'],
  'Clumsy Smurf': [],
  'Gargamel': ['villain', 'magic', 'scientist', 'bald', 'elderly'],
  'Azrael': ['animal'],

  // ── Jem and the Holograms ───────────────────
  'Jem': ['has_powers', 'musician'],
  'Kimber': ['redhead', 'musician'],
  'Aja': ['has_powers'],
  'Shana': [],
  'Raya': [],
  'Pizzazz': ['villain', 'blonde', 'musician'],

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
  'The Brain': ['genius', 'villain', 'scientist', 'supernatural', 'comic_relief'],
  'Hello Nurse': ['blonde'],

  // ── Rugrats ─────────────────────────────────
  'Tommy Pickles': ['child', 'has_siblings'],
  'Chuckie Finster': ['child', 'redhead', 'glasses'],
  'Phil DeVille': ['child', 'twin'],
  'Lil DeVille': ['child', 'twin'],
  'Angelica Pickles': ['child', 'villain', 'blonde'],
  'Susie Carmichael': ['child'],

  // ── Hey Arnold! ─────────────────────────────
  'Arnold': ['child', 'blonde', 'orphan'],
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
  'Dexter': ['genius', 'scientist', 'child', 'glasses', 'has_siblings'],
'Dee Dee': ['child', 'blonde', 'has_siblings'],
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
  'Kim Possible': ['has_powers', 'fighter', 'redhead', 'spy'],
  'Ron Stoppable': ['sidekick', 'spy', 'comic_relief'],
  'Wade': ['genius', 'child', 'spy'],
  'Shego': ['villain', 'fighter', 'has_powers', 'spy'],
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
  'Muscle Man': ['supernatural', 'comic_relief'],

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
  'Nino Lahiffe': ['child', 'musician'],
  'Hawk Moth': ['villain', 'has_powers', 'magic', 'parent'],
  'Luka Couffaine': ['child', 'musician'],

  // ── Voltron ─────────────────────────────────
  'Shiro': ['fighter', 'white_hair', 'child', 'genius'],
  'Keith': ['fighter', 'child'],
  'Lance': ['fighter', 'child'],
  'Pidge': ['child', 'genius', 'glasses'],
  'Hunk': ['fighter'],
  'Princess Allura': ['royalty', 'has_powers', 'dies'],

  // ── She-Ra ──────────────────────────────────
  'Adora': ['has_powers', 'fighter', 'royalty', 'blonde'],
  'Catra': ['has_powers', 'fighter', 'villain', 'antihero', 'redemption_arc'],
  'Glimmer': ['has_powers', 'magic', 'royalty', 'child'],
  'Bow': ['fighter', 'child'],
  'Scorpia': ['villain', 'has_powers', 'fighter', 'redemption_arc'],
  'Entrapta': ['genius', 'scientist', 'villain', 'blonde'],

  // ── The Loud House ──────────────────────────
  'Lincoln Loud': ['child', 'white_hair', 'has_siblings'],
  'Lori Loud': ['child', 'blonde', 'has_siblings'],
  'Leni Loud': ['child', 'blonde', 'has_siblings'],
  'Luna Loud': ['child', 'has_siblings', 'musician'],
  'Luan Loud': ['child', 'has_siblings', 'comic_relief'],
  'Lana Loud': ['child', 'has_siblings'],

  // ── Amphibia ────────────────────────────────
  'Anne Boonchuy': ['child', 'fighter'],
  'Sprig Plantar': ['child', 'animal'],
  'Polly Plantar': ['child', 'animal'],
  'Hop Pop Plantar': ['animal', 'parent', 'elderly'],
  'Marcy Wu': ['child', 'genius', 'dies'],
  'Sasha Waybright': ['child', 'villain', 'fighter', 'blonde'],

  // ── The Owl House ───────────────────────────
  'Luz Noceda': ['child', 'magic', 'has_powers'],
  'Eda Clawthorne': ['magic', 'has_powers', 'white_hair', 'parent', 'antihero', 'mentor'],
  'King': ['child', 'supernatural'],
  'Amity Blight': ['child', 'magic', 'has_powers'],
  'Willow Park': ['child', 'magic', 'has_powers', 'glasses'],
  'Gus Porter': ['child', 'magic', 'has_powers'],

  // ── Arcane ──────────────────────────────────
  'Jayce': ['genius', 'scientist'],
  'Viktor': ['genius', 'scientist', 'glasses', 'scar'],
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
  'Yamcha': ['fighter', 'comic_relief'],
  'Krillin': ['fighter', 'bald', 'has_powers'],
  'Tien': ['fighter', 'has_powers', 'bald'],
  'Master Roshi': ['fighter', 'has_powers', 'elderly', 'bald', 'beard', 'genius', 'glasses', 'mentor'],

  // ── Fist of the North Star ──────────────────
  'Kenshiro': ['fighter', 'has_powers'],
  'Raoh': ['fighter', 'has_powers', 'villain'],
  'Toki': ['fighter', 'has_powers'],
  'Jagi': ['fighter', 'villain', 'dies'],
  'Rei': ['fighter', 'dies', 'blonde'],
  'Mamiya': ['fighter', 'redhead'],

  // ── Mobile Suit Gundam ──────────────────────
  'Amuro Ray': ['child', 'has_powers', 'fighter'],
  'Char Aznable': ['villain', 'has_powers', 'fighter', 'blonde', 'antihero'],
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
  'Lynn Minmay': ['child', 'musician'],
  'Roy Focker': ['fighter', 'blonde', 'dies'],
  'Misa Hayase': [],
  'Maximilian Jenius': ['fighter', 'blonde'],

  // ── Rurouni Kenshin ─────────────────────────
  'Kenshin Himura': ['fighter', 'has_powers', 'redhead', 'antihero', 'redemption_arc', 'scar'],
  'Kaoru Kamiya': ['fighter', 'parent'],
  'Yahiko Myojin': ['child', 'fighter'],
  'Sanosuke Sagara': ['fighter'],
  'Aoshi Shinomori': ['fighter', 'villain', 'white_hair', 'antihero', 'redemption_arc'],
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
  'Kero': ['animal', 'has_powers', 'sidekick'],
  'Yukito Tsukishiro': ['supernatural', 'white_hair'],
  'Meiling Li': ['child', 'fighter'],

  // ── Digimon ─────────────────────────────────
  'Tai Kamiya': ['child'],
  'Agumon': ['animal', 'child', 'sidekick'],
'Matt Ishida': ['child', 'blonde'],
  'Gabumon': ['animal', 'child', 'sidekick'],
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
  'Vash the Stampede': ['has_powers', 'fighter', 'blonde', 'dies', 'antihero', 'scar'],
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
  'Lelouch vi Britannia': ['genius', 'villain', 'royalty', 'dies', 'has_powers', 'antihero', 'redemption_arc'],
  'C.C.': ['supernatural', 'has_powers', 'white_hair'],
  'Kallen Stadtfeld': ['fighter', 'has_powers', 'redhead'],
  'Suzaku Kururugi': ['fighter', 'has_powers'],
  'Nunnally vi Britannia': ['royalty', 'child'],
  'Jeremiah Gottwald': ['villain', 'fighter', 'bald'],

  // ── Gurren Lagann ───────────────────────────
  'Simon': ['child', 'has_powers', 'fighter', 'orphan'],
  'Kamina': ['fighter', 'dies', 'has_powers'],
  'Yoko Littner': ['fighter', 'redhead'],
  'Nia Teppelin': ['supernatural', 'has_powers', 'blonde', 'royalty', 'dies'],
  'Viral': ['villain', 'supernatural', 'animal', 'antihero', 'redemption_arc'],
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
  'Black Star': ['child', 'has_powers', 'fighter', 'orphan'],

  // ── Fairy Tail ──────────────────────────────
  'Natsu Dragneel': ['has_powers', 'magic', 'fighter', 'child'],
  'Lucy Heartfilia': ['has_powers', 'magic', 'fighter', 'child', 'blonde'],
  'Erza Scarlet': ['has_powers', 'magic', 'fighter', 'royalty', 'redhead', 'scar', 'orphan'],
  'Gray Fullbuster': ['has_powers', 'magic', 'fighter', 'child'],
  'Happy': ['animal', 'has_powers', 'supernatural', 'sidekick'],
  'Wendy Marvell': ['has_powers', 'magic', 'fighter', 'child'],

  // ── Black Lagoon ────────────────────────────
  'Rock': ['antihero'],
  'Revy': ['fighter', 'antihero'],
  'Dutch': ['bald', 'fighter', 'antihero'],
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
  'Genos': ['robot', 'has_powers', 'fighter', 'blonde', 'sidekick'],
  "Speed-o'-Sound Sonic": ['fighter'],
  'Mumen Rider': ['fighter'],
  'Tatsumaki': ['has_powers', 'magic', 'fighter', 'child'],
  'Bang': ['fighter', 'elderly', 'white_hair', 'genius'],

  // ── Mob Psycho 100 ──────────────────────────
  'Shigeo Kageyama': ['has_powers', 'child', 'has_siblings'],
  'Reigen Arataka': ['genius', 'mentor'],
  'Dimple': ['supernatural', 'has_powers'],
  'Ritsu Kageyama': ['child', 'has_powers', 'has_siblings'],
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
  'Ryuko Matoi': ['has_powers', 'fighter', 'child', 'has_siblings', 'antihero'],
  'Satsuki Kiryuin': ['has_powers', 'fighter', 'child', 'villain', 'has_siblings', 'redemption_arc'],
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
  'Akane Tsunemori': ['genius', 'detective'],
  'Shinya Kogami': ['fighter', 'detective'],
  'Nobuchika Ginoza': ['glasses', 'detective'],
  'Shogo Makishima': ['villain', 'genius', 'white_hair'],
  'Tomomi Masaoka': ['parent', 'beard', 'detective'],

  // ── Vinland Saga ────────────────────────────
  'Thorfinn': ['child', 'fighter', 'antihero', 'redemption_arc', 'orphan', 'scar'],
  'Askeladd': ['villain', 'fighter', 'dies', 'blonde', 'beard', 'mentor'],
  'Bjorn': ['fighter', 'beard', 'dies'],
  'Thors': ['fighter', 'dies', 'parent', 'beard'],
  'Canute': ['child', 'royalty', 'blonde'],
  'Floki': ['villain', 'beard'],

  // ── The Promised Neverland ──────────────────
  'Emma': ['child', 'genius', 'orphan'],
  'Norman': ['child', 'genius', 'white_hair', 'orphan', 'scar'],
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
  'Yuji Itadori': ['has_powers', 'fighter', 'child', 'supernatural', 'orphan'],
  'Megumi Fushiguro': ['has_powers', 'magic', 'fighter', 'child'],
  'Nobara Kugisaki': ['has_powers', 'magic', 'fighter', 'child', 'dies'],
  'Satoru Gojo': ['has_powers', 'magic', 'fighter', 'genius', 'white_hair'],
  'Ryomen Sukuna': ['villain', 'has_powers', 'magic', 'supernatural'],
  'Aoi Todo': ['fighter', 'has_powers', 'child'],

  // ── Chainsaw Man ────────────────────────────
  'Denji': ['has_powers', 'fighter', 'child', 'supernatural', 'blonde', 'orphan', 'antihero'],
  'Power': ['supernatural', 'has_powers', 'fighter', 'child', 'blonde'],
  'Aki Hayakawa': ['fighter', 'has_powers', 'dies'],
  'Makima': ['villain', 'supernatural', 'has_powers', 'dies'],
  'Pochita': ['animal', 'supernatural', 'dies'],
  'Himeno': ['dies'],

  // ── Spy x Family ────────────────────────────
  'Loid Forger': ['genius', 'parent', 'fighter', 'blonde', 'spy'],
  'Yor Forger': ['fighter', 'parent', 'has_powers', 'spy', 'has_siblings'],
  'Anya Forger': ['child', 'has_powers', 'supernatural', 'orphan'],
  'Franky Franklin': ['genius'],
  'Yuri Briar': ['spy', 'has_siblings'],
  'Sylvia Sherwood': ['spy'],

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
  'Hitori Gotoh': ['child', 'blonde', 'musician'],
  'Nijika Ijichi': ['child', 'blonde', 'musician'],
  'Ryo Yamada': ['child', 'musician'],
  'Ikuyo Kita': ['child', 'redhead', 'musician'],
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
