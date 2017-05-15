#pragma strict

private var spaceShip:GameObject;

function Start () {
	spaceShip=GameObject.Find("spaceship");
}

function Update () {
	 var diff:Vector3 = spaceShip.transform.position - transform.position;
         diff.Normalize();
 
         var rot_z:float = Mathf.Atan2(diff.y, diff.x) * Mathf.Rad2Deg;
         transform.rotation = Quaternion.Euler(0f, 0f, rot_z - 90);
}