#pragma strict

public var shipParts:Sprite[];
public var shipPartsImage:UnityEngine.UI.Image[];

function Start () {

}

function Update () {

}

public function setLevel(lvl:int)//SpriteRenderer
{
	if(lvl<shipParts.Length&&shipParts[lvl]!=null)
	GetComponent(SpriteRenderer).sprite = shipParts[lvl];
}

public function setLevelImage(lvl:int)//UIIMage
{
	if(lvl<shipParts.Length&&shipParts[lvl]!=null){
	var image= GetComponentInChildren(UnityEngine.UI.Image);
	image.sprite  = shipParts[lvl];
	}
	else
	{
//	image.sprite  = shipParts[1];
	}
}

//.GetComponentsInChildren<Image>()