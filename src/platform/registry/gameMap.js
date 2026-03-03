export const gameMap = {
    "tic-tac-toe": {
        name: "Tic Tac Toe",
        description: "The classic game of X's and O's with a neon twist.",
        image: "/games/cover_tic_tac_toe.png",
        category: "Arcade",
        componentPath: "@/games/tic-tac-toe/Game",
        rating: 4.8,
        size: "small",
        color: "from-amber-400 to-orange-600",
        icon: "Hash"
    },

    "minesweeper": {
        name: "Cyber Sweeper",
        description: "Hack the grid. flag corruption. Don't trigger the firewall.",
        image: "/games/cover_minesweeper.png",
        category: "Puzzle",
        componentPath: "@/games/minesweeper/Game",
        rating: 4.9,
        size: "small",
        color: "from-green-500 to-emerald-700",
        icon: "Bomb"
    },

    "cricket": {
        name: "Quick Cricket",
        description: "Tap to smash 6s! Fast-paced cricket action.",

        image: "/games/cover_cricket.png",
        category: "Sports",
        componentPath: "@/games/cricket/Game",
        rating: 4.8,
        size: "small",
        color: "from-blue-500 to-sky-400",
        icon: "Trophy"
    },

    "samurai-fruit-cutter": {
        name: "Samurai Fruit Cutter",
        description: "Slice fruits with katana precision.",

        image: "/games/cover_samurai_fruit_cutter.png",
        category: "Arcade",
        componentPath: "@/games/samurai-fruit-cutter/Game",
        rating: 4.9,
        size: "medium", // 2x1
        color: "from-orange-400 to-red-600",
        icon: "Sword"
    },

    "flappy-bird": {
        name: "Flappy Bird",
        description: "Navigate the bird through the pipes.",

        image: "/games/cover_flappy_bird.png",
        category: "Arcade",
        componentPath: "@/games/flappy-bird/Game",
        rating: 4.5,
        size: "small", // 1x1
        color: "from-sky-400 to-blue-600",
        icon: "Bird"
    },
    "neon-racer": {
        name: "Neon Racer",
        description: "High-speed 2D lane racing.",

        image: "/games/cover_neon_racer.png",
        category: "Racing",
        componentPath: "@/games/neon-racer/Game",
        rating: 4.8,
        size: "medium",
        color: "from-purple-500 to-indigo-700",
        icon: "Car"
    },
    "bubble-shooter": {
        name: "Bubble Shooter",
        description: "Match 3 bubbles to pop them.",

        image: "/games/cover_bubble_shooter.png",
        category: "Arcade",
        componentPath: "@/games/bubble-shooter/Game",
        rating: 4.7,
        size: "small",
        color: "from-pink-400 to-rose-600",
        icon: "CircleDot"
    },
    "chess": {
        name: "2D Chess",
        description: "Classic Strategy Game.",

        image: "/games/cover_chess.png",
        category: "Strategy",
        componentPath: "@/games/chess/Game",
        rating: 4.9,
        size: "small", // 1x1
        color: "from-emerald-400 to-green-600",
        icon: "Crown"
    },
    // Adding more mock games for the grid effect
    "2048": {
        name: "2048",
        description: "Join the numbers to get to the 2048 tile!",

        image: "/games/cover_2048.png",
        category: "Puzzle",
        componentPath: "@/games/2048/Game",
        rating: 4.8,
        size: "small",
        color: "from-yellow-400 to-amber-600",
        icon: "LayoutGrid"
    },
    "snake": {
        name: "Snake IO",
        description: "Grow your snake and avoid walls.",

        image: "/games/cover_snake.png",
        category: "Arcade",
        componentPath: "@/games/snake/Game",
        rating: 4.7,
        size: "small",
        color: "from-lime-400 to-green-600",
        icon: "Activity"
    },
    "sudoku-master": {
        name: "Sudoku Master",
        description: "Classic logic puzzle with notes & hints.",

        image: "/games/cover_sudoku_master.png",
        category: "Puzzle",
        componentPath: "@/games/sudoku-master/Game",
        rating: 4.9,
        size: "medium",
        color: "from-blue-500 to-indigo-700",
        icon: "Grid3x3"
    },
    "ludo": {
        name: "Ludo Classic",
        description: "The classic royal game of strategy, luck, and racing!",

        image: "/games/cover_ludo.png",
        category: "Board",
        componentPath: "@/games/ludo/Game",
        rating: 4.8,
        size: "small",
        color: "from-fuchsia-500 to-pink-600",
        icon: "Dice5"
    },
    "connect-four": {
        name: "Connect Four",
        description: "Strategy board game. Connect 4 discs to win.",
        image: "/games/cover_connect_four.png",
        category: "Board",
        componentPath: "@/games/connect-four/Game",
        rating: 4.8,
        size: "small",
        color: "from-blue-500 to-indigo-600",
        icon: "Circle"
    },
    "rock-paper-scissors": {
        name: "Rock Paper Scissors",
        description: "Classic hand game. Beat the AI!",
        image: "/games/cover_rock_paper_scissors.png",
        category: "Arcade",
        componentPath: "@/games/rock-paper-scissors/Game",
        rating: 4.7,
        size: "small",
        color: "from-rose-500 to-amber-500",
        icon: "Scissors"
    },
    "whack-a-mole": {
        name: "Whack-a-Mole",
        description: "Fast-paced arcade fun! Hit the moles.",
        image: "/games/cover_whack_a_mole.png",
        category: "Arcade",
        componentPath: "@/games/whack-a-mole/Game",
        rating: 4.6,
        size: "small",
        color: "from-amber-600 to-stone-700",
        icon: "Hammer"
    },
    "breakout": {
        name: "Breakout",
        description: "Classic brick-breaking arcade action.",
        image: "/games/cover_breakout.png",
        category: "Arcade",
        componentPath: "@/games/breakout/Game",
        rating: 4.9,
        size: "small",
        color: "from-blue-500 to-purple-600",
        icon: "Monitor"
    },
    "dots-and-boxes": {
        name: "Dots and Boxes",
        description: "Classic strategy puzzle. Connect dots to claim boxes.",
        image: "/games/cover_dots_and_boxes.png",
        category: "Puzzle",
        componentPath: "@/games/dots-and-boxes/Game",
        rating: 4.8,
        size: "small",
        color: "from-blue-400 to-indigo-600",
        icon: "BoxSelect"
    },
    "hangman": {
        name: "Hangman",
        description: "Guess the hidden word before the drawing is complete.",
        image: "/games/cover_hangman.png",
        category: "Puzzle",
        componentPath: "@/games/hangman/Game",
        rating: 4.7,
        size: "small",
        color: "from-indigo-500 to-purple-700",
        icon: "HelpCircle"
    },
    "memory-match": {
        name: "Memory Match",
        description: "Test your memory! Flip cards to find matching emoji pairs.",
        image: "/games/cover_memory_match.png",
        category: "Puzzle",
        componentPath: "@/games/memory-match/Game",
        rating: 4.8,
        size: "small",
        color: "from-indigo-500 to-purple-600",
        icon: "Brain"
    },
    "word-guess": {
        name: "Word Guess",
        description: "Guess the hidden 5-letter word in 6 attempts.",
        image: "/games/cover_word_guess.png",
        category: "Puzzle",
        componentPath: "@/games/word-guess/Game",
        rating: 4.9,
        size: "small",
        color: "from-green-500 to-emerald-700",
        icon: "Grid"
    }
    ,
    "aim-trainer-pro": {
        name: "Aim Trainer Pro",
        description: "Test your reflexes. Hit targets fast. No mercy.",
        image: "/games/cover_aim_trainer_pro.png",
        category: "Skill",
        componentPath: "@/games/aim-trainer-pro/Game",
        rating: 4.9,
        size: "small",
        color: "from-cyan-500 to-blue-600",
        icon: "Target"
    },
    "knife-hit": {
        name: "Knife Hit",
        description: "Throw knives. Hit targets. Don't miss.",
        image: "/games/cover_knife_hit.png",
        category: "Arcade",
        componentPath: "@/games/knife-hit/Game",
        rating: 4.8,
        size: "medium",
        color: "from-slate-700 to-slate-900",
        icon: "Sword"
    },
    "stack-tower": {
        name: "Stack Tower",
        description: "Stack blocks as high as you can!",
        image: "/games/cover_stack_tower.png",
        category: "Arcade",
        componentPath: "@/games/stack-tower/Game",
        rating: 4.8,
        size: "small",
        color: "from-blue-500 to-indigo-600",
        icon: "Blocks"
    },
    "traffic-dodge-3d": {
        name: "Traffic Dodge 3D",
        description: "High-speed 3D traffic weaving. Dodge, drift, and survive!",
        image: "/games/cover_traffic_dodge.png",
        category: "Racing",
        componentPath: "@/games/traffic-dodge-3d/Game",
        rating: 4.9,
        size: "large",
        color: "from-cyan-500 to-purple-600",
        icon: "Car"
    },
    "dog-simulator-3d": {
        name: "Dog Simulator 3D",
        description: "Live the life of a dog in this 3D simulator adventure.",
        image: "/games/dog-simulator-3d.png",
        category: "Simulation",
        componentPath: "@/games/dog-simulator-3d/Game",
        rating: 4.8,
        size: "large",
        color: "from-amber-600 to-orange-800",
        icon: "Gamepad2"
    },
    "subway-surfers": {
        name: "Subway Surfers",
        description: "Dodge trains and escape the inspector in this endless runner.",
        image: "https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=1200,height=1200,fit=cover,f=png/7f4c7dc492227ec127a47e4b3197754e/subway-surfers.png",
        category: "Arcade",
        componentPath: "@/games/subway-surfers/Game",
        rating: 4.8,
        size: "large",
        color: "from-blue-500 to-indigo-600",
        icon: "Activity"
    },
    "stunt-bike-extreme": {
        name: "Stunt Bike Extreme",
        description: "Perform insane stunts on your trial bike!",
        image: "https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=1200,height=1200,fit=cover,f=png/690e808e92f232fa82d7747e9b00fedb/stunt-bike-extreme.png",
        category: "Racing",
        componentPath: "@/games/stunt-bike-extreme/Game",
        rating: 4.8,
        size: "large",
        color: "from-red-500 to-orange-600",
        icon: "Bike"
    },
    "hill-climb-racing-lite": {
        name: "Hill Climb Racing Lite",
        description: "Drive up silly hills, collect coins, and don't flip your car!",
        image: "https://nargames.com/storage/uploads/thumbs/hill-climb-racing-lite-180x180.webp",
        category: "Racing",
        componentPath: "@/games/hill-climb-racing-lite/Game",
        rating: 4.9,
        size: "large",
        color: "from-orange-500 to-amber-700",
        icon: "Car"
    },
    "temple-run-2": {
        name: "Temple Run 2",
        description: "Infinite endless running adventure!",
        image: "https://templerun-2.io/data/image/game/temple-run-2-game.jpg",
        category: "Action",
        componentPath: "@/games/temple-run-2/Game",
        rating: 4.8,
        size: "large",
        color: "from-yellow-500 to-orange-600",
        icon: "Activity"
    },
    "rally-racer-dirt": {
        name: "Rally Racer Dirt",
        description: "Experience the thrill of off-road drifting and high-speed racing!",
        image: "https://imgs.crazygames.com/rally-racer-dirt_16x9/20260220034629/rally-racer-dirt_16x9-cover?metadata=none&quality=100&width=1200&height=630&fit=crop",
        category: "Racing",
        componentPath: "@/games/rally-racer-dirt/Game",
        rating: 4.9,
        size: "large",
        color: "from-stone-600 to-amber-700",
        icon: "Car"
    },
    "man-runner-2048": {
        name: "Man Runner 2048",
        description: "Run, merge numbers, and reach 2048 in this addictive runner!",
        image: "https://imgs.crazygames.com/man-runner-2048_16x9/20260220034629/man-runner-2048_16x9-cover?metadata=none&quality=100&width=1200&height=630&fit=crop",
        category: "Arcade",
        componentPath: "@/games/man-runner-2048/Game",
        rating: 4.7,
        size: "large",
        color: "from-violet-500 to-fuchsia-600",
        icon: "Activity"
    }
};
