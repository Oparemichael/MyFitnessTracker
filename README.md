# Fitness Tracker Application

A modern fitness tracking application built with React, Vite, and Tailwind CSS that helps users monitor their workouts, set goals, and track progress.

## Features

- **User Authentication**: Demo login system
- **Activity Tracking**: Monitor steps, distance, and calories
- **Goal Setting**: Set and track daily/weekly/monthly fitness goals
- **Progress Visualization**: Interactive charts and progress indicators
- **Exercise Database**: Browse exercises with the wger API integration

## Technologies Used

- ⚛️ React 18
- 🚀 Vite (Build Tool)
- 🎨 Tailwind CSS (Styling)
- 📊 Chart.js (Data Visualization)
- 🔄 React Router (Navigation)
- 💪 wger API (Exercise Database)

## Folder Structure

```
src/
├── components/
│   ├── Auth/
│   ├── Dashboard/
│   └── Shared/
├── contexts/
├── pages/
├── App.jsx
├── main.jsx
└── index.css
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/fitness-tracker.git
   cd fitness-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

## Usage

1. **Demo Login**: Enter any email and password to access the dashboard
2. **Dashboard**: View your activity summary and progress
3. **Exercise Browser**: Browse exercises from the wger API
4. **Goal Tracking**: Set and monitor your fitness goals

## API Integration

The application uses the [wger Workout Manager API](https://wger.de/en/software/api) for exercise data:

- Exercise list: `https://wger.de/api/v2/exercise/`
- Exercise details: `https://wger.de/api/v2/exerciseinfo/{id}/`
- Muscle groups: `https://wger.de/api/v2/muscle/`

## Customization

Edit the Tailwind configuration in `tailwind.config.js`:
```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#3B82F6',
          600: '#2563EB',
        }
      }
    }
  }
}
```

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


Would you like me to modify any specific section or add more details about particular features?
