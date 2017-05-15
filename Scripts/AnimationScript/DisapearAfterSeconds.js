#pragma strict

public var appear:boolean=false;
public var disapearTime:int=40;
private var curDisappearTime:int;
function Start () {
	curDisappearTime=disapearTime;
			
	this.gameObject.SetActive(false);
	
}

function Update () {
	if(appear)
	{
		curDisappearTime++;
		Debug.Log("DISAPEAR "+disapearTime+" " + curDisappearTime);
		if(curDisappearTime>disapearTime){
			this.gameObject.SetActive(false);
			curDisappearTime=disapearTime;
			appear=false;
		}
	}
}

public function isHit(){
	appear=true;
	Debug.Log("HELLLLLLLLLLLLLLLLLLLLLLLOOOOO");
	this.gameObject.SetActive(true);
	curDisappearTime=0;
}