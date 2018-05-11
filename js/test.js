//This function creates note durations with possible outcomes of 0.5, 1, 1.5, 2, 3, 4. 16 in total respecting to 4-4 bar.
function durationsGeneration(){
  var i = 0;
  var j = 0;
  var ab = 0;
  var generated;
  var noteduration;
  var durationsList = [];
  var ul = document.getElementById("timeUl");
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
  while (i < 16) {
    var li = document.createElement('li');
    li.setAttribute("style", "float:left; clear:right");
    var rndm = Math.random();
    if (rndm <= 0.5) {generated = 0.5}
    else if (rndm <= 0.8 && rndm > 0.5) {generated = 1}
    else if (rndm <= 0.85 && rndm > 0.8) {generated = 1.5}
    else if (rndm <= 0.9 && rndm > 0.85) {generated = 2}
    else if (rndm <= 0.95 && rndm > 0.9) {generated = 3}
    else {generated = 4}

    if (ab < 4)
    {
      if (ab + generated > 4)
      {
        if (4 - i == 3.5)
        {
          generated = 1;
          ab = i + generated;
          durationsList[j] = generated;
          li.appendChild(document.createTextNode(generated));
          ul.appendChild(li);
        }
        else if (4 - i == 2.5)
        {
          generated = 1;
          ab = i + generated;
          durationsList[j] = generated;
          li.appendChild(document.createTextNode(generated));
          ul.appendChild(li);
        }
        else{
          generated = (4 - i);
          ab = i + generated;
          durationsList[j] = generated;
          li.appendChild(document.createTextNode(generated));
          ul.appendChild(li);
        }
      }
      else {
          ab = i + generated;
          durationsList[j] = generated;
          li.appendChild(document.createTextNode(generated));
          ul.appendChild(li);
      }
      i = i + generated;
      j++
    }
    else if (ab >=4 && ab < 8)
    {
      if (ab + generated > 8)
      {
        if (8 - i == 3.5)
        {
          generated = 1;
          ab = i + generated;
          durationsList[j] = generated;
          li.appendChild(document.createTextNode(generated));
          ul.appendChild(li);
        }
        else if (8 - i == 2.5)
        {
          generated = 1;
          ab = i + generated;
          durationsList[j] = generated;
          li.appendChild(document.createTextNode(generated));
          ul.appendChild(li);
        }
        else{
          generated = (8 - i);
          ab = i + generated;
          durationsList[j] = generated;
          li.appendChild(document.createTextNode(generated));
          ul.appendChild(li);
        }
      }
      else {
          ab = i + generated;
          durationsList[j] = generated;
          li.appendChild(document.createTextNode(generated));
          ul.appendChild(li);
      }
      i = i + generated;
      j++
    }
    else if (ab >=8 && ab < 12)
    {
      if (ab + generated > 12)
      {
        if (12 - i == 3.5)
        {
          generated = 1;
          ab = i + generated;
          durationsList[j] = generated;
          li.appendChild(document.createTextNode(generated));
          ul.appendChild(li);
        }
        else if (12 - i == 2.5)
        {
          generated = 1;
          ab = i + generated;
          durationsList[j] = generated;
          li.appendChild(document.createTextNode(generated));
          ul.appendChild(li);
        }
        else{
          generated = (12 - i);
          ab = i + generated;
          durationsList[j] = generated;
          li.appendChild(document.createTextNode(generated));
          ul.appendChild(li);
        }
      }
      else {
          ab = i + generated;
          durationsList[j] = generated;
          li.appendChild(document.createTextNode(generated));
          ul.appendChild(li);
      }
      i = i + generated;
      j++
    }
    else
    {
      if (ab + generated > 16)
      {
        if (16 - i == 3.5)
        {
          generated = 1;
          ab = i + generated;
          durationsList[j] = generated;
          li.appendChild(document.createTextNode(generated));
          ul.appendChild(li);
        }
        else if (16 - i == 2.5)
        {
          generated = 1;
          ab = i + generated;
          durationsList[j] = generated;
          li.appendChild(document.createTextNode(generated));
          ul.appendChild(li);
        }
        else{
          generated = (16 - i);
          ab = i + generated;
          durationsList[j] = generated;
          li.appendChild(document.createTextNode(generated));
          ul.appendChild(li);
          break;
        }
      }
      else {
          ab = i + generated;
          durationsList[j] = generated;
          li.appendChild(document.createTextNode(generated));
          ul.appendChild(li);
      }
      i = i + generated;
      j++
    }
  }
  checkTime();
  //document.getElementById('btnShowSheet').style.visibility = 'visible';
  //newPopulation(durationsList);
}

//This function creates new population with random individuals using the note durations.
function newPopulation()
{
  var durationsList = getNoteDurations();
  var notesList = [];
  var fitnessTable = [];
  var pop = [];
  var tmp = [];
  var avgFitness;
  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < durationsList.length; j++) {
      notesList[j] = Math.floor((Math.random() * 25) + 60);
      fitnessTable[j] = noteFitness(notesList[j]);
      tmp.push(notesList[j]);
    }
    avgFitness = averageFitness(fitnessTable);
    tmp.push(avgFitness);
    pop[i] = tmp;
    tmp = [];
    //fillUl(pop);
  }
  pop = reorderByFitness(pop);
  fillUl(pop);
  setFittest(pop[0]);
  setsecondFittest(pop[1]);
  a1 = getFittest();
  document.getElementById("step5Label").innerText = "Fittest Individual's Average Fitness: " + a1[a1.length - 1];
}

//This function sets the fittest individual to the showcase.
function setFittest(notesList)
{
  var ulFittest = document.getElementById("fittestUl");
  ulFittest.innerHTML = "";
  for (var i = 0; i < notesList.length - 1; i++) {
    var li = document.createElement("li");
    li.innerText = notesList[i];
    li.setAttribute("class", "left")
    ulFittest.appendChild(li);
  }
  var li = document.createElement("li");
  li.innerText = notesList[notesList.length - 1];
  li.setAttribute("style", "color:#ff00ff; clear:right");
  ulFittest.appendChild(li);
  fu();
}

//This function sets the second fittest individual to the showcase.
function setsecondFittest(notesList)
{
  var ulsecondFittest = document.getElementById("secondfittestUl");
  ulsecondFittest.innerHTML = "";
  for (var i = 0; i < notesList.length - 1; i++) {
    var li = document.createElement("li");
    li.innerText = notesList[i];
    li.setAttribute("class", "left")
    ulsecondFittest.appendChild(li);
  }
  var li = document.createElement("li");
  li.innerText = notesList[notesList.length - 1];
  li.setAttribute("style", "color:#ff00ff; clear:right");
  ulsecondFittest.appendChild(li);
}

//This function gets the fittest individual from the showcase.
function getFittest()
{
  var notesList = [];
  var ulFittest = document.getElementById("fittestUl");
  var li = ulFittest.getElementsByTagName('li');
  for ( i = 0; i < li.length; i++)
  {
    notesList[i] = li[i].innerText;
  }
  return notesList;
}

//This function gets the second fittest individual from the showcase.
function getsecondFittest()
{
  var notesList = [];
  var ulsecondFittest = document.getElementById("secondfittestUl");
  var li = ulsecondFittest.getElementsByTagName('li');
  for ( i = 0; i < li.length; i++)
  {
    notesList[i] = li[i].innerText;
  }
  console.log(notesList);
  return notesList;
}

//This function calculates the fitness of a single note comparing it to the selected note's selected scale.
function noteFitness(note)
{
  var fitnessValue;
  var rootNote = document.getElementById("root").options[document.getElementById("root").selectedIndex].value;
  var scale = parseInt(document.getElementById("scale").options[document.getElementById("scale").selectedIndex].value);
  if (scale === 909) {
    chordScaleMap = [909,878,878,909,909,878,878];
    chordDistanceMap = [0, 0, 2, 4, 5, 7, 9, 11, 12];
  } else if (scale === 878) {
    chordScaleMap = [878,878,909,878,878,909,909];
    chordDistanceMap = [0, 0, 2, 3, 5, 7, 8, 10, 12];
  }
  var numeric;
  if (rootNote === 'A3') {numeric = 57;}
  else if (rootNote === 'Bb3') {numeric = 58;}
  else if (rootNote === 'B3') {numeric = 59;}
  else if (rootNote === 'C3') {numeric = 48;}
  else if (rootNote === 'Db3') {numeric = 49;}
  else if (rootNote === 'D3') {numeric = 50;}
  else if (rootNote === 'Eb3') {numeric = 51;}
  else if (rootNote === 'E3') {numeric = 52;}
  else if (rootNote === 'F3') {numeric = 53;}
  else if (rootNote === 'Gb3') {numeric = 54;}
  else if (rootNote === 'G3') {numeric = 55;}
  else {numeric = 56;}
  var noteDistance = note - numeric;

  //perfect consonants; unison, perf. IV, perf V, octave
  if (noteDistance == 12 || noteDistance == 24 || noteDistance == 36 || noteDistance == 5 || noteDistance == 17 || noteDistance == 29 || noteDistance == 7 || noteDistance == 19 || noteDistance == 31)
  { fitnessValue = 1; }
  //II and VII
  else if (noteDistance == 2 || noteDistance == 14 || noteDistance == 26 || noteDistance == 10 || noteDistance == 22 || noteDistance == 34)
  { fitnessValue = 3; }
  //84 is Rest
  else if (note == 84)
  { fitnessValue = 1; }
  //imperfect consonants; min and maj III and VI
  else if (scale == 909 && (noteDistance == 4 || noteDistance == 16 || noteDistance == 28 || noteDistance == 9 || noteDistance == 21 || noteDistance == 33))
  { fitnessValue = 2; }
  else if (scale == 878 && (noteDistance == 3 || noteDistance == 15 || noteDistance == 27 || noteDistance == 8 || noteDistance == 20 || noteDistance == 32))
  { fitnessValue = 2; }
  else { fitnessValue = 5; }

  return fitnessValue;
}

//This function takes an array of fitness values and calculates the average.
function averageFitness(fitnessTable)
{
  var avg = 0;
  for (var i = 0; i < fitnessTable.length; i++) {
    avg = avg + fitnessTable[i];
  }
  avg = avg / fitnessTable.length;
  return avg;
}

//This function orders individuals respecting to their average fitnesses.
function reorderByFitness(population)
{
  var count = population.length - 1;
  var tmp, tmpav;
  var averages = [];
  for (var i = 0; i < population.length; i++) {
    averages[i] = population[i][population[i].length - 1];
  }
  for (j = 0; j < count; j++) {
    for (var k = 0; k < count; k++) {
      if (averages[k] > averages[k + 1]) {
        tmp = population[k + 1];
        population[k + 1] = population[k];
        population[k] = tmp;

        tmpav = averages[k + 1];
        averages[k + 1] = averages[k];
        averages[k] = tmpav;
      }
    }
  }
  return population;
}

//This function converts midi value to note name.
function notenameconverter(pops)
{
  if (pops == 60){pops = "C4"}
  else if (pops == 61){pops = "Db4"}
  else if (pops == 62){pops = "D4"}
  else if (pops == 63){pops = "Eb4"}
  else if (pops == 64){pops = "E4"}
  else if (pops == 65){pops = "F4"}
  else if (pops == 66){pops = "Gb4"}
  else if (pops == 67){pops = "G4"}
  else if (pops == 68){pops = "Ab4"}
  else if (pops == 69){pops = "A4"}
  else if (pops == 70){pops = "Bb4"}
  else if (pops == 71){pops = "B4"}
  else if (pops == 72){pops = "C5"}
  else if (pops == 73){pops = "Db5"}
  else if (pops == 74){pops = "D5"}
  else if (pops == 75){pops = "Eb5"}
  else if (pops == 76){pops = "E5"}
  else if (pops == 77){pops = "F5"}
  else if (pops == 78){pops = "Gb5"}
  else if (pops == 79){pops = "G5"}
  else if (pops == 80){pops = "Ab5"}
  else if (pops == 81){pops = "A5"}
  else if (pops == 82){pops = "Bb5"}
  else if (pops == 83){pops = "B5"}
  else if (pops == 84){pops = "ST"}
  return pops;
}

//This function fills the created generation list.
function fillUl(population)
{
  var cont = document.getElementById("thList");
  cont.innerHTML = "";
  var newtd = document.createElement("td");
  newtd.setAttribute("style", "width:100%");
  var ul = document.createElement("ul");
  ul.className = "newest";
  for (var i = 0; i < population.length; i++) {
    for (var j = 0; j < population[0].length - 1; j++) {
      var li = document.createElement("li");
      if (j != (population[0].length - 1)) {
        li.setAttribute("class", "left");
      }
      if (j === 0){
        li.setAttribute("style", "clear:left")
      }
      if (noteFitness(population[i][j]) == 1) {
        li.style.color = "#00ff00";
      }
      else if (noteFitness(population[i][j]) == 2) {
        li.style.color = "#00ffff";
      }
      else if (noteFitness(population[i][j]) == 3) {
        li.style.color = "#0000ff";
      }
      else if (noteFitness(population[i][j]) == 5) {
        li.style.color = "#ff0000";
      }
      else {li.style.color = "#000000"}

      popname = notenameconverter(population[i][j]);
      li.innerText = popname;
      ul.appendChild(li);
    }
    var li = document.createElement("li");
    li.innerText = population[i][population[i].length-1];
    li.setAttribute("style", "color:black; clear:right");
    ul.appendChild(li);
    newtd.appendChild(ul);
    cont.appendChild(newtd);
  }
}
