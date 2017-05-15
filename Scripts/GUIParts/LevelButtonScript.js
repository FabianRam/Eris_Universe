#pragma strict

private var anim:Animation;
public var aktivated:boolean;
public var bigLevel:int;

public var level2Btn:GameObject[];
public var highlightButton:GameObject;
private var button:UnityEngine.UI.Button;

public var btnClicked:boolean=false;
public var isForwardBtn:boolean=false;
private var objProgressScript:HideLevelObjectsScripts;


function Start () {
	this.GetComponent(UnityEngine.UI.Button).interactable=aktivated;
	if(isForwardBtn)
		bigLevel=SceneHandler.unlockedBigLvl;
//	Debug.Log("%%% " + SceneHandler.differentSmall[bigLevel-1]);
var objProgress= GameObject.Find("LevelProgressOBject");
	objProgressScript =objProgress.GetComponent(HideLevelObjectsScripts);
}

function Update () {

	
}

public function onButtonClicked(){
	objProgressScript.hideCurrentLevelButtons(false,bigLevel-1);
	Debug.Log("BUTTONN "+ bigLevel);
	btnClicked=true;
	var showedSmallButtons = SceneHandler.differentSmall[bigLevel-1];
	for(var j:int =0;j<showedSmallButtons;j++)
	{
		level2Btn[j].SetActive(true);
	
		level2Btn[j].GetComponent(UnityEngine.UI.Button).interactable = false;
		highlightButton.transform.position=new Vector3(99,999,99);
	}

	if(SceneHandler.unlockedBigLvl>=bigLevel-1){
		var goTo:int=SceneHandler.differentSmall[bigLevel-1];
	if(SceneHandler.unlockedBigLvl==bigLevel){
		goTo=SceneHandler.unlockedLevel;
	}	
	else{
	
	}
		
	var lastMarked=0;
		for(var i:int=0;i<9;i++)
			{
				
				if(i<=SceneHandler.differentSmall[bigLevel-1]-1){
					if(i<=goTo)
					{
						Debug.Log("SceneHandler.differentSmall[bigLevel-1]-1 "+((SceneHandler.differentSmall[bigLevel-1])-1)+" i " +i + " goTo " +goTo);
						
						level2Btn[i].GetComponent(UnityEngine.UI.Button).interactable = true;
						lastMarked=i;
						
					}else{
						level2Btn[i].GetComponent(UnityEngine.UI.Button).interactable = false;
					}
				}
				else{
				
					if(level2Btn[i]!=null)
						level2Btn[i].SetActive(false);
				}
				highlightButton.transform.position=level2Btn[lastMarked].transform.position;
			}
	}
}
	
public function onClickForward(){

	objProgressScript.hideCurrentLevelButtons(false,bigLevel);
	btnClicked=true;
	if(LevelControler.CUR_STATUS==1){

	for(var j:int =0;j<9;j++)
	{
		if(j<=SceneHandler.differentSmall[SceneHandler.unlockedBigLvl-1]){
			Debug.Log("SceneHandler.differentSmall[SceneHandler.unlockedBigLvl-1] "+SceneHandler.differentSmall[SceneHandler.unlockedBigLvl-1]);
			level2Btn[j].SetActive(true);
			level2Btn[j].GetComponent(UnityEngine.UI.Button).interactable = false;
			highlightButton.transform.position=new Vector3(99,999,99);
		}else{
			level2Btn[j].SetActive(false);
		}
	}
		var goTo=SceneHandler.unlockedLevel;
	for(var i:int=0;i<SceneHandler.differentSmall[SceneHandler.unlockedBigLvl-1];i++)
			{
				if(i<=SceneHandler.differentSmall[SceneHandler.unlockedBigLvl-1]){
					if(i<=goTo-1)
					{
						level2Btn[i].GetComponent(UnityEngine.UI.Button).interactable = true;
						if(i==goTo-1)
						highlightButton.transform.position=level2Btn[i].transform.position;
					}else{
						level2Btn[i].GetComponent(UnityEngine.UI.Button).interactable = false;
					}
				}
				else{
					level2Btn[i].SetActive(false);
				}
			}
			}else{
			for(var a:int =0;a<9;a++)
	{
		
			level2Btn[a].SetActive(false);
		
	}
	}
	}


	
	
	
	
	