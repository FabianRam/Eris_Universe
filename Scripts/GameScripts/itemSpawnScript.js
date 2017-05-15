#pragma strict

public var item: GameObject;
public var spawnTime : float = 2;

public var item2:GameObject;
public var spawnTime2 : float = 2;

public var item3:GameObject;
public var spawnTime3 : float = 2;

public var item4:GameObject;
public var spawnTime4 : float = 2;

public var item5:GameObject;
public var spawnTime5 : float = 2;

function Start () {
	 InvokeRepeating("addItem", spawnTime, spawnTime);
	 InvokeRepeating("addItem2", spawnTime2, spawnTime2);
	 InvokeRepeating("addItem3", spawnTime3, spawnTime3);
	 InvokeRepeating("addItem4", spawnTime4, spawnTime4);
	 InvokeRepeating("addItem5", spawnTime5, spawnTime5);
}

function addItem() {  
    // Variables to store the X position of the spawn object
    // See image below
    var x1 = transform.position.x - GetComponent.<Renderer>().bounds.size.x/2;
    var x2 = transform.position.x + GetComponent.<Renderer>().bounds.size.x/2;

    // Randomly pick a point within the spawn object
    var spawnPoint = new Vector2(Random.Range(x1, x2), transform.position.y);

    // Create an enemy at the 'spawnPoint' position
      if(!ConditionScript.MAIN_GOAL_REACHED)
    Instantiate(item, spawnPoint, Quaternion.identity);
}

function addItem2() {  
    // Variables to store the X position of the spawn object
    // See image below
    var x1 = transform.position.x - GetComponent.<Renderer>().bounds.size.x/2;
    var x2 = transform.position.x + GetComponent.<Renderer>().bounds.size.x/2;

    // Randomly pick a point within the spawn object
    var spawnPoint = new Vector2(Random.Range(x1, x2), transform.position.y);

    // Create an enemy at the 'spawnPoint' position
      if(!ConditionScript.MAIN_GOAL_REACHED)
    Instantiate(item2, spawnPoint, Quaternion.identity);
}

function addItem3() {  
    // Variables to store the X position of the spawn object
    // See image below
    var x1 = transform.position.x - GetComponent.<Renderer>().bounds.size.x/2;
    var x2 = transform.position.x + GetComponent.<Renderer>().bounds.size.x/2;

    // Randomly pick a point within the spawn object
    var spawnPoint = new Vector2(Random.Range(x1, x2), transform.position.y);

    // Create an enemy at the 'spawnPoint' position
     if(!ConditionScript.MAIN_GOAL_REACHED)
     Instantiate(item3, spawnPoint, Quaternion.identity);
}

function addItem4() {  
    // Variables to store the X position of the spawn object
    // See image below
    var x1 = transform.position.x - GetComponent.<Renderer>().bounds.size.x/2;
    var x2 = transform.position.x + GetComponent.<Renderer>().bounds.size.x/2;

    // Randomly pick a point within the spawn object
    var spawnPoint = new Vector2(Random.Range(x1, x2), transform.position.y);

    // Create an enemy at the 'spawnPoint' position
     if(!ConditionScript.MAIN_GOAL_REACHED)
     Instantiate(item4, spawnPoint, Quaternion.identity);
}

function addItem5() {  
    // Variables to store the X position of the spawn object
    // See image below
    var x1 = transform.position.x - GetComponent.<Renderer>().bounds.size.x/2;
    var x2 = transform.position.x + GetComponent.<Renderer>().bounds.size.x/2;

    // Randomly pick a point within the spawn object
    var spawnPoint = new Vector2(Random.Range(x1, x2), transform.position.y);

    // Create an enemy at the 'spawnPoint' position
      if(!ConditionScript.MAIN_GOAL_REACHED)
    Instantiate(item5, spawnPoint, Quaternion.identity);
}



function Update () {

}