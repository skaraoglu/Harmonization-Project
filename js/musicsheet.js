//This function draws the fittest notes to the stave.
function fu (){
  var ulElement = document.getElementById("fittestUl");
  var liElements = ulElement.getElementsByTagName("li");
  var elements = [];
  var eDurations = [];
  for (var i = 0; i < liElements.length - 1; i++) {
    var str1 = String(liElements[i].innerHTML);
    elements[i] = str1.substr(0,2);
    eDurations = getNoteDurations();
  }

  VF = Vex.Flow;

  // Create an SVG renderer and attach it to the DIV element named "boo".
  var div = document.getElementById("boo")
  if (div.innerHTML != ""){div.innerHTML="";}
  var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

  // Configure the rendering context.
  renderer.resize(1150, 200);
  var context = renderer.getContext();
  context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

  // Create a stave of width 400 at position 10, 40 on the canvas.
  var stave = new VF.Stave(10, 40, 1250);

  // Add a clef and time signature.
  stave.addClef("treble").addTimeSignature("4/4");

  // Connect it to the rendering context and draw!
  stave.setContext(context).draw();
  var noteName = [];
  var noteDuration = [];
  for (var i = 0; i < elements.length; i++) {
    if (elements[i] === "60") {noteName[i] = "c/4";}
    else if (elements[i] === "61") {noteName[i] = "db/4";}
    else if (elements[i] === "62") {noteName[i] = "d/4";}
    else if (elements[i] === "63") {noteName[i] = "eb/4";}
    else if (elements[i] === "64") {noteName[i] = "e/4";}
    else if (elements[i] === "65") {noteName[i] = "f/4";}
    else if (elements[i] === "66") {noteName[i] = "gb/4";}
    else if (elements[i] === "67") {noteName[i] = "g/4";}
    else if (elements[i] === "68") {noteName[i] = "ab/4";}
    else if (elements[i] === "69") {noteName[i] = "a/4";}
    else if (elements[i] === "70") {noteName[i] = "bb/4";}
    else if (elements[i] === "71") {noteName[i] = "b/4";}
    else if (elements[i] === "72") {noteName[i] = "c/5";}
    else if (elements[i] === "73") {noteName[i] = "db/5";}
    else if (elements[i] === "74") {noteName[i] = "d/5";}
    else if (elements[i] === "75") {noteName[i] = "eb/5";}
    else if (elements[i] === "76") {noteName[i] = "e/5";}
    else if (elements[i] === "77") {noteName[i] = "f/5";}
    else if (elements[i] === "78") {noteName[i] = "gb/5";}
    else if (elements[i] === "79") {noteName[i] = "g/5";}
    else if (elements[i] === "80") {noteName[i] = "ab/5";}
    else if (elements[i] === "81") {noteName[i] = "a/5";}
    else if (elements[i] === "82") {noteName[i] = "bb/5";}
    else if (elements[i] === "83") {noteName[i] = "b/5";}
    else if (elements[i] === "84") {noteName[i] = "0";}
    //new VF.StaveNote({ keys: [], duration: ""});
  }
  for (var i = 0; i < eDurations.length; i++) {
    if (eDurations[i] === "0.5") {noteDuration[i] = "8";}
    else if (eDurations[i] === "1") {noteDuration[i] = "4";}
    else if (eDurations[i] === "1.5") {noteDuration[i] = "4d";}
    else if (eDurations[i] === "2") {noteDuration[i] = "2";}
    else if (eDurations[i] === "3") {noteDuration[i] = "2d";}
    else if (eDurations[i] === "4") {noteDuration[i] = "1";}
  }
  var ar = [];
  var notes = [];
  for (var i = 0; i < noteDuration.length; i++) {
    var aa = noteDuration[i] + 'r';
    if (noteName[i] === "0" && noteDuration[i].length === 1) {notes.push(new VF.StaveNote({ keys: ["c/4"], duration: aa}));}
    else if (noteName[i] === "0" && noteDuration[i].length != 1) {
      notes.push(new VF.StaveNote({ keys: ["c/4"], duration: aa}));
    }
    else if (noteName[i].substr(1,1) === "b" && noteDuration[i].length === 1) {
      notes.push(new VF.StaveNote({ keys: [String(noteName[i])], duration: noteDuration[i]}).addAccidental(0, new VF.Accidental("b")));
    }
    else if (noteName[i].substr(1,1) === "b" && noteDuration[i].length != 1) {
      notes.push(new VF.StaveNote({ keys: [String(noteName[i])], duration: noteDuration[i]}).addAccidental(0, new VF.Accidental("b")));
    }
    else if (noteDuration[i].length === 1) {
      notes.push(new VF.StaveNote({ keys: [String(noteName[i])], duration: noteDuration[i]}));
    }
    else{notes.push(new VF.StaveNote({ keys: [String(noteName[i])], duration: noteDuration[i]}));}
  }
      // Create the notes
  //array1 = [new VF.StaveNote({ keys: ["c/4"], duration: "q" }),new VF.StaveNote({ keys: ["c/4"], duration: "q" }),new VF.StaveNote({ keys: ["c/4"], duration: "q" }),new VF.StaveNote({ keys: ["c/4"], duration: "q" })];

  // Create a voice in 4/4 and add above notes
  var voice = new VF.Voice({num_beats: 16,  beat_value: 4});
  voice.addTickables(notes);

  // Format and justify the notes to 400 pixels.
  var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 1000);

  // Render voice
  voice.draw(context, stave);

  var beams = Vex.Flow.Beam.generateBeams(notes, {
    maintain_stem_directions: true,
    beam_rests: true,
    show_stemlets: true,
  });

    beams.forEach(function(beam) {
    beam.setContext(context).draw();
  });
}
