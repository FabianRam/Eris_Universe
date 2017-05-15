#pragma strict

private var spaceShip:GameObject;
public var orbitDegreesPerSec:float = 100.0f;
     
function Start () {
	spaceShip=GameObject.Find("spaceship");
}

function Update () {
	//transform.RotateAround (spaceShip.transform.position, Vector3.left, 200 * Time.deltaTime);
	
	  //transform.Rotate (Vector3.forward * -90);
	//transform.Rotate(Vector3.zero, 200 * Time.deltaTime);
      
        
         transform.position = spaceShip.transform.position + (transform.position - spaceShip.transform.position).normalized;
             transform.RotateAround(spaceShip.transform.position, Vector3.forward, orbitDegreesPerSec * Time.deltaTime);

}

