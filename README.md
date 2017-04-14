# abxtracted-js

Simple js lib to use abxtracted in browser

## Installation

1 - Install abxtracted via NPM
``` shell
npm i abxtracted --save
```
2 - Insert the abxtracted dist file in your `index.html`
``` html
<script src="/node_modules/abxtracted/dist/abxtracted.min.js"></script>
```

## Usage

1 - Obtain the user scenario:
```javascript
/*
** Abx.Experiment(projectId, experimentKey)
** @projectId: String
** @experimentKey: String
*/
var myExperiment = new Abx.Experiment('6c4974f0-0b5a-4585-a227-b1bed8c24e02', 'my_experiment');

/*
** experiment.getScenario(userIdentity, successCallback)
** @userIdentity: String
** @successCallback: Function
*/
myExperiment.getScenario('my-user-identity', function(response){
  var userScenario = response.scenario; // The scenario will be 'control' or 'variation'
});
```

1.1 The user identity may be an e-mail, an unique id or any unique information that identifies the user in your application.

1.2 The response you will get in successCallback is something like this:
```json
{
  "customerIdentity": "my-user-identity",
  "experiment": "my_experiment",
  "scenario": "control"
}
```
**Note**: There are two options for a scenario, *control* or *variation*

2 - Inform when the user completes the experiment:
```javascript
/*
** experiment.complete(userIdentity)
** @userIdentity: String
*/
myExperiment.complete('my-user-identity');
```

3 - That's all.
