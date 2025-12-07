# Use Cases

## Actors
- **User**: The primary individual using the application to log time and view insights.
- **System**: The backend logic that processes data and generates suggestions.

## Core Use Cases

### UC1: Log Daily Activities
- **Actor**: User
- **Goal**: Input activities for a specific date.
- **Flow**:
  1. User navigates to Input page.
  2. User adds multiple rows (Activity Name, Category, Minutes).
  3. User enters/updates current focus Goals.
  4. User submits the log.
- **Alternative**: Validation fail (Total > 24h) -> Error displayed.

### UC2: View Analysis & Suggestions
- **Actor**: User
- **Goal**: Understand time usage and get coaching.
- **Flow**:
  1. System calculates category distribution.
  2. System identifies Top Over-Invested (e.g., 40% on Social Media) and Neglected (e.g., 0% on Health) categories.
  3. System generates 3 specific text suggestions.
  4. User views donut chart and suggestion cards.

### UC3: View History
- **Actor**: User
- **Goal**: See past entries to spot trends.
- **Flow**:
  1. User navigates to History page.
  2. System retrieves list of past stored analyses.
  3. User views summary cards of previous days.
