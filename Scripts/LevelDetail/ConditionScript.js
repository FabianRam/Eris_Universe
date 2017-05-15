#pragma strict

private var conditionPannel:GameObject; 
private var pauseScript:pauseScript;
private var shipScript:ShipControl;

private var resourcesTextO:GameObject;
private var resourcesText:UnityEngine.UI.Text;

public static var TOTAL_KILLT_SHIPS=0;

private var curValue:float[]=[0.0,0.0,0.0];
public var maxValue:float[];

private var conditionsText:String[]=["","",""];
private var displayString:String="";

public var CONDITION_METERS:boolean=false; 
public var CONDITION_KILL:boolean=false; 
public var CONDITION_COLLECT:boolean=false; 

public static var MAIN_GOAL_REACHED=false;

public var mainCondition:boolean[];
private var condReached:boolean[]=[false,false,false]; 

private var progressBarMeters:UnityEngine.UI.Image;
private var progressBarKilled:UnityEngine.UI.Image;
private var progressBarBoxes:UnityEngine.UI.Image;
//private var mainCondition:

private var aktivePannels:boolean[]=new boolean[3];

function Start () {
	pauseScript = GameObject.Find("Recources").GetComponent("pauseScript");
	shipScript = GameObject.Find("spaceship").GetComponent(ShipControl);

	var progressBar:GameObject;
	var backgroundImage:UnityEngine.UI.Image;
	if(CONDITION_METERS){
		if(mainCondition[0])
		{
			backgroundImage= GameObject.Find("ProgressbarBackgroundM").GetComponent(UnityEngine.UI.Image);
			backgroundImage.color = Vector4(0.75,0.1,0.1,1);
		}
		progressBar=GameObject.Find("ProgressbarMeters");
		progressBarMeters = progressBar.GetComponent(UnityEngine.UI.Image);
		aktivePannels[0]=true;
		
	}
	else{
		var progresItemM=GameObject.Find("progressItemsMeters");
		progresItemM.SetActive(false);
		aktivePannels[0]=false;
	}
	
	if(CONDITION_KILL){
		if(mainCondition[1])
		{
			backgroundImage= GameObject.Find("ProgressbarBackgroundK").GetComponent(UnityEngine.UI.Image);
			backgroundImage.color = Vector4(0.75,0.1,0.1,1);
		}
		
		progressBar=GameObject.Find("ProgressbarKilled");
		progressBarKilled = progressBar.GetComponent(UnityEngine.UI.Image);
		aktivePannels[1]=true;
	}else{
	var progresItemK=GameObject.Find("progressItemsKilled");
		progresItemK.SetActive(false);
		aktivePannels[1]=false;
	}
	
	
	if(CONDITION_COLLECT){
		if(mainCondition[2])
		{
			backgroundImage= GameObject.Find("ProgressbarBackgroundB").GetComponent(UnityEngine.UI.Image);
			backgroundImage.color = Vector4(0.75,0.1,0.1,1);
		}
		progressBar=GameObject.Find("ProgressbarBoxes");
		progressBarBoxes = progressBar.GetComponent(UnityEngine.UI.Image);
		aktivePannels[2]=true;
	}else{
	var progresItemB=GameObject.Find("progressItemsBoxes");
		progresItemB.SetActive(false);
		aktivePannels[2]=false;
	}
	
	setCondition();	
	//sortPannels();
}

private function sortPannels(){
	
	var progressBarBg=GameObject.Find("progressItemsBoxes");
	var progressBarKg=GameObject.Find("progressItemsKilled");
	var progressBarMg=GameObject.Find("progressItemsMeters");
	
	if(aktivePannels[1]==false&&aktivePannels[2]==false&&aktivePannels[0]==false)
	{
			progressBarMg.transform.position.y=80;
			Debug.Log("onlyMETERS!!"+progressBarMg.transform.position.y);
	}
	else if(aktivePannels[2]==false)
	{
		//progressBarKg.transform.position=progressBarBg.transform.position;
		if(progressBarMg!=null){
			if(aktivePannels[1]==true&&aktivePannels[0]==false){
				progressBarKg.transform.position.y=120;
				progressBarMg.transform.position.y=80;
				Debug.Log("onlyMETERS and KILL!!");
			}else{
				progressBarMg.transform.position.y=80;
				Debug.Log("onlyKILL!!");
				
			
			}
		}
	}
	
}

function Update () {
	
}

public function getMaxV():float[]{
	return maxValue;
}

private function setCondition(){
	
	if(CONDITION_METERS){
		InvokeRepeating("updateMeters", 0, 1.0);
	}
	
	if(CONDITION_KILL){
		curValue[1]--;
		updateConditions(1);
	}
	
	if(CONDITION_COLLECT){
		curValue[2]--;
		updateConditions(2);
	}
}

private function updateMeters(){
	 updateConditions(0);
}

public function updateKill(){
	 updateConditions(1);
}

public function updateCollect(){
	 updateConditions(2);
}

public function collektBox(){
	updateCollect();
}

public function getCurValue(){
	return curValue;
}


private function updateConditions(cond:int){
	if(!condReached[cond]){
	if(conditionPannel==null)
	conditionPannel=GameObject.Find("Pupup");
	
	
	var i:int=cond;
	curValue[i]++;
	
			
		
		if(!MAIN_GOAL_REACHED){
			shipScript.updateRecources();
			if(condReached[cond]){
			}else if(mainCondition[cond])
			{	
				//TODO mark main condition
			}	
			if(i==0&&CONDITION_METERS){
				progressBarMeters.fillAmount=(curValue[0])/(maxValue[0]);
			}
			
			if(i==1&&CONDITION_KILL){
				progressBarKilled.fillAmount=(curValue[1])/(maxValue[1]);
				//conditionsText[1]= condString+"<b>"+curValue[1]+"/</b>" + " \n"+maxValue[1]+ "Enemys"+endCond;
			}
			
			if(i==2&&CONDITION_COLLECT){
				progressBarBoxes.fillAmount=(curValue[2])/(maxValue[2]);
				//conditionsText[2]= condString+"<b>"+curValue[2]+"/</b>" + " \n"+maxValue[2]+ "Boxes"+endCond;
			}	
			if(curValue[i]==maxValue[i])
			{
				if(mainCondition[i]){
					GameObject.Find("spaceship").GetComponent(Animator).SetBool("won",true);
					GameObject.Find("spaceship").GetComponent(Animator).Play("spaceShipWinAnimation",0);
					MAIN_GOAL_REACHED=true;
					condReached[cond]=true;
					shipScript.OnGoalIsReached(i,maxValue[i]);
				}else{
					condReached[cond]=true;
					//TODO start reward 				
				}	
			}
		
		var popUpScript =conditionPannel.GetComponent(popUpScript);
		
		if(curValue[i]==0)
		{
		   if(popUpScript.getLockPopUp())
		    Debug.Log("WAYPOPUP 1 "+popUpScript.POPUP_IN_PROGRESS);
		}
		
		if(curValue[i]==maxValue[i]/2)
		{
		    Debug.Log("WAYPOPUP 2"+popUpScript.POPUP_IN_PROGRESS);
			
		   if(popUpScript.getLockPopUp())
			popUpScript.wayPopup(curValue[i],maxValue[i],i,2);
		}
		else if(curValue[i]==maxValue[i]*3/4){
		    Debug.Log("WAYPOPUP 3 "+popUpScript.POPUP_IN_PROGRESS);
			
		   if(popUpScript.getLockPopUp())
			popUpScript.wayPopup(curValue[i],maxValue[i],i,3);
		}
		else if(curValue[i]==maxValue[i]){
		   if(popUpScript.getLockPopUp())
			popUpScript.wayPopup(curValue[i],maxValue[i],i,4);
		}
				
	
//	//Debug.Log("KIND "+kind);
	
//	kind+=" -------------"+"\n";
//	kind+= cometCounter+ " Comets"+"\n";
//	kind+= smallShipCounter+ " Small Ships"+"\n";
//	kind+= fastShipCounter+ " Fast Ships"+"\n";
//	kind+= middleShipCounter+ " Middle Ships"+"\n";
//	kind+= bigShipCounter+ " bis Ship"+"\n";
//	kind+=" -------------"+"\n";
//	totalShips=cometCounter+smallShipCounter+fastShipCounter+middleShipCounter+bigShipCounter;
//	kind+= totalShips+ " Total Ships"+"\n";
//	kind+=" -------------"+"\n";
//	kind+= itemCounter+ " Total Items"+"\n";
	
	//ENEMYS
//	var resT:UnityEngine.UI.Text=resourcesText.GetComponent(UnityEngine.UI.Text);
	}
	}
}