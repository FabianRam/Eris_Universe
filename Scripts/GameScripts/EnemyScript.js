// Public variable that contains the speed of the enemy
var speed : float;
public var maxSpeed : float;  
public var minSpeed : float;

//Public Variable 
//public var live: int;
public var shield: int;
public var shildImage: GameObject;

//Variables to Controll what the object can do
public var canRotate:boolean;
public var hasShield:boolean;

//Variables for shooting 
public var canShoot:boolean;
public var enemyFire:GameObject;

// Variable to store destroyed image//TODO Take only Array
public var oneLeft  :  Sprite;
public var twoLeft  :  Sprite;
public var threeLeft  :  Sprite;
public var fourLeft  :  Sprite;
public var fiveLeft  :  Sprite;
public var sixLeft  :  Sprite;
private var enemyISDead:boolean=false;
public var gameOver:boolean=false;

public var shipKind:String;
public var intelligentShooting:boolean=false;
//Variables for Animations
public  var  explosionObject: GameObject;
var myAnimation : String = "explosion"; //your animation name

private var cantSplit=false;

var liveSprites :Sprite[] = [oneLeft,twoLeft,threeLeft,fourLeft,fiveLeft,sixLeft];

var allDemaged:boolean=false;//Variable for a special Weapon
var markAsDamaged:boolean=false;

private var maxLive:float;
public var live:int;
var playerShield:GameObject;

///Junkt the ship getLost
public var junk:GameObject;
public var cristals:GameObject;
private var shipControl:ShipControl;
private var spaceShip:GameObject;
private var timestamp =0.0; 
public var fireRate=0.0025;

//BONUS WHEN THE OBJECT IS DEAD
public var bonusObject:GameObject;
public var liveTextMesh:GameObject;

//private var BonusText:UnityEngine.UI.Text ;
//private var BonusBackgroundText:UnityEngine.UI.Text;

public var conditionScript:ConditionScript;
public var canMove:boolean=true;
// Function called when the enemy is created
function Start () { 
	maxLive=live;
	
	conditionScript=Camera.main.GetComponent(ConditionScript); 

	spaceShip=GameObject.Find("spaceship");
 	 shipControl=spaceShip.GetComponent(ShipControl);
 	 
    //Calculate Random Range
    GetComponent(SpriteRenderer).sprite = liveSprites[0];
    speed=Random.Range(minSpeed, maxSpeed);
    // Add a vertical speed to the enemy
    if(canMove)
    GetComponent.<Rigidbody2D>().velocity.y = speed;
	var minusR:float=Random.Range(-0.1,0.2);
	transform.localScale.x+=minusR;
	transform.localScale.y+=minusR;
    if(canRotate)
    GetComponent.<Rigidbody2D>().angularVelocity = Random.Range(-200, 200);
}

function Update ()    
{
     //DELETE THE ENEMY if he is out of Screen
    if(-Camera.main.orthographicSize>=transform.position.y+GetComponent.<Renderer>().bounds.size.y)
    {
       Destroy(gameObject);
	}
	
	if(hasShield){
    	shildImage.transform.position.y=transform.position.y;
    }
    
    if(canShoot){
    timestamp += Time.deltaTime;

	if(timestamp>fireRate){
//		enemyFire.GetComponent(BulletScript).setKind(-1);
		if(enemyFire.GetComponent(BulletScript)!=null)
			enemyFire.GetComponent(BulletScript).setShootingType(intelligentShooting);
			Instantiate(enemyFire, transform.position, Quaternion.identity);
			timestamp=0.0;
		}
	}
	
	if(allDemaged)
	{
		allDemaged=false;
		var blocks = FindObjectsOfType(EnemyScript);
			for (var block : EnemyScript in blocks) {
				block.markAsDamaged=true;	
			}
	}
	
	if(markAsDamaged){
			markAsDamaged=false;				
			if(live>1){
				live--;
				shipControl.higherHighscore(10);
				Instantiate(explosionObject, transform.position, Quaternion.identity);
			}else{
				Instantiate(bonusObject, transform.position, Quaternion.identity);			
				Destroy(gameObject,0.2);
				Instantiate(explosionObject, transform.position, Quaternion.identity);
				shipControl.higherHighscore(100);
				setBonusObject();
			 	Instantiate(cristals, transform.position, Quaternion.identity);
				if(gameObject.tag=="EnemyShip"){
								conditionScript.updateKill();
								Debug.Log("///////////////////KILLED");
				}
				
			}
			
	}

}

public function criticalHit()
{
	live=1;
	speed+=3;
	if(speed>-1)
	speed=-0.3;
	
	cantSplit=true;
}


private function setBonusObject(){
			Debug.Log("SET BONUS OBJECT");
			if(bonusObject!=null)//TODO !!!!
			Instantiate(bonusObject, transform.position, Quaternion.identity);
}

private var originalXScaleLifeUI:float;

// Function called when the enemy collides with another object
function OnTriggerEnter2D(obj : Collider2D) {  
    var objName = obj.gameObject.name;
    // If it collided with a bullet
    if(objName!=null)
    if (((objName=="bullet(Clone)" || obj.gameObject.tag == "playerRocket" || objName== "enemyBullet(Clone)"&&gameObject.tag=="comet"|| objName== "enemyBullet(Clone)"&&name=="RankeLinks 1 1(Clone)")&&live>=0)&&enemyISDead==false) {
        // Destroy itself (the enemy)
        
       	if(objName!=null&&objName=="bullet(Clone)")
	       	Instantiate(shipControl.hitExplosion, obj.transform.position, Quaternion.identity);
	       	var rocketDemage:int;
	       	if(objName!="highestValueTargetRacket(Clone)") {
	       		var rocket =obj.gameObject.GetComponent(BulletScript); 
	       		rocketDemage = rocket.getDemage();
	       		  if(rocket.bulletKind==3)//HIT FROM A CLUSTER RACKET
       					allDemaged=true;

       				rocket.DestroyAnim();			
	       	 }else{
	       	var targetRacketScrict = obj.gameObject.GetComponent(RacketScript);
	       		rocketDemage =targetRacketScrict.getDemage();
	       		targetRacketScrict.DestroyAnim();
	       	}

	       	live-=rocketDemage;//HIT FROM A NORMAL ONE
	       	//add to live text
	       	if(liveTextMesh!=null){
	       		
	       	if(originalXScaleLifeUI==0)
	       		originalXScaleLifeUI=liveTextMesh.transform.localScale.x;

	       	var liveP:float=(live);
	       	var percentLive:float=liveP/maxLive;
	       	liveTextMesh.GetComponent(DisapearAfterSeconds).isHit();
	       	liveTextMesh.transform.localScale.x=.3f*percentLive;
	       	Debug.Log(originalXScaleLifeUI+"  :::   "+ percentLive+" originalXScaleLifeUI*percentLive "+originalXScaleLifeUI*percentLive+" LIVE "+ liveP+ " ::: "+maxLive);
	       	}
	       	Instantiate(junk, transform.position, Quaternion.identity);
	       
     
       
       if(live<=0&&enemyISDead==false)
	       {
	       if(!cantSplit)
	      if(gameObject.tag=="comet"){
	        var cometScript=this.gameObject.GetComponent(cometExtention);
	        cometScript.onSplit();
       		}
	      
	        Instantiate(cristals, transform.position, Quaternion.identity);
	       	enemyISDead=true;
			if(gameObject.tag=="EnemyShip"){
				conditionScript.updateKill();
			}
			//bonusObject = Resources.Load("Prefabs/Bonus", GameObject) as GameObject;
			
	       	Destroy(gameObject,0.2);
//	       	Debug.Log("NAME "+this.name);
	       	shipControl.enemyDestroiyed(this.shipKind);
	       	
	       	setBonusObject();
	     	shipControl.higherHighscore(100);
	        }
       		else
       		{
       		shipControl.higherHighscore(10);
       		if(live<liveSprites.Length&&live>0)
       			if(liveSprites[live]&&live<liveSprites.Length)
       			GetComponent(SpriteRenderer).sprite = liveSprites[live];
       		 	
       		}
       			
       	if(live<=0)
       	{
       		Instantiate(explosionObject, transform.position, Quaternion.identity);
       	}		
       // And destroy the bullet
 

        Destroy(obj.gameObject);
    }
    var liveUI : GameObject;
    var shieldUI:GameObject;
	// This will return the game object named Hand in the scene.
	liveUI = GameObject.Find("playerLive");
	shieldUI = GameObject.Find("playerShield");
	 
    if (objName!=null&&objName == "spaceship") {//The gameObject is colliding with the spacship
    		live--;
    		//TODO lose life depending ships equitment
    		Instantiate(junk, transform.position, Quaternion.identity);
       		if(live==0){
	        	 Destroy(gameObject,0.2);
	        	 bonusObject.transform.position=transform.position;
        	 	shipControl.enemyDestroiyed(this.shipKind);
        	 	shipControl.higherHighscore(200);
        	}
        	else{
        	shipControl.higherHighscore(10);
        	}
        	if(live<liveSprites.Length&&live>0)
        		if(liveSprites[live]&&live<liveSprites.Length)
		       	GetComponent(SpriteRenderer).sprite = liveSprites[live];
		       	Instantiate(explosionObject, transform.position, Quaternion.identity);
	        	var objPos=obj.transform.position;
	        	var pos=transform.position;
	        	var moveDistance:float=this.transform.localScale.y/2;
//        		playerShield=obj.gameObject.GetComponent(ShipControl).mShield;
        	
	        	if(objPos.x<=pos.x+GetComponent.<Renderer>().bounds.size.x/3){
		        	obj.transform.position.x-=moveDistance;
	        	}
	        	else{
	    	    	obj.transform.position.x+=moveDistance;
	        	}
	        	if(objPos.y<=pos.y+GetComponent.<Renderer>().bounds.size.y/2)
	        	{
	        		obj.transform.position.y-=moveDistance;
	        	}
	        	else{
	        		obj.transform.position.y+=moveDistance;
	        	}
        	
        		///DEMAGE OF PLAYER
        		shipControl.hitShip(obj);
        }
}