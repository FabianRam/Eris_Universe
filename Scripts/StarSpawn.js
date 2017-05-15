// Variable to store the enemy prefab
public var obstacle : GameObject;

public var normalEnemey : GameObject;
public var bomberEnemy : GameObject;
public var hunterEnemy : GameObject;
public var smallEnemy : GameObject;

// Variable to know how fast we should create new enemies
public var spawnTime : float = 2;

public var spawnEnemyTime : float = 2;
public var spawnBomberTime : float = 2;
public var spawnHunterTime : float = 2;
public var spawnSmallTime : float = 2;

private var letFree : boolean[] = new boolean[5];
private var freeCounter:int=0;
function Start() {  
    // Call the 'addEnemy' function every 'spawnTime' seconds
    InvokeRepeating("letEnemyFree", 0, 1.0);
}

function Update () {
	if(letFree[0]==true && obstacle!=null)
	{
	InvokeRepeating("addObsticle", spawnTime, spawnTime);
	letFree[0]=false;
    }
    if(letFree[1]==true && smallEnemy!=null)
	{
	InvokeRepeating("addSmallEnemy", spawnSmallTime, spawnSmallTime);  
	letFree[1]=false;
	}
	if(letFree[2]==true && hunterEnemy!=null)
	{
	InvokeRepeating("addHunterEnemy", spawnHunterTime, spawnHunterTime);
	letFree[2]=false;    
	}
	if(letFree[3]==true && normalEnemey!=null)
	{
	InvokeRepeating("addEnemy", spawnEnemyTime, spawnEnemyTime);
	
	letFree[3]=false;
	}
	if(letFree[4]==true && bomberEnemy!=null)
	{
	InvokeRepeating("addBomberEnemy", spawnBomberTime, spawnBomberTime);
	letFree[4]=false;
	}
}

public var timeToLetFree:int[]=new int[5];

function letEnemyFree(){
	 for (var i:int=0;i<timeToLetFree.length;i++)
    {
        if(freeCounter==timeToLetFree[i])
	{
		letFree[i]=true;
	}
    }
	
//	Debug.Log("FREE COUNTER " + freeCounter);
	freeCounter++;
	
}


// New function to spawn an enemy
function addObsticle() {  
    // Variables to store the X position of the spawn object
    // See image below
    var x1 = transform.position.x - GetComponent.<Renderer>().bounds.size.x/2;
    var x2 = transform.position.x + GetComponent.<Renderer>().bounds.size.x/2;

    // Randomly pick a point within the spawn object
    var spawnPoint = new Vector2(Random.Range(x1, x2), transform.position.y);

    // Create an enemy at the 'spawnPoint' position
    Instantiate(obstacle, spawnPoint, Quaternion.identity);
}

// New function to spawn an enemy
function addEnemy() {  
    // Variables to store the X position of the spawn object
    // See image below
    
    var x1 = transform.position.x - GetComponent.<Renderer>().bounds.size.x/2;
    var x2 = transform.position.x + GetComponent.<Renderer>().bounds.size.x/2;

    // Randomly pick a point within the spawn object
    var spawnPoint = new Vector2(Random.Range(x1, x2), transform.position.y);

    // Create an enemy at the 'spawnPoint' position
    Instantiate(normalEnemey, spawnPoint, Quaternion.identity);
}


function addSmallEnemy() {  
    // Variables to store the X position of the spawn object
    // See image below
    
    var x1 = transform.position.x - GetComponent.<Renderer>().bounds.size.x/2;
    var x2 = transform.position.x + GetComponent.<Renderer>().bounds.size.x/2;

    // Randomly pick a point within the spawn object
    var spawnPoint = new Vector2(Random.Range(x1, x2), transform.position.y);

    // Create an enemy at the 'spawnPoint' position
    Instantiate(smallEnemy, spawnPoint, Quaternion.identity);
    Instantiate(smallEnemy, Vector3(spawnPoint.x-smallEnemy.transform.localScale.x*1.5,spawnPoint.y-smallEnemy.transform.localScale.y*1.1,1), Quaternion.identity);
    Instantiate(smallEnemy, Vector3(spawnPoint.x+smallEnemy.transform.localScale.x*1.5,spawnPoint.y-smallEnemy.transform.localScale.y*1.1,1), Quaternion.identity);
	
	
}

// New function to spawn an enemy
function addBomberEnemy() {  
    // Variables to store the X position of the spawn object
    // See image below
    
    var x1 = transform.position.x - GetComponent.<Renderer>().bounds.size.x/2;
    var x2 = transform.position.x + GetComponent.<Renderer>().bounds.size.x/2;

    // Randomly pick a point within the spawn object
    var spawnPoint = new Vector2(Random.Range(x1, x2), transform.position.y);

    // Create an enemy at the 'spawnPoint' position
    Instantiate(bomberEnemy, spawnPoint, Quaternion.identity);
}

// New function to spawn an enemy
function addHunterEnemy() {  
    // Variables to store the X position of the spawn object
    // See image below
    
    var x1 = transform.position.x - GetComponent.<Renderer>().bounds.size.x/2;
    var x2 = transform.position.x + GetComponent.<Renderer>().bounds.size.x/2;

    // Randomly pick a point within the spawn object
    var spawnPoint = new Vector2(Random.Range(x1, x2), transform.position.y);

    // Create an enemy at the 'spawnPoint' position
    Instantiate(hunterEnemy, spawnPoint, Quaternion.identity);
}



