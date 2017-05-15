#pragma strict

public var levelBubbles : GameObject[];
private var level:int;

public var upgradeImage:UnityEngine.UI.Image;
public var images:Sprite[];

private var upgradeHandler:GameObject;
private var upgradeScript:UpgradeScript;

private var normalColor:Color;

function Start () {
		upgradeHandler=GameObject.Find("UpgradeHandler");
	upgradeScript=upgradeHandler.GetComponent(UpgradeScript);
	var image =levelBubbles[0].GetComponent(UnityEngine.UI.Image);
	normalColor=image.color;
}

public function updateLevel(currentUpPart:String,clevel:int){
	level=upgradeScript.currentLevel;
	Debug.Log("LEVEL "+level);
	for(var i:int=0;i<levelBubbles.Length;i++){
		if(i>level)
		{
			levelBubbles[i].SetActive(false);
		}else{
			levelBubbles[i].SetActive(true);
			var levelBubbleImage =levelBubbles[i].GetComponent(UnityEngine.UI.Image);
			levelBubbleImage.color=normalColor;
		}
	}
	var image:UnityEngine.UI.Image=levelBubbles[level].GetComponent(UnityEngine.UI.Image);
	image.color=Color.green;
	
	switch(currentUpPart){
	case "Cockpit":
		upgradeImage.sprite=images[0];
		break;
		
		case "Wings":
		upgradeImage.sprite=images[3];
		
		break;
		
		case "Shield generator":
		upgradeImage.sprite=images[1];
		
		break;
		
		case "Mechanics":
		upgradeImage.sprite=images[2];
		
		break;
		
		case "FirstWeapon":
		upgradeImage.sprite=images[4];
		
		break;
		
		case "Heavy Weapon":
		upgradeImage.sprite=images[5];
		
		break;
	}
}

function Update () {

}