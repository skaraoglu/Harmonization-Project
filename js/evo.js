//Crossover Function. First part of the evolution process.
function crossover()
{
  var fit = getFittest();
  var sfit = getsecondFittest();
  var tmp = 0;
  for (var i = 0; i < fit.length; i++) {
    if (noteFitness(fit[i]) > noteFitness(sfit[i]))
    {
      tmp = fit[i];
      fit[i] = sfit[i];
      sfit[i] = tmp;
      tmp = 0;
      break;
    }
  }
  var fitnessTable = [];
  for (var i = 0; i < fit.length -1; i++) {
    fitnessTable[i] = noteFitness(fit[i]);
  }
  fit.pop();
  fit.push(averageFitness(fitnessTable));
  return (fit);
}

//Last Note mutation. This function runs a mutation that changes the last note of the individual.
function mutationLastNote(fit, rootn)
{
  var tmp = "";

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
  var a = fit[fit.length - 2];
  if (a != numeric || a != (numeric + 12) || a != (numeric + 24) || a != (numeric + 36)) {
    for (var i = 0; i < fit.length - 1; i++) {
      if (fit[i] == numeric || fit[i] == (numeric + 12) || fit[i] == (numeric + 24) || fit[i] == (numeric + 36))
      {
        tmp = fit[i];
        fit[i] = a;
        a = tmp;
        tmp = 0;
        var fitnessTable = [];
        for (var i = 0; i < fit.length -1; i++) {
          fitnessTable[i] = noteFitness(fit[i]);
        }
        fit.pop();
        fit.push(averageFitness(fitnessTable));
        break;
      }
    }
  }
  else if (a != (numeric + 7)  || a != (numeric + 19) || a != (numeric + 31)) {
    for (var i = 0; i < fit.length - 1; i++) {
      if (fit[i] == (numeric + 7) || fit[i] == (numeric + 19) || fit[i] == (numeric + 31)) {
        tmp = fit[i];
        fit[i] = a;
        a = tmp;
        tmp = 0;
        var fitnessTable = [];
        for (var i = 0; i < fit.length -1; i++) {
          fitnessTable[i] = noteFitness(fit[i]);
        }
        fit.pop();
        fit.push(averageFitness(fitnessTable));
        break;
      }
    }
  }
  else if (a != (numeric + 5)  || a != (numeric + 17) || a != (numeric + 29)) {
    for (var i = 0; i < fit.length - 1; i++) {
      if (fit[i] == (numeric + 5) || fit[i] == (numeric + 17) || fit[i] == (numeric + 29)) {
        tmp = fit[i];
        fit[i] = a;
        a = tmp;
        tmp = 0;
        var fitnessTable = [];
        for (var i = 0; i < fit.length -1; i++) {
          fitnessTable[i] = noteFitness(fit[i]);
        }
        fit.pop();
        fit.push(averageFitness(fitnessTable));
        break;
      }
    }
  }
  return fit;
}

//Gene Flip Mutation function. This takes a bad gene and creates a new random gene to replace it.
function mutationGeneFlip(fit)
{
  for (var z = 0; z < fit.length - 1; z++) {
    if (noteFitness(fit[z]) == 5) {
      fit[z] = String(Math.floor((Math.random() * 25) + 60));
      var fitnessTable = [];
      for (var j = 0; j < fit.length -1; j++) {
        fitnessTable[j] = noteFitness(fit[j]);
      }
      fit.pop();
      fit.push(averageFitness(fitnessTable));
      break;
    }
  }
  return fit;
}
