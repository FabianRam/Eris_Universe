#pragma strict

private var speed : float = -2;
public var nutParts:GameObject[];

public var explosionTime:float=1;

function Start () {
	GetComponent.<Rigidbody2D>().velocity.y = speed+Random.Range(1,-1);
	Invoke("nutExplosion",explosionTime);
}

function Update () {

}

function nutExplosion(){
	for(var i:int=0;i<nutParts.Length;i++){
		var nutScriptExplodeScript = nutParts[i].GetComponent(NutPartScript);
		nutScriptExplodeScript.startExplosion();
		Destroy(this.gameObject,5);
	}
}


