#pragma strict

public var minSpeed:float=.2f;
public var maxSpeed:float=1.5f;

function Start () {
	var rand:float=Random.Range(minSpeed,maxSpeed);
	transform.localScale=new Vector3(rand,rand,rand);
	
}

function Update () {
	if(transform.position.y<-7)
	Destroy(gameObject);
}