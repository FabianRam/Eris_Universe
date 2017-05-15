
private
var levelchosenRecourcen:boolean=false;
var levelchosenRecourcerOpen:boolean=false;
var lvlBtn:UnityEngine.UI.Button;
var underLvlBtn:UnityEngine.UI.Button;
var currentLevl:int;

var btns:GameObject;
public
var levelPannel:GameObject;
var levelDisc:GameObject;

public var upgrademenueObject:GameObject;
private var upgradeX:float;


public var btnArray:GameObject[];

private var topDes:float=Screen.height*9/10;
private var downDes:float;
private var aktDes:float;

private var upgrademenueO:boolean=false;
private var sceneHandler:GameObject;
private var sceneScript:SceneHandler;
public var level2Btn:GameObject;
public var highlightButton:GameObject;

//UpgradeHandler
private var upgradeHandler:GameObject;
private var upgradeScript:UpgradeScript;

private var ForwardBtnText:UnityEngine.UI.Text;
private var middleDes:float;

private var upgradePopUp:GameObject;
private var upPopUpY:float;
private var buttonX:float;

private var target: Transform;
private var cklickedLevelBtnX:float;
public static var bigLevel:int;



private var universeMarker:GameObject;
private var universMPos:Vector3;

public static var CUR_STATUS=0;
public static var GLOBAL_STATUS=0;
public static var DETAIL_STATUS=1;
public static var DETAIL_TEXT_STATUS=2;
public static var UPGRADE_STATUS=3;

private var levelTextObject:GameObject;
private var levelText:UI.Text;

private var defaultLevelBtn:GameObject;
private var levelButtonScript:LevelButtonScript;

private var yourButtonText:UI.Text;
private var defaultLevelString:String;

public var forwardButtonScript:LevelButtonScript;

private var objProgressScript:HideLevelObjectsScripts;

function Start () {
//SETTING THE HEADER IMAGE
	var objProgress= GameObject.Find("LevelProgressOBject");
	objProgressScript = objProgress.GetComponent(HideLevelObjectsScripts);


	universeMarker=GameObject.Find("Marker");
	universMPos=universeMarker.transform.position;

	buttonX=Screen.width/2-transform.localScale.x/2;
	upgradePopUp=GameObject.Find("UpgradePopUp");
	upPopUpY=upgradePopUp.transform.position.y;
	upgradePopUp.transform.position.y=99999;

	upgradeHandler=GameObject.Find("UpgradeHandler");
	upgradeScript=upgradeHandler.GetComponent("UpgradeScript");
	upgradeScript.setRecourecs();
	
	sceneHandler=GameObject.Find("SceneHandler");
	sceneScript= sceneHandler.GetComponent("SceneHandler");
	
	upgrademenueO=false;
	levelchosenRecourcerOpen=false;
	levelchosenRecourcen=false;
	
	
	upgradeX=upgrademenueObject.transform.position.x;
	upgrademenueObject.transform.position.x=Screen.width*4;
	
	levelPannel.SetActive(false);
	levelDisc.SetActive(false);

	aktDes=topDes;
	buttonX=Screen.width/2-transform.localScale.x/2;
	//Load Level Data
	//PlayerPrefs.DeleteAll ();
	loadLevelData();

 	 defaultLevelBtn=GameObject.Find("Level1");
    levelButtonScript= defaultLevelBtn.GetComponent(LevelButtonScript);

	levelTextObject=GameObject.Find("Level"+SceneHandler.unlockedBigLvl+"Text");
	levelText=levelTextObject.GetComponent(UI.Text);

	CUR_STATUS=GLOBAL_STATUS;
}


public function onClickForward(){
	forwardButtonScript.bigLevel=SceneHandler.unlockedBigLvl+1;
	updateScreenStatus(true);
}

private function updateScreenStatus(goForward:boolean){

	switch(CUR_STATUS){
		case GLOBAL_STATUS:

			//onChooseLevel(1);

			onStartDefaultLevel();
			CUR_STATUS=DETAIL_STATUS;
			objProgressScript.hideCurrentLevelButtons(true,10);
			levelTextObject=GameObject.Find("Level"+SceneHandler.unlockedBigLvl+"Text");
			levelText=levelTextObject.GetComponent(UI.Text);

		break;
		
		case DETAIL_STATUS:
			//Debug.Log("SCREEN _STATUS "+CUR_STATUS);
			onChooseLevel(SceneHandler.unlockedLevel);
		break;
		
		case DETAIL_TEXT_STATUS:
			onLoadUpgradeMenue();
			CUR_STATUS=UPGRADE_STATUS;
		break;
		
		case UPGRADE_STATUS:
			Application.LoadLevel("Level"+bigLevel+currentLevl);
			upgradeScript.saveShipParts();
		break;	
		
		default:
		break;
	}
	//Debug.Log("CUR_STATUS " + CUR_STATUS);
}

private var onlyOnce:boolean=true; //REMOVE
	


var pos:Vector3;
function Update () {
	if(CUR_STATUS<2&&lvlBtn!=null){	
		pos=lvlBtn.transform.position;
		var step = Screen.height*1 * Time.deltaTime;
			lvlBtn.transform.position = Vector3.MoveTowards(lvlBtn.transform.position, Vector3(buttonX,aktDes,pos.z), step);
		if(CUR_STATUS==GLOBAL_STATUS&&lvlBtn.transform.position.y==aktDes){
			lvlBtn=null;
		}
		if(CUR_STATUS==1){		
			if(lvlBtn.transform.position.y>=Screen.height*9/10 && !upgrademenueO)//levelPannel shows not in upgrademue
				levelPannel.SetActive(true);
			if(lvlBtn.transform.position.y==middleDes){
				levelchosenRecourcen=false;
				
			}
		}
	}
}

private function loadLevelData(){

		var  junk=PlayerPrefs.GetInt("junk");
		var cristals=PlayerPrefs.GetInt("crystals");
		
		var cLive =PlayerPrefs.GetInt("cockpitLive");
		var wLive =PlayerPrefs.GetInt("wingsLive");
		var sLive =PlayerPrefs.GetInt("shieldGenerator");
		var mLive =PlayerPrefs.GetInt("mechanismLive");
		
		upgradeScript.setShipStatus(cLive,wLive,sLive,mLive,junk,cristals);
		upgradeScript.updateText();
		
		var cLvl =PlayerPrefs.GetInt("cockpitLevel");
		var wLvl =PlayerPrefs.GetInt("wingsLevel");
		var sLvl =PlayerPrefs.GetInt("shieldGeneratorLevel");
		var mLvl =PlayerPrefs.GetInt("mechanismLevel");
		
		var cBasicShootLvl=PlayerPrefs.GetInt("basicShootLvl");
		var cSecondWeaponLvl=PlayerPrefs.GetInt("HeavyWeaponLvl");	
		upgradeScript.loadShippartLevel(cLvl,wLvl,sLvl,mLvl,cBasicShootLvl,cSecondWeaponLvl);
}



public function onStartLvl(btn:UnityEngine.UI.Button)
{
	bigLevel= btn.GetComponent(LevelButtonScript).bigLevel;
	levelTextObject=GameObject.Find("Level"+bigLevel+"Text");
	levelText=levelTextObject.GetComponent(UI.Text);
	
	if(bigLevel<=SceneHandler.unlockedBigLvl){
		objProgressScript.setCurrentLevelImage(bigLevel);
		MapScript.LOCK_CARD=true;
		universeMarker.transform.position.y=9999;

		//displays the level header
		levelText.color.a=255;
		defaultLevelString=levelText.text;
		
		Time.timeScale=1;
		lvlBtn=btn;
		middleDes=btn.transform.position.y;
		cklickedLevelBtnX=btn.transform.position.x;
		buttonX=Screen.width/2-transform.localScale.x/2;
		aktDes=topDes;
	//	//Debug.Log("LevelChoosen " +levelchosenRecourcen+ " levelchosenRecourcerOpen "+levelchosenRecourcerOpen);
		lvlBtn.interactable = false;
		CUR_STATUS=DETAIL_STATUS; 
	}
}

private var levelButtonInstance:GameObject;
private function onStartDefaultLevel(){
	//Debug.Log("Choose DEFAULT Level "+SceneHandler.unlockedBigLvl);
			levelPannel.SetActive(true);
	
	MapScript.LOCK_CARD=true;
	universeMarker.transform.position.y=9999;
	bigLevel= SceneHandler.unlockedBigLvl;
	
	objProgressScript.setCurrentLevelImage(bigLevel);
	
	
	Time.timeScale=1;
	levelButtonInstance=GameObject.Find("Level"+SceneHandler.unlockedBigLvl);

	
	lvlBtn=levelButtonInstance.GetComponent(UnityEngine.UI.Button);
	
	middleDes=levelButtonInstance.transform.position.y;
	cklickedLevelBtnX=levelButtonInstance.transform.position.x;
	buttonX=Screen.width/2-transform.localScale.x/2;
	aktDes=topDes;

	//displays the level header
	levelText.color.a=255;
	defaultLevelString=levelText.text;
		
	lvlBtn.interactable = false; 
}

public function onBackBtn(){
	switch(CUR_STATUS){
		case GLOBAL_STATUS:
			//onChooseLevel(1);
			Application.LoadLevel ("MainMenue");
		break;
		
		case DETAIL_STATUS:
			objProgressScript.hideCurrentLevelButtons(true,10);
			levelText.color.a=0;
			universeMarker.transform.position=universMPos;
			//Debug.Log("BIG LEVEL SELECTION");
			levelPannel.SetActive(false);
			levelDisc.SetActive(false);
			MapScript.LOCK_CARD=false;
			levelchosenRecourcen=true;
			levelchosenRecourcerOpen=false;
			lvlBtn.interactable = true; 
			aktDes=middleDes;
			buttonX=cklickedLevelBtnX;
			CUR_STATUS=GLOBAL_STATUS;
			
		break;
		
		case DETAIL_TEXT_STATUS://Back to detail button
			levelDisc.SetActive(false);
			var newBtns:GameObject;

			highlightButton.SetActive(true);
		levelchosenRecourcen=false;
		levelchosenRecourcerOpen=true;
		CUR_STATUS=DETAIL_STATUS;

		for(var i:int=0;i<SceneHandler.differentSmall[bigLevel-1];i++){
			btnArray[i].SetActive(true);
		}
		Debug.Log("<SceneHandler.differentSmall[bigLevel-1] "+SceneHandler.differentSmall[bigLevel-1]);

		break;
		
		case UPGRADE_STATUS:
		levelText.text=defaultLevelString;
		upgrademenueObject.transform.position.x=Screen.width*4;
		levelDisc.SetActive(true);
		levelPannel.SetActive(true);
		upgrademenueO=false;
		ForwardBtnText.text="FORWARD";
		CUR_STATUS=DETAIL_TEXT_STATUS;
		break;
		
		default:
		break;
	}
}


public function onBack()
{
	if(!upgrademenueO){
		if(!levelchosenRecourcerOpen&&!levelchosenRecourcen)
		{
			Application.LoadLevel ("MainMenue");
		}
		else if(!levelchosenRecourcen||levelchosenRecourcerOpen)
		{		
			
		}
		else
		{
			//Debug.Log("SMALL LEVEL SELECTION");
			
			levelDisc.SetActive(false);
			var newBtns:GameObject;

			highlightButton.SetActive(true);
		levelchosenRecourcen=false;
		levelchosenRecourcerOpen=true;
		}
	}
	else{
		//Debug.Log("ELSE");
		upgrademenueObject.transform.position.x=Screen.width*4;
		levelDisc.SetActive(true);
		levelPannel.SetActive(true);
		upgrademenueO=false;
	}
	if(ForwardBtnText!=null)
	ForwardBtnText.text="FORWARD";
}




public function onChooseLevel(lvl:int)
{
			
	levelchosenRecourcen=true;
	currentLevl=lvl;
	
	if(currentLevl==0)
		currentLevl=1;
	
	for(var a:int =0;a<9;a++)
	{
			btnArray[a].SetActive(false);
	}


	highlightButton.SetActive(false);
	_searchForLevelText(currentLevl);
	CUR_STATUS=DETAIL_TEXT_STATUS;
}

private function _searchForLevelText(lvl:int)
{


	levelDisc.SetActive(true);
	var str:String;
	switch(bigLevel)
	{
	case 1:
	switch(lvl)
	{
		case 1:
		 str = "Die Antropier versuchen nun alle Menschen zu töten! Mein treuester Freund auf Zulk, der Antropier namens Srikul, hat mir das Leben gerettet indem er mir in meiner größten Not sein altes Raumschiff überlassen hat. Damit konnte ich gerade noch entkommen. Wir wissen, dass wir uns von nun an als Feinde gegenüberstehen werden… Vorerst muss ich aber die letzte große Ansiedlung von Menschen auf dem Nachbarplaneten Benim erreichen. Der Weg dorthin wird gefährlich…";
		 break;
		
		case 2:
		str="Ich bin noch nicht oft mit einem solchen Schiff geflogen. Noch seltsamer für mich ist es allerdings mich damit gegen alte Freunde zu verteidigen…";
		break;
		
		case 3:
		str="Die Angriffe werden immer stärker. Ich weiß nicht ob dieses klapprige alte Schiff dem gewachsen ist!"
		;
		break;
		
		case 4:
		str="Ich glaube, dass ich mich einer Raumstation der Antropier nähere, da diese in der Regel mit gemeinen Ranken gesichert werden. Ich muss diese Ranken unbedingt durchbrechen um weiterzukommen."
		;
		break;
		
		case 5:
		str="Ich hab das Raumschiff nun immer besser unter Kontrolle. Aber meine Widersacher werden immer mehr und machen mir deshalb auch immer mehr zu schaffen. Ich sollte vorbeugend schon mal die Versorgungsboxen einsammeln welche von zerstörten Raumschiffen überall verstreut liegen."
		;
		break;
		
		case 6:
		str="Die Antropier werden immer aggressiver. Mir kommt es so vor, als würden die Antropier eine regelrechte Hetze gegenüber den Menschen und somit auch mir machen!"
		;
		break;
		
		case 7:
		str="Der Strom der Antropier reißt nicht ab. Es werden einfach nicht weniger!"
		;
		break;
		
		case 8:
		str="Der Zielplanet Benim ist zum Greifen nahe, aber ich werde immer noch von zahlreichen Gegnern verfolgt!"
		;
		break;
		
		case 9:
		str="Ich muss die letzten Antropier abhängen um ungestört auf Benim zu landen."
		;
		break;
		
		default:
		str="hier läuft etwas falsch.";
		;
		break;
	}
	break;
	case 2:
		switch(lvl){
		case 1:
		 str = "Endlich habe ich den Planeten Benim erreicht, meine alten Bekannten helfen mir bestimmt. Gleich bin ich den ersten Kontrollposten passiert… Plötzlich, Schüsse! ... Mein Raumschiff ist getroffen. Darauf war ich nicht vorbereitet... Weg von hier!"
		 ;
		 break;
		
		case 2:
		str="So wie es aussieht werde ich von einer größeren Flotte der Menschen verfolgt. Zusätzlich machen mir die Abwehrgeschütze die um den Planeten platziert sind zu schaffen."
		;
		break;
		
		case 3:
		str="Jetzt habe ich fast alle meine Verfolger abgeschossen. Meine Karten sehen gerade nicht schlecht aus."	
		;
		break;
		
		case 4:
		str="Ich muss unbedingt einen Großteil der Verfolger töten um zu entkommen."
		;
		break;
		
		case 5:
		str="Jetzt sind es nur noch ein paar Jäger die ich abschütteln muss. Das geht sicher ganz leicht. Mir kommt die Idee, dass ich mich im Kometengürtel, der um die Sonne Mitranda kreist verstecken kann. Nichts wie hin!"
		;
		break;
		}
	break; 
	
	case 3:
		switch(lvl){
		case 1:
		 str = "Jack landet auf einem größeren Kometen (Kometen gelten als unbewohnt. Der Kometengürtel enthält Zwergplaneten. Diese Zwergplaneten ist die Homebase der „Spacepriates“ und einer undefinierten Species) und versucht sich neu zu sammeln."
		;
		 break;
		
		case 2:
		str="Die Spacepirates sind zahlreich hinter mir her. Sie versuchen meine Kristalle zu stehlen. "
		;
		break;
		
		case 3:
		str=""	
		;
		break;
		
		case 4:
		str=""
		;
		break;
		
		case 5:
		str=""
		;
		break;
		}
	break; 
	
	
	}
	
	
	
	
	levelDisc.GetComponentInChildren(UI.Text).text=str;
	var backBtn:GameObject;
	backBtn=GameObject.Find("Forward/Go Btn");
	backBtn.GetComponent(UnityEngine.UI.Button).interactable=true;
}
//also starts the the level scene
public function onLoadUpgradeMenue()
{
	var forwardBtn:GameObject;
	forwardBtn=GameObject.Find("Forward/Go Btn Text");
	var btn:UI.Text;
	btn=forwardBtn.GetComponent(UI.Text);

	btn.text="GO!";
	ForwardBtnText=btn;
	
	sceneScript.setAktualLevel("Level"+currentLevl);//TODO may cause problems
	levelDisc.SetActive(false);
	
	upgrademenueObject.transform.position.x=upgradeX;
	levelPannel.SetActive(false);
	yourButtonText = lvlBtn.GetComponentInChildren(UnityEngine.UI.Text);
	yourButtonText.text="Upgrade Menue";
	
	if(upgrademenueO){
		Application.LoadLevel("Level"+bigLevel+currentLevl);
		upgradeScript.saveShipParts();
		//mutes the menue musik
//		var levelMusik=GameObject.Find("SoundObject");	
//		var musikScript=levelMusik.GetComponent(MainLevelmenueMusik);
//		musikScript.killMusik();
	
	}
	upgrademenueO=true;
	
}