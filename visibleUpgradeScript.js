#pragma strict

public var visibleUpPref:GameObject;
public var visibleUpdate:GameObject[];


private var upgradeHander:GameObject;
private var upgradeScript:UpgradeScript;
private var levels:int[];
public var part:int;

private var visibleTemplate:GameObject;
function Start () {
			updateLevels();
			visibleTemplate=GameObject.Find("UpgradeVisibleTemplate");
}	

function Update () {
//	Debug.Log(levels!=upgradeScript.getLevels());
	if(levels!=upgradeScript.getLevels()){
				updateLevels();
	}
}

public function updateLevels(){
			upgradeHander=GameObject.Find("UpgradeHandler");
			upgradeScript=upgradeHander.GetComponent(UpgradeScript);
			levels=upgradeScript.getLevels();

	visibleUpdate=new GameObject[levels.length];	
	for(var i:int=0;i<levels[part];i++){//#visibility of levelprogress#
		visibleUpdate[i]=visibleUpPref;		
		visibleUpdate[i]=Instantiate(visibleUpdate[i]);
		Camera.main.ScreenToWorldPoint(visibleUpdate[i].transform.localScale);
//		var rectTemplate=visibleTemplate.GetComponent(RectTransform);
//		visibleUpPref.GetComponent(RectTransform)=rectTemplate;
//		visibleUpPref.GetComponent.<Collider>().bounds.size=visibleTemplate.GetComponent.<Collider>();
		visibleUpdate[i].transform.localScale=new Vector3(Screen.width*1/250,Screen.height*1/460,1);
		visibleUpdate[i].transform.SetParent(transform);
		visibleUpdate[i].transform.position= Vector3(transform.position.x-Screen.width*1/25+i*Screen.width*1/51,transform.position.y+2,0); 
//		 visibleUpPref.transform.localScale = Vector3.Scale(transform.localScale, new Vector3(Screen.width / org, Screen.height / 800, 1.0f));
		Camera.main.ScreenToWorldPoint(visibleUpdate[i].transform.position);
		Camera.main.ScreenToWorldPoint(visibleUpdate[i].transform.localScale);
	}	
}