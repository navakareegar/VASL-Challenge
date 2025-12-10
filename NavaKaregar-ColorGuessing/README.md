# Color Guessing Game

A fun and interactive color guessing game built with Next.js, React, and TypeScript.

## Challenge Info

- **Challenge Name**: 3. Color Guessing Game
- **Author**: Nava Karegar
- **Tech Stack**: Next.js 16, React 19, TypeScript, Material UI, Tailwind CSS

## Game Rules

1. The game randomly selects 5 colors from the available options: Red, Green, Blue, Yellow, Orange
2. You have **15 attempts** to guess the correct color sequence
3. After each guess, you receive feedback:
   - ✅ **Green checkmark**: Correct color in the correct position
   - 🟡 **Yellow circle**: Correct color but in the wrong position
   - ❌ **Red X**: Color is not in the sequence
4. Win by guessing all 5 colors in the correct order!

## Features

- 🎮 Interactive color selection with dropdown menus
- 📜 Guess history tracking with visual feedback
- 🎯 Real-time validation on form inputs
- 🏆 Win/lose detection with celebration messages
- 🔄 Play again functionality
- 📱 Responsive design

## How to Run

### Prerequisites

- Node.js 18+ installed
- npm or yarn or pnpm package manager

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Command                | Description               |
| ---------------------- | ------------------------- |
| `npm run dev`          | Start development server  |
| `npm run build`        | Build for production      |
| `npm run start`        | Start production server   |
| `npm run lint`         | Run ESLint                |
| `npm run lint:fix`     | Fix ESLint errors         |
| `npm run format`       | Format code with Prettier |
| `npm run format:check` | Check code formatting     |
| `npm run test`         | Run Jest unit tests       |
| `npm run test:watch`   | Run tests in watch mode   |

### Running E2E Tests

```bash
# Install Playwright browsers (first time only)
npx playwright install

# Run Playwright tests
npx playwright test

# Run tests with UI
npx playwright test --ui
```

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4, Material UI 7
- **Form Handling**: React Hook Form
- **Icons**: Ant Design Icons
- **Testing**: Jest (unit), Playwright (E2E)
- **Code Quality**: ESLint 9, Prettier

## Known Limitations / Future Improvements

- [ ] Add difficulty levels (easy: 3 colors, hard: 7 colors)
- [ ] Implement a timer for speed challenges
- [ ] Store high scores in local storage
- [ ] Add keyboard navigation support
- [ ] Add multiplayer mode
