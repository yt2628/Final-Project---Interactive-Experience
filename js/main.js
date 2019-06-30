var data = [
	{
		id: 1497141891479,
		title: "Sweet potatoes",
    ingredients: "Potatoes, Butter, Water",
    details: "1. Put sweet potatoes on the baking pan &#10;2. Add water as you like &#10;3. Set the oven to 275F and insert food for 30 minutes &#10;4. Cut sweet potatoes in halves and spread butter &#10;5. Enjoy!",
		done: false,
    difficulty: 2
	},
	{
		id: 1497141913701,
		title: "Chicken wings",
    ingredients: "Chicken, Honey, Soy sauce",
    details: "Eat chicken wings",
		done: false,
    difficulty: 3
	},
	{
		id: 1497141937545,
		title: "Eggplant",
    ingredients: "eggplant, salt",
    details: "Bake eggplant",
		done: true,
    difficulty: 1
	}
];

var restore = [];

var recipeEl = document.getElementById('recipes');
var displayName = document.querySelector('#displayRecipeName');
var displayIng = document.querySelector('#displayIngredients');
var displayDet = document.querySelector('#displayDetails');
var inputName = document.querySelector('#recipeName');
var inputIng = document.querySelector('#ingredients');
var inputDet = document.querySelector('#details');
var reminderMessage = document.querySelector('#reminder');
var difficultyValue = 0;

function initializeRecipe() {
	updateRecipe();
}

function updateRecipe() {
	var recipeHTML = "";
	for (recipe of data) {
		if (recipe.done) {
			recipeHTML += `<li id="${ recipe.id }" class="complete" onclick="displayRecipe(event)">`;
		} else {
			recipeHTML += `<li id="${ recipe.id }" class="incomplete" onclick="displayRecipe(event)">`;
		}

    if (recipe.difficulty==1) {
      recipeHTML += `<i class="far fa-star"></i>`;
    } else if (recipe.difficulty==2) {
      recipeHTML += `<i class="fas fa-star-half-alt"></i>`;
    } else {
      recipeHTML += `<i class="fas fa-star"></i>`;
    }

		recipeHTML += `${ recipe.title }`;
		recipeHTML += `</li>`;
	}
	if (recipeHTML === "") {
		recipeHTML = "<li>Nothing to bake...</li>";
	}
	recipeEl.innerHTML = recipeHTML;

}

function displayRecipe(event) {
  var recipeID = parseInt(event.currentTarget.id);
  var recipeData = getRecipe(recipeID);
  displayName.innerHTML = recipeData.title;
  displayIng.innerHTML = recipeData.ingredients;
  displayDet.innerHTML = recipeData.details;
}

function getRecipe(id) {
	var recipeFound;

	for (var i=0; i < data.length; i++) {
		if (data[i].id === id) {
			recipeFound = data[i];
			break;
		}
	}

	if (recipeFound) {
		return recipeFound;
	} else {
		return null;
	}
}

function submitRecipe() {
  if (!validateTask(inputName.value)) {
		invalidName();
    return;
	} else if (!validateTask(inputIng.value)) {
    invalidIng();
    return;
  } else if (!validateTask(inputDet.value)) {
    invalidDet();
    return;
  } else if (difficultyValue===0) {
    invalidDif();
    return;
  }

	var newRecipe = {
		id: getTimeStamp()
	};

	newRecipe.title = inputName.value;
  newRecipe.ingredients = inputIng.value;
  newRecipe.details = inputDet.value;
	newRecipe.done = false;
  inputDifficulty();
  newRecipe.difficulty = difficultyValue;

	data.push(newRecipe);

	updateRecipe();
  resetInput();
  document.querySelector('#formAdd').classList.add('hide');
}

function validateTask(task) {
	if (task !== "") {
		return true;
	} else {
		return false;
	}
}

function resetInput() {
	inputName.value = "";
  inputIng.value = "";
  inputDet.value = "";
  document.querySelector('[name="difficulty"]:checked').checked = false;
  difficultyValue = 0;
}

function invalidName() {
  inputName.style.borderColor = "red";
  reminderMessage.innerHTML = "Your recipe has no name!";
}

function invalidIng() {
  inputIng.style.borderColor = "red";
  reminderMessage.innerHTML = "Your recipe has no ingredients!";
}

function invalidDet() {
  inputDet.style.borderColor = "red";
  reminderMessage.innerHTML = "Your recipe has no detailed steps!";
}

function invalidDif() {
  reminderMessage.innerHTML = "Your recipe has no difficulty level!";
}

function resetName() {
  inputName.style ="";
  reminderMessage.innerHTML = "";
}

function resetIng() {
  inputIng.style ="";
  reminderMessage.innerHTML = "";
}

function resetDet() {
  inputDeta.style ="";
  reminderMessage.innerHTML = "";
}

function addMyRecipe() {
  document.querySelector('#formAdd').classList.remove('hide');
}

function removeStart() {
  document.querySelector('#removeConfirmBtn').classList.remove('hide');

  var removeHTML = "";
	for (recipe of data) {
		if (recipe.done) {
			removeHTML += `<li id="${ recipe.id }" onclick="completeRecipe(event)">`;
      removeHTML += `<i class="far fa-check-circle"></i>`;
		} else {
			removeHTML += `<li id="${ recipe.id }" onclick="completeRecipe(event)">`;
      removeHTML += `<i class="far fa-circle"></i>`;
		}

		removeHTML += `${ recipe.title }`;
		removeHTML += `</li>`;
	}
	if (removeHTML === "") {
		removeHTML = "<li>Nothing to bake...</li>";
	}
	recipeEl.innerHTML = removeHTML;
}

function completeRecipe(event) {
  var recipeID = parseInt(event.currentTarget.id);
  var recipeData = getRecipe(recipeID);
/*  if (recipeData.done=true) {
    event.currentTarget.className = "incomplete";
  } else {
    event.currentTarget.className = "complete";
  }*/
	recipeData.done = !recipeData.done;
  removeStart();
}

function removeConfirm() {
  var completedRecipes = data.filter(function(recipe){
	  return recipe.done === true;
	});
  for (copyForRestore of completedRecipes) {
    restore.push(copyForRestore);
  }

  var incompleteRecipes = data.filter(function(recipe){
	  return recipe.done === false;
	});
	data = incompleteRecipes;

	updateRecipe();
  document.querySelector('#removeConfirmBtn').classList.add('hide');
}

function restoreRecipe() {
  for (waitingRestore of restore) {
    data.push(waitingRestore);
    updateRecipe();
  }
  restore = [];
}

function inputDifficulty() {
  var radioChecked = document.querySelector('[name="difficulty"]:checked');
  difficultyValue = radioChecked.value;
}

//get a time stamp for individual ids
function getTimeStamp() {
	return Date.now();
}
//start the program
initializeRecipe();
