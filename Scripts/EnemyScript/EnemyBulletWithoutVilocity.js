#pragma strict

public var demage : float=4;
public var bulletKind : int =-1;
public var enemyFire:boolean=true;


function Start () {

}

function Update () {

}

public function getDemage():float
{
	return demage;
}

// Gets called when the object goes out of the screen
function OnBecameInvisible() {  
    // Destroy the bullet 
    Destroy(gameObject);
} 