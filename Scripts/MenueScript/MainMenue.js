

public var deleteGameObject:GameObject;
public var prologObject:GameObject;

function Start(){
	Debug.Log("TIME SCALE "+Time.timeScale);
	Time.timeScale=1;
}

public function onContinue()
{
	Application.LoadLevel ("FirstScene");
}

public function onStartCampagnie()
{
	var showProlog=PlayerPrefs.GetInt("ShowProlog");
	if(showProlog==0){
		prologObject.SetActive(true);
		PlayerPrefs.SetInt("ShowProlog",1);
	}
	else{
		Application.LoadLevel ("LevelMenue");
	}
}


public function onResetPlayerSettings()
{
	deleteGameObject.SetActive(true);
}

public function hideDeleteGUI(){
	deleteGameObject.SetActive(false);
}

public function deleteSaveFiles(){
	deleteGameObject.SetActive(false);
	PlayerPrefs.DeleteAll();
	if(GameObject.Find("UpgradeHandler")!=null)
		Destroy(GameObject.Find("UpgradeHandler"));
}
