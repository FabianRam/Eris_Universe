#pragma strict

private var conditionScript:ConditionScript;
private var currentValue:float[];
private var maxValue:float[];
private var mainGoal:boolean[];

public var missionPrefab:GameObject;//Assign Length 
private var missionArray:GameObject[];

private var progressBars:UnityEngine.UI.Image[];
private var iconObject:GameObject[];
private var checkImage:GameObject[];
private var reachGoalImage:UnityEngine.UI.Image[];

private var competedGeo:UnityEngine.UI.Image[];
private var completedObject:UnityEngine.UI.Image[];

private var mainGoalText:UnityEngine.UI.Text[];
private var rewardText:UnityEngine.UI.Text[];

public var diferentIcons:Sprite[];
public var completedIcon:Sprite;

private var place=0;//sets the vertikal place on the level screen

var aTT:UnityEngine.UI.Text;

//MainBackImage
private var MainBackImageObj:GameObject[];
private var MainBackImage:UnityEngine.UI.Image[];

private var mainPannel:UnityEngine.UI.Image[];
public var mainPannelSprite:Sprite;

function Start () {
	conditionScript=Camera.main.GetComponent(ConditionScript);
	
	currentValue=conditionScript.getCurValue();
	maxValue =conditionScript.maxValue;
	
	mainPannel=new UnityEngine.UI.Image[1];
		
	mainGoal =conditionScript.mainCondition;
	
	MainBackImageObj=new GameObject[maxValue.length];
	MainBackImage=new UnityEngine.UI.Image[maxValue.length];
	missionArray=new GameObject[maxValue.length];
	progressBars=new UnityEngine.UI.Image[maxValue.length];
	reachGoalImage=new UnityEngine.UI.Image[maxValue.length];
	checkImage=new GameObject[maxValue.length];	
	iconObject=new GameObject[maxValue.length];		

	mainGoalText= new UnityEngine.UI.Text[maxValue.length];
	rewardText= new UnityEngine.UI.Text[maxValue.length];


	completedObject	=new UnityEngine.UI.Image[maxValue.length];
	competedGeo	=new UnityEngine.UI.Image[maxValue.length];

		var scenehandlerObj= GameObject.Find("SceneHandler");
		var scenehandler=scenehandlerObj.GetComponent(SceneHandler);
		var lvl= scenehandler.lvl;
		
	var rewardJunkAmount=10*1;
	var rewardCristalsAmount=1*1;

	var mainBackgroundUsed=false;//bool for main Background -> so that it can be used again	
	for(var i:int=0;i<maxValue.length;i++){	
		if(maxValue[i]!=0){
	//	Debug.Log("maxValue" + maxValue[i]);
		
			missionArray[i]= missionPrefab;
			missionArray[i] = Instantiate (missionArray[i], Vector3(transform.position.x,(transform.position.y)-Screen.height/10*i, transform.position.z) , Quaternion.identity);
		  	missionArray[i].transform.parent = gameObject.transform;
		  	missionArray[i].transform.localScale=gameObject.transform.localScale*0.8f;
		  	
		  	var achivementText=GameObject.Find("OBjText");
		  	achivementText.name="OBjText"+i;
		  	

		  	var maingoalObj=GameObject.Find("MainGoalText");
		  	mainGoalText[i]=maingoalObj.GetComponent(UnityEngine.UI.Text);
		  	Debug.Log(i+" mainGoal[i]" +mainGoal[i]);
		  	if(mainGoal[i]){
		  		mainGoalText[i].text="Main Goal";
		  		Debug.Log("MAIN");
		  	}
		  	else{
//		  		Debug.Log("NOT MAIN GOAL "+ i + " : " + mainGoal[i]);
		  	  	mainGoalText[i].text="Second Goal";
		  		Debug.Log("SECOND");
		  	  	
		  	}
		  	mainGoalText[i].name+=i;

		  	var rewardTextObj=GameObject.Find("RewardMissionText");
		  	rewardText[i] =rewardTextObj.GetComponent(UnityEngine.UI.Text);


	  		rewardText[i].text="Reward "+rewardJunkAmount+" J "+rewardCristalsAmount+" C";
	  		rewardText[i].name+=i;

		  	var pBar=GameObject.Find("MP_FillPannel");
		  	pBar.name+=i;
		  	progressBars[i]=pBar.GetComponent(UnityEngine.UI.Image);
		  			  			
		  	var cObj=GameObject.Find("CheckImage");
		  	cObj.name+=i;
		  	completedObject[i]=cObj.GetComponent(UnityEngine.UI.Image);  			  			  	
		  	
		  	var blueI=GameObject.Find("BlueImage");
		  	blueI.name+=i;
		  	competedGeo[i]=blueI.GetComponent(UnityEngine.UI.Image);    			  			  			  			  	
		  			  			  	  	  	
		  	iconObject[i]=GameObject.Find("IconImage");
		  	iconObject[i].name+=i;
		  	
		  
//		  	checkImage[i]=GameObject.Find("CheckImage");
//		  	checkImage[i].name+=i;
		  	
		  	aTT=achivementText.GetComponent(UnityEngine.UI.Text);
		  	setText(aTT,i);
	  	}
	  }
	  updateMissions();
}

public function updateMissions()
{	
	if(maxValue!=null)
	for(var i:int=0;i<maxValue.length;i++){	
		if(maxValue[i]!=0){
			var fillCcurrent:float=currentValue[i];
			var fillMax:float=maxValue[i];
			if(progressBars[i]!=null){
				progressBars[i].fillAmount=fillCcurrent/fillMax;
				if(currentValue[i]==maxValue[i])
				{
					///TODO
				completedObject[i].sprite=completedIcon;
				competedGeo[i].color=new Color(0,0,0);
				competedGeo[i].color=new Color(0.56f,0.21f,0.23f);
					
				}
			setText(aTT,i);
			}
		}
	}
}


private function setText(txt:UnityEngine.UI.Text, place:int){
	var str ="";
	var beginStr="";
	switch(place){
	case 0:
		beginStr="Reach ";
		str+="Meters";
		
	break;
	
	case 1:
		beginStr="Kill ";
		str+="Enemies";
	break;
	
	case 2:
		beginStr="Collect ";
		str+="Boxes";
	break;
	}
	txt.text=beginStr+"<color=#e9371f>"+maxValue[place]+" </color> "+str;
		
	var icon=iconObject[place].GetComponent(UnityEngine.UI.Image);
	icon.sprite=diferentIcons[place];
	
}

function Update () {

}