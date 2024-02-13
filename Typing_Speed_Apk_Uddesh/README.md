# Typing Speed Test Project

This project is a web-based typing speed test that allows users to improve their typing skills by typing randomly generated paragraphs within a specified time limit. The project provides real-time feedback on typing accuracy, words per minute (WPM), characters per minute (CPM), and mistakes made during the typing session.

## Hosted Link


## Project Working

1. **Typing Interface**: Upon loading the page, users are presented with a typing interface containing a text input field, a display area for the randomly generated paragraph, and result details including time left, mistakes, WPM, and CPM.

2. **Generating Paragraphs**: Clicking the "Try Again" button generates a new paragraph for the user to type. The paragraphs are randomly selected from a predefined array stored in `paragraph.js`.

3. **Typing Feedback**: As users type in the input field, the project provides real-time feedback on their typing accuracy. Correctly typed characters are displayed in regular text, while incorrectly typed characters are highlighted in red. The interface also updates the mistake count accordingly.

4. **Timer**: The project includes a countdown timer set to 60 seconds. The timer starts automatically when users begin typing and stops when the time runs out.

5. **Performance Metrics**: Throughout the typing session, the project calculates and displays performance metrics such as WPM and CPM based on the user's typing speed and accuracy.

6. **Resetting the Game**: Users can reset the typing exercise at any time by clicking the "Try Again" button. This action clears the input field, generates a new paragraph, resets the timer, and updates all relevant performance metrics.

## JavaScript Concepts Used

- **DOM Manipulation**: The project dynamically updates the HTML content to display the randomly generated paragraph and provide real-time feedback on typing accuracy and performance metrics.

- **Event Handling**: Event listeners are used to detect user interactions such as typing in the input field, clicking the "Try Again" button, and focusing on elements within the typing interface.

- **Interval Timer**: An interval timer (`setInterval()`) is used to update the countdown timer and calculate performance metrics at regular intervals during the typing session.

- **Conditional Statements**: Conditional statements (`if`, `else`) are used to control the flow of the typing exercise, check for typing accuracy, and handle timer expiration.

- **Functions**: The project utilizes functions to encapsulate specific tasks such as generating paragraphs, initializing typing functionality, updating performance metrics, and resetting the typing exercise.

- **Arrays and Math Methods**: The project randomly selects paragraphs from a predefined array using the `Math.random()` and `Math.floor()` methods.

- **CSS Class Manipulation**: The project dynamically adds and removes CSS classes to highlight correctly and incorrectly typed characters, providing visual feedback to the user.

- **CSS Animations**: CSS animations (`@keyframes`) are used to create a blinking effect on the currently active character being typed.

