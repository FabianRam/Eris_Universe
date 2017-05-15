#pragma strict



private var upgradeHandler:GameObject;
private var upgradeScript:UpgradeScript;

private var upgradePopUp:GameObject;
private var upPopUpY:float;

private var fillAmmountObject:GameObject;
private var fillAmmount:UnityEngine.UI.Image;

public var repairButton:UnityEngine.UI.Button;
public var upgradeButton:UnityEngine.UI.Button;
public var visibleUpgradeIcon:UnityEngine.UI.Image;

private var upgradeMarker:GameObject;

private var hammerAnimation:Animation;
public var hammerPref:GameObject;
public var arrowPref:GameObject;
private var upgradeAnimation:Animation;

public var secondMarker:GameObject;

function Start () {
	
	upgradePopUp=GameObject.Find("UpgradePopUp");
	upPopUpY=upgradePopUp.transform.position.y;
	upgradePopUp.transform.position.y=99999;
	
 	upgradeHandler=GameObject.Find("UpgradeHandler");
	upgradeScript=upgradeHandler.GetComponent(UpgradeScript);
	
	upgradeScript.setRepairBtn(repairButton);
	upgradeScript.setUpgradeBtn(upgradeButton);
	upgradeScript.onSetUpgradeIcon(visibleUpgradeIcon);
	
	fillAmmountObject=GameObject.Find("CockpitFillLevel");
			fillAmmount=fillAmmountObject.GetComponent(UnityEngine.UI.Image);
			var health:float;
			var maxhealth:float;
			health=upgradeScript.getcockpitHealth();
			maxhealth=upgradeScript.getMaxCockpitHealth();
 			fillAmmount.fillAmount=health/maxhealth;
 			
 			fillAmmountObject=GameObject.Find("RightWingsFill");
			fillAmmount=fillAmmountObject.GetComponent(UnityEngine.UI.Image);
			health=upgradeScript.getwingshealth();
			maxhealth=upgradeScript.getMaxWingshealth();
 			fillAmmount.fillAmount=health/maxhealth;
 			
 			fillAmmountObject=GameObject.Find("LeftWingsFill");
			fillAmmount=fillAmmountObject.GetComponent(UnityEngine.UI.Image);
 			fillAmmount.fillAmount=health/maxhealth;
 			
 			fillAmmountObject=GameObject.Find("GeneratorFillLevel");
			fillAmmount=fillAmmountObject.GetComponent(UnityEngine.UI.Image);
			health=upgradeScript.getBinHealth();
			maxhealth=upgradeScript.getMaxBinHealth();
 			fillAmmount.fillAmount=health/maxhealth;
 			
 			fillAmmountObject=GameObject.Find("MechanicsFill");
			fillAmmount=fillAmmountObject.GetComponent(UnityEngine.UI.Image);
			health=upgradeScript.getMechanicsHealth();
			maxhealth=upgradeScript.getMaxMechanicsHealth();
 			fillAmmount.fillAmount=health/maxhealth;
// 			Debug.Log(health/maxhealth + " Helath " + health + " Max Healt "+maxhealth);
 //SET DEFAULT 
 			var desc = "The shield protects your space ship. Regeneration will slow down in case of more damage";
 			upgradeScript.setTextOfShip(desc,"Shield generator");			
 			upgradeMarker=GameObject.Find("UpgradeMarker");
 			upgradeMarker.transform.position=fillAmmountObject.transform.position;

 			
 			//SET SHIELD GENERATOR ALWAYS AS DEFAULT
 			onClickBin("The shield protects your space ship. Regeneration will slow down in case of more damage");
 			var ShieldgeneratorOb=GameObject.Find("Shield generator");
 			var ShieldGenButton=ShieldgeneratorOb.GetComponent(UI.Button);
 			
 			onSetMarker(ShieldGenButton);
	secondMarker.transform.position=Vector3(99999,99999,9999);
 			
 			
 	onClickBin("The shield protects your space ship. Regeneration will slow down in case of more damage");		
}

function Update () {

}

var currentClickedPart:String;
var gameObjectString:String;
public function onClickFirstWeapon(desc:String)
{
	secondMarker.transform.position=Vector3(99999,99999,99999);

	currentClickedPart="onClickFirst Weapon";
	upgradeScript.setTextOfShip(desc,"FirstWeapon");
	gameObjectString="FirstWeapon";
}

public function onSetMarker(button:UnityEngine.UI.Button){
 	upgradeMarker.transform.position=button.transform.position;
 	
}

public function onSetSecondMarker(button:UnityEngine.UI.Button){
	secondMarker.transform.position=button.transform.position;
}


public function onClickCockpit(desc:String)
{
	secondMarker.transform.position=Vector3(99999,99999,99999);
	
	currentClickedPart="onClickCockpit";
	upgradeScript.setTextOfShip(desc,"Cockpit");
	gameObjectString="Cockpit";
}

public function onClickHeavyWeapon(desc:String)
{
	secondMarker.transform.position=Vector3(99999,99999,99999);
	
	currentClickedPart="onClickHeavyWeapon";
	upgradeScript.setTextOfShip(desc,"Heavy Weapon");
	gameObjectString="Heavy Weapon";

	
}


public function onClickWingsWeapon(desc:String)
{
	currentClickedPart="onClickWings";
	upgradeScript.setTextOfShip(desc,"Wings");
}

public function onClickBin(desc:String)
{

	secondMarker.transform.position=Vector3(99999,99999,99999);
	currentClickedPart="Shield generator";
	upgradeScript.setTextOfShip(desc,"Shield generator");
	
}

public function onClickFirstExtension(desc:String)
{
	secondMarker.transform.position=Vector3(99999,99999,99999);
	currentClickedPart="onClickFirstExtension";
	upgradeScript.setTextOfShip(desc,"Extensions");
}

public function onClickMechanics(desc:String)
{
	secondMarker.transform.position=Vector3(99999,99999,99999);

	upgradeScript.setTextOfShip(desc,"Mechanics");
}

public function onClickSecondExtension(desc:String)
{
	secondMarker.transform.position=Vector3(99999,999,99999);

	currentClickedPart="onClickSecondExtension";
	upgradeScript.setTextOfShip(desc,"Extensions");
}

public function onClickUpgradeBtn()
{
		upgradePopUp.transform.position.y=upPopUpY;
}

public function onClickUpgradeCancelBtn()
{
		upgradePopUp.transform.position.y=9999999;
}
private var fillAmmountRightWing:GameObject;
public function onClickUpgradeConfirmBtn()
{
	Debug.Log("START UPGRADE!! " +currentClickedPart) ;
		
		var fillAmmountObject=GameObject.Find("CockpitFillLevel");
		if(currentClickedPart.Equals("onClickCockpit"))
 			onStartUpgradeAnim(fillAmmountObject.transform.position,false);
 		
 			fillAmmountRightWing=GameObject.Find("RightWingsFill");
 			fillAmmountObject=GameObject.Find("LeftWingsFill");
 			if(currentClickedPart=="onClickWings"){
 			onStartUpgradeAnim(fillAmmountObject.transform.position,true);
 			}
 		
 			fillAmmountObject=GameObject.Find("GeneratorFillLevel");
 			if(currentClickedPart=="Shield generator")
 			onStartUpgradeAnim(fillAmmountObject.transform.position,false);
 			
 			fillAmmountObject=GameObject.Find("MechanicsFill");
 			if(currentClickedPart=="Mechanics")
 			onStartUpgradeAnim(fillAmmountObject.transform.position,false);
		
		

		upgradePopUp.transform.position.y=99999999;
		upgradeScript.onClickUpgradeBtn();
 		onClickBin("The shield protects your space ship. Regeneration will slow down in case of more damage");		
		
}

private function onStartUpgradeAnim(part:Vector3,isWing:boolean){
	//for animation
	Debug.Log("START UPGRADE!!");
		arrowPref.transform.position = part;
		var anim=GameObject.Find("upgradeAnimation").GetComponent(Animation);
		anim.Play();
		
		if(isWing){
			var wingsUpgrade=GameObject.Find("upgradeAnimationObjectWings");
			wingsUpgrade.transform.position=fillAmmountRightWing.transform.position;
			var wingsUpgradeAnimation=GameObject.Find("upgradeAnimationWings").GetComponent(Animation);
			 wingsUpgradeAnimation.Play();
		}
		//Destroy(upgradeAnimation,1.5f);
	//
}


public function onClickRepairBtn()
{
	upgradeScript.onClickRepairBtn();// give Back aktueal Pannel
	
	upgradeHandler=GameObject.Find("UpgradeHandler");
	upgradeScript=upgradeHandler.GetComponent(UpgradeScript);
	
			var health:float;
			var maxhealth:float;
	
			fillAmmountObject=GameObject.Find("CockpitFillLevel");
			fillAmmount=fillAmmountObject.GetComponent(UnityEngine.UI.Image);
			
			health=upgradeScript.getcockpitHealth();
			maxhealth=upgradeScript.getMaxCockpitHealth();
 			fillAmmount.fillAmount=health/maxhealth;
 			
 			if(currentClickedPart.Equals("onClickCockpit"))
 			onStartRepairAnim(fillAmmountObject.transform.position,false);
 			
 			var fillAmmountRightWing=GameObject.Find("RightWingsFill");
			fillAmmount=fillAmmountRightWing.GetComponent(UnityEngine.UI.Image);
			health=upgradeScript.getwingshealth();
			maxhealth=upgradeScript.getMaxWingshealth();
 			fillAmmount.fillAmount=health/maxhealth;
 			
 			
 			fillAmmountObject=GameObject.Find("LeftWingsFill");
			fillAmmount=fillAmmountObject.GetComponent(UnityEngine.UI.Image);
 			fillAmmount.fillAmount=health/maxhealth;
 			
 			if(currentClickedPart=="onClickWings"){
 			onStartRepairAnim(fillAmmountObject.transform.position,true);
 			}
 			
 			fillAmmountObject=GameObject.Find("GeneratorFillLevel");
			fillAmmount=fillAmmountObject.GetComponent(UnityEngine.UI.Image);
			health=upgradeScript.getBinHealth();
			maxhealth=upgradeScript.getMaxBinHealth();
 			fillAmmount.fillAmount=health/maxhealth;
 			
 			if(currentClickedPart=="Shield generator")
 			onStartRepairAnim(fillAmmountObject.transform.position,false);
 			
 			
 			fillAmmountObject=GameObject.Find("MechanicsFill");
			fillAmmount=fillAmmountObject.GetComponent(UnityEngine.UI.Image);
			health=upgradeScript.getMechanicsHealth();
			maxhealth=upgradeScript.getMaxMechanicsHealth();
 			fillAmmount.fillAmount=health/maxhealth;
 			
 			if(currentClickedPart=="Mechanics")
 			onStartRepairAnim(fillAmmountObject.transform.position,false);
 			
 			Debug.Log("currentClickedPart "+currentClickedPart);
 			
}
public var upgradeCanvas:GameObject;
public var repairObject:GameObject;
private function onStartRepairAnim(part:Vector3,wingPart:boolean){
		Debug.Log(part);
		if(wingPart){
			//GameObject.Find("RepairAnimationForWings").transform.position=wingPart;
			GameObject.Find("RepairAnimation").transform.position=part;
			repairObject.GetComponent(Animator).SetBool("SetRapair",true);
		}
		else{
			var animationObject=GameObject.Find("NormalRepairAnimation");
			animationObject.transform.position=part;
			GameObject.Find("NormalRepair").GetComponent(Animator).SetBool("SetRapair",true);
		}
 	onClickBin("The shield protects your space ship. Regeneration will slow down in case of more damage");		
		
}

