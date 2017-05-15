#pragma strict

public var bulletObject:GameObject;
public var bulletStart:GameObject;

function Start () {
	 InvokeRepeating("shootBullet", 0, 1.0);
	 //InvokeRepeating("changePosition", 0, 1.0);
	 //InvokeRepeating("shootLeaves", 0, 1.0);
		
}

function shootBullet (){
	Instantiate(bulletObject, bulletStart.transform.position, Quaternion.identity);
}

function Update () {
	
}

