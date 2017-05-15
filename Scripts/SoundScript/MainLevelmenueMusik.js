#pragma strict

function Start () {

}

function Update () {

}



 
 private static var instance:MainLevelmenueMusik;
public static function GetInstance() : MainLevelmenueMusik {
return instance;
}


function Awake() {
    if (instance != null && instance != this) {
        Destroy(this.gameObject);
        return;
    } else {
        instance = this;
    }
    DontDestroyOnLoad(this.gameObject);
}

 public function killMusik()
 {
 	Destroy(this.gameObject);
 }