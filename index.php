<!DOCTYPE html>

<html lang="fr">
<head>
  <meta charset="utf-8">

  <title>Doge Miner</title>
  <script src='./otherscript/jquery-3.5.1.js'></script>
  <script src='./otherscript/jquery-ui.js'></script>

  <link rel="stylesheet" href="styles/style.css">
  <link rel="stylesheet" href="styles/alert_style.css">
</head>

<body>
  <script src="scripts/script.js"></script>

<?php 
  function console_log( $data ){
    echo '<script>';
    echo 'console.log('. json_encode( $data ) .')';
    echo '</script>';
  }
  console_log('PHP LOADED !');
?>



<script type='module'>
    import {Alert} from './scripts/customAlert.js'
      window.Alert = Alert;
</script> 


<div id="main"> <!-- Pour ajouter les alertes-->


<div id='text_btc'>
<p>Nombre de DogeCoin: 0.</p>
</div>
<div id='main_image_div'>
<img src='./images/dogecoin.png' alt='Un dogecoin' ondragstart="return false;" onclick='window.game.click()' onmouseover='window.game.CoinAnimation()' onmouseout='window.game.CoinAnimation()'/> 
</div>


<div id="ameliorationContainerR">

  <div class="amelioration" id="amelioration1">
  <button class="buyButton">Acheter</button>
  <p>Contribution d'Elon Musk</p>
  <button class="sellButton">Vendre</button>
    <img ondragstart="return false;" src='./images/upgrades/elon_musk_wario.jpg'/>
  </div>


  <div class="amelioration" id="amelioration2">
  <button class="buyButton">Acheter</button>
  <p>Chiffrement efficace</p>
  <button class="sellButton">Vendre</button>
  <img ondragstart="return false;" src='./images/upgrades/cryptage.png'/>
  </div>
  
  <div class="amelioration" id="amelioration3">
  <button class="buyButton">Acheter</button>
  <p>Minage Optimisé</p>
  <button class="sellButton">Vendre</button>
  <img ondragstart="return false;" src='./images/upgrades/minage_opti.jpg'/>
  </div>

  <div class="amelioration" id="amelioration4">
  <button class="buyButton">Acheter</button>
  <p>Infiltrer les banques</p>
  <button class="sellButton">Vendre</button>
  <img ondragstart="return false;" src='./images/upgrades/bank.jpg'/>
  </div>
</div>

<div id="ameliorationContainerL">
  <div id="transcender">
    <p> Voulez vous transcender vers un autre monde et obtenir un bonus de % ?</p>
    <img  ondragstart="return false;" onclick='window.game.transcenderConfirmation()'  src='./images/button.png'/>
  </div>
</div>


<script type='module'>
    import {Game,Upgrade,refreshText} from './scripts/gameLogic.js'

      window.game = new Game('main_image_div','text_btc','main',"transcender");


      let isRegister = window.game.getCoockie('isRegister');
      console.log(isRegister);
      console.log("is register^^^^");

      if(isRegister === undefined || !isRegister){
        console.log("ALERT !!!");
        let alert1 = new window.Alert(window.game,'main','Hey !', 'Ce site utilise des cookies pour sauvegarder votre progression. Mais il n\'y a pas de pub ou de traceurs. Donc vous n\'avez pas le choix :>', "J'accepte l'utilisation de cookies", 60, 40, 1.5,1)
        alert1.addConfirmButton();
        alert1.afficherPopUp();
      }

      
      Upgrade.allInstances = [];
      let Upgrade1 = new Upgrade(window.game, 'amelioration1',"Contribution d'Elon Musk", 100, 1.1, 1);
      let Upgrade2  = new Upgrade(window.game, 'amelioration2',"Chiffrement efficace", 2000, 1.2, 50);
      let Upgrade3  = new Upgrade(window.game, 'amelioration3',"Minage Optimisé", 10000, 1.5, 300);
      let Upgrade4  = new Upgrade(window.game, 'amelioration4',"Infiltrer les banques", 100000, 2, 1000);

      window.game.restoreData();
      window.game.save();

      

      


</script> 
</div>
</body>
</html>