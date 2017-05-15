#pragma strict

public var pages:GameObject[];
public var pageButtonText:UnityEngine.UI.Text;
private var currentPageButton:int=0;


function Start () {
	pages[currentPageButton].active=true;
	for(var i:int=1;i<pages.Length;i++){
		pages[i].active=false;
	}
}

function Update () {

}

function onClickPageButton(){
	currentPageButton++;
	
	if(currentPageButton<pages.Length){
		pages[currentPageButton-1].active=false;
		pages[currentPageButton].active=true;
		if(currentPageButton<pages.Length){
			pageButtonText.text="Start";
		}
	}
	else{
		this.gameObject.active=false;
	}
}

