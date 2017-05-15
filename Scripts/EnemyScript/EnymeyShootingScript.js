#pragma strict

public var rightBullet:GameObject;
public var leftBullet:GameObject;

function Start () {
	InvokeRepeating("LaunchLeftProjectile", 2, 8);
	InvokeRepeating("LaunchRightProjectile", 2, 8);
	
}

function Update () {

}

function LaunchLeftProjectile () {
	Instantiate(leftBullet, new Vector3(transform.position.x-0,transform.position.y-2,1), Quaternion.identity);
}

function LaunchRightProjectile () {
	Instantiate(rightBullet, new Vector3(transform.position.x+0.7,transform.position.y-2,1), Quaternion.identity);

}