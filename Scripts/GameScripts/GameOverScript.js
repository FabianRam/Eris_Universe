#pragma strict

public static var gameWon:boolean;
private var move:boolean=false;
private var goalY:float;
private var dellay:int=0;
public var dellaytime:int=1000;

//Statistics
private var statisticsObject:GameObject;
private var statisticsYGoal:float=-2.5;;

private var guiColor:float=0;

public var mainMenueButtonT : Texture;
public var rewindButtonT : Texture;
public var playButtonT : Texture;

private var sceneHandler:GameObject;
private var sceneScript:SceneHandler;

private var winCristalText:UnityEngine.UI.Text;
private var winDumbText:UnityEngine.UI.Text;
private var winTaskText:UnityEngine.UI.Text;
private var winPannel:UnityEngine.UI.Image;

private var looserPannel:UnityEngine.UI.Image;
private var pannel:UnityEngine.UI.Image;
private var wonX:int=0;

private var cockpitLive:int;
private var wingsLive:int;
private var shieldGenerator:int;
private var mechanismLive:int;

private var junk:int;
private var cristals:int;

private var startJunk:int;
private var startCristals:int;

//UpgradeHandler
private var upgradeHandler:GameObject;
private var upgradeScript:UpgradeScript;

private var levelScript:LevelScript;;
public var isLooserP:boolean;

function Start () {

//	Debug.Log("//////////////// gameLost "+gameWon);
	levelScript=Camera.main.GetComponent(LevelScript);

 	upgradeHandler=GameObject.Find("UpgradeHandler");
	upgradeScript=upgradeHandler.GetComponent(UpgradeScript);
		
	winCristalText=GameObject.Find("winCristalText").GetComponent(UnityEngine.UI.Text);	
	winDumbText=GameObject.Find("winDumbText").GetComponent(UnityEngine.UI.Text);	
	winTaskText=GameObject.Find("winTaskText").GetComponent(UnityEngine.UI.Text);	
	winPannel=GameObject.Find("WinPannel").GetComponent(UnityEngine.UI.Image);	
	winPannel.rectTransform.position.x=Screen.width/2-winPannel.rectTransform.localScale.x/2;
	
	
	sceneHandler=GameObject.Find("SceneHandler");
	
	sceneScript= sceneHandler.GetComponent(SceneHandler);
	
	ConditionScript.MAIN_GOAL_REACHED=false;	
}

public function onGameWon(won:boolean)
{
	var missionPannel=GameObject.Find("WinPannel");
	var missionScript=missionPannel.GetComponent(MissionScript);
	missionScript.updateMissions();
	
	
	looserPannel=GameObject.Find("LooserPannel").GetComponent(UnityEngine.UI.Image);
	if(won)
	{
	gameWon=true;
	
	isLooserP=false;
	pannel=GameObject.Find("WinnerPannel").GetComponent(UnityEngine.UI.Image);
	wonX=Screen.height*1/10;
	}
	else{
	gameWon=false;

	
	isLooserP=true;
	pannel=looserPannel;
	
	}
	pannel.rectTransform.position.x=Screen.width/2-pannel.rectTransform.localScale.x/2;
	
}

public function setLooser()
{
	isLooserP=true;
}

function Update () {
	if(move){
	dellay++;
	if(dellay>dellaytime){
	var step = Screen.height*2 * Time.deltaTime;
	pannel.rectTransform.position = Vector3.MoveTowards(pannel.rectTransform.position, Vector3(pannel.rectTransform.position.x,Screen.height*2/3+wonX,pannel.rectTransform.position.z), step*2);	
//	winPannel.rectTransform.position.y=Screen.height*1/3;	
	winPannel.rectTransform.position = Vector3.MoveTowards(winPannel.rectTransform.position,
	Vector3(winPannel.rectTransform.position.x,Screen.height*1/4,winPannel.rectTransform.position.z), step);	
	}
	}
	if(winPannel!=null && winPannel.transform.position.y==statisticsYGoal){
	if(guiColor<1 )
	{
		guiColor+=0.03;
		Debug.Log("GUI COLOR "+guiColor);
	}
	}
}

public function setGameLost()
{
	isLooserP=true;
}

private var statisticsXPos:int;
public function setStatus()
{
	if(gameWon){
	transform.position.y=0;
	}
	else{
	transform.position.y=-1;
	goalY-=2;
	}
	transform.position.x=0;
	
		Time.timeScale=0.1;
	goalY=transform.position.y+Camera.main.orthographicSize/2;
	
	move=true;
}

private var goalText:String;
public function setGoal(newGoal:String){
	goalText+=newGoal+"\n"; 
}

public function setResoureces(junk:int,cristals:int){
	  winDumbText.text=""+(junk-startJunk);
	  winCristalText.text=""+(cristals-startCristals);
	   winTaskText.text="Level "+levelScript.getCurrentLevel();
	  //  winTaskText.text+='\n'+goalText;
}


public function setShipPart(cockpitLive:int,wingsLive:int,shieldGenerator:int,mechanismLive:int,junk:int,cristals:int)
{
	this.cockpitLive=cockpitLive;
	this.wingsLive=wingsLive;
	this.shieldGenerator=shieldGenerator;
	this.mechanismLive=mechanismLive;
	this.junk=junk;
	this.cristals=cristals;
}


public function onBackToMenue()
{
	if(gameWon)
	{
		saveRecources();
		_onGameWon();
	}

	 Application.LoadLevel ("MainMenue");
         
         Time.timeScale=1;
         
}

public function onRewind()
{
	if(gameWon)
	saveRecources();
			
  Application.LoadLevel (Application.loadedLevel);//TODO RELOAD SAVED LEVEL NAME
     	  Debug.Log("RELOAD SCENE");
         Time.timeScale=1;
         
}

public function onPlay()
{
 	if(gameWon)
	{
		saveRecources();
		_onGameWon();
    }
    else
      	Debug.Log("IS NOT HIGHEST!");
	
	Application.LoadLevel ("LevelMenue");
	Time.timeScale=1;
	
	  
}

private function _onGameWon()
{
	if(!isLooserP){
	saveShipParts();
	upgradeScript.setShipStatus(cockpitLive,wingsLive,shieldGenerator,mechanismLive,junk,cristals);
         
	if(levelScript.isHighestLevel()){
	  LevelScript.highestLevel=levelScript.getNextLevel();
	  PlayerPrefs.SetInt("unlockedLevel",LevelScript.highestLevel);
	  PlayerPrefs.Save();
	  Debug.Log("UNLOCKED LEVEL "+PlayerPrefs.GetInt("unlockedLevel"));
	}
	}
  //sceneScript.unlockNextLvl();
}

public function setStartResoureces(startJunk:int,startCristals:int)
{
	this.startCristals=startCristals;
	this.startJunk=startJunk;
}

private function saveShipParts(){
	if(cockpitLive<=upgradeScript.maxCockpitHealth*0.25f)
		cockpitLive=upgradeScript.maxCockpitHealth*0.25f;
	PlayerPrefs.SetInt("cockpitLive",cockpitLive);
	
	if(wingsLive<=upgradeScript.maxWingshealth*0.25f)
		wingsLive=upgradeScript.maxWingshealth*0.25f;
	PlayerPrefs.SetInt("wingsLive",wingsLive);
	
	if(shieldGenerator<=upgradeScript.maxBinHealth*0.25f)
		shieldGenerator=upgradeScript.maxBinHealth*0.25f;
	PlayerPrefs.SetInt("shieldGenerator",shieldGenerator);
	
	if(mechanismLive<=upgradeScript.maxMechanicsHealth*0.25f)
		mechanismLive=upgradeScript.maxMechanicsHealth*0.25f;
	PlayerPrefs.SetInt("mechanismLive",mechanismLive);
	
	PlayerPrefs.Save();
	
}
//SAVE DATA Permanently
private function saveRecources(){
	PlayerPrefs.SetInt("junk",junk);
	PlayerPrefs.SetInt("crystals",cristals);
	PlayerPrefs.Save();
}

