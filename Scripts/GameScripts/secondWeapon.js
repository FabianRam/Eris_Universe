#pragma strict

private var shipControl : ShipControl;
private var weaponChooser: GameObject;
private var time:float;

private var weaponButtons: GameObject;

private var callSecondaryWeapons:CallSecondaryWeapons;
private var pos:Vector3;
public var weaoonChooserOpen:boolean=false;

private var notVisibleBackground:GameObject;

function Start () {
		callSecondaryWeapons=Camera.main.GetComponent(CallSecondaryWeapons);
		weaponChooser = GameObject.Find("SecundaryBTNs");
	  pos = Vector3(transform.position.x, transform.position.y, 10);
	 weaponChooser.transform.position.x+=99999;//        
	 shipControl = GameObject.Find("spaceship").GetComponent(ShipControl);
		time=Time.timeScale;
		transform.position.x=Screen.width*6/40;
	notVisibleBackground=GameObject.Find("NotVisibleBackground");
}

function Update () {
//	if(weaoonChooserOpen&&Time.timeScale!=0.1&&weaponChooser.transform.position.x==Screen.width/2-weaponChooser.transform.localScale.x/2)
//	{
//			Time.timeScale=0.1;
//	}
}

public function resetTime()
{
	Time.timeScale=time;
	weaoonChooserOpen=false;
}

function OnApplicationPause(pState:boolean)
{
         var paused = pState;
         if (paused == true)
         {   
            Time.timeScale=0;
         }
}


function OnMouseDown(){
     if(!shipControl.getGameOver()&&shipControl.getRackets()>0){
     	if(weaoonChooserOpen==false||weaponChooser.transform.position.x==999999){
	     	Time.timeScale=0.1;
	     	weaponChooser.transform.position= Vector3(Screen.width/2-weaponChooser.transform.localScale.x/2,-Screen.height/4,19);
			weaoonChooserOpen=true;
				var audio = GetComponent.<AudioSource>();
			audio.Play();
		}
		else{
			weaoonChooserOpen=false;
			Time.timeScale=1;
	     	weaponChooser.transform.position= new Vector3(9999,9990,9990);
	     	callSecondaryWeapons.isOn=false;
		}
	}
}
     
public function setClickable()
{
	OnMouseDown();
}


public function shootSecondWeapon(){
		weaoonChooserOpen=false;
		shipControl.shootSecondWeapon(1);
		callSecondaryWeapons.isOn=false;
}