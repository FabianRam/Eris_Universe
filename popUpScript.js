#pragma strict

private var pos:Vector3;
private var startTime:float;
private var goBack:boolean;
private var lockPopUp:boolean=true;

private	var popUpTextObject:GameObject;
private var popUpText:UnityEngine.UI.Text;
private var durationPlus:int=1;

private var popUpImageObj:GameObject;
private var popUpImage:UnityEngine.UI.Image;

public var popupImages:Sprite[];

public var rewardRecources:GameObject;
public var shipScript:ShipControl;

private var MISSION_FINISHED:int=4;

public var missionFinishedGift:GameObject;
public var missionRewardText:UnityEngine.UI.Text;
private var rewardJunkAmount:int;
private var rewardCristalsAmount:int;

public static var POPUP_IN_PROGRESS=false; 

function Start () {

	shipScript = GameObject.Find("spaceship").GetComponent(ShipControl);

	popUpTextObject=GameObject.Find("PopUpText");
	popUpText=popUpTextObject.GetComponent(UnityEngine.UI.Text);
	pos=this.transform.position;
	this.transform.position.x=Screen.width*2;
	
	popUpImageObj=GameObject.Find("Image");
	popUpImage=popUpImageObj.GetComponent(UnityEngine.UI.Image);
	popUpImage.rectTransform.sizeDelta = new Vector2( 40, 40);
}

function Update () {
	if(!lockPopUp){
//Debug.Log("TRANSFORM "+transform.position.x+ " pos.x "+pos.x );
	if(transform.position.x<=pos.x+0.25)
	{
		goBack=true;
		POPUP_IN_PROGRESS=false;
//		startTime=Time.time;
	}
	if(transform.position.x>=Screen.width*2&&goBack)
	{
		
		lockPopUp=true;
		goBack=false;
	}
	if(!goBack)
	{
//	Debug.Log("GO FORWARD");
	transform.position = Vector3.Lerp(transform.position, pos, (Time.time - startTime) / 25*durationPlus);
	}
	else{
//	Debug.Log("GO BACKWARDS");
	transform.position = Vector3.Lerp(transform.position,Vector3(Screen.width*MISSION_FINISHED,
								transform.position.y,transform.position.z), (Time.time - startTime) / 15*durationPlus); 
	}
	}
}

public function getLockPopUp():boolean{
	return lockPopUp;
}

public function reachGoal(){
	
}//popupO.GetComponent(popUpScript).wayPopup("Your reward: "+2*levelScript.getCurrentLevel()+" Cristals "+MISSION_FINISHED*levelScript.getCurrentLevel()+" Junk",2);

function wayPopup(curVal:int,maxValue:int,conditinoNumber:int,textNumberNumber:int)//(curValue[i],maxValue[i],i,2);
{
	POPUP_IN_PROGRESS=true;
//	pos=this.transform.position;
//	this.transform.position.x=Screen.width*1.5;
	startTime=Time.time;
	lockPopUp=false;
	goBack=false;
	transform.position.x=Screen.width*2;
	
	conditinoNumber++;
	
	Debug.Log("conditinoNumber "+conditinoNumber +" textNumberNumber "+textNumberNumber);
    var littleIcon =popupImages[conditinoNumber-1];
	if(popUpImage==null){
		popUpImageObj=GameObject.Find("Image");
		popUpImage=popUpImageObj.GetComponent(UnityEngine.UI.Image);
		popUpImage.rectTransform.sizeDelta = new Vector2( 40, 40);
	}
		
	popUpImage.sprite=littleIcon;
	
	missionFinishedGift.SetActive(false);
	if(textNumberNumber==MISSION_FINISHED){
		var scenehandlerObj= GameObject.Find("SceneHandler");
		var scenehandler=scenehandlerObj.GetComponent(SceneHandler);
		var lvl= scenehandler.lvl;
		
		rewardJunkAmount=10*1;
		rewardCristalsAmount=1*1;//Random.Range(1, 10);
		missionRewardText.text=rewardJunkAmount+" J\n"+
			rewardCristalsAmount+" C";
		shipScript.newResources(rewardJunkAmount,rewardCristalsAmount);
		
		missionFinishedGift.SetActive(true);	
	}
	
	switch(conditinoNumber){
	case 1://TODO switch true immages
		popUpImage.rectTransform.sizeDelta = new Vector2(60 , 40);
		
		switch(textNumberNumber){
		case 1://TODO switch true immages
			durationPlus=2;
			popUpText.text="You must reach "+ maxValue+ " Meters !";
			
			//"You have "+ maxValue[i]+ " Meters !"
			break;
			
		case 2:
			durationPlus=3;
			popUpText.text="Half way done. Go On!";
			
			//"Half way done. Go On!"
			break;
		case 3:
			popUpText.text="Almost there! Only "+(maxValue-curVal)+" Meters.";
			break;
		
		case MISSION_FINISHED:
			durationPlus=2;
				popUpText.text="You have it! Mission Complete! ";	
			
		 break; 
		
		}
		
	break;
		
	case 2:
		switch(textNumberNumber){
		case 1://TODO switch true immages
			durationPlus=1;
			popUpText.text="You have to kill "+ maxValue+ " Enemies !";
			
			//"You have "+ maxValue[i]+ " Meters !"
			break;
			
		case 2:
			durationPlus=2;
			popUpText.text="Yeah you killed half of them!";
			
			//"Half way done. Go On!"
			break;
		case 3:
			popUpText.text="Only few of them Left!";
			break;
		case MISSION_FINISHED:
		durationPlus=1;
			popUpText.text="List completed. Mission Complete!";	
			 var spawnPosition:Vector3 = Camera.main.transform.forward /2 ;
			spawnPosition.y+=1;
		 break; 	
			
		 break; 
		}
		break;
		
	case 3:
		switch(textNumberNumber){
		case 1://TODO switch true immages
			durationPlus=1;
			popUpText.text="You have to collect "+ maxValue+ " Boxes!";
			//"You have "+ maxValue[i]+ " Meters !"
			break;
			
		case 2:
			durationPlus=2;
			popUpText.text="Half of them are collected!";
			//"Half way done. Go On!"
			break;
		case 3:
			popUpText.text="half of the boxes are collected!";
		 break; 
		 
		 case MISSION_FINISHED:
		 durationPlus=1;
			popUpText.text="You have it! Mission Complete! ";	
			Instantiate (rewardRecources, Vector3(Screen.width/2+50,Screen.height/2,0) , Quaternion.identity);
			
		 break; 
		 
		}
		break;
	}
	
}