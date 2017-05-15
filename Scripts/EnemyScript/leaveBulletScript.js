#pragma strict

public var leaveObject:GameObject;

function Start () {

}

function Update () {
	if(transform.position.y<=-6)
		Destroy(this.gameObject);
}

function setLeaves(){
	var leaveO=Instantiate(leaveObject, transform.position, Quaternion.identity);
	var leaveScript= leaveO.GetComponent(LeaveScript);
	leaveScript.randomTransformation();
}