public var buttonWidth:int=Screen.width/3;
public var buttonHeight:int=Screen.height/10;
public var spacing:int=100;

function OnGUI()
{
	GUILayout.BeginArea(Rect(Screen.width/2-buttonWidth/2, Screen.height/2-buttonHeight/2-200,buttonWidth,600));
	
	if(GUILayout.Button("Level 1",GUILayout.Height(buttonHeight)))
	{
			Application.LoadLevel ("LevelDetail");
	}
	GUILayout.Space(spacing);
	if(GUILayout.Button("Level 2",GUILayout.Height(buttonHeight)))
	{
	}
	GUILayout.Space(spacing);
	if(GUILayout.Button("Level 3",GUILayout.Height(buttonHeight)))
	{
	}
	GUILayout.Space(spacing);
	if(GUILayout.Button("Level 4",GUILayout.Height(buttonHeight)))
	{
	}
	GUILayout.EndArea();
}