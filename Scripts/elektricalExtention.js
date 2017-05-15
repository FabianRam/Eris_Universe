#pragma strict


var target:GameObject;
 var angle:float =0;
 var speed:float=(2*Mathf.PI)/5; //2*PI in degress is 360, so you get 5 seconds to complete a circle
 var radius:float=5;
var pullF:float = -10;

function Start () {
	target=GameObject.Find("spaceship");
}

function Update () {
	 angle += speed*Time.deltaTime; //if you want to switch direction, use -= instead of +=
     transform.position.x = target.transform.position.x+ Mathf.Cos(angle)*radius;
     transform.position.y = target.transform.position.y+Mathf.Sin(angle)*radius;
}

function OnTriggerEnter2D(obj : Collider2D) {  
	if (obj.tag == "EnemyShip"||obj.tag=="comet"){
		 obj.GetComponent.<Rigidbody2D>().velocity *= (pullF * Time.deltaTime);
		 Debug.Log("COLLIDED WITH ENEMY");
		 }
}