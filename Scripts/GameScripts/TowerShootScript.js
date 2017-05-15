#pragma strict

private var target:GameObject;
public var projectilePrefab:GameObject;
public var speed=1;
public var anim:Animator;

function Start () {

	 InvokeRepeating("shootAtDirection", 0, 2);
	
	
}

function shootAtDirection(){
Debug.Log("SHOOT");
	anim.SetBool("fire",true);
	target=GameObject.Find("spaceship");
	 var direction:Vector2 = target.transform.position - transform.position;
 	direction.Normalize();
 	var rotation:Quaternion = Quaternion.Euler( 0, 0, Mathf.Atan2 ( direction.y, direction.x ) * Mathf.Rad2Deg + 90 );
 	var projectile:GameObject = Instantiate( projectilePrefab, transform.position, Quaternion.identity);
 	projectile.transform.rotation=rotation;
 	projectile.GetComponent.<Rigidbody2D>().velocity = direction * speed;
 	
 	
}

function Update () {

}