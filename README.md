# abxtracted-js

Simple js lib to use abxtracted in browser

## Usage

1 - Add the following script in your html page:
``` html
<script src="http://abxtracted.com/public/abxtracted.min.js"></script>
```

2 - Obtain the user scenario
```javscript
var myExperiment = new Abx.Experiment('6c4974f0-0b5a-4585-a227-b1bed8c24e02', 'my_experiment');
var userScenario = myExperiment.getScenario('my-user-identity', function(scenario){
  /*  
   * The scenario will be 'control' or 'variation'
   * Do your stuff based on scenario :)
   */
});
```

The user identity may be an e-mail, an unique id or any unique information that identify the user in your application.

The response will be something like this:
```json
{
  "customerIdentity": "my-user-identity",
  "experiment": "my_experiment",
  "scenario": "control" 
}
```
**Note**: There are two options for a scenario, control or variation

3 - Inform when a user completes the experiment
```javscript
var myExperiment = new Abx.Experiment('6c4974f0-0b5a-4585-a227-b1bed8c24e02', 'my_experiment');
myExperiment.complete('my-user-identity');
```
