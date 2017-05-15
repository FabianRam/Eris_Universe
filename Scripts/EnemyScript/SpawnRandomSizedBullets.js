#pragma strict

public var rightBullet:GameObject;
public var leftBullet:GameObject;

public var spawnTime:float=8;

function Start () {
	InvokeRepeating("LaunchLeftProjectile", 0, spawnTime);
	InvokeRepeating("LaunchRightProjectile", 0, spawnTime);
	
}

function Update () {

}

function LaunchLeftProjectile () {
	var randomDiff:float=Random.Range(-0.75f,0.75f);
	Instantiate(leftBullet, new Vector3(transform.position.x-randomDiff,transform.position.y,1), Quaternion.identity);
	leftBullet.transform.localScale=Vector3.one*Random.Range(0.1f,0.3f);
}

function LaunchRightProjectile () {
	var randomDiff:float=Random.Range(-0.75f,0.75f);
	Instantiate(rightBullet, new Vector3(transform.position.x+randomDiff,transform.position.y,1), Quaternion.identity);
	rightBullet.transform.localScale=Vector3.one*Random.Range(0.1f,0.3f);
}