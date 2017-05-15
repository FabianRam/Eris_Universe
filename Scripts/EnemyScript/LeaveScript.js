#pragma strict

public var leaf:GameObject;

private var lifeTime:float=100;;
private var leafDisaperSpeed=0.005;

function Start () {
	
}

function randomTransformation(){
	transform.rotation.z=Random.Range(0,360);
	var size= Random.Range(1,3);
	transform.localScale=Vector3(size,size,1);
}

function Update () {

var color:Color = GetComponent.<Renderer>().material.color;
if(color.a<=0){
	Destroy(this.gameObject);
}
color.a -= leafDisaperSpeed;

GetComponent.<Renderer>().material.color = color;

}