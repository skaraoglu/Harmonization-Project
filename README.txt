# Harmonization Project

skaraoglu.github.io/harmonization-project/ 

This project creates a random melody and try to get a harmony between selected chord progression and evolved melody.
To achieve this goal evolutionary process is applied to the random melody, with this process melody gets better in terms of being in a harmony with the chord progression.
To run the application, several steps must be followed:
- Select a scale. Currently there are two scales that this project supports. One of the minor and major scales can be selected.
- Select a chord progression. Chord progressions can be in a great variety, only 2 of them are available for this project right now.
- Select a root note. Root note is where the scale starts, chords that take place in the progression are created after root note selection.
- Note duration creation. Creates a 4-4 bar 16 quarter note equivalent time sequence. Melody uses this note duration list for the created notes.
- Generate new population. With this button, completely random 10 lists are produced. Their fitness is calculated respecting to the root note and scale. They arranged with their fitness. Fittest and the second fittest notes shown on the top exclusively.
- Evolution button applies 3 step evolutionary process to the fittest and second fittest individual. Evolutionary process creates a new individual from the fittest two, then creates a whole new generation from the new individual.
- Play. Plays the current fittest melody and the selected chord progression together.
