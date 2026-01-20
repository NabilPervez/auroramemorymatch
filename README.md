# Aurora Memory Match

A high-quality, aesthetically pleasing "micro-game" that provides immediate feedback, smooth interactions, and a relaxing yet challenging environment.

## Features

- **Aurora Theme**: Deep purples, teals, and glowing gradients.
- **Micro-Game**: strictly enforced 60-second timer.
- **Physics-based Animations**: Uses Framer Motion for card flips and interactions.
- **Holographic Cards**: Interactive 3D tilt and shader effects on rare cards managed via `holo.css`.
- **Responsive**: 4x4 grid that fits on any device.

## Tech Stack

- React 18+
- Tailwind CSS
- Framer Motion
- Lucide React Icons

## Project Structure

- `src/components/`: React components (Card, Grid, GameContainer, etc.)
- `src/styles/`: Custom CSS including `holo.css` for advanced card effects.
- `src/utils/`: Game logic and helpers.

## How to Run

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```
