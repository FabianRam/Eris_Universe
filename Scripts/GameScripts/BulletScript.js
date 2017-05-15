// Public variable 

public var speed : float = 6;
public var demage : float=1;
public var enemyFire:boolean=false;

private var playerPos:float;
private var bulletPos:float;
private var lockPos:boolean=false;
// Gets called once when the bullet is created
public var bulletKind:int;
// Function called when the enemy is created
private var playerShip:GameObject;
private var playerScript:ShipControl;

private var bulletLevel:int=1; 
private var bulletTexture:SpriteRenderer;

public var randomBulletColor:boolean=true;								

public var explosionObject:GameObject;
								
function Start () {  

	

	playerShip = GameObject.Find("spaceship");
	playerScript=playerShip.GetComponent(ShipControl);
	
	        // Set the Y velocity to make the bullet move upward
    if(bulletKind!=-1){
    GetComponent.<Rigidbody2D>().velocity.y = speed+Random.Range(1,-1);
//   	setKind(bulletKind);
    }else
    GetComponent.<Rigidbody2D>().velocity.y = -speed+Random.Range(1,-1);
    setKind(bulletKind);
    playerPos=playerShip.transform.position.x;
    
    if(randomBulletColor){
	   // bulletTexture=gameObject.GetComponent(SpriteRenderer);
	    //randomColor();
    }
   
}

function randomColor(){
	var randomColor:int=Random.Range(0,7);
	
	switch(randomColor){
		case 0:
	bulletTexture.color= new Color(1,1,1);
	
		break;
		
		case 1:
	bulletTexture.color= new Color(1,1,1);
	
		break;
		
		case 2:
	bulletTexture.color= new Color(1,0.5,0.6);
		break;
		
		case 3:
	bulletTexture.color= new Color(0.3,0.3,1);
		break;
		
		case 4:
	bulletTexture.color= new Color(0.9,1,1);
		break;
		
		case 5:
	bulletTexture.color= new Color(1,0.6,1);
		break;
		
		case 6:
	bulletTexture.color= new Color(1,0.6,1);
		break;
		
		case 7:
	bulletTexture.color= new Color(1,0.5,0.25);
		break;
		
		case 8:
	bulletTexture.color= new Color(1,1,1);
		break;
	}
	
	
	
	
}


// Gets called when the object goes out of the screen
function OnBecameInvisible() {  
    // Destroy the bullet 
    Destroy(gameObject);
}
public function resetDemage()
{
	demage--;
	transform.localScale/=1.4f;
	Debug.Log("RESET DEMAGE");
}

public function plusDemage()
{
	demage++;
	transform.localScale*=1.4f;
	Debug.Log("Plus DEMAGE");
}

public function setShootingType(type : boolean)
{
	enemyFire=type;
//	Debug.Log("TYPE "+ type);
}

function Update () {
	if(!ShipControl.gameOver){
	 if(enemyFire){
	 if(lockPos==false){
	 var rot = transform.rotation;
	 if(playerPos>transform.position.x)
     {
     	GetComponent.<Rigidbody2D>().velocity.x+=speed/4;
     	
     }
	     else if(playerPos<transform.position.x){
	     	GetComponent.<Rigidbody2D>().velocity.x-=speed/4;
	     	transform.rotation = rot * Quaternion.Euler(-25, -25, 0); // 
	     }
	     lockPos=true;
	     }
     }
     else{
     	playerScript.getFireDemage();
     }
     }
}

public function setKind(kind:int){
//Debug.Log("ROCKET KIND IS "+ kind);
this.bulletKind=kind;

switch(bulletKind){
		
			case -2://ENEMY From bottom
			speed=1;
			demage=5;
//			Debug.Log("ENEMY WEAPON WEAPON");
			break;
		case -1://ENEMY
			speed=-6;
			//demage=1;
//			Debug.Log("ENEMY WEAPON WEAPON");
			break;
		
		case 0://TODO Normal weaponPlus bonus
			demage=playerScript.getFireDemage();
//			Debug.Log("NORMAL WEAPON");
			speed=6;
			break;
		
		case 1://normal Weapon
//			Debug.Log("Rocket1 WEAPON");
			demage=1;
			speed=1;
			break;
		case 2: 
//			Debug.Log("Rocket2 WEAPON");
			demage=10;
			speed=3;	
			break;
		case 3:
//			Debug.Log("Rocket 3 WEAPON");
			demage=1;
			speed=5;
			break;
		case 4: //Tower Rocket
			Debug.Log("Rocket 4 BUILDING ////////////////////");
			demage=40;
			speed=3;
			break;		
		
	
	}	
			
}

private function getKind():int
{
	return bulletKind;
}

public function getDemage():float
{
	return demage;
}

public function DestroyAnim(){
	if(explosionObject!=null)
	Instantiate(explosionObject,transform.position, Quaternion.identity);
}

function OnTriggerEnter2D(obj : Collider2D) {  
	if(obj.tag=="enemyBullet"){
		Instantiate(playerScript.hitExplosion, obj.transform.position, Quaternion.identity);
		var enemyBulletsc=obj.gameObject.GetComponent(BulletScript);
		if(enemyBulletsc.demage--==0)
		{
			Destroy(obj.gameObject);
			Destroy(this.gameObject,0.4f);
		}
	}
	if(obj.tag=="enemyDirektionBullet"||obj.tag=="nutBullet"){
		Instantiate(playerScript.hitExplosion, obj.transform.position, Quaternion.identity);
		Debug.Log("hit bullet");
		var enemyBulletscV=
		obj.gameObject.GetComponent(EnemyBulletWithoutVilocity);
		if(enemyBulletscV.demage--==0)
		{
			Destroy(obj.gameObject);
			Debug.Log("Destroy bullet");
			Destroy(this.gameObject,0.4f);
			
		}
	}
	
	
}

