#pragma strict

private var startExplosionMovement:boolean=false;
public var horizontal:float=0.1;
public var vertikal:float=0.1;

public var demage : float=3;

function Start () {
	
}

function Update () {
	if(startExplosionMovement){
		transform.position.x+=horizontal;
		transform.position.y+=vertikal;
	}
}

function startExplosion(){
	startExplosionMovement=true;
}

public function getDemage():float
{
	return demage;
}