 // you don't need to edit this script to add your username and auth token!
 // when you add this script to a quickadd macro it'll let you 
 // set your username and auth token in the settings
 const USERNAME = "Beeminder Username"
 const AUTH_TOKEN = "Beeminder Auth Token"
 
 module.exports = {
   entry: beemind,
   settings: {
	 name: "Beeminding Script",
	 author: "Kirsty Darbyshire",
	 options: {
		[USERNAME]: {
			type: "text",
			defaultValue: "",
			placeholder: "Beeminder Username"
		},
	   [AUTH_TOKEN]: {
		 type: "text",
		 defaultValue: "",
		 placeholder: "Beeminder Auth Token"
	   }
	 },
   },
 };
 
 let QuickAdd;
 let Settings;
 
 async function beemind(params, settings) {
 	QuickAdd = params;

	// prompt for a task
	const task = await QuickAdd.quickAddApi.inputPrompt(
	"Start Pomodoro with task:"
	);
	
	// create a beeminder datapoint for the main pomodoro goal
	const goalname = "pomodoro"
	createBeeminderDatapoint(1, task, goalname, settings)
	
	// look for hashtags in the task
	const re = /#(\S*)/
	const found = task.match(re)

	// if a hashtag is found also post to that goal - maybe there should be a check that this is a real beeminder goal here
	if (found && found.length > 0) {
		const secondary = found[1]
		console.log(`hashtag found in task! also sending a datapoint to ${secondary}`)
		createBeeminderDatapoint(1, task, secondary, settings)
	}
	
	// save the task so we can use it after this in quickadd
	QuickAdd.variables = {
			taskname: task
	}

}

// send value and comment datapoint to goalname
// settings gets the username and auth token from the quickadd macro settings
async function createBeeminderDatapoint(value, comment, goalname, settings) {
	Settings = settings;
	const auth_token = Settings[AUTH_TOKEN]
	const username = Settings[USERNAME]
		
	console.log(`Posting ${value} with \'${comment}\' to Beeminder goal ${goalname}`);
	
	const params = {
		value: value,
		comment: comment,
		auth_token: auth_token
	};
	
	const options = {
		method: 'POST',
		headers: {
		  "Content-Type": "application/json"
		},
		body: JSON.stringify( params )  
	};
	
	const response = await fetch( `https://www.beeminder.com/api/v1/users/${username}/goals/${goalname}/datapoints.json`, options )
		
	const data = await response.json();
	console.log(data);
}
