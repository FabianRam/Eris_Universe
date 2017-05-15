#pragma strict

public var bigLvlButtons:GameObject[];
public var bigLvlSpritePannel:Sprite[];
public var imageBigLvl:UnityEngine.UI.Image;

function Start () {
	SceneHandler.calcLevel();

	hideCurrentLevelButtons(true,10);
}

function setCurrentLevelImage(bigLevel:int){
	imageBigLvl.sprite=bigLvlSpritePannel[bigLevel-1];
}

function hideCurrentLevelButtons(hide:boolean,currentLevel:int){
	for(var i:int=1;i<SceneHandler.unlockedBigLvl;i++){
			if(i!=currentLevel)
			bigLvlButtons[i].SetActive(hide);
	}
}


function Update () {

}