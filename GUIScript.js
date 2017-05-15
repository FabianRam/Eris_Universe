var CalculatePositionForNewScreen:boolean=false;
 var CalculateScaleForNewScreen:boolean=false;
 var StartResolutions:Vector2;
 var OffsetX:float;
 var OffsetY:float;
 var FindOffsetStart:boolean;
 private var Can:boolean;
 
 
 function Start () {
 if(FindOffsetStart){
 FindOffset();
 }else{
 Can=true;
 }
 }
 private var XFaz:float;
 private var YFaz:float;
 
 function Update () {
 var Widht=GetComponent.<GUITexture>().pixelInset.width ;
 var Height=GetComponent.<GUITexture>().pixelInset.height;
 
 if(Can){
 
 if(OffsetX==0){
 XFaz=((Widht-20)/2);
 }else{
 XFaz=0;
 }
 if(OffsetY==0){
 YFaz=((Height-20)/2);
 }else{
 YFaz=0;
 }
 GetComponent.<GUITexture>().pixelInset.x=((Screen.width)/2)-XFaz-OffsetX;
 
 GetComponent.<GUITexture>().pixelInset.y=((Screen.height)/2)-YFaz-OffsetY;
 CalculateOffset();
 }
 }
 
 
 
 function FindOffset () {
 var Widht=GetComponent.<GUITexture>().pixelInset.width ;
 var Height=GetComponent.<GUITexture>().pixelInset.height;
 
 OffsetX= ((Screen.width)/2)-GetComponent.<GUITexture>().pixelInset.x;
 OffsetY= ((Screen.height)/2)-GetComponent.<GUITexture>().pixelInset.y;
 
 yield WaitForSeconds(0.1);
 CalculateOffset();
 
 }
 
 
 function CalculateOffset() {
 var Widht=GetComponent.<GUITexture>().pixelInset.width;
 var Height=GetComponent.<GUITexture>().pixelInset.height;
 var Xk=(StartResolutions.x)/Screen.width;
 var Yk=(StartResolutions.y)/Screen.height;
 if(CalculatePositionForNewScreen){
 OffsetX=OffsetX/Xk;
 OffsetY=OffsetY/Yk;
 
 yield WaitForSeconds(0.001);
 StartResolutions.x=Screen.width;
 StartResolutions.y=Screen.height;
 }
 Can=true;
 if(CalculateScaleForNewScreen){
 GetComponent.<GUITexture>().pixelInset.width/=Xk;
 GetComponent.<GUITexture>().pixelInset.height/=Yk;
 }
 
 }