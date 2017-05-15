public var buttonWidth:int=Screen.width/3;
public var buttonHeight:int=Screen.height/10;
public var spacing:int=100;

public var backScene:String;
public var nextScene:String="noNextScene";

private var sceneHandler:GameObject;
private var sceneScript:SceneHandler;

function Start(){
	if(this.name=="BackAndForwardUpgrade"){
	sceneHandler=GameObject.Find("SceneHandler");
	sceneScript= sceneHandler.GetComponent("SceneHandler");
	Debug.Log("SCENE "+sceneScript.getAktLevel());
	}
}


function OnGUI()
{
	GUILayout.BeginArea(Rect(Screen.width/6*5-buttonWidth/2, Screen.height/7*6,buttonWidth,600));
	
	
//	GUILayout.Space(spacing);
//	GUILayout.Space(Screen.height/4*3);
	if(GUILayout.Button("Back",GUILayout.Height(buttonHeight)))
	{
		Application.LoadLevel (backScene);
	}
	
//	GUILayout.Space(spacing);
	if(nextScene!="noNextScene")
	if(GUILayout.Button("Start",GUILayout.Height(buttonHeight)))
	{
		if(this.name=="BackAndForwardUpgrade"){
			nextScene=sceneScript.getAktLevel();
			Debug.Log("AK " +nextScene);
		}
		Application.LoadLevel (nextScene);
	}
	GUILayout.EndArea();
}