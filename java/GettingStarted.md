# Q-Words Game - Getting Started

## Overview
Q-Words is a web-based word guessing game built with Spring Boot. Players guess a 6-letter word within 6 attempts, receiving visual feedback on letter positions.

## Framework & Technology Stack
- **Spring Boot 2.7.2** - Main web framework
- **Thymeleaf** - Template engine for HTML rendering
- **Maven** - Build and dependency management
- **Java 1.8** - Runtime environment
- **Bootstrap 5.3.0** - Frontend styling
- **Lombok** - Code generation library

## Application Structure

### Package Organization
```
com.sample.qwords/
├── controller/     # Web controllers (HomeController, GameController)
├── model/         # Data models (Word, GameStatus enum)
├── service/       # Business logic (WordSelectionService)
├── repository/    # Data access (WordList)
└── utils/         # Utilities (RandomUtils, Math)
```

### Key Classes

**GameController** - Handles game logic, user guesses, and session management
**Word** - Core model with guess validation and feedback generation
**WordSelectionService** - Manages random word selection
**WordList** - Loads and manages word dictionary from `words.txt`
**GameStatus** - Enum for game states (INPROGRESS, SUCCESS, FAILED)

## Setup Instructions

### Prerequisites
- Java 1.8+
- Maven 3.6+

### Quick Start
1. **Navigate to project directory**
   ```bash
   cd /Workshop/java
   ```

2. **Build application**
   ```bash
   mvn clean install
   ```

3. **Run application**
   ```bash
   mvn spring-boot:run
   ```

4. **Access game**
   - Open browser to `http://localhost:8090`
   - Enter your name and start playing

### Configuration
- **Port**: 8090 (configured in `application.properties`)
- **Word List**: `src/main/resources/words.txt` (37 6-letter words)
- **Max Attempts**: 6 per game

## Game Rules
- Guess 6-letter words
- Visual feedback: `+` (correct position), `?` (wrong position), `X` (not in word)
- 6 attempts maximum
- Session-based gameplay

## Testing
```bash
mvn test
```

Available tests: `WordListTest`, `RandomUtilsTest`