#pragma strict
public var projectilePrefab:GameObject;
public var speed=1;
public var anim:Animator;
public var bulletAmount:int=4;

function Start () {

	InvokeRepeating("LaunchProjectile", 2, 4);
}

var bulletPrefab:GameObject;
var strayFactor : int;

var xMin:float =-3;
var xMax:float =3;
var y =-6;

function LaunchProjectile () {
	for(var i:int=0;i<bulletAmount;i++){
			var x = Random.Range(xMin,xMax);
		 var direction:Vector2 = new Vector3(x,y,0) - transform.position;
	 	direction.Normalize();
	 	var rotation:Quaternion = Quaternion.Euler( 0, 0, Mathf.Atan2 ( direction.y, direction.x ) * Mathf.Rad2Deg + 90 );
	 	var projectile:GameObject = Instantiate( projectilePrefab, transform.position, Quaternion.identity);
	 	projectile.transform.rotation=rotation;
	 	projectile.GetComponent.<Rigidbody2D>().velocity = direction * speed;
 	}
}

										
	

function Update () {

}