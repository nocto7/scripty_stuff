# quickadd_beemind_pomodoro

This script uses the [QuickAdd](https://quickadd.obsidian.guide/) plugin for [Obsidian](https://obsidian.md/) and sends datapoints to a goal you have setup at [Beeminder](https://www.beeminder.com/). You'll probably need to edit it a bit to fit your own workflow. 

This is how I set it up:
- make sure the QuickAdd community plugin is installed within Obsidian
- copy the quickadd_beemind_pomodoro.js file into your vault, it doesn't matter where you put it or what you name it but make sure it keeps it's .js ending
- go into the QuickAdd settings > Manage Macros > Add a macro with a name of your choice e.g. "beemind pomodoro"
- look under "User Scripts" and you should find the .js file there, add it as the first action in the macro. If you click on the settings cog for this action you should see boxes  to add your beeminder username and auth_token. Your personal beeminder auth_token can be found [here](https://www.beeminder.com/settings/account#account-permissions).
- for the second action add a capture action. You'll want it to look something like this. Pick the file and format that suit you. My capture format is "**{{DATE:HH:mm}}** {{VALUE:taskname}} ⏳ {{DATE:YYYY-MM-DD}} #pomodoro". 
![Capture Foramt](https://raw.githubusercontent.com/nocto7/scripty_stuff/main/quickadd_capture1.png)

- and for the third action I start a pomodoro timer using the [Status Bar Pomodoro Timer](https://github.com/kzhovn/statusbar-pomo-obsidian) plugin, but that's not essential.
- then add a macro choice in the QuickAdd settings, I call mine "🐝🍅Start Beeminded Pomodoro" and set it to call the macro you just created. Add a command for it by selecting the lightning bolt.
- I also use the [Commander](https://github.com/phibr0/obsidian-commander) community plugin  to put a button for the command on the ribbon within Obsidian. 

What the script does:
- asks you for your task with the prompt _Start Pomodoro with task:_
- sends a datapoint to a beeminder goal which is hardcoded as "pomodoro", you'll probably want to change that. 
	- The datapoint value is 1
	- The associated comment is whatever task you typed in
- if there is a hashtag in the task then it also tries to send a datapoint to that beeminder goal. E.g. if you type in "do some work on #workproject" it will send a datapoint to your _workproject_ beeminder goal as well as your pomodoro goal.

What the script doesn't do:
- Any kind of error checking or reporting
- Check the beeminder goals exist before trying to add datapoints to them
