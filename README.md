# PuzzleBattle

PuzzleBattle is a chess puzzle training application built with React, TypeScript and chess.js. It uses the Lichess API to retrieve chess puzzles.

Live application: https://ov-git.github.io/PuzzleBattle/#/
Getting Started
Prerequisites
- Node.js (LTS recommended)
- npm
## Installation

1. Clone the repository:
   git clone https://github.com/ov-git/PuzzleBattle.git
2. Navigate to the project directory:
   cd PuzzleBattle
3. Install dependencies:
   npm install
4. Start the development server:
   npm run dev
5. Application will run at http://localhost:5173/ by default.
## Lichess API Configuration

To use the Lichess puzzle API, you need an API access token.
1. Generate a token at https://lichess.org/account/oauth/token.
2. Create a .env file in the project root.
3. Add your token:
   VITE_LICHESS_API=your_token_here
