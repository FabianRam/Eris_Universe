#pragma strict

var target: Transform;

var speed: float;

// Instantiates respawnPrefab at the location 
// of all game objects tagged "Respawn".
private var respawnPrefab: GameObject;
private var enemies: GameObject[];
private var enemiesScript: EnemyScript[];

public var explosionObject:GameObject;
public var remainingTimeText:UnityEngine.UI.Text;
private var remainingTime:float=4;
public var demage : float=3;

function Start () {
	
	Invoke("DestroyRaket",remainingTime);
		enemies = GameObject.FindGameObjectsWithTag("EnemyShip");
		if(enemies.Length>0){
		enemiesScript = new EnemyScript[enemies.Length];

		for (var i:int =0;i<enemies.Length;i++){
			enemiesScript[i]=(enemies[i].GetComponent(EnemyScript));
		}
		var highestValueIndex = indexOfMax(enemiesScript);
		var go = enemiesScript[highestValueIndex].gameObject;
		target= go.transform;
		}else{
			
		}

	
}

private function DestroyRaket(){
	Instantiate(explosionObject,transform.position, Quaternion.identity);
	Destroy(this.gameObject);
}

public function DestroyAnim(){
	Instantiate(explosionObject,transform.position, Quaternion.identity);
	
 }


function Update () {
	//Time
	remainingTime-= Time.deltaTime;
	remainingTimeText.text=""+remainingTime;

	// The step size is equal to speed times frame time.
		if(target!=null){
		var step = speed * Time.deltaTime;

		// Move our position a step closer to the target.
		transform.position = Vector3.MoveTowards(transform.position, target.position, step);



		var diff = target.position - transform.position;
 
         var rot_z = Mathf.Atan2(diff.y, diff.x) * Mathf.Rad2Deg;
         transform.rotation = Quaternion.Euler(0f, 0f, rot_z - 90);
		}
		else{
			GetComponent.<Rigidbody2D>().velocity.y+=speed/20;
			 transform.rotation = Quaternion.Euler(0f, 0f, 0);
		}
}

function indexOfMax(arr:EnemyScript[]) {


    var max = arr[0].live;
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i].live > max) {
            maxIndex = i;
            max = arr[i].live;
        }
    }

    return maxIndex;
}

public function getDemage():float
{
	return demage;
}