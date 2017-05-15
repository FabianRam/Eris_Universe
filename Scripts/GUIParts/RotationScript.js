#pragma strict
// Smoothly tilts a transform towards a target rotation.


function Start () {

}

var speed:int=100;
function Update () {
	transform.Rotate(Vector3.forward * Time.deltaTime*speed);
        
}