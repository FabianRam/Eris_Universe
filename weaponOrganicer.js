#pragma strict
private var shipControl : ShipControl;
private var weaponChooser: GameObject;

function Start () {
 shipControl = GameObject.Find("spaceship").GetComponent(ShipControl);
 	weaponChooser = GameObject.Find("secundaryWeaponChooser");
    	
}

function Update () {

}

public function shootSecondWeapon(){
		shipControl.shootSecondWeapon(1);
		Debug.Log("HELLO");
		weaponChooser.transform.position= new Vector3(999,999,999);
}