// Curated featured books displayed directly on the site (not stored in the database).
// `googleId` lets cards link to /book/google/<id> so the existing detail page works.
export type FeaturedBook = {
  googleId: string;
  title: string;
  author: string;
  cover: string;
  blurb: string;
  tag: string;
  description: string;
};

export const FEATURED_BOOKS: FeaturedBook[] = [
  {
    googleId: "PGR2AwAAQBAJ",
    title: "The Name of the Wind",
    author: "Patrick Rothfuss",
    cover: "https://covers.openlibrary.org/b/id/11480483-L.jpg",
    blurb: "A storyteller's elegy — lyrical, melancholic, unforgettable.",
    tag: "Fantasy",
    description:
      "Told in his own voice, this is the tale of Kvothe — a magically gifted young man who grows to be the most notorious wizard his world has ever seen. From his childhood in a troupe of traveling players, to years spent as a near-feral orphan in a crime-ridden city, to his daringly brazen yet successful bid to enter a legendary school of magic, <em>The Name of the Wind</em> is a high-action novel written with a poet's hand. Patrick Rothfuss weaves music, language, and mystery into a coming-of-age fantasy that has been hailed as a modern classic — a story of love, loss, and the cost of becoming a legend.",
  },
  {
    googleId: "RBOuDQAAQBAJ",
    title: "Beloved",
    author: "Toni Morrison",
    cover: "https://covers.openlibrary.org/b/id/8261367-L.jpg",
    blurb: "A haunting meditation on memory, motherhood, and the weight of history.",
    tag: "Literary",
    description:
      "Sethe was born a slave and escaped to Ohio, but eighteen years later she is still not free. She has too many memories of Sweet Home, the beautiful farm where so many hideous things happened. And Sethe's new home is haunted by the ghost of her baby, who died nameless and whose tombstone is engraved with a single word: <em>Beloved</em>. Toni Morrison's Pulitzer Prize-winning masterpiece is a spellbinding and dazzlingly innovative portrait of a woman haunted by the past — a searing, lyrical reckoning with the legacy of slavery, motherhood, and the unbearable weight of memory.",
  },
  {
    googleId: "SDpRDwAAQBAJ",
    title: "Piranesi",
    author: "Susanna Clarke",
    cover: "https://covers.openlibrary.org/b/id/10226290-L.jpg",
    blurb: "A labyrinth of marble halls and tides — quiet, strange, transcendent.",
    tag: "Fabulist",
    description:
      "Piranesi's house is no ordinary building: its rooms are infinite, its corridors endless, its walls lined with thousands of statues, each one different from all the others. Within the labyrinth of halls an ocean is imprisoned; clouds move slowly through the upper halls. There are tides, and birds, and only one other living person — a man called the Other, who visits Piranesi twice a week and asks for help with research into a Great and Secret Knowledge. Then messages begin to appear, scratched out in chalk on pavements. There is someone new in the House. But who are they, and what do they want? Susanna Clarke's hypnotic novel is a meditation on solitude, memory, and the strange beauty of the worlds we build inside our minds.",
  },
  {
    googleId: "yj1jDwAAQBAJ",
    title: "Project Hail Mary",
    author: "Andy Weir",
    cover: "https://covers.openlibrary.org/b/id/11200092-L.jpg",
    blurb: "A lone astronaut, an impossible problem, and the warmest first contact in fiction.",
    tag: "Science Fiction",
    description:
      "Ryland Grace is the sole survivor on a desperate, last-chance mission — and if he fails, humanity and the Earth itself will perish. Except that right now, he doesn't know that. He can't even remember his own name, let alone the nature of his assignment or how to complete it. All he knows is that he's been asleep for a very, very long time. And he's just been awakened to find himself millions of miles from home, with nothing but two corpses for company. His crewmates dead, his memories fuzzy, he must rely on hazy clues — and an unexpected ally — to puzzle out an impossible scientific mystery. A propulsive, irresistibly entertaining tale of discovery, speculation, and survival from the bestselling author of <em>The Martian</em>.",
  },
  {
    googleId: "PGgGEAAAQBAJ",
    title: "Klara and the Sun",
    author: "Kazuo Ishiguro",
    cover: "https://covers.openlibrary.org/b/id/10648686-L.jpg",
    blurb: "An artificial friend watches the sun — Ishiguro at his tenderest.",
    tag: "Literary",
    description:
      "From her place in the store, Klara — an Artificial Friend with outstanding observational qualities — watches carefully the behavior of those who come in to browse, and of those who pass by on the street outside. She remains hopeful that a customer will soon choose her. <em>Klara and the Sun</em> is a thrilling, magnificent new novel from the Nobel laureate Kazuo Ishiguro — author of <em>The Remains of the Day</em> and <em>Never Let Me Go</em> — that asks, in the simplest terms, what it means to love. Told through Klara's quietly luminous voice, it is a story of devotion, faith, and the question of what makes us human.",
  },
  {
    googleId: "PfFbDwAAQBAJ",
    title: "Circe",
    author: "Madeline Miller",
    cover: "https://covers.openlibrary.org/b/id/8739376-L.jpg",
    blurb: "The witch of Aiaia, retold — myth made human, vivid, and aching.",
    tag: "Mythic",
    description:
      "In the house of Helios, god of the sun and mightiest of the Titans, a daughter is born. But Circe is a strange child — not powerful like her father, nor viciously alluring like her mother. Turning to the world of mortals for companionship, she discovers that she does possess power: the power of witchcraft, which can transform rivals into monsters and menace the gods themselves. Threatened, Zeus banishes her to a deserted island, where she hones her occult craft, tames wild beasts, and crosses paths with many of the most famous figures in all of mythology. But there is danger, too, for a woman who stands alone — and Circe must summon all her strength to decide, once and for all, whether she belongs with the gods she was born from, or the mortals she has come to love.",
  },
  {
    googleId: "kotPYEqx7kMC",
    title: "The Road",
    author: "Cormac McCarthy",
    cover: "https://covers.openlibrary.org/b/id/8231856-L.jpg",
    blurb: "Ash, asphalt, and the fierce love between a father and son.",
    tag: "Literary",
    description:
      "A father and his young son walk alone through burned America, heading slowly for the coast. Nothing moves in the ravaged landscape save the ash on the wind. They have nothing but a pistol to defend themselves against the lawless bands that stalk the road, the clothes they are wearing, a cart of scavenged food — and each other. Cormac McCarthy's Pulitzer Prize-winning novel is a frightening, profound tale of survival and the enduring power of love between a parent and child.",
  },
  {
    googleId: "wrOQLV6xB-wC",
    title: "The Kite Runner",
    author: "Khaled Hosseini",
    cover: "https://covers.openlibrary.org/b/id/8231996-L.jpg",
    blurb: "A boyhood betrayal in Kabul, and a lifetime spent atoning for it.",
    tag: "Literary",
    description:
      "Afghanistan, 1975: Twelve-year-old Amir is desperate to win the local kite-fighting tournament and his loyal friend Hassan promises to help him. But neither of the boys can foresee what will happen to Hassan that afternoon, an event that is to shatter their lives. After the Russians invade and the family is forced to flee to America, Amir realises that one day he must return to find the one thing his new world cannot grant him: redemption.",
  },
  {
    googleId: "PGR2AwAAQBAJ_2",
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    cover: "https://covers.openlibrary.org/b/id/9358650-L.jpg",
    blurb: "A marsh, a murder, and a girl raised by the wild.",
    tag: "Mystery",
    description:
      "For years, rumors of the 'Marsh Girl' have haunted Barkley Cove, a quiet town on the North Carolina coast. So in late 1969, when handsome Chase Andrews is found dead, the locals immediately suspect Kya Clark, the so-called Marsh Girl. But Kya is not what they say. Sensitive and intelligent, she has survived for years alone in the marsh that she calls home, finding friends in the gulls and lessons in the sand. A painful coming-of-age story and a surprising tale of possible murder, <em>Where the Crawdads Sing</em> is also a celebration of nature.",
  },
  {
    googleId: "uYUZswEACAAJ",
    title: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    cover: "https://covers.openlibrary.org/b/id/9251224-L.jpg",
    blurb: "Old Hollywood glamour with a confession waiting underneath.",
    tag: "Contemporary",
    description:
      "Aging and reclusive Hollywood movie icon Evelyn Hugo is finally ready to tell the truth about her glamorous and scandalous life. But when she chooses unknown magazine reporter Monique Grant for the job, no one is more astounded than Monique herself. As Evelyn's story unfolds — revealing a ruthless ambition, an unexpected friendship, and a great forbidden love — Monique begins to feel a very real connection to the legendary star. But as Evelyn's story catches up with the present, it becomes clear that her life intersects with Monique's own in tragic and irreversible ways.",
  },
  {
    googleId: "kZ1APgAACAAJ",
    title: "A Little Life",
    author: "Hanya Yanagihara",
    cover: "https://covers.openlibrary.org/b/id/8231280-L.jpg",
    blurb: "Friendship as scaffolding against a life shaped by trauma.",
    tag: "Literary",
    description:
      "When four classmates from a small Massachusetts college move to New York to make their way, they're broke, adrift, and buoyed only by their friendship and ambition. Over the decades, their relationships deepen and darken, tinged by addiction, success, and pride. Yet their greatest challenge is Jude himself — by midlife a terrifyingly talented litigator yet an increasingly broken man, his mind and body scarred by an unspeakable childhood, and haunted by what he fears is a degree of trauma that he'll not only be unable to overcome — but that will define his life forever.",
  },
  {
    googleId: "yz8Luy0HinwC",
    title: "Educated",
    author: "Tara Westover",
    cover: "https://covers.openlibrary.org/b/id/8740156-L.jpg",
    blurb: "A memoir of a self-taught mind clawing its way out of the mountains.",
    tag: "Memoir",
    description:
      "Born to survivalists in the mountains of Idaho, Tara Westover was seventeen the first time she set foot in a classroom. Her family was so isolated from mainstream society that there was no one to ensure the children received an education, and no one to intervene when one of Tara's older brothers became violent. Then, lacking any formal education, Tara began to educate herself. She taught herself enough mathematics and grammar to be admitted to Brigham Young University, where she studied history, learning for the first time about pivotal world events. Her quest for knowledge transformed her, taking her over oceans and across continents, to Harvard and to Cambridge.",
  },
  {
    googleId: "uK4HBQAAQBAJ",
    title: "The Night Circus",
    author: "Erin Morgenstern",
    cover: "https://covers.openlibrary.org/b/id/7890127-L.jpg",
    blurb: "Black-and-white tents, a duel of magicians, and a love made of starlight.",
    tag: "Fabulist",
    description:
      "The circus arrives without warning. No announcements precede it. It is simply there, when yesterday it was not. Within the black-and-white striped canvas tents is an utterly unique experience full of breathtaking amazements. But behind the scenes, a fierce competition is underway — a duel between two young magicians, Celia and Marco, who have been trained since childhood expressly for this purpose by their mercurial instructors. Unbeknownst to them, this is a game in which only one can be left standing, and the circus is but the stage for a remarkable battle of imagination and will.",
  },
  {
    googleId: "6oIAdrqQrEoC",
    title: "Dune",
    author: "Frank Herbert",
    cover: "https://covers.openlibrary.org/b/id/8157996-L.jpg",
    blurb: "Spice, sandworms, and prophecy — the desert epic that founded a genre.",
    tag: "Science Fiction",
    description:
      "Set on the desert planet Arrakis, <em>Dune</em> is the story of Paul Atreides — who would become known as Muad'Dib — and of a great family's ambition to bring to fruition humankind's most ancient and unattainable dream. A stunning blend of adventure and mysticism, environmentalism and politics, <em>Dune</em> won the first Nebula Award, shared the Hugo Award, and formed the basis of what is undoubtedly the grandest epic in science fiction.",
  },
  {
    googleId: "yl4dILkcqm4C",
    title: "The Goldfinch",
    author: "Donna Tartt",
    cover: "https://covers.openlibrary.org/b/id/7890011-L.jpg",
    blurb: "A stolen painting, a boy unmoored, a glittering Dickensian sprawl.",
    tag: "Literary",
    description:
      "Theo Decker, a thirteen-year-old New Yorker, miraculously survives an accident that kills his mother. Abandoned by his father, Theo is taken in by the family of a wealthy friend. Bewildered by his strange new home, tormented by longing for his mother, he clings to one thing that reminds him of her: a small, mysteriously captivating painting that ultimately draws him into the underworld of art. As an adult, Theo moves silkily between the drawing rooms of the rich and the dusty labyrinth of an antiques store where he works.",
  },
  {
    googleId: "5NomkK4EV68C",
    title: "Normal People",
    author: "Sally Rooney",
    cover: "https://covers.openlibrary.org/b/id/8916055-L.jpg",
    blurb: "Two people, repeatedly missing and finding each other across years.",
    tag: "Contemporary",
    description:
      "Connell and Marianne grow up in the same small town in the west of Ireland, but the similarities end there. In the school they attend, Connell is popular and well-liked, while Marianne is a loner. But when the two strike up a conversation — awkward but electrifying — something life-changing begins. A year later, they're both studying at Trinity College in Dublin. Marianne has found her feet in a new social world while Connell hangs at the sidelines, shy and uncertain. Throughout their years in college, Marianne and Connell circle one another, straying toward other people and possibilities but always magnetically, irresistibly drawn back together.",
  },
  {
    googleId: "PGR2AwAAQBAJ_3",
    title: "Pachinko",
    author: "Min Jin Lee",
    cover: "https://covers.openlibrary.org/b/id/8281996-L.jpg",
    blurb: "Four generations of a Korean family seeking a home that won't have them.",
    tag: "Historical",
    description:
      "In the early 1900s, teenaged Sunja, the adored daughter of a crippled fisherman, falls for a wealthy stranger at the seashore near her home in Korea. He promises her the world, but when she discovers she is pregnant — and that her lover is married — she refuses to be bought. Instead, she accepts an offer of marriage from a gentle, sickly minister passing through on his way to Japan. But her decision to abandon her home, and to reject her son's powerful father, sets off a dramatic saga that will echo down through the generations.",
  },
  {
    googleId: "PGR2AwAAQBAJ_4",
    title: "Never Let Me Go",
    author: "Kazuo Ishiguro",
    cover: "https://covers.openlibrary.org/b/id/9255566-L.jpg",
    blurb: "An English boarding school where the truth waits, patient and devastating.",
    tag: "Literary",
    description:
      "As children, Kathy, Ruth, and Tommy were students at Hailsham, an exclusive boarding school secluded in the English countryside. It was a place of mercurial cliques and mysterious rules where teachers were constantly reminding their charges of how special they were. Now, years later, Kathy is a young woman. Ruth and Tommy have reentered her life, and for the first time she is beginning to look back at their shared past and understand just what it is that makes them special — and how that gift will shape the rest of their time together.",
  },
  {
    googleId: "PGR2AwAAQBAJ_5",
    title: "The House in the Cerulean Sea",
    author: "TJ Klune",
    cover: "https://covers.openlibrary.org/b/id/10523542-L.jpg",
    blurb: "A found-family fairy tale that warms like sunlight on a porch.",
    tag: "Fantasy",
    description:
      "Linus Baker leads a quiet, solitary life. At forty, he lives in a tiny house with a devious cat and his old records. As a Case Worker at the Department in Charge of Magical Youth, he spends his days overseeing the well-being of children in government-sanctioned orphanages. When Linus is unexpectedly summoned by Extremely Upper Management he's given a curious and highly classified assignment: travel to Marsyas Island Orphanage, where six dangerous children reside — including the Antichrist. There Linus must set aside his fears and determine whether or not they're likely to bring about the end of days.",
  },
  {
    googleId: "PGR2AwAAQBAJ_6",
    title: "Station Eleven",
    author: "Emily St. John Mandel",
    cover: "https://covers.openlibrary.org/b/id/8155571-L.jpg",
    blurb: "After the collapse, a traveling troupe insists that survival is insufficient.",
    tag: "Science Fiction",
    description:
      "An audacious, darkly glittering novel set in the eerie days of civilization's collapse, <em>Station Eleven</em> tells the spellbinding story of a Hollywood star, his would-be savior, and a nomadic group of actors roaming the scattered outposts of the Great Lakes region, risking everything for art and humanity. One snowy night a famous Hollywood actor slumps over and dies onstage during a production of <em>King Lear</em>. Hours later, the world as we know it begins to dissolve.",
  },
  {
    googleId: "PGR2AwAAQBAJ_7",
    title: "The Song of Achilles",
    author: "Madeline Miller",
    cover: "https://covers.openlibrary.org/b/id/8231270-L.jpg",
    blurb: "Patroclus and Achilles, retold with tenderness sharp enough to wound.",
    tag: "Mythic",
    description:
      "Greece in the age of heroes. Patroclus, an awkward young prince, has been exiled to the court of King Peleus and his perfect son Achilles. Despite their differences, the boys develop a tender friendship, a bond which blossoms into something deeper as they grow into young men. But when word comes that Helen of Sparta has been kidnapped, the men of Greece are called upon to lay siege to Troy in her name. Seduced by the promise of a glorious destiny, Achilles joins their cause, and torn between love and fear for his friend, Patroclus follows.",
  },
  {
    googleId: "PGR2AwAAQBAJ_8",
    title: "Tomorrow, and Tomorrow, and Tomorrow",
    author: "Gabrielle Zevin",
    cover: "https://covers.openlibrary.org/b/id/12888156-L.jpg",
    blurb: "Two friends, decades, video games — a love story that refuses easy shape.",
    tag: "Contemporary",
    description:
      "On a bitter cold day, in the December of his junior year at Harvard, Sam Masur exits a subway car and sees, amid the hordes of people waiting on the platform, Sadie Green. He calls her name. For a moment, she pretends she hasn't heard him, but then, she turns, and a game begins: a legendary collaboration that will launch them to stardom. Spanning thirty years, this exhilarating and unutterably moving novel examines the multifarious nature of identity, disability, failure, the redemptive possibilities in play, and above all, our need to connect: to be loved and to love.",
  },
  {
    googleId: "PGR2AwAAQBAJ_9",
    title: "The Midnight Library",
    author: "Matt Haig",
    cover: "https://covers.openlibrary.org/b/id/10523492-L.jpg",
    blurb: "Between life and death, a library of every road not taken.",
    tag: "Fabulist",
    description:
      "Somewhere out beyond the edge of the universe there is a library that contains an infinite number of books, each one the story of another reality. One tells the story of your life as it is, along with another book for the other life you could have lived if you had made a different choice at any point in your life. While we all wonder how our lives might have been, what if you had the chance to go to the library and see for yourself? Would any of these other lives truly be better? Nora Seed finds herself faced with this decision.",
  },
  {
    googleId: "PGR2AwAAQBAJ_10",
    title: "Babel",
    author: "R. F. Kuang",
    cover: "https://covers.openlibrary.org/b/id/12888192-L.jpg",
    blurb: "Translation as empire, language as weapon, Oxford as battleground.",
    tag: "Fantasy",
    description:
      "Traduttore, traditore: An act of translation is always an act of betrayal. 1828. Robin Swift, orphaned by cholera in Canton, is brought to London by the mysterious Professor Lovell. There, he trains for years in Latin, Ancient Greek, and Chinese, all in preparation for the day he'll enroll in Oxford University's prestigious Royal Institute of Translation — also known as Babel. But Babel is the world's center for translation and, more importantly, magic. Silver-working — the art of manifesting the meaning lost in translation through enchanted silver bars — has made the British unparalleled in power.",
  },
  {
    googleId: "PGR2AwAAQBAJ_11",
    title: "The Secret History",
    author: "Donna Tartt",
    cover: "https://covers.openlibrary.org/b/id/8231445-L.jpg",
    blurb: "Greek, ritual, murder — a campus novel that hums with dread.",
    tag: "Literary",
    description:
      "Under the influence of their charismatic classics professor, a group of clever, eccentric misfits at an elite New England college discover a way of thinking and living that is a world away from the humdrum existence of their contemporaries. But when they go beyond the boundaries of normal morality, they slip gradually from obsession to corruption and betrayal, and at last — inexorably — into evil. Donna Tartt's mesmerizing first novel is a remarkable achievement — both compelling and elegant, dramatic and playful.",
  },
  {
    googleId: "PGR2AwAAQBAJ_12",
    title: "Mexican Gothic",
    author: "Silvia Moreno-Garcia",
    cover: "https://covers.openlibrary.org/b/id/10410262-L.jpg",
    blurb: "A crumbling mansion in the Mexican hills, and walls that may be breathing.",
    tag: "Horror",
    description:
      "After receiving a frantic letter from her newly-wed cousin begging to be rescued from a mysterious doom, Noemí Taboada heads to High Place, a distant house in the Mexican countryside. She's not sure what she will find — her cousin's husband, a handsome Englishman, is a stranger, and Noemí knows little about the region. Noemí is also an unlikely rescuer: She's a glamorous debutante, more suited to cocktail parties than amateur sleuthing. But she's also tough and smart, with an indomitable will, and she is not afraid: not of her cousin's new husband, who is both menacing and alluring; not of his father, the ancient patriarch who seems to be fascinated by Noemí; and not even of the house itself, which begins to invade Noemi's dreams.",
  },
  {
    googleId: "FEAT_13",
    title: "The Shadow of the Wind",
    author: "Carlos Ruiz Zafón",
    cover: "https://covers.openlibrary.org/b/id/8231432-L.jpg",
    blurb: "A forgotten book, a hidden library, and a Barcelona steeped in ghosts.",
    tag: "Literary",
    description:
      "Barcelona, 1945: A city slowly heals from its war wounds, and Daniel, an antiquarian book dealer's son who mourns the loss of his mother, finds solace in a mysterious book entitled <em>The Shadow of the Wind</em>, by one Julián Carax. But when he sets out to find the author's other works, he makes a shocking discovery: someone has been systematically destroying every copy of every book Carax has written. In fact, Daniel may have the last of Carax's books in existence.",
  },
  {
    googleId: "FEAT_14",
    title: "Cloud Atlas",
    author: "David Mitchell",
    cover: "https://covers.openlibrary.org/b/id/8231115-L.jpg",
    blurb: "Six lives, six centuries, nested like Russian dolls in a single song.",
    tag: "Literary",
    description:
      "A reluctant voyager crossing the Pacific in 1850. A disinherited composer blagging his way into an aging maestro's household in 1930s Belgium. A vanity publisher fleeing his gangland creditors. A genetically modified 'dinery server' on death-row. And Zachry, a young Pacific Islander witnessing the nightfall of science and civilization. Their lives are linked across centuries by a comet-shaped birthmark and a single, transcendent vision.",
  },
  {
    googleId: "FEAT_15",
    title: "The Brief Wondrous Life of Oscar Wao",
    author: "Junot Díaz",
    cover: "https://covers.openlibrary.org/b/id/8231891-L.jpg",
    blurb: "Nerd-love, dictators, and a family curse — told in dazzling Spanglish.",
    tag: "Literary",
    description:
      "Oscar is a sweet but disastrously overweight ghetto nerd who — from the New Jersey home he shares with his old-world mother and rebellious sister — dreams of becoming the Dominican J.R.R. Tolkien and, most of all, finding love. But Oscar may never get what he wants, thanks to the Fukú — the curse that has haunted the Oscar's family for generations.",
  },
  {
    googleId: "FEAT_16",
    title: "Lincoln in the Bardo",
    author: "George Saunders",
    cover: "https://covers.openlibrary.org/b/id/8754681-L.jpg",
    blurb: "A graveyard chorus mourns a president's son in a feverish, polyphonic novel.",
    tag: "Literary",
    description:
      "February 1862. The Civil War is less than one year old. The fighting has begun in earnest, and the nation has begun to realize it is in for a long, bloody struggle. Meanwhile, President Lincoln's beloved eleven-year-old son, Willie, lies upstairs in the White House, gravely ill. In a matter of days, despite predictions of a recovery, Willie dies and is laid to rest in a Georgetown cemetery.",
  },
  {
    googleId: "FEAT_17",
    title: "There There",
    author: "Tommy Orange",
    cover: "https://covers.openlibrary.org/b/id/8754730-L.jpg",
    blurb: "Twelve urban Native lives converging on an Oakland powwow.",
    tag: "Literary",
    description:
      "Tommy Orange's wondrous and shattering novel follows twelve characters from Native communities: all traveling to the Big Oakland Powwow, all connected to one another in ways they may not yet realize. There is Jacquie Red Feather, newly sober and trying to make it back to the family she left behind. There is Dene Oxendene, pulling his life together after his uncle's death and working at the powwow to honor his memory.",
  },
  {
    googleId: "FEAT_18",
    title: "The Power",
    author: "Naomi Alderman",
    cover: "https://covers.openlibrary.org/b/id/8231722-L.jpg",
    blurb: "Women wake to a current in their hands — and the world tilts.",
    tag: "Science Fiction",
    description:
      "In <em>The Power</em>, the world is a recognizable place: there's a rich Nigerian boy who lounges around the family pool; a foster kid whose religious parents hide their true nature; an ambitious American politician; a tough London girl from a tricky family. But then a vital new force takes root and flourishes, causing their lives to converge with devastating effect. Teenage girls now have immense physical power — they can cause agonizing pain and even death.",
  },
  {
    googleId: "FEAT_19",
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    cover: "https://covers.openlibrary.org/b/id/8740156-L.jpg",
    blurb: "From cognitive revolution to algorithms — the human story, distilled.",
    tag: "Nonfiction",
    description:
      "From a renowned historian comes a groundbreaking narrative of humanity's creation and evolution that explores the ways in which biology and history have defined us and enhanced our understanding of what it means to be 'human.' How did our species succeed in the battle for dominance? Why did our foraging ancestors come together to create cities and kingdoms?",
  },
  {
    googleId: "FEAT_20",
    title: "The Underground Railroad",
    author: "Colson Whitehead",
    cover: "https://covers.openlibrary.org/b/id/8231445-L.jpg",
    blurb: "A literal railroad beneath the South — history reimagined as escape.",
    tag: "Historical",
    description:
      "Cora is a slave on a cotton plantation in Georgia. An outcast even among her fellow Africans, she is on the cusp of womanhood — where greater pain awaits. And so when Caesar, a slave who has recently arrived from Virginia, urges her to join him on the Underground Railroad, she seizes the opportunity and escapes with him.",
  },
  {
    googleId: "FEAT_21",
    title: "An American Marriage",
    author: "Tayari Jones",
    cover: "https://covers.openlibrary.org/b/id/8740214-L.jpg",
    blurb: "A young marriage cracked open by a wrongful conviction.",
    tag: "Contemporary",
    description:
      "Newlyweds Celestial and Roy are the embodiment of both the American Dream and the New South. He is a young executive, and she is an artist on the brink of an exciting career. But as they settle into the routine of their life together, they are ripped apart by circumstances neither could have imagined. Roy is arrested and sentenced to twelve years for a crime Celestial knows he didn't commit.",
  },
  {
    googleId: "FEAT_22",
    title: "The Vanishing Half",
    author: "Brit Bennett",
    cover: "https://covers.openlibrary.org/b/id/10523630-L.jpg",
    blurb: "Twin sisters, two lives, one passing across the color line.",
    tag: "Literary",
    description:
      "The Vignes twin sisters will always be identical. But after growing up together in a small, southern black community and running away at age sixteen, it's not just the shape of their daily lives that is different as adults, it's everything: their families, their communities, their racial identities. Many years later, one sister lives with her black daughter in the same southern town she once tried to escape. The other secretly passes for white, and her white husband knows nothing of her past.",
  },
  {
    googleId: "FEAT_23",
    title: "Hamnet",
    author: "Maggie O'Farrell",
    cover: "https://covers.openlibrary.org/b/id/10523495-L.jpg",
    blurb: "Plague, grief, and the boy who became a play.",
    tag: "Historical",
    description:
      "England, 1580: The Black Death creeps across the land, an ever-present threat, infecting the healthy, the sick, the old and the young, alike. The end of days is near, but life always goes on. A young Latin tutor — penniless and bullied by a violent father — falls in love with an extraordinary, eccentric young woman. Agnes is a wild creature who walks her family's land with a falcon on her glove and is known throughout the countryside for her unusual gifts as a healer.",
  },
  {
    googleId: "FEAT_24",
    title: "Anxious People",
    author: "Fredrik Backman",
    cover: "https://covers.openlibrary.org/b/id/10410378-L.jpg",
    blurb: "A botched bank robbery becomes the gentlest hostage drama you'll ever read.",
    tag: "Contemporary",
    description:
      "Looking at real estate isn't usually a life-or-death situation, but an apartment open house becomes just that when a failed bank robber bursts in and takes a group of strangers hostage. The captives include a recently retired couple who relentlessly hunt down fixer-uppers to avoid the painful truth that they can't fix their own marriage, a wealthy bank director who has been too busy to care about anyone else, and a young couple who are about to have their first child but can't seem to agree on anything.",
  },
  {
    googleId: "FEAT_25",
    title: "The Secret History",
    author: "Donna Tartt",
    cover: "https://covers.openlibrary.org/b/id/8231884-L.jpg",
    blurb: "A clique of classics students, a Vermont winter, and a beautiful crime.",
    tag: "Literary",
    description:
      "Under the influence of their charismatic classics professor, a group of clever, eccentric misfits at an elite New England college discover a way of thinking and living that is a world away from the humdrum existence of their contemporaries. But when they go beyond the boundaries of normal morality, they slip gradually from obsession to corruption and betrayal, and at last — inexorably — into evil.",
  },
  {
    googleId: "FEAT_26",
    title: "All the Light We Cannot See",
    author: "Anthony Doerr",
    cover: "https://covers.openlibrary.org/b/id/8155565-L.jpg",
    blurb: "A blind French girl and a German boy, drawn together by war and radio waves.",
    tag: "Historical",
    description:
      "Marie-Laure lives in Paris near the Museum of Natural History, where her father works. When she is six, she goes blind, and her father builds her a model of their neighborhood, every house, every manhole, so she can memorize it with her fingers and navigate the real streets. When the Germans occupy Paris, father and daughter flee to Saint-Malo, carrying with them what may be the museum's most valuable jewel. In a mining town in Germany, the orphan Werner grows up with his younger sister, enchanted by a crude radio they find. Werner becomes an expert at building and fixing these crucial new instruments, a talent that wins him a place at a brutal academy for Hitler Youth, then a special assignment to track the resistance.",
  },
  {
    googleId: "FEAT_27",
    title: "The Midnight Library",
    author: "Matt Haig",
    cover: "https://covers.openlibrary.org/b/id/10523545-L.jpg",
    blurb: "Between life and death, a library of every life you might have lived.",
    tag: "Fabulist",
    description:
      "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices. Would you have done anything different, if you had the chance to undo your regrets? A novel about all the choices that go into a life well lived.",
  },
  {
    googleId: "FEAT_28",
    title: "The Priory of the Orange Tree",
    author: "Samantha Shannon",
    cover: "https://covers.openlibrary.org/b/id/8915999-L.jpg",
    blurb: "Dragons, queens, and a thousand-year prophecy at the edge of the world.",
    tag: "Fantasy",
    description:
      "A world divided. A queendom without an heir. An ancient enemy awakens. The House of Berethnet has ruled Inys for a thousand years. Still unwed, Queen Sabran the Ninth must conceive a daughter to protect her realm from destruction — but assassins are getting closer to her door. Ead Duryan is an outsider at court. Though she has risen to the position of lady-in-waiting, she is loyal to a hidden society of mages. Ead keeps a watchful eye on Sabran, secretly protecting her with forbidden magic.",
  },
  {
    googleId: "FEAT_29",
    title: "Tomorrow, and Tomorrow, and Tomorrow",
    author: "Gabrielle Zevin",
    cover: "https://covers.openlibrary.org/b/id/13195013-L.jpg",
    blurb: "Two friends, three decades, and the games they build to keep each other.",
    tag: "Contemporary",
    description:
      "On a bitter-cold day, in the December of his junior year at Harvard, Sam Masur exits a subway car and sees, amid the hordes of people waiting on the platform, Sadie Green. He calls her name. For a moment, she pretends she hasn't heard him, but then, she turns, and a game begins: a legendary collaboration that will launch them to stardom. These friends, intimates since childhood, borrow money, beg favors, and, before even graduating college, they have created their first blockbuster, Ichigo. Overnight, the world is theirs. Not even twenty-five years old, Sam and Sadie are brilliant, successful, and rich, but these qualities won't protect them from their own creative ambitions or the betrayals of their hearts.",
  },
  {
    googleId: "FEAT_30",
    title: "Babel",
    author: "R.F. Kuang",
    cover: "https://covers.openlibrary.org/b/id/12827457-L.jpg",
    blurb: "Translation, empire, and silver-worked magic at an alternate Oxford.",
    tag: "Fantasy",
    description:
      "Traduttore, traditore: An act of translation is always an act of betrayal. 1828. Robin Swift, orphaned by cholera in Canton, is brought to London by the mysterious Professor Lovell. There, he trains for years in Latin, Ancient Greek, and Chinese, all in preparation for the day he'll enroll in Oxford University's prestigious Royal Institute of Translation — also known as Babel. Babel is the world's center for translation and, more importantly, magic. Silver-working — the art of manifesting the meaning lost in translation through enchanted silver bars — has made the British unparalleled in power.",
  },
  {
    googleId: "FEAT_31",
    title: "The Invisible Life of Addie LaRue",
    author: "V.E. Schwab",
    cover: "https://covers.openlibrary.org/b/id/10523660-L.jpg",
    blurb: "A woman cursed to be forgotten, until one boy remembers her name.",
    tag: "Fabulist",
    description:
      "France, 1714: in a moment of desperation, a young woman makes a Faustian bargain to live forever — and is cursed to be forgotten by everyone she meets. Thus begins the extraordinary life of Addie LaRue, and a dazzling adventure that will play out across centuries and continents, across history and art, as a young woman learns how far she will go to leave her mark on the world. But everything changes when, after nearly 300 years, Addie stumbles across a young man in a hidden bookstore who remembers her name.",
  },
  {
    googleId: "FEAT_32",
    title: "Demon Copperhead",
    author: "Barbara Kingsolver",
    cover: "https://covers.openlibrary.org/b/id/13073908-L.jpg",
    blurb: "Dickens reborn in Appalachia — fierce, funny, and breath-stoppingly alive.",
    tag: "Literary",
    description:
      "Set in the mountains of southern Appalachia, this is the story of a boy born to a teenaged single mother in a single-wide trailer, with no assets beyond his dead father's good looks and copper-colored hair, a caustic wit, and a fierce talent for survival. Relayed in his own unsparing voice, Demon braves the modern perils of foster care, child labor, derelict schools, athletic success, addiction, disastrous loves, and crushing losses. Through all of it, he reckons with his own invisibility in a popular culture where even the superheroes have abandoned rural people in favor of cities.",
  },
  {
    googleId: "FEAT_33",
    title: "The Heart's Invisible Furies",
    author: "John Boyne",
    cover: "https://covers.openlibrary.org/b/id/8916003-L.jpg",
    blurb: "Seventy years of one Irish life, told in the keys of grief and grace.",
    tag: "Literary",
    description:
      "Cyril Avery is not a real Avery — or at least, that's what his adoptive parents tell him. And he never will be. But if he isn't a real Avery, then who is he? Born out of wedlock to a teenage girl cast out from her rural Irish community and adopted by a well-to-do if eccentric Dublin couple via the intervention of a hunchbacked Redemptorist nun, Cyril is adrift in the world, anchored only tenuously by his heartfelt friendship with the infinitely more glamorous and dissolute Julian Woodbead.",
  },
  {
    googleId: "FEAT_34",
    title: "Mexican Gothic",
    author: "Silvia Moreno-Garcia",
    cover: "https://covers.openlibrary.org/b/id/10243755-L.jpg",
    blurb: "A glamorous socialite, a crumbling mansion, and a house that dreams.",
    tag: "Gothic",
    description:
      "After receiving a frantic letter from her newly-wed cousin begging for someone to save her from a mysterious doom, Noemí Taboada heads to High Place, a distant house in the Mexican countryside. She's not sure what she will find — her cousin's husband, a handsome Englishman, is a stranger, and Noemí knows little about the region. Noemí is also an unlikely rescuer: She's a glamorous debutante, and her chic gowns and perfect red lipstick are more suited for cocktail parties than amateur sleuthing. But she's also tough and smart, with an indomitable will, and she is not afraid.",
  },
  {
    googleId: "FEAT_35",
    title: "Lessons in Chemistry",
    author: "Bonnie Garmus",
    cover: "https://covers.openlibrary.org/b/id/12827454-L.jpg",
    blurb: "A 1960s chemist becomes the unlikely host of America's favorite cooking show.",
    tag: "Contemporary",
    description:
      "Chemist Elizabeth Zott is not your average woman. In fact, Elizabeth Zott would be the first to point out that there is no such thing as an average woman. But it's the early 1960s and her all-male team at Hastings Research Institute takes a very unscientific view of equality. Except for one: Calvin Evans; the lonely, brilliant, Nobel-prize-nominated grudge holder who falls in love with — of all things — her mind. Fast-forward, and Elizabeth Zott is now a single mother and the reluctant star of America's most beloved cooking show.",
  },
  {
    googleId: "FEAT_36",
    title: "The Wind-Up Bird Chronicle",
    author: "Haruki Murakami",
    cover: "https://covers.openlibrary.org/b/id/8231257-L.jpg",
    blurb: "A missing cat, a missing wife, and a Tokyo turning quietly surreal.",
    tag: "Fabulist",
    description:
      "In a Tokyo suburb, a young man named Toru Okada searches for his wife's missing cat — and then for his wife as well — in a netherworld beneath the city's placid surface. As these searches intersect, he encounters a bizarre group of allies and antagonists. Gripping, prophetic, and suffused with comedy and menace, this is a tour de force equal in scope to the masterpieces of Mishima and Pynchon.",
  },
];