//using UnityEngine.UI;


private var cockpitLive:int;
private var maxCockpitLivePoint:float;
private var liveWingsUI:GameObject;


private var wingsLive:int;
private var maxWingsLivePoint:float;

private var binLive:int;
private var maxbinLivePoint:float;
private var liveBinUI:GameObject;



private var mechanismLive:int;
private var maxMechanismLivePoint:float;
private var liveMechanismUI:GameObject;
//MAX HEALTh of the ship
private var maxMechanismLive:int;
private var maxBinLive:int;
private var maxCockpitLive: int;
private var maxWingsLive:int;

//COLORS
private var orange:Color = new Color(0.2F, 0.3F, 0.4F);

private var shield:int;
private var maxShield: int;

//SPEED
public var speed:float;
public var minSpeed:float=4;
private var maxSpeed:float;
private var mecSpeed:float=1;
private var wSpeed:float=1;

private var maxShieldPoint:float;

private var timestamp =0.0; 
private var fireRate:float;
private var fireDemage:float;

var myTarget:Transform;
//A variable that contains the shield
public var playerShield:GameObject;
public var liveCockpitUI:GameObject;
public var mShield:GameObject;
private var shieldUI:GameObject;
private var shieldRegenerationTime=1.00f;


private var sOrgPos:float;
private var newPoshield:float;


// A variable that will contain our bullet prefab
public var bullet : GameObject;
public var racket : GameObject;
public var buildingRacket:GameObject;
public var targetRacket:GameObject;
public var rackets:int=4; 

public static var gameOver:boolean=false;

private var shieldColor:Color;

///////////////////////RECOURCES
public var liveText:GUIText;
private var recource:reviewsScript;
private var junkCounter:int;
  private var cristalCounter:int;


 public static var  COCKPIT: int = 0;
public static var  FLUEGEL: int =1;
public static var  RUMPF: int = 2;
public static var  TRIEBWERK: int = 3;

private var maxCockpitLivef:float;
private var livef:float;
private var maxLife:float;
private var mGuiElement:GameObject;

//Importet Scripts
private var bulletControl:BulletScript;
private var pauseScript:pauseScript;

var hitExplosion:GameObject;
//Time to regenerate the second weapon
public var secondRegTime:float=6.0f;
private var secRegTime:float;
private var currentRacketImage:UnityEngine.UI.Image;
private var currentRegTime:float=1;


private var imgCo:UnityEngine.UI.Image;
private var imgWi:UnityEngine.UI.Image;
private var imgBin:UnityEngine.UI.Image;
private var imgMe:UnityEngine.UI.Image;
private var imgSh:UnityEngine.UI.Image;

//Resoucre Display
private var textDump:UnityEngine.UI.Text;
private var textCristals:UnityEngine.UI.Text;
private var startJunk:int;
private var startCristals:int;

//UpgradeHandler
private var upgradeHandler:GameObject;
private var upgradeScript:UpgradeScript;
//Highscore
public var score:int;
private var scoreObject:UnityEngine.UI.Text;

//Second Weapon
private var secWGUI:GameObject;

//Demage GameObjects
private var shieldGeneratorDemaged1:GameObject;
private var shieldGeneratorDemaged2:GameObject;
private var shieldGeneratorDemaged3:GameObject;
private var shieldObject:GameObject;

// UpgradeScript

private var shipLvl:int[];
//private var shipControl:GameObject;

//----------- visualDamege
public var beAwareSign:GameObject;
private var beAwareColor:UnityEngine.UI.Image;
public var glasSplit:GameObject;

//be aware object
private var beAwereTextObj:GameObject;
private var beAwereScript:BeAwareText;

//----------- visualDamege

private var fireRateAdvantage:boolean=false;
private var fireDemageAdvantage:boolean=false;

private var itemDuration:float=0;
private var startItemTime:float=0;
private var advantage:float;
private var itemAdvantage:float;

//-----------------------------------------construct
private static var normalWeaponLvl:int;
private var anim:Animator;
private var shipDemage:float;

function Start () {
//SCREEN
	anim=gameObject.GetComponent(Animator);

	beAwereTextObj=GameObject.Find("BeAwareObject");
	beAwereScript=beAwereTextObj.GetComponent(BeAwareText);
							
	beAwareColor=beAwareSign.GetComponent(UnityEngine.UI.Image);
	
	gameOver=false;
	
	scoreObject=GameObject.Find("HighScoreText").GetComponent(UnityEngine.UI.Text);
	secWGUI=GameObject.Find("secondWeapon1");
	secWGUI.transform.position.x-=secWGUI.transform.localScale.x;
	
 	upgradeHandler=GameObject.Find("UpgradeHandler");
	upgradeScript=upgradeHandler.GetComponent("UpgradeScript");
	shipLvl=upgradeScript.getTextureLevels();
	setLvlTexture();
	
	textDump=GameObject.Find("TextDump").GetComponent(UnityEngine.UI.Text);	
	textCristals=GameObject.Find("CristalText").GetComponent(UnityEngine.UI.Text);	
	cristalCounter=upgradeScript.getCristals();
	junkCounter=upgradeScript.getJunk();
	
	startCristals=	cristalCounter;
	startJunk=junkCounter;
	textDump.text=""+junkCounter;
	textCristals.text=""+cristalCounter;
	
//Get WEAPONS
	fireDemage=upgradeScript.getNormalWDemage();	
	fireRate=upgradeScript.getNormalWDuration();	
	
//FOR ITEMS
	bulletControl = bullet.GetComponent("BulletScript");
	pauseScript = GameObject.Find("Recources").GetComponent("pauseScript");
	
///JLLLLLLLLLLLLLLLIVE
	cockpitLive=upgradeScript.getcockpitHealth();
	wingsLive=upgradeScript.getwingshealth();
//	shield=upgradeScript.getcbinHealth();
	binLive=upgradeScript.getBinHealth();
	mechanismLive=upgradeScript.getMechanicsHealth();
	
	maxCockpitLive=upgradeScript.getMaxCockpitHealth();
	maxWingsLive=upgradeScript.getMaxWingshealth();
	maxBinLive=upgradeScript.getMaxBinHealth();
	calcMaxShield();
	maxMechanismLive=upgradeScript.getMaxMechanicsHealth();	
	
	shieldUI = GameObject.Find("shieldLive");
	liveCockpitUI = GameObject.Find("cLive");
	liveWingsUI = GameObject.Find("wingsLive");
	liveBinUI =GameObject.Find("binLive");
	liveMechanismUI =GameObject.Find("mechanicsLive");
	shieldObject=GameObject.Find("playerShield");
	shieldObject.transform.position=transform.position;
	
	maxShieldPoint=sOrgPos;
	var liveCockpitUIPos:float;

	//InvokeRepeating("updateStats", 0, 1.0);	
	imgCo=liveCockpitUI.GetComponent(UnityEngine.UI.Image);
	imgWi=liveWingsUI.GetComponent(UnityEngine.UI.Image);
	imgBin=liveBinUI.GetComponent(UnityEngine.UI.Image);
	imgMe=liveMechanismUI.GetComponent(UnityEngine.UI.Image);	
	imgSh=shieldUI.GetComponent(UnityEngine.UI.Image);	
	
	InvokeRepeating("_regenerateShield", 0,shieldRegenerationTime);
		
	aktImages(imgCo,cockpitLive,maxCockpitLive);
	aktImages(imgWi,wingsLive,maxWingsLive);
	aktImages(imgBin,binLive,maxBinLive);
	aktImages(imgMe,mechanismLive,maxMechanismLive);
	
	maxSpeed=speed;
	
	//calcNewStatus
	calcVisualDamage(false);
	
	normalWeaponLvl=upgradeScript.getLevels()[0];
}


private function calcCockpit()
{
	var binLiveff:float=binLive;
	var binLiveMaxff:float=maxBinLive;
	if(cockpitLive<maxCockpitLive*9/10 && cockpitLive>maxCockpitLive*5/10)
		{
			shieldGeneratorDemaged1=GameObject.Find("cockpit_S1");
			shieldGeneratorDemaged1.GetComponent.<Renderer>().sortingOrder=1;
			Debug.Log("SHIELD GENERATOR DEMAGED 1");
			//beAwareColor.color.a=0;//TODO replace with aware text
			beAwereScript.startBeAwareAnimation(1, "Cockpit");
		}
		else if(cockpitLive<maxCockpitLive*5/10&&cockpitLive>maxCockpitLive*2/10)
		{
			shieldGeneratorDemaged1=GameObject.Find("cockpit_S2");
			shieldGeneratorDemaged1.GetComponent.<Renderer>().sortingOrder=1;
			Debug.Log("SHIELD GENERATOR DEMAGED 2");
			beAwereScript.startBeAwareAnimation(2, "Cockpit");
			
			//beAwareColor.color.a=0;//TODO replace with aware text
		}
		else if(cockpitLive<maxCockpitLive*2/10)
		{
			shieldGeneratorDemaged1=GameObject.Find("cockpit_S3");
			shieldGeneratorDemaged1.GetComponent.<Renderer>().sortingOrder=1;
			Debug.Log("SHIELD GENERATOR DEMAGED 3");
			beAwereScript.startBeAwareAnimation(3, "Cockpit");
			
			//beAwareColor.color.a=0.7f-0.7f*(binLiveff/(binLiveMaxff));//TODO replace with aware text
		}
}

private function calcMechanics()
{
	mecSpeed=speed/3*1;
	if(mechanismLive<maxMechanismLive*9/10 && mechanismLive>maxMechanismLive*5/10)
		{
			shieldGeneratorDemaged1=GameObject.Find("Me_S1");
			shieldGeneratorDemaged1.GetComponent.<Renderer>().sortingOrder=1;
			Debug.Log("SHIELD GENERATOR DEMAGED 1");
			mecSpeed=1*2/3;
			beAwereScript.startBeAwareAnimation(1, "Mechanics");
			
					}
		else if(mechanismLive<maxMechanismLive*5/10&&mechanismLive>maxMechanismLive*2/10)
		{
			shieldGeneratorDemaged1=GameObject.Find("Me_S2");
			shieldGeneratorDemaged1.GetComponent.<Renderer>().sortingOrder=1;
			Debug.Log("SHIELD GENERATOR DEMAGED 2");
			mecSpeed=1*1/3;
			beAwereScript.startBeAwareAnimation(2, "Mechanics");
			
		}
}

private function calcShieldGenerator()
{
		if(binLive<maxBinLive*9/10 && binLive>maxBinLive*5/10)
		{
			shieldGeneratorDemaged1=GameObject.Find("sh_S1");
			shieldGeneratorDemaged1.GetComponent.<Renderer>().sortingOrder=1;
			Debug.Log("SHIELD GENERATOR DEMAGED 1");
			beAwereScript.startBeAwareAnimation(1, "Shield Generator");
			
		}
		else if(binLive<maxBinLive*5/10&&binLive>maxBinLive*2/10)
		{
			shieldGeneratorDemaged1=GameObject.Find("sh_S2");
			shieldGeneratorDemaged1.GetComponent.<Renderer>().sortingOrder=1;
			Debug.Log("SHIELD GENERATOR DEMAGED 2");
			beAwereScript.startBeAwareAnimation(2, "Shield Generator");
			
		}
		else if(binLive<maxBinLive*2/10)
		{
			shieldGeneratorDemaged1=GameObject.Find("sh_S3");
			shieldGeneratorDemaged1.GetComponent.<Renderer>().sortingOrder=1;
			Debug.Log("SHIELD GENERATOR DEMAGED 3");
			beAwereScript.startBeAwareAnimation(3, "Shield Generator");
			
		}
}

private function calcWings()
{
		wSpeed=speed/3*1;
		if(wingsLive<maxWingsLive*9/10 && wingsLive>maxWingsLive*5/10)
		{
			shieldGeneratorDemaged1=GameObject.Find("LeftW_S1");
			shieldGeneratorDemaged1.GetComponent.<Renderer>().sortingOrder=1;
			shieldGeneratorDemaged1=GameObject.Find("RWi_S1");
			shieldGeneratorDemaged1.GetComponent.<Renderer>().sortingOrder=1;
			wSpeed=1*3/4;
			beAwereScript.startBeAwareAnimation(1, "Wings");
		}
		else if(wingsLive<maxWingsLive*5/10&&wingsLive>maxWingsLive*2/10)
		{
			shieldGeneratorDemaged1=GameObject.Find("LeftW_S2");
			shieldGeneratorDemaged1.GetComponent.<Renderer>().sortingOrder=1;
			Debug.Log("SHIELD GENERATOR DEMAGED 2");
			shieldGeneratorDemaged1=GameObject.Find("RWi_S2");
			shieldGeneratorDemaged1.GetComponent.<Renderer>().sortingOrder=1;
			wSpeed=1*2/4;
			
			beAwereScript.startBeAwareAnimation(2, "Wings");
			
		}
		else if(wingsLive<maxWingsLive*2/10)
		{
			shieldGeneratorDemaged1=GameObject.Find("LeftW_S3");
			shieldGeneratorDemaged1.GetComponent.<Renderer>().sortingOrder=1;
			Debug.Log("SHIELD GENERATOR DEMAGED 3");
			shieldGeneratorDemaged1=GameObject.Find("RWi_S3");
			shieldGeneratorDemaged1.GetComponent.<Renderer>().sortingOrder=1;
			wSpeed=1*1/4;
			
			beAwereScript.startBeAwareAnimation(3, "Wings");
			
		}
}

private function calcVisualDamage(setSplit:boolean)
{
		var img:UnityEngine.UI.Image;
		
		maxCockpitLivef=maxCockpitLive;
		livef=cockpitLive;
		mGuiElement=liveCockpitUI;
		img=imgCo;
		calcCockpit();
		aktImages(img,livef,maxCockpitLivef);
		
		maxCockpitLivef=maxMechanismLive;
		livef=mechanismLive;
		mGuiElement=liveMechanismUI;
		img=imgMe;
		calcMechanics();
		aktImages(img,livef,maxCockpitLivef);
		
		maxCockpitLivef=maxBinLive;
		livef=binLive;
		mGuiElement=liveBinUI;
		img=imgBin;
		calcShieldGenerator();
		aktImages(img,livef,maxCockpitLivef);
		
		maxCockpitLivef=maxWingsLive;
		livef=wingsLive;
		maxLife=maxWingsLive;
		mGuiElement=liveWingsUI;
		img=imgWi;
		calcWings();
		aktImages(img,livef,maxCockpitLivef);
		
		speed=minSpeed+wSpeed+mecSpeed;
		if(setSplit)
			visualDamage();
}

public function calcLive(partOfShip:int)
{
	var img:UnityEngine.UI.Image; 
	var hitCockpit:boolean=false;	
		
	if(partOfShip==COCKPIT)
	{
		var hit:int = Random.Range(0,100);
	if(hit<=50){
		maxCockpitLivef=maxCockpitLive;
		livef=cockpitLive-shipDemage;
		if(livef<0)
			livef=0;
		cockpitLive=livef;
		mGuiElement=liveCockpitUI;
		img=imgCo;
		hitCockpit=true;
		calcCockpit();
	}
	else if(hit<=70){
		maxCockpitLivef=maxMechanismLive;
		livef=mechanismLive-shipDemage;
		if(livef<0)
			livef=0;
		mechanismLive=livef;
		mGuiElement=liveMechanismUI;
		img=imgMe;
		calcMechanics();
	}
	else{
		maxCockpitLivef=maxBinLive;
		livef=binLive-shipDemage;
		if(livef<0)
			livef=0;
		binLive=livef;	
		mGuiElement=liveBinUI;
		if(maxShield>=1)
		maxShield-=maxShield/10;
		img=imgBin;
		calcShieldGenerator();
	}
}
else if(partOfShip==FLUEGEL)
{
//		Debug.Log("HIT WINGS ///////////");
		maxCockpitLivef=maxWingsLive;
		livef=wingsLive-shipDemage;
		if(livef<0)
			livef=0;
		wingsLive=livef;	
		maxLife=maxWingsLive;
		mGuiElement=liveWingsUI;
		img=imgWi;
		calcWings();
		
}

/*Debug.Log("WINGS : "+wingsLive+ " : "+maxWingsLive);
Debug.Log("ShieldGenerator : "+binLive+ " : "+maxBinLive);
Debug.Log("Mechanism : "+mechanismLive+ " : "+maxMechanismLive);
Debug.Log("Cockpit : "+cockpitLive+ " : "+maxCockpitLive);
*/
	aktImages(img,livef,maxCockpitLivef);

if (livef==0){

	Debug.Log("KLEINER NULL"+img);
	//liveCockpitUI.transform.position.x=Screen.width;
	if(hitCockpit)
	{
	Debug.Log("HitCockpit"+img);
		
		gameIsOver();
		noMoreLives(livef);	
	}
	speed=minSpeed+wSpeed+mecSpeed;
}
		visualDamage();
}

private function visualDamage()
{
	Instantiate(glasSplit, transform.position, Quaternion.identity);
}

private function noMoreLives(livef:float)
{
	if(!anim.GetBool("loose")){
	
	anim.SetBool("loose",true);
	anim.Play("spaceshipDeadExplosion",0);
	livef=-1;
	var gameWonObject:GameOverScript;
	var gameOver:GameObject;
		gameOver=GameObject.Find("GameOverOverlay");
		
		gameWonObject=gameOver.GetComponent("GameOverScript");
		gameWonObject.onGameWon(false);
		gameWonObject.setGameLost();
		gameWonObject.setStartResoureces(startJunk,startCristals);
		gameWonObject.setStatus();
		
		var goalString:String;
		
		var conditionScript:ConditionScript = Camera.main.GetComponent(ConditionScript);
		var maxV=conditionScript.getMaxV();
		if(maxV[0]!=0)
		goalString="Reach "+ maxV[0] +" kilometers \n";
	 	if(maxV[1]!=0)
	 	goalString+="Kill "+ maxV[1] +" Enemys \n";
	 	if(maxV[2]!=0)
	 	goalString+="Collect "+ maxV[2] +" Boxes ";
		
		gameWonObject.setGoal(goalString);
		gameWonObject.setResoureces(junkCounter,cristalCounter );
		}
}

private function aktImages(img:UnityEngine.UI.Image,livef:int,maxLivef:int)
{
	var akt:float=livef;
	var maxL:float=maxLivef;
	var part:float=akt/maxL;
	//Debug.Log("AKT IMAGES " +part+" " +akt +" " +maxL );
	
	img.fillAmount = part;
	
	if(img.fillAmount<=0.8&&img.fillAmount>0.6)
	{
		
		img.color= Color(0.78f, 1, 0);
	}
	if(img.fillAmount<=0.6)
	{
		img.color=Color(1, 0.8, 0);
		}
	
	if(img.fillAmount<=0.4)
	{
		img.color=Color.red;
	}
}

private function calcMaxShield(){
	var cockpitLvl=(maxCockpitLive/10)-1;
	maxShield=6+cockpitLvl*2;
	shieldRegenerationTime=8-cockpitLvl*0.4;
	shield=maxShield;
}

public function calcShield(aktShield:int, regnerate:boolean)
{
var maxShieldf:float=maxShield;
var shieldf:float=aktShield;

if(aktShield>=0&&aktShield<=maxShield){
	imgSh.fillAmount = shieldf/maxShieldf;
	shieldObject.transform.localScale.x=shieldf/maxShieldf;
	shieldObject.transform.localScale.y=shieldf/maxShieldf;
}else if(aktShield<0&&aktShield<=maxShield){
	aktShield=0;
	shieldf=aktShield;
	imgSh.fillAmount = shieldf/maxShieldf;
	shieldObject.transform.localScale.x=shieldf/maxShieldf;
	shieldObject.transform.localScale.y=shieldf/maxShieldf;
}
shield=aktShield;
}

private var userClic: Vector2;
private var meters:int;
public var goalMeters:int;
         
  private var fp : Vector2;  // first finger position
private var lp : Vector2;  // last finger position      
function Update() {  
	if (Input.touchCount > 0 && Input.GetTouch(0).phase == TouchPhase.Moved) {
	
  var  touchDeltaPosition:Vector2 = Input.GetTouch(0).deltaPosition;
  transform.Translate(-touchDeltaPosition.x * -speed * Time.deltaTime/3.5, - touchDeltaPosition.y * -speed * Time.deltaTime/4, 0);

  transform.position.x = Mathf.Clamp(transform.position.x, -Screen.width, Screen.width);
  transform.position.y = Mathf.Clamp(transform.position.y, -Screen.height, Screen.height);
}	
	//TODO COULD BE PROBLEMS WITH PERFORMANCE
	mShield.transform.position = Vector3.MoveTowards(Vector3(transform.position.x+0.15,transform.position.y+0.45,0.0f), Vector3(transform.position.x+0.15,transform.position.y+0.45,0.0f), .03);

                //Shield regeneration
    /////////////////                               
    var borderDistanceDiv=6;
    
    if(Camera.main.orthographicSize/2-GetComponent.<Renderer>().bounds.size.x/borderDistanceDiv>=transform.position.x &&
    (-Camera.main.orthographicSize/2+GetComponent.<Renderer>().bounds.size.x/borderDistanceDiv<=transform.position.x)){
     transform.Translate(Input.GetAxis("Horizontal") * speed * Time.deltaTime, 0, 0);
//     mShield.transform.Translate(Input.GetAxis("Horizontal") * 2 * Time.deltaTime, 0, 0);
 	}
 	else{
 		if(Camera.main.orthographicSize/2+GetComponent.<Renderer>().bounds.size.x/borderDistanceDiv>=transform.position.x
 		&& !(-Camera.main.orthographicSize/2+GetComponent.<Renderer>().bounds.size.x/borderDistanceDiv<=transform.position.x)){
// 		//Debug.Log("Right "+ (Camera.main.orthographicSize/2)+ "POS " + transform.position.x);
 		_setShipPosX(-Camera.main.orthographicSize/2+GetComponent.<Renderer>().bounds.size.x/borderDistanceDiv);
 		
 	}
 	 if(-Camera.main.orthographicSize/2+GetComponent.<Renderer>().bounds.size.x/borderDistanceDiv<=transform.position.x
 	 && !(Camera.main.orthographicSize/2-GetComponent.<Renderer>().bounds.size.x/borderDistanceDiv>=transform.position.x)){
// 		//Debug.Log("LEFT "+ (-Camera.main.orthographicSize/2)+ "POS " + transform.position.x);
 		_setShipPosX(Camera.main.orthographicSize/2-GetComponent.<Renderer>().bounds.size.x/borderDistanceDiv);
 	}
}

 if(Camera.main.orthographicSize-GetComponent.<Renderer>().bounds.size.y/2>=transform.position.y 
 &&(-Camera.main.orthographicSize+GetComponent.<Renderer>().bounds.size.y/2<=transform.position.y)){
     transform.Translate(0, Input.GetAxis("Vertical") * speed * Time.deltaTime, 0);
//     mShield.transform.Translate(0, Input.GetAxis("Vertical") * 2 * Time.deltaTime, 0);
 	}
 	else{
 		if(Camera.main.orthographicSize+GetComponent.<Renderer>().bounds.size.y/2>=transform.position.y
 		&& !(-Camera.main.orthographicSize+GetComponent.<Renderer>().bounds.size.y/2<=transform.position.y)){
// 		//Debug.Log("Right "+ (Camera.main.orthographicSize/2)+ "POS " + transform.position.x);
 		_setShipPosY(-Camera.main.orthographicSize+GetComponent.<Renderer>().bounds.size.y/1.4f);
 
 	}
 	 if(-Camera.main.orthographicSize+GetComponent.<Renderer>().bounds.size.y/2<=transform.position.y
 	 && !(Camera.main.orthographicSize-GetComponent.<Renderer>().bounds.size.y/2>=transform.position.y)){
// 		//Debug.Log("LEFT "+ (-Camera.main.orthographicSize/2)+ "POS " + transform.position.x);
 		_setShipPosY(Camera.main.orthographicSize-GetComponent.<Renderer>().bounds.size.y/1.4f);
 	}
}
 	 //BORDER POSITIONING END-------------------------------------------------------------------------
    
    timestamp += Time.deltaTime;
//   
	if(timestamp>fireRate){
	//leftBullet
	
	timestamp=0.0;
	if(normalWeaponLvl>=1){
		Instantiate(bullet, transform.position+Vector3(-0.5,0,0), Quaternion.identity);
	 }
	//middleBullet
	if(normalWeaponLvl>=0){
		Instantiate(bullet, transform.position, Quaternion.identity);
		}
	//rightBullet
	if(normalWeaponLvl>=2){
		Instantiate(bullet, transform.position+Vector3(0.5,0,0), Quaternion.identity);
	}
	if(normalWeaponLvl>=3){
		Instantiate(bullet, transform.position+Vector3(0.75,0,0), Quaternion.identity);
	}
	
	if(normalWeaponLvl>=4){
		Instantiate(bullet, transform.position+Vector3(-0.75,0,0), Quaternion.identity);
	}
	
	if(normalWeaponLvl>=5){
		Instantiate(bullet, transform.position+Vector3(0.1,0.5,0), Quaternion.identity);
	}
	
	if(normalWeaponLvl>=6){
		Instantiate(bullet, transform.position+Vector3(-0.1,0,0), Quaternion.identity);
	}
	}
//	regeneration of SeondWeapon
	if(rackets<4)
	{
//	Debug.Log("REGTIME "+(Time.time-secRegTime)+"  "+secondRegTime);
//	Debug.Log("RACKEts "+rackets);
	if((Time.time-secRegTime)>=secondRegTime){//CALLS REGENERATION
	currentRacketImage.fillAmount=1;
	_regenerateSecWeapon();
	}
	else
	{
	currentRacketImage.fillAmount=(Time.time-secRegTime)/secondRegTime;
	}
	}
//	currentRegTime=(Time.time-secRegTime)/secondRegTime;
//	if(currentRegTime<=.95)
//	currentRacketImage.fillAmount=(Time.time-secRegTime)/(secondRegTime/2);
//	else
//	}
	//------------------------------- start item time

	if(fireRateAdvantage)
	{
		if((startItemTime+itemDuration)<=Time.time)
		{
			fireRateAdvantage=false;
			fireRate+=itemAdvantage;
		}
	}
	
	if(fireDemageAdvantage){
	if((startItemTime+itemDuration)<=Time.time){
	normalWeaponLvl=upgradeScript.getLevels()[0];
		
		//bulletControl.resetDemage();
		}
	}
}
	private function _regenerateShield()
	{
	if(shield<maxShield){
         calcShield(++shield,true);
    } 
	}
	
	private function _setShipPosX(posChange:float)
	{
		transform.position.x=posChange;
//		mShield.transform.position.x=posChange;
	}
	
	private function _setShipPosY(posChange:float)
	{
		transform.position.y=posChange;
//		mShield.transform.position.y=posChange;
	}

private var hitCockpit:int;
var hitLeftWing:int;
var hitRightWing:int;
		
function OnTriggerEnter2D(obj : Collider2D) {  
    var name = obj.gameObject.name;
 	var obJtag = obj.gameObject.tag;

 	if(name=="speerBullet(Clone)"){
 		Debug.Log("HIT BACK");
 		this.gameObject.transform.position.y-=0.6f;
 	}
 	if(name=="direktionBullet(Clone)"||name=="changsawBullet(Clone)"){
 		var bulletScriptDir=obj.gameObject.GetComponent(EnemyBulletWithoutVilocity);
		shipDemage=bulletScriptDir.getDemage();
		Debug.Log("HIT SHIP WITH " + shipDemage);
		hitShip(obj);
	    Destroy(obj.gameObject);  
	    Instantiate(hitExplosion, obj.transform.position, Quaternion.identity); 	
 	}  
 	
 	else if((name=="enemyBullet(Clone)"||obJtag=="enemyBullet"))
 	{
// 		Vector3 vecToCollision = collision.transfrom.position - transform.position;
 		Debug.Log("HIT BULLET");

		var bulletScript=obj.gameObject.GetComponent(BulletScript);
		shipDemage=bulletScript.getDemage();
		hitShip(obj);
	    Destroy(obj.gameObject);  
	    Instantiate(hitExplosion, obj.transform.position, Quaternion.identity); 	
 	}else if(obJtag=="leaveBullet"){
 		var leaveScript=obj.gameObject.GetComponent(leaveBulletScript);
 		leaveScript.setLeaves();
 	} 	else if(obJtag=="nutBullet"){
 		var nutPartScript=obj.gameObject.GetComponent(NutPartScript);
		shipDemage=nutPartScript.getDemage();
		
		hitShip(obj);
	    Destroy(obj.gameObject);  
	    Instantiate(hitExplosion, obj.transform.position, Quaternion.identity); 	
 	}

		
    
    if(name=="junk_0(Clone)"||name=="Kristalle(Clone)")
 	{
 		foundSomething(obj);
 	}
}



function foundSomething(obj : Collider2D)
{
	
 	 recource = obj.GetComponent("reviewsScript");
	 var cristal:boolean;
	 cristal=recource.isCristal;
//	 //Debug.Log("RECOURCE "+cristal);
	if(cristal==false)
	{
		
		junkCounter++;
		textDump.text=""+junkCounter;
//		//Debug.Log("SCHROTT "+ junkCounter);
	}
	else{
	cristalCounter++;
	textCristals.text=""+cristalCounter;
	
//	//Debug.Log("KRISTALLE "+ cristalCounter);
	}
	var audio = obj.GetComponent.<AudioSource>();
	audio.Play();
	obj.gameObject.transform.localScale*=1.4;
		Destroy(obj.gameObject,0.4);
	obj.enabled=false;
}

private var cometCounter:int;
private var smallShipCounter:int;
private var fastShipCounter:int;
private var middleShipCounter:int;
private var bigShipCounter:int;
private var totalShips:int;

public var itemCounter:int;

public function setItemCounter(kind:String,advantage:float,duration:float)
{
	//statistics
	itemCounter++;
	//actual

	
	if(kind=="Fire Rate"){
		startItemTime=Time.time;
		itemDuration=duration;
		itemAdvantage=advantage;
		fireRateAdvantage=true;
		fireRate-=advantage;
		Debug.Log("FIRE RATE "+fireRate);
	}
	if(kind=="weaponStrength")
	{
		startItemTime=Time.time;
		itemDuration=duration;
		itemAdvantage=advantage;
		
		//bulletControl.plusDemage();
	normalWeaponLvl=upgradeScript.getLevels()[0]+Random.Range(1,6);
		
		fireDemageAdvantage=true;
	}
	if(kind=="repearShip")
	{
		//Debug.Log((binLive<maxBinLive-(maxBinLive*0.10))+" :: " + binLive);
		
		if(cockpitLive<maxCockpitLive-(maxCockpitLive*0.1))
		{
		cockpitLive+=maxCockpitLive*0.10;
		if(maxCockpitLive*0.10<1)
		cockpitLive+=1;
		
		}if(wingsLive<maxWingsLive-(maxWingsLive*0.10))
		{
		wingsLive+=maxWingsLive*0.10;
		if(maxWingsLive*0.10<1)
		wingsLive+=1;
		}if(binLive<maxBinLive-(maxBinLive*0.10))
		{
		binLive+=maxBinLive*0.10;
		if(maxBinLive*0.10<1)Debug.Log((binLive<maxBinLive-(maxBinLive*0.10))+" :: " + binLive);
		binLive+=1;
		
		}if(mechanismLive<maxMechanismLive-(maxMechanismLive*0.10))
		{
		mechanismLive+=(maxMechanismLive*0.10);
		if(maxMechanismLive*0.10<1)
		mechanismLive+=1;
		
		}
		Debug.Log((binLive<maxBinLive-(maxBinLive*0.10))+" :: " + binLive);
		
		aktImages(imgCo,cockpitLive,maxCockpitLive);
		aktImages(imgWi,wingsLive,maxWingsLive);
		aktImages(imgBin,binLive,maxBinLive);
		aktImages(imgMe,mechanismLive,maxMechanismLive);
		//Debug.Log("REPAIR");
		calcVisualDamage(false);
	}
	if(kind=="repairShield")
	{
		shield++;
		//Debug.Log("SHIELD");
	}
	if(kind=="secondaryWeaon"){
		_regenerateSecWeapon();
	}
}

private function _regenerateSecWeapon(){

Debug.Log("REGENERATE SECOND WEAPON");
if(rackets<4){
		rackets++;
		currentRacketImage.fillAmount=1;
		if(GameObject.Find("racket"+(rackets+1))!=null){
		var rocketUI = GameObject.Find("racket"+(rackets+1));
		var rocketImage=rocketUI.GetComponent(UnityEngine.UI.Image);
		currentRacketImage=rocketImage;
		rocketUI = GameObject.Find("racket"+(rackets+1));
		secRegTime=Time.time;
		}
		}
}

public function enemyDestroiyed(object:String)
{
	if(object=="comet")
	cometCounter++;
	else if(object=="small Ship")
	smallShipCounter++;
	else if(object=="fast Ship")
	fastShipCounter++;
	else if(object=="middle Ship")
	middleShipCounter++;
	else if(object=="big Ship")
	bigShipCounter++;
}

private function gameIsOver()
{
	gameOver=true;
	Destroy(this);
}

private var popupO:GameObject;
private var levelScript:LevelScript;;
public function OnGoalIsReached(cond:int,maxV:int){
	if(popupO==null)
	popupO=GameObject.Find("Pupup");
	
	
	
	levelScript=Camera.main.GetComponent(LevelScript);
	
		var sceneHandler:SceneHandler;
		var sceneH:GameObject;
		sceneH=GameObject.Find("SceneHandler");
		sceneHandler=sceneH.GetComponent(SceneHandler);
		
		junkCounter+=4*levelScript.getCurrentLevel();
		cristalCounter+=2*levelScript.getCurrentLevel();
		textDump.text=""+junkCounter;
		textCristals.text=""+cristalCounter;
		//popupO.GetComponent(popUpScript).wayPopup("Your reward: "+2*levelScript.getCurrentLevel()+" Cristals "+4*levelScript.getCurrentLevel()+" Junk",2);

		gameIsOver();
		
		var gameWonObject:GameOverScript;
		var gameOver:GameObject;
		gameOver=GameObject.Find("GameWonOverlay");
		
		gameWonObject=gameOver.GetComponent("GameOverScript");
		gameWonObject.onGameWon(true);
		gameWonObject.setStartResoureces(startJunk,startCristals);
		gameWonObject.setStatus();
		
		var goalString:String="";
		
	 	switch(cond)
		 {
		 	case 0:
		 	goalString="Reach "+ maxV +" kilometers ";
		 	break;
		 	
		 	case 1:
		 	goalString="Kill "+ maxV +" Enemys ";
		 	break;
		 	
		 	case 2:
		 	goalString="Collect "+ maxV +" Boxes ";
		 	break;
		 }
		gameWonObject.setGoal(goalString);
	
		gameWonObject.setResoureces(junkCounter,cristalCounter );
		gameWonObject.setShipPart(cockpitLive,wingsLive,binLive,mechanismLive,junkCounter,cristalCounter);
}

public function newResources(junk:int,crystals:int){
	junkCounter+=junk;
	cristalCounter+=crystals;
	textDump.text=""+junkCounter;
	textCristals.text=""+cristalCounter;
	updateRecources();
}

public function updateRecources(){
	if(pauseScript!=null){
	pauseScript.setJunk(junkCounter);
	pauseScript.setCristals(cristalCounter);
	}
}

public function hitShip(obj : Collider2D)
{
	anim.SetBool("hit",true);
		if(shipDemage==0){
			shipDemage=5;		
		}
		
		if(shield<shipDemage){
			if( obj.transform.position.x>0.5)
			{
				calcLive(FLUEGEL);
			}
			else if( obj.transform.position.x<-0.5)
				{
				calcLive(FLUEGEL);
			}else{
				Debug.Log("HIT COCKPIT ///////////////");
				calcLive(COCKPIT);
			}
			}
			else
			{
				calcShield(shield-shipDemage,false);
			}
}
var secBtn:GameObject;
public function shootSecondWeapon(kind:int)
{
	if(currentRacketImage!=null)
	currentRacketImage.fillAmount=0;
	var rocketUI = GameObject.Find("racket"+rackets);
	var rocketScript:BulletScript;
	
	var racketImage=rocketUI.GetComponent(UnityEngine.UI.Image);
	racketImage.fillAmount=0;
	currentRacketImage=racketImage;//Saves the current image so that it can be reloded
	rackets--;
	if(rackets<4)
	secRegTime=Time.time;
	
		
	Time.timeScale=1;			
	rocketScript=racket.GetComponent("BulletScript");
	rocketScript.setKind(kind);
	//Choose several types of Rackets
	if(kind==2)//Target Racket
	{
		Instantiate(targetRacket, new Vector3(transform.position.x,transform.position.y,transform.position.z), Quaternion.identity);
	}
	else if(kind==4)//Building RACKETS
	{
		Instantiate(buildingRacket, new Vector3(transform.position.x,transform.position.y,transform.position.z), Quaternion.identity);
	
	}else{
	Instantiate(racket, new Vector3(transform.position.x,transform.position.y,transform.position.z), Quaternion.identity);
	}
	
	if(secBtn==null)
	secBtn=GameObject.Find("SecundaryBTNs");
	secBtn.transform.position=Vector3(999999,99999,9999);
	
}

public function getGameOver():boolean
{
	return gameOver;
}

public function getFireDemage():float
{
	return fireDemage;
}

public function higherHighscore(plusScore:int)
{
	score+=plusScore;
	scoreObject.text=""+score;
}
//set Textures of ShipParts 
private var shipObject:GameObject;
private var shipPartScricpt:ShipPartScript;
private var nameOfStrings:String[]=["Cockpit","WingsRight","WingsLeft","Mechanics","ShieldGenerator"];
            
private function setLvlTexture()
{
	for(var i:int=0;i<nameOfStrings.length;i++){
		
		shipObject=GameObject.Find(nameOfStrings[i]);
		shipPartScricpt=shipObject.GetComponent(ShipPartScript);
		shipPartScricpt.setLevel(shipLvl[i]);
	}
	
}

public function getRackets():int
{
	return rackets;
}