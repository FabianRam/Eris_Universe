#pragma strict

public var secondWeaponObj:GameObject;
private var secondWeaponScript:secondWeapon;
private var timeNoFinger=25;
private var curTime=0;
public var isOn:boolean=false;

public var gameIsStartet=false;

private var ship:GameObject;
private var shipControl:ShipControl;

function Start () {
	secondWeaponScript=secondWeaponObj.GetComponent(secondWeapon);
	ship=GameObject.Find("spaceship");
	shipControl=ship.GetComponent(ShipControl);
}

public function onGameStartet(){
	gameIsStartet=true;
}

function Update () {
	
//	var fingerCount = 0;
//	for (var touch : Touch in Input.touches) {
//		if (touch.phase != TouchPhase.Ended && touch.phase != TouchPhase.Canceled){
//			fingerCount++;
//			curTime=0;
//		
//			}
//	}
//	
//	if(!isOn){
//		curTime++;
//		
//			if (fingerCount == 0&&shipControl.rackets>0)
//			{
//				if(curTime==timeNoFinger){
//					secondWeaponScript.OnMouseDown();
//					curTime=0;
//					isOn=true;
//					}
//				}
//	}
	
}