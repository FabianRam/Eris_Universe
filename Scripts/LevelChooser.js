#pragma strict

private var sceneHandler:GameObject;
private var sceneScript:SceneHandler;
function Start () {
	sceneHandler=GameObject.Find("SceneHandler");
	sceneScript= sceneHandler.GetComponent(SceneHandler);
}


function Update () {

}
public var level0Button:Texture;
public var nextLevel:String;

function OnGUI () 
{	

	GUI.backgroundColor=Color.clear;
	if (GUI.Button (Rect (Screen.width*2/12,Screen.height/2+100,100,100), level0Button)) {
       nextLevel="FirstScene";
    }

    
    if (GUI.Button (Rect (Screen.width*5/12,Screen.height/2+100,100,100),level0Button)) {
//        Application.LoadLevel ("MainMenue");
          nextLevel="Level2";
 		
    }
    
   if (GUI.Button (Rect (Screen.width*8/12,Screen.height/2+100,100,100), level0Button)) {
           nextLevel="Level3";
    }
    Debug.Log("LEVEL "+nextLevel);
    sceneScript.setAktualLevel(nextLevel);
}