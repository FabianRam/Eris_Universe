#pragma strict

public var currentLevel:int=1;
public static var highestLevel:int=1;

function Start () {

}

function Update () {

}

public function getCurrentLevel():int
{
	return currentLevel;
}

public function isHighestLevel():boolean
{
Debug.Log("currentLevel "+currentLevel);
Debug.Log("highestLevel "+highestLevel);
	if(currentLevel>=highestLevel)
		return true;
	return false;
}

public function getNextLevel():int
{
	return currentLevel+1;
}