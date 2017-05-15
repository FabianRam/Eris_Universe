#pragma strict

private var bonusTime:int=0;
private var maxBonusTime=75;

function Start () {
//	Debug.Log("CREATE BONUS///////////////////////////");
	
	
}

function Update () {
	if(bonusTime<=maxBonusTime){
	this.transform.localScale*=1.005;
	bonusTime++;
//	Debug.Log("BONUS TIME "+bonusTime + " "+maxBonusTime);
	}
	else{
		Destroy(gameObject);
	}
}