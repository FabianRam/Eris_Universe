#pragma strict

function Start () {

}

function Update () {

}

function OnTriggerEnter2D(obj : Collider2D) {  
	
	if(obj.gameObject.name=="spaceship"){
		Debug.Log("HIT BACK");
		obj.gameObject.GetComponent(Rigidbody2D).AddForce (Vector3.up * -10);
	}
}