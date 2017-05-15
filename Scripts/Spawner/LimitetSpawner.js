#pragma strict
// Variable to store the enemy prefab
// Variable to know how fast we should create new enemies
public var spawnGameObject:GameObject[];
public var spawnAgain:int[];
public var timeToLetFree:int[];

function Start() {  
    // Call the 'addEnemy' function every 'spawnTime' seconds
   for(var i:int=0;i<spawnGameObject.length;i++){
		if(spawnGameObject[i]!=null)
		{
		InvokeRepeating("addObsticle"+i, timeToLetFree[i], spawnAgain[i]);
	    }
    }
}

function Update () {
	
}


// New function to spawn an enemy
function addObsticle0() { 
	var randNumber = Random.Range(0,100);
	var x1 = transform.position.x - GetComponent.<Renderer>().bounds.size.x/3;
    var x2 = transform.position.x + GetComponent.<Renderer>().bounds.size.x/3;

    // Randomly pick a point within the spawn object
    var spawnPoint = new Vector2(Random.Range(x1, x2), transform.position.y);
	if(!ConditionScript.MAIN_GOAL_REACHED){
		 Instantiate(spawnGameObject[0], spawnPoint, Quaternion.identity);
	}
}

// New function to spawn an enemy
function addObsticle1() { 
	var randNumber = Random.Range(0,100);
	var x1 = transform.position.x - GetComponent.<Renderer>().bounds.size.x/2;
    var x2 = transform.position.x + GetComponent.<Renderer>().bounds.size.x/2;

    // Randomly pick a point within the spawn object
    var spawnPoint = new Vector2(Random.Range(x1, x2), transform.position.y);
	if(!ConditionScript.MAIN_GOAL_REACHED){
		 Instantiate(spawnGameObject[1], spawnPoint, Quaternion.identity);
	}
}
// New function to spawn an enemy
function addObsticle2() { 
	var randNumber = Random.Range(0,100);
	var x1 = transform.position.x - GetComponent.<Renderer>().bounds.size.x/2;
    var x2 = transform.position.x + GetComponent.<Renderer>().bounds.size.x/2;

    // Randomly pick a point within the spawn object
    var spawnPoint = new Vector2(Random.Range(x1, x2), transform.position.y);
	if(!ConditionScript.MAIN_GOAL_REACHED){
		 Instantiate(spawnGameObject[2], spawnPoint, Quaternion.identity);
	}
}
// New function to spawn an enemy
function addObsticle3() { 
	var randNumber = Random.Range(0,100);
	var x1 = transform.position.x - GetComponent.<Renderer>().bounds.size.x/2;
    var x2 = transform.position.x + GetComponent.<Renderer>().bounds.size.x/2;

    // Randomly pick a point within the spawn object
    var spawnPoint = new Vector2(Random.Range(x1, x2), transform.position.y);
	if(!ConditionScript.MAIN_GOAL_REACHED){
		 Instantiate(spawnGameObject[3], spawnPoint, Quaternion.identity);
	}
}
// New function to spawn an enemy
function addObsticle4() { 
	var randNumber = Random.Range(0,100);
	var x1 = transform.position.x - GetComponent.<Renderer>().bounds.size.x/2;
    var x2 = transform.position.x + GetComponent.<Renderer>().bounds.size.x/2;

    // Randomly pick a point within the spawn object
    var spawnPoint = new Vector2(Random.Range(x1, x2), transform.position.y);
	if(!ConditionScript.MAIN_GOAL_REACHED){
		 Instantiate(spawnGameObject[4], spawnPoint, Quaternion.identity);
	}
}




