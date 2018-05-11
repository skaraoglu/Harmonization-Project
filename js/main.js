//Function to create chords. Called from chordProgression().
function createChord(chordRoot, scheme){
  var chordNotes =[];
  if (scheme === 909) {
    chordNotes = [parseInt(chordRoot), parseInt(chordRoot)+4, parseInt(chordRoot)+7];
    } else if (scheme === 878){
    chordNotes = [parseInt(chordRoot), parseInt(chordRoot)+3, parseInt(chordRoot)+7];
    }
  return chordNotes;
}

//Function that takes Root Note and returns the chord progression. Called from harlemShake().
function chordSelected()
{
  var rootNote;
  var e = document.getElementById("root");
  rootNote = e.options[e.selectedIndex].value;
  var chords = document.getElementById("progress").options[document.getElementById("progress").selectedIndex].value;
  console.log(chords);
  var abc = chordProgression(chords, rootNote);
  return abc;
}

//Function that takes the Root Note and chord progression and returns the chords' midi values. Called by chordProgression().
function chordConvertion(chords, rootn){
  var numeric;
  if (rootn === 'A3') {numeric = 57;}
  else if (rootn === 'Bb3') {numeric = 58;}
  else if (rootn === 'B3') {numeric = 59;}
  else if (rootn === 'C3') {numeric = 48;}
  else if (rootn === 'Db3') {numeric = 49;}
  else if (rootn === 'D3') {numeric = 50;}
  else if (rootn === 'Eb3') {numeric = 51;}
  else if (rootn === 'E3') {numeric = 52;}
  else if (rootn === 'F3') {numeric = 53;}
  else if (rootn === 'Gb3') {numeric = 54;}
  else if (rootn === 'G3') {numeric = 55;}
  else {numeric = 56;}
  var tmpChords = [];
  var finalChords = [];
  for (var i = 0; i < chords.length; i++) {
    tmpChords[i] = chords[i] + numeric;
  }
  if (tmpChords[0] > 59)
  {
    for (var i = 0; i < tmpChords.length; i++) {
      finalChords[i] = parseInt(tmpChords[i]) - 12;
    }
  }
  else {
    for (var i = 0; i < tmpChords.length; i++) {
      finalChords[i] = tmpChords[i];
    }
  }
  return finalChords;
}

//Function that calculates the chords in the progression with the selected root note and chord progression values.
function chordProgression(selectedProgression, root){
  var chordOrderTemp = selectedProgression.split('');
  var chordOrder =[];
  var scale = parseInt(document.getElementById("scale").options[document.getElementById("scale").selectedIndex].value);
  var chordScaleMap = [];
  var chordDistanceMap = [];
  if (scale === 909) {
    chordScaleMap = [909,878,878,909,909,878,878];
    chordDistanceMap = [0, 0, 2, 4, 5, 7, 9, 11, 12];
  } else if (scale === 878) {
    chordScaleMap = [878,878,909,878,878,909,909];
    chordDistanceMap = [0, 0, 2, 3, 5, 7, 8, 10, 12];
  }
  for (var r = 0; r < chordOrderTemp.length; r++) {
    chordOrder[r] = parseInt(chordDistanceMap[chordOrderTemp[r]]);
  }
  var lblShow = document.getElementById(111);
  var scname;
  if (scale === 909) {scname = "Maj";} else { scname = "Min";}
  var chordList = [];
  for (var i = 0; i < chordOrder.length; i++) {
    chordList[i] = [];
    var chScale;
    if(chordScaleMap[chordOrderTemp[i] - 1] === 878)
    { chScale = 878 }
    else if (chordScaleMap[chordOrderTemp[i] - 1] === 909)
    { chScale = 909 }
    var a = createChord(chordOrder[i], chScale);
    chordList[i] = chordConvertion(a, root);
  }
  return chordList;
}

//Function to get notes from note lists.
function getNotes(notesList)
{
  if(!notesList){
    var notesList = [];
    var ul = document.getElementById('listShow');
    var li = document.getElementsByTagName('li');
    for ( i = 0; i < li.length; i++)
    {
      var tmp = li[i].innerText;
      notesList[i] = tmp.substring(0,2);
    }
    return notesList;
  }
  else {return notesList;}
}

//Function to get created Note Durations.
function getNoteDurations()
{
  var noteDurationsList = [];
  var ultime = document.getElementById("timeUl");
  var li = ultime.getElementsByTagName('li');
  for ( i = 0; i < li.length; i++)
  {
    noteDurationsList[i] = li[i].innerText;
  }
  return noteDurationsList;
}

//Function to play the music. Called by the harlemShake().
function playChordProgression(cList, nList, nDList){
    MIDI.loadPlugin({
    soundfontUrl: "./soundfont/",
    instrument: "acoustic_grand_piano",
    onprogress: function(state, progress) {
      console.log(state, progress);
    },
    onsuccess: function() {
      MIDI.setVolume(0, 127);
      var k = 0;
      var j = 0;
      var l = 0;
      for (var i = 0; i < nList.length; i++) {
        var note = nList[i];
        var duration = parseFloat(nDList[i]);
        if (k == 0 || k == 4 || k == 8 || k == 12) {
          MIDI.chordOn(0, cList[j], 127, l);
          MIDI.chordOff(0,cList[j], l + 4);
          j++;
          l = l + 4;
        }
        if (note === "84")
        {
          MIDI.noteOn(0, note, 0, k)
          MIDI.noteOff(0, note, k + duration);
          k = k + duration;
        }
        else
        {
        MIDI.noteOn(0, note, 127, k);
        MIDI.noteOff(0, note, k + duration);
        k = k + duration;
      }
      }
    }
  });
}

//Evolution starts here!
function dotheevolution()
{
  var rootNote;
  var e = document.getElementById("root");
  rootNote = e.options[e.selectedIndex].value;

  var fit = crossover();
  fit = mutationLastNote(fit, rootNote);
  fit = mutationGeneFlip(fit);
  console.log(fit);
  return fit;
}

//After Evolution environment rearrangement. Short for After Arrangement.
function aa()
{
  var durationsList = getNoteDurations();
  var notesList = [];
  var fitnessTable = [];
  var pop = [];
  var tmp = [];
  var avgFitness;
  for (var i = 0; i < 10; i++) {
    tmp = dotheevolution();
    tmp.pop();
    for (var j = 0; j < durationsList.length; j++) {
      if (noteFitness(tmp[j]) === 1 || noteFitness(tmp[j]) === 2) {
        notesList[j] = tmp[j];
        fitnessTable[j] = noteFitness(notesList[j]);
      }
      else{
        notesList[j] = String(Math.floor((Math.random() * 25) + 60));
        fitnessTable[j] = noteFitness(notesList[j]);
      }
    }
    avgFitness = averageFitness(fitnessTable);
    notesList.push(avgFitness);
    pop[i] = notesList;
    notesList = [];
  }
  pop = reorderByFitness(pop);
  fillUl(pop);
  setFittest(pop[0]);
  setsecondFittest(pop[1]);
  a1 = getFittest();
  document.getElementById("step5Label").innerText = "Fittest Individual's Average Fitness: " + a1[a1.length - 1];
}

//Evolution
function evolve()
{
  var durationsList = getNoteDurations();
  var fitnessTable = [];
  var pop = [];
  var p = dotheevolution();
  var avgFitness;
  var newnote = 0;
  for (var k = 0; k < 10; k++) {
    pop[k] = p;
  }
  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < pop[i].length - 1; j++) {
      if (noteFitness(pop[i][j]) === 1 || noteFitness(pop[i][j]) === 2) {}
      else{
        newnote = Math.floor((Math.random() * 25) + 60);
        pop[i].splice(j,1,String(newnote));
      }
      fitnessTable[j] = noteFitness(pop[i][j]);
    }
    avgFitness = averageFitness(fitnessTable);
    pop[i].splice(-1,1,avgFitness);
  }
  pop = reorderByFitness(pop);
  fillUl(pop);
  setFittest(pop[0]);
  setsecondFittest(pop[1]);
}

//Magic Button that gets stuff together and organize the harmonization.
function harlemShake()
{
  var durationsList = getNoteDurations();
  var notesList = getFittest();
  var chordList = chordSelected();
  playChordProgression(chordList, notesList, durationsList);
}

//First Step, Scale selection onChange function. Visibility and backward compatibility arrangements.
checkScale = function(){
  var ScaleVar = document.getElementById("scale");
  var dropDownScaleVar = ScaleVar.options[ScaleVar.selectedIndex].value;
  if (dropDownScaleVar != ""){
    document.getElementById("step1Label").innerText = "Selected Scale: " + document.getElementById("scale").options[document.getElementById("scale").selectedIndex].text;
    document.getElementById("chordDiv").style.display = "block";
    document.getElementById("progressionCard").style.display = "block";
    document.getElementById("rootCard").style.display = "none";
    document.getElementById("scaleCard").style.display = "none";
    document.getElementById("timeCard").style.display = "none";
    document.getElementById("populationCard").style.display = "none";
    document.getElementById("fittestUl").innerHTML = "";
    document.getElementById("secondfittestUl").innerHTML = "";
    document.getElementById("boo").innerHTML = "";
  }
}

//Second Step, Chord Progression selection onChange function. Visibility and backward compatibility arrangements.
checkProgression = function(){
  var PVar = document.getElementById("progress");
  var ddpVar = PVar.options[PVar.selectedIndex].value;
  if (ddpVar != ""){
    document.getElementById("step2Label").innerText = "Selected Chord Progression: " + document.getElementById("progress").options[document.getElementById("progress").selectedIndex].text;
    document.getElementById("rootDiv").style.display = "block";
    document.getElementById("rootCard").style.display = "block";
    document.getElementById("progressionCard").style.display = "none";
    document.getElementById("timeCard").style.display = "none";
    document.getElementById("populationCard").style.display = "none";
    document.getElementById("fittestUl").innerHTML = "";
    document.getElementById("secondfittestUl").innerHTML = "";
    document.getElementById("boo").innerHTML = "";
  }
}

//Third Step, Root Note selection onChange function. Visibility and backward compatibility arrangements.
checkRoot = function(){
  var RVar = document.getElementById("root");
  var ddrVar = RVar.options[RVar.selectedIndex].value;
  if (ddrVar != ""){
    document.getElementById("step3Label").innerText = "Selected Root Note: " + document.getElementById("root").options[document.getElementById("root").selectedIndex].text;
    document.getElementById("rootDiv").style.display = "block";
    document.getElementById("timeDiv").style.display = "block";
    document.getElementById("timeCard").style.display = "block";
    document.getElementById("rootCard").style.display = "none";
    document.getElementById("scaleCard").style.display = "none";
    document.getElementById("progressionCard").style.display = "none";
    document.getElementById("populationCard").style.display = "none";
    document.getElementById("fittestUl").innerHTML = "";
    document.getElementById("secondfittestUl").innerHTML = "";
    document.getElementById("boo").innerHTML = "";
  }
}

//Fourth Step, Note Duration generation function. Visibility and backward compatibility arrangements.
checkTime = function(){
  var noteDurationsList = "";
  var ultime = document.getElementById("timeUl");
  var li = ultime.getElementsByTagName('li');
  for ( i = 0; i < li.length; i++)
  {
    if (li.length - 1 != i){
    noteDurationsList += li[i].innerText + " | ";
    }
    else{noteDurationsList += li[i].innerText;}
  }
  document.getElementById("step4Label").innerText = "Note Durations: " + noteDurationsList;
  document.getElementById("populationDiv").style.display = "block";
  document.getElementById("timeDiv").style.display = "block";
  document.getElementById("timeCard").style.display = "none";
  document.getElementById("rootCard").style.display = "none";
  document.getElementById("scaleCard").style.display = "none";
  document.getElementById("progressionCard").style.display = "none";
  document.getElementById("populationCard").style.display = "block";
}

//Return to First Step function. Visibility and backward compatibility arrangements.
firstStep = function(){
  document.getElementById("scaleCard").style.display = "block";
  document.getElementById("progressionCard").style.display = "none";
  document.getElementById("rootCard").style.display = "none";
  document.getElementById("timeCard").style.display = "none";
  document.getElementById("populationCard").style.display = "none";
  document.getElementById("fittestUl").innerText = "";
  document.getElementById("secondfittestUl").innerText = "";
  document.getElementById("boo").innerHTML = " ";
}

//Return to Second Step function. Visibility and backward compatibility arrangements.
secondStep = function(){
  document.getElementById("scaleCard").style.display = "none";
  document.getElementById("progressionCard").style.display = "block";
  document.getElementById("rootCard").style.display = "none";
  document.getElementById("timeCard").style.display = "none";
  document.getElementById("populationCard").style.display = "none";
  document.getElementById("fittestUl").innerHTML = "";
  document.getElementById("secondfittestUl").innerHTML = "";
  document.getElementById("boo").innerHTML = "";
}

//Return to Third Step function. Visibility and backward compatibility arrangements.
thirdStep = function(){
  document.getElementById("scaleCard").style.display = "none";
  document.getElementById("progressionCard").style.display = "none";
  document.getElementById("rootCard").style.display = "block";
  document.getElementById("timeCard").style.display = "none";
  document.getElementById("populationCard").style.display = "none";
  document.getElementById("fittestUl").innerHTML = "";
  document.getElementById("secondfittestUl").innerHTML = "";
  document.getElementById("boo").innerHTML = "";
}

//Return to Fourth Step function. Visibility and backward compatibility arrangements.
fourthStep = function(){
  document.getElementById("scaleCard").style.display = "none";
  document.getElementById("progressionCard").style.display = "none";
  document.getElementById("rootCard").style.display = "none";
  document.getElementById("timeCard").style.display = "block";
  document.getElementById("populationCard").style.display = "none";
  document.getElementById("fittestUl").innerHTML = "";
  document.getElementById("secondfittestUl").innerHTML = "";
  document.getElementById("boo").innerHTML = "";
}

//Return to Fifth Step function. Visibility and backward compatibility arrangements.
fifthStep = function(){
  document.getElementById("scaleCard").style.display = "none";
  document.getElementById("progressionCard").style.display = "none";
  document.getElementById("rootCard").style.display = "none";
  document.getElementById("timeCard").style.display = "none";
  document.getElementById("populationCard").style.display = "block";
}
