#pragma strict

public var aktLevelString:String;
public static var unlockedLevel:int=1;
public static var  unlockedBigLvl:int=2;
public var lvl:int;
//How much levels in one big level
public static var differentSmall:int[]=[9,5,3,3,5];
//public static var unlockedSmall[]:int=[0,0,0,0,0];
private static function calcBigLvel(lvl:int):int
{
var uLvl=lvl;
for(var i:int=0;i<differentSmall.length;i++){
//	var bLev l+=
	
	if(uLvl<=differentSmall[i]){
		unlockedLevel=uLvl;
		return (i+1);
	}else
	uLvl-=differentSmall[i];

}
return 0;
}
//------------------------debugging variables
public  var debugging= false;
public var debuggingLevel=1;

private static var d =false;
private static var dbLevel=1;

//------------------------
public static function calcLevel()
{
	
	var lvl=PlayerPrefs.GetInt("unlockedLevel");
	
	if(d){
		lvl=dbLevel;
	}
	
	if(lvl==0)
	{
		PlayerPrefs.SetInt("unlockedLevel",1);
		lvl=PlayerPrefs.GetInt("unlockedLevel");
	}
	
	
	//lvl=10;---------------------> Test
	unlockedBigLvl=calcBigLvel(lvl);
	Debug.Log("LITLE "+unlockedLevel +" BIG "+unlockedBigLvl);
	
	//	unlockedLevel=PlayerPrefs.GetInt("unlockedLevel");
}


function Start () {
	d=debugging;
	dbLevel=debuggingLevel;

//	Debug.Log("CALC LEVEL "+lvl);
	calcLevel();
//	Debug.Log("LITLE "+unlockedLevel +" BIG "+unlockedBigLvl);
	
	
	DontDestroyOnLoad (transform.gameObject);
}


function Update () {

}
 public static var Instance:SceneHandler;
function Awake()
 {
             if(Instance)
                 DestroyImmediate(gameObject);
             else
             {
                 DontDestroyOnLoad(gameObject);
                 Instance = this;
             }
}


public function setAktualLevel(aktL:String)
{
 	aktLevelString=aktL;
 	//Debug.Log("AKT LEVEL IS "+aktL);
}

public function getAktLevel():String
{
	return aktLevelString;
}

//Returns the highest unlocked Levels
public function unlockNextLvl()
{
	if(PlayerPrefs.GetInt("unlockedLevel")!=0)
	return PlayerPrefs.GetInt("unlockedLevel");
	else 
	return 1;
}

public function getUnlockedLevel():int
{
	if(PlayerPrefs.GetInt("unlockedLevel")!=0)
	return PlayerPrefs.GetInt("unlockedLevel");
	else 
	return 1;
}

