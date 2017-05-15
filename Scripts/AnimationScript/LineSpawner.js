#pragma strict

public var whiteLine:GameObject;

function Start () {
	InvokeRepeating("createLine",0,0.3);
}

function Update () {

}

private function createLine(){
	var randomY1=Random.Range(-0.1,0.3);
	var randomY2=Random.Range(-0.1,0.2);
	Instantiate(whiteLine,new Vector3(transform.position.x-0.1,transform.position.y+randomY1,0), Quaternion.identity);
	Instantiate(whiteLine,new Vector3(transform.position.x+0.1,transform.position.y+randomY2,0), Quaternion.identity);
}