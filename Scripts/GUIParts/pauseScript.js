#pragma strict

private var junkCounter:int;
private var cristalCounter:int;

private var playerLife:GameObject;
private var pauseButton:UnityEngine.UI.Button;

private var goalPannel:GameObject;

//Handles PupUps
public var popUp:GameObject;

private var pauseScreen:GameObject;
private var pauseImage:GameObject;

private var missionPannel:GameObject;
private var missionScript:MissionScript;
public var gameHasStartet:boolean=false;
private var callSecondaryWeapons:CallSecondaryWeapons;

public var pauseButtonText:UnityEngine.UI.Text;

function Start () {
	callSecondaryWeapons=Camera.main.GetComponent(CallSecondaryWeapons);
	missionPannel=GameObject.Find("MissionPannel");
	missionScript=missionPannel.GetComponent(MissionScript);
	
	
	pauseImage=GameObject.Find("PauseImage");
	
	pauseScreen=GameObject.Find("PauseScreen");
	pauseScreen.transform.position.x=9999;
	
	pauseButton=GameObject.Find("PauseButton").GetComponent(UnityEngine.UI.Button);	
//	pauseButton.transform.position.x=Screen.width/20;
	
//	 var worldPoint:Vector3 = Camera.main.ScreenToWorldPoint(new Vector3(Screen.width*1/20, Screen.height*32/35, 5));
// 	transform.position = worldPoint;
	playerLife=GameObject.Find("LiveOf Ship");
	transform.position.x=Screen.width*1/20;
	
	var levelScript=Camera.main.GetComponent(LevelScript);
	if(pauseButtonText!=null)
	pauseButtonText.text="Level "+levelScript.getCurrentLevel();
	
	Time.timeScale=1;
	onClickPause();
}

private var onPause:boolean=false;
private var size:int=0;
private var sizeModifier:int=1;
function Update () {
	if(Time.timeScale==0)
	{
	if(size==10)
	sizeModifier=-1;
	if(size==-10)
	sizeModifier=1;
	
	size+=sizeModifier;		
	pauseImage.transform.localScale += new Vector3(0.001F*sizeModifier, 0.001F*sizeModifier, 0);
	}
}

function OnApplicationPause(pState:boolean)
{
         var paused = pState;
}

function OnApplicationFocus(focusStatus: boolean) {
		var paused = focusStatus;
 		if (paused == false)
        {   
            onClickPause();
        }
}


public function onClickPause(){
	if(Time.timeScale!=0)
	{
		
		AudioListener.pause=true;
		onPause=true;
		Time.timeScale=0;
		pauseScreen.transform.position.x=0+Screen.width/2-pauseScreen.transform.localScale.x;
		//Debug.Log("PAUSEgo");
		missionScript.updateMissions();
	}else{
		callSecondaryWeapons.onGameStartet();
		AudioListener.pause=false;
		gameHasStartet=true;
		Time.timeScale=1;
		onPause=false;
		pauseScreen.transform.position.x=9999;

		
	}
}

public function onClickContunue(){

}

private function onMuteSound(){
if(AudioListener.pause)
				AudioListener.pause=false;
			else
				AudioListener.pause= true;
}
public function setJunk(counter:int)
{
	this.junkCounter=counter;
}

public function setCristals(counter:int)
{
	this.cristalCounter=counter;
}