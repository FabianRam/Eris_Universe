#pragma strict

private var text:UnityEngine.UI.Text;
private var bLevel:int;
public var sLevel:int=0;
function Start () {
	text =this.GetComponent(UnityEngine.UI.Text);
	bLevel=LevelControler.bigLevel;
}

function Update () {
	if(text.text!=LevelControler.bigLevel+"/"+sLevel)	
	{
	text.text=LevelControler.bigLevel+"/"+sLevel;
	bLevel=LevelControler.bigLevel;
	}
}