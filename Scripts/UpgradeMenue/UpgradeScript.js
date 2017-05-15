
private var currentPartStatus:GameObject;
private var upgradePartStatus:GameObject;
public
var cockpitHealth:int;
var wingshealth:int;
var binHealth:int;
var mechanicsHealth:int;

public
var maxCockpitHealth:int;
public var maxWingshealth:int;
public var maxBinHealth:int;
public var maxMechanicsHealth:int;

//Recources
public var junk:int;
public var cristals:int;

//Weapons
public var normalWDemage:float;
public var normalWDuration:float;

public var firstRacketDemage:int;
public var firstRacketBonus:String;

public var secondRacketDemage:int;
public var secondRacketBonus:String;

public var thirdRacketDemage:int;
public var thirdRacketBonus:String;

public var racketDuration:float;

 var junkText:UnityEngine.UI.Text;
public var CristalsText:UnityEngine.UI.Text;

//LEVEL OF PARTS
var wingsLvl:int=1;
var cockpitLvl:int=1;
var binLvl:int=1;
var mechanicsLvl:int=1;
var normalWeaponLvl:int=1;
var secondWeaponLvl:int=1;

private var fillAmmountObject:GameObject;
private var fillAmmount:UnityEngine.UI.Image;

private var repairButton:UnityEngine.UI.Button;
private var upgradeButton:UnityEngine.UI.Button;
private var upgradeImage:UnityEngine.UI.Image;

function start(){
			DontDestroyOnLoad(transform.gameObject);
}

 public static var Instance:UpgradeScript;
 
 function Awake()
 {
             if(Instance)
                 DestroyImmediate(gameObject);
             else
             {
                 DontDestroyOnLoad(gameObject);
                 Instance = this;
             }
}

public function getJunk():int
{
	return junk;
}

public function getCristals():int
{
	return cristals;
}

public function setJunk(junk:int)
{
	this.junk=junk;;
}

public function setcristals(cristals:int)
{
	this.cristals=cristals;
}

public function buySomething(costJunk:int,costCristals:int)
{
	junk-=costJunk;
	cristals-=costCristals;
	junkText.text=""+junk;
	CristalsText.text=""+cristals;
}

public function getcockpitHealth():int
{
	return cockpitHealth;
}

public function getwingshealth():int
{
	return wingshealth;
}

public function getBinHealth():int
{
	return binHealth;
}

public function getMechanicsHealth():int
{
	return maxMechanicsHealth;
}

public function getMaxCockpitHealth():int
{
	return maxCockpitHealth;
}

public function getMaxWingshealth():int
{
	return maxWingshealth;
}

public function getMaxBinHealth():int
{
	return maxBinHealth;
}

public function getMaxMechanicsHealth():int
{
	return maxMechanicsHealth;
}

public function getNormalWDemage():float
{
	return normalWDemage;
}

public function getNormalWDuration():float
{
	return normalWDuration;
}

private var healthCockpitS:int=0;
private var healthWingsS:int=0;
private var healthGeneratorS:int=0;
private var healthmechanicsS:int=0;

private var upgradeCostString="2";
private var upgradeHealthString="3";
private var upgradeSpecialString ="4";

function update(){
		
}

public function setRecourecs(){
	setLvlTexture();
	 junkText=GameObject.Find("Junk").GetComponent(UnityEngine.UI.Text);
		junkText.text=""+junk;
		    CristalsText=GameObject.Find("Cristals").GetComponent(UnityEngine.UI.Text);
		CristalsText.text=""+cristals;		
}

public function setSaveRecources(j:int,c:int){
	this.junk=j;
	this.cristals=c;
	setRecourecs();		
}

public var currentUpPart:String;
private var statusText:String;
private var upgradeText:UnityEngine.UI.Text;
private var repairMax:float;
private var repairCurrent:float;
private var repairC:int;//The aktual repair costs

private var upgradeJunk:int;
private var upgradeCristal:int;
public var currentLevel:int;

public function setTextOfShip(desc:String,kind:String)
{
	currentUpPart=kind;
	if(currentPartStatus==null){
	currentPartStatus=GameObject.Find("Current improvement");
	upgradePartStatus=GameObject.Find("Improvements");
	upgradeText=GameObject.Find("UpgradePopUpHeaderText").GetComponent(UnityEngine.UI.Text);
	
	
	}
	var healthString:String;
	
	healthString+="Health: ";
	var improvementString:String="Healts: ";
	
	var costString:String="";
	var levelString:String="Level ";
	var repairString:String="\n Repair costs: \n";
	
	if(kind=="FirstWeapon"){	
		kind="The primary weapon";	
		healthString="Demage: ";
		healthString+=normalWDemage + "\n Duration: "+normalWDuration+"\n";
		costString+="\t"+ 60*(normalWeaponLvl+1)+ " Cristals\t \t 0 Junk";
		levelString+=normalWeaponLvl;
		currentLevel=normalWeaponLvl;
		
		improvementString+=normalWDemage + "+1\n Duration: "+normalWDuration+"-"+-0.1*normalWeaponLvl+" \n";
		repairString="";
		upgradeCristal=60*(normalWeaponLvl+1);
		upgradeJunk=0;
	
	}else if(kind=="Heavy Weapon"){
		kind="Heavy Weapon";
		
		healthString="FirstRacket: Demage "+ firstRacketDemage +" Rackets "+firstRacketBonus+"\n";
		healthString+="Second: D "+ secondRacketDemage +" R "+secondRacketBonus+"\n";
		healthString+="Third: D "+ thirdRacketDemage +" R "+thirdRacketBonus+"\n";
		
		
		improvementString="Racket:Normal:\n"+secondRacketDemage +" "+secondRacketBonus;
		improvementString+="Third:Building: \n"+ secondRacketDemage +" "+secondRacketBonus;
		upgradeSpecialString="Third:Multiple: \n"+thirdRacketDemage +" "+thirdRacketDemage;
		levelString+=secondWeaponLvl;
		currentLevel=secondWeaponLvl;
		
		costString+="\t"+ (30*(secondWeaponLvl+1))+ " Cristals\t \t 0 Junk";
		
		repairString="";
		upgradeCristal=30*(secondWeaponLvl+1);
		upgradeJunk=0;
		Debug.Log("HEAVY!!!");
	}else{
	
	switch(kind)
	{
		
	
		case "Cockpit":
		kind="The cockpit";
		upgradeJunk=30*(cockpitLvl+1);
		upgradeCristal=1*(cockpitLvl+1);
		
		healthString+=cockpitHealth+"/MAX "+maxCockpitHealth;
		improvementString+=maxCockpitHealth+"+5";
		upgradeSpecialString="Your pilot sits there";
		costString+="\t"+ 5*(cockpitLvl+1) +" Cristals\t \t" +50*(cockpitLvl+1) +" Junk";
		levelString+=cockpitLvl;
		currentLevel=cockpitLvl;
		
		repairCurrent=cockpitHealth;
		repairMax=maxCockpitHealth;
		repairC=(maxCockpitHealth-(repairCurrent/repairMax)*maxCockpitHealth);
		
		repairString+=""+(maxCockpitHealth-(repairCurrent/repairMax)*maxCockpitHealth) + " Spacejunk";
		
		
		break;
		
		case "Wings":
		kind="The Wing";
		upgradeJunk=60*(wingsLvl+1);
		upgradeCristal=1*(wingsLvl+1);
						
						
		healthString+=wingshealth+"/MAX "+maxWingshealth;
		improvementString+=maxWingshealth+"+10";
		upgradeSpecialString="Improve your vertical movement";
		
		levelString+=wingsLvl;
		currentLevel=wingsLvl;
		
		repairCurrent=wingshealth;
		repairMax=maxWingshealth;
		repairC=(maxWingshealth-(repairCurrent/repairMax)*maxWingshealth);
		repairString+=""+repairC + " Spacejunk";
		costString+="\t"+ upgradeCristal+"  Cristals\t \t" +upgradeJunk+" Junk*";
		break;
		
		case "Shield generator":
		kind="The Shield generator";
		upgradeJunk=30*(binLvl+1);
		upgradeCristal=5*(binLvl+1);
		
		healthString+=binHealth+"/MAX "+maxBinHealth;
		
		improvementString+=maxBinHealth+"+2";
		upgradeSpecialString="Shield: 2  "+ "Shieldregeneration: -0.2";
		
		costString+="\t"+ upgradeCristal+"  Cristals\t \t" +upgradeJunk+" Junk*";
		levelString+=binLvl;
		currentLevel=binLvl;
		
		repairCurrent=binHealth;
		repairMax=maxBinHealth;
		repairC=(maxBinHealth-(repairCurrent/repairMax)*maxBinHealth);
		repairString+=""+repairC + " Spacejunk";
		
		break;
		
		case "Mechanics":
		kind="The traction drive";
		upgradeJunk=30*(mechanicsLvl+1);
		upgradeCristal=5*(mechanicsLvl+1);
		
		healthString+=mechanicsHealth+"/MAX "+maxMechanicsHealth;
		improvementString+=mechanicsHealth+"+2";
		upgradeSpecialString="Improve your horizontal movement";
		
		
		levelString+=mechanicsLvl;
		currentLevel=mechanicsLvl;
		
		repairCurrent=mechanicsHealth;
		repairMax=maxMechanicsHealth;
		repairC=(mechanicsHealth-(repairCurrent/repairMax)*mechanicsHealth);
		repairString+=""+repairC + " Spacejunk";
		costString+="\t"+ upgradeCristal+"  Cristals\t \t" +upgradeJunk+" Junk*";
		
		break;
		
		default:
		healthString+="/";
		break;
	
	}
	}
	var yourButtonText = currentPartStatus.GetComponentInChildren(UnityEngine.UI.Text);
	statusText=desc;
	yourButtonText.text="<b>"+kind+"</b>"+"<color=#101010ff>"+desc +"</color>"+'\n' ;
	var upgradeButtonText = upgradePartStatus.GetComponentInChildren(UnityEngine.UI.Text);
	upgradeButtonText.text="Upgrade <\n><b>"+levelString+"</b>"+ '\n' +healthString+"\n"+repairString;
	upgradeText.text='<size=18>'+"Upgrade"+'</size> \n'+kind;
	//+ levelString+"+1"+"</b>"+"\n \n"+ "Costs: \n "+costString+" \n Improvement: \n "+improvementString;
	
	upgradeCostString=costString;
	upgradeHealthString=improvementString;
	
	
	var buttonText = repairButton.transform.FindChild("Text").GetComponent(UnityEngine.UI.Text);
	if(junk>=repairC && repairCurrent< repairMax){
		repairButton.interactable=true;
		buttonText.text="Repair \n "+repairC + " Junk";
	}else{
		repairButton.interactable=false;
	//	Debug.Log("REAPAIRC "+ repairC+" RepairMAX"+repairMax);
		buttonText.text="Not Enough + \n "+repairC + " Junk";
		if(repairCurrent>= repairMax)
		buttonText.text="Full Health";
		}
		 
		buttonText = upgradeButton.transform.FindChild("Text").GetComponent(UnityEngine.UI.Text); 
	if(currentLevel<5){
		if(junk>=upgradeJunk&&cristals>=upgradeCristal)
		{
			upgradeButton.interactable=true;
			buttonText.text="Upgrade \n "+costString;
		}else{
			upgradeButton.interactable=false;
			buttonText.text="Not Enough \n"+costString;
		}
	}else{
		upgradeButton.interactable=false;
			buttonText.text="Fully Upgraded!";
	}
}

public function getUpgradeText():String[]{
	return [upgradeCostString,upgradeHealthString,upgradeSpecialString];
}


public function getRepairCosts():int[]
{
		var repairShieldGenerator=(maxBinHealth-(binHealth/maxBinHealth)*maxBinHealth);
		var wingRepairCosts=(wingshealth-(wingshealth/maxWingshealth)*maxWingshealth);
		var cockpitRepairCosts=(maxCockpitHealth-(cockpitHealth/maxCockpitHealth)*maxCockpitHealth);
		var mechanicsRepairCosts=(mechanicsHealth-(mechanicsHealth/maxMechanicsHealth)*maxMechanicsHealth);
	return [repairShieldGenerator,wingRepairCosts,cockpitRepairCosts,mechanicsRepairCosts];
}


public function setShipStatus(cockpitLive:int,wingsLive:int,binLive:int,mechanismLive:int,junk:int,cristals:int){
	if(cockpitLive!=0)
	this.cockpitHealth=cockpitLive;
	if(wingsLive!=0)
	this.wingshealth=wingsLive;
	if(binLive!=0)
	this.binHealth=binLive;
	if(mechanismLive!=0)
	this.mechanicsHealth=mechanismLive;
	this.junk=junk;
	this.cristals=cristals;
	
}

		
public function loadShippartLevel(cLvl:int,wLvl:int,sLvl:int,mLvl:int,cBasicShootLvl:int,cHeavyWeaponLvl:int){
	this.cockpitLvl=cLvl;
	this.binLvl=sLvl;
	this.wingsLvl=wLvl;
	this.mechanicsLvl=mLvl;
	 
	this.normalWeaponLvl=cBasicShootLvl;
	this.secondWeaponLvl=cHeavyWeaponLvl;
	setLvlTexture();
 } 

public function onClickUpgradeBtn()
{
	var maxHealth:int;
	var health:int;
	var healthString:String="";
//	Debug.Log(maxCockpitHealth + " COCKPIT " + currentUpPart);

	switch(currentUpPart)
	{
		case "Cockpit":
		if(junk>=50*(cockpitLvl+1)&&cristals>=5*(cockpitLvl+1)){
			maxCockpitHealth+=5;
			cockpitHealth+=5;
			health=cockpitHealth;
			maxHealth=maxCockpitHealth;
			cockpitLvl++;
			currentLevel=cockpitLvl;
			
			PlayerPrefs.SetInt("cockpitLevel",cockpitLvl);
			buySomething(50*cockpitLvl,5*cockpitLvl);
		}
		break;
		
		case "Wings":
		if(junk>=60*(wingsLvl+1)&&cristals>=1*(wingsLvl+1)){
			maxWingshealth+=10;
			wingshealth+=10;
			wingsLvl++;
			currentLevel=wingsLvl;
			
			PlayerPrefs.SetInt("wingsLevel",wingsLvl);
			health=wingshealth;
			maxHealth=maxWingshealth;
			buySomething(60*wingsLvl,1*wingsLvl);
//			Debug.Log("UPGR	qADE WINGS");
		}
		break;
		
		case "Shield generator":
		if(junk>=30*(binLvl+1)&&cristals>=5*(binLvl+1)){
			maxBinHealth+=2;
			binHealth+=2;
			binLvl++;
			currentLevel=binLvl;
			
			PlayerPrefs.SetInt("shieldGeneratorLevel",binLvl);
			buySomething(30*binLvl,5*binLvl);
			health=binHealth;
			maxHealth=maxBinHealth;
		}
		break;
		
		case "Mechanics":
		if(junk>=30*(mechanicsLvl+1)&&cristals>=5*(mechanicsLvl+1)){
			maxMechanicsHealth+=2;
			mechanicsHealth+=2;
			mechanicsLvl++;
			currentLevel=mechanicsLvl;
			
			PlayerPrefs.SetInt("mechanismLevel",mechanicsLvl);
			maxHealth=maxMechanicsHealth;
			health=mechanicsHealth;
			buySomething(30*mechanicsLvl,5*mechanicsLvl);
		}
		break;
		
		case "FirstWeapon":
		if(cristals>=30*(normalWeaponLvl+1)){
			if(normalWeaponLvl%6==0)
			normalWDemage+=1;
			normalWeaponLvl++;
			currentLevel=normalWeaponLvl;
			
			PlayerPrefs.SetInt("basicShootLvl",normalWeaponLvl);		
			normalWDuration-=0.10;
			buySomething(0,30*normalWeaponLvl);
		}
		break;
		
		case "Heavy Weapon":
		if(cristals>=30*(normalWeaponLvl+1)){
			normalWDemage+=1;
			firstRacketDemage+=1;
		secondRacketDemage+=1;
		 thirdRacketDemage+=1;	
			secondWeaponLvl++;
			currentLevel=secondWeaponLvl;
			
			PlayerPrefs.SetInt("HeavyWeaponLvl",secondWeaponLvl);		
			buySomething(0,30*normalWeaponLvl);
		}
		break;
		
		default:
		break;
	
	}
	PlayerPrefs.Save();
	var yourButtonText = currentPartStatus.GetComponentInChildren(UnityEngine.UI.Text);
	if(currentUpPart=="FirstWeapon")
	{
		healthString+="Demage: ";
		healthString+=normalWDemage + "\n Duration: "+normalWDuration+"\n";
	}else if(currentUpPart=="Heavy Weapon"){
		healthString+="Demage of all rackets: "+"\n";
		healthString+="Normal racket : "+ firstRacketDemage +"\n";
		healthString+="Two rackets : "+ firstRacketDemage +"\n";
		healthString+="Splash racket : "+ firstRacketDemage +"\n";
	}else
	healthString+=health+"/MAX "+maxHealth;
	yourButtonText.text="<b>"+currentUpPart+"</b>"+ '\n'+"<color=#101010ff>"+statusText +"</color>"+'\n' ;
	setLvlTexture();
	
	Debug.Log("CURRENT UP PART "+ currentUpPart);
	GameObject.Find("ProgressManager").GetComponent(UpgradeProgressBar).updateProgress();
	
}


public function onClickRepairBtn()
{
	var maxHealth:int;
	var health:int;
	var healthString:String="Health: ";
//	Debug.Log(maxCockpitHealth + " COCKPIT " + currentUpPart);
	if(junk>=repairC){
	switch(currentUpPart)
	{
		case "Cockpit":
 		repairCurrent=cockpitHealth;
		repairMax=maxCockpitHealth;
		cockpitHealth=maxCockpitHealth;
		health=cockpitHealth;
		maxHealth=maxCockpitHealth;
		
		
		break;
		
		case "Wings":
		repairCurrent=wingshealth;
		repairMax=maxWingshealth;
		wingshealth=maxWingshealth;
		health=wingshealth;
		
		
		maxHealth=maxWingshealth;
		break;
		
		case "Shield generator":
 		repairCurrent=binHealth;
		repairMax=maxBinHealth;
		binHealth=maxBinHealth;
		health=binHealth;
		maxHealth=maxBinHealth;
		
		
		Debug.Log((repairMax-repairCurrent)*maxBinHealth/30);
		break;
		
		case "Mechanics":
 		repairCurrent=mechanicsHealth;
		repairMax=maxMechanicsHealth;
		
		mechanicsHealth=maxMechanicsHealth;
		maxHealth=maxMechanicsHealth;
		health=mechanicsHealth;
		
		Debug.Log((repairMax-repairCurrent)*maxMechanicsHealth/30);
		
		break;
		
		default:
//		healthString+="/";
		break;
	
	}
	junk-=repairC;
	}
	
	var yourButtonText = currentPartStatus.GetComponentInChildren(UnityEngine.UI.Text);
	healthString+="Health: "+health+"/MAX "+maxHealth;
	yourButtonText.text="<b>"+currentUpPart+"</b>"+ '\n'+"<color=#101010ff>"+statusText +"</color>"+'\n' ;
//	junk-=50;
	junkText.text=""+junk;
	
	GameObject.Find("ProgressManager").GetComponent(UpgradeProgressBar).updateProgress();
}

public function getLevels():int[]
{
	return [normalWeaponLvl,cockpitLvl,secondWeaponLvl,wingsLvl,binLvl,mechanicsLvl];
}

//set Textures of ShipParts 
private var shipObject:GameObject;
private var shipPartScricpt:ShipPartScript;
private var nameOfStrings:String[]=["CockpitFillLevel","RightWingsFill","LeftWingsFill","MechanicsFill","GeneratorFillLevel"];
private var shipLvl:int[]= [normalWeaponLvl,cockpitLvl,secondWeaponLvl,wingsLvl,binLvl,mechanicsLvl];          
private function setLvlTexture()
{
	shipLvl=[cockpitLvl,wingsLvl,wingsLvl,mechanicsLvl,binLvl];  
	for(var i:int=0;i<nameOfStrings.length;i++){
		shipObject=GameObject.Find(nameOfStrings[i]);
		shipPartScricpt=shipObject.GetComponent(ShipPartScript);
//		Debug.Log("TEXTURE CALL LEVEL "+nameOfStrings[i]+" "+shipLvl[i]);
		shipPartScricpt.setLevelImage(shipLvl[i]);
	}	
}

public function getTextureLevels():int[]
{
	return [cockpitLvl,wingsLvl,wingsLvl,mechanicsLvl,binLvl];
}

public function setUpgradeBtn(btn:UnityEngine.UI.Button)
{
	upgradeButton=btn;
}

public function setRepairBtn(btn:UnityEngine.UI.Button)
{
	repairButton=btn;
}
public function onSetUpgradeIcon(image:UnityEngine.UI.Image)
{
	upgradeImage=image;
}

public function updateText(){
junkText.text=""+junk;
	CristalsText.text=""+cristals;
}

public function saveShipParts(){
	PlayerPrefs.SetInt("cockpitLive",cockpitHealth);
	PlayerPrefs.SetInt("wingsLive",wingshealth);
	PlayerPrefs.SetInt("shieldGenerator",binHealth);
	PlayerPrefs.SetInt("mechanismLive",mechanicsHealth);
	PlayerPrefs.Save();	
}