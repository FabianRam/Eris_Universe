// using UnityEngine;
// using System.Collections.Generic;


#pragma strict


public var anim:Animator;
public var beAwareText:UnityEngine.UI.Text;
private var demageStr:String;

function Start () {
         anim = GetComponent(Animator);      
//         anim.Play("awareText");
}

function Update () {
		
}
private var animatedStrings = new ArrayList();
private var notAnimate:boolean=true;
 function startBeAwareAnimation(howMuch:int, part:String){
		
		//if(anim.GetBool("BeAware")==false){
		
		switch(howMuch){
			case 1:
			demageStr=part+"\n"+"slightly damaged";
			break;
			
			case 2:
			demageStr=part+"\n"+"damaged";
			break;
			
			case 3:
			demageStr=part+"\n"+"heavily damaged";
			break;
		}
		notAnimate=false;
		beAwareText.text=demageStr;
		for(var i:int=0;i<animatedStrings.Count;i++){
			if(animatedStrings[i]==demageStr)
				notAnimate=true;
		}
		if(!notAnimate){
			animatedStrings.Add(demageStr);
			anim.SetBool("BeAware",true);
		}
	
}