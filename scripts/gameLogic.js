import {Alert} from './customAlert.js'

class Game{
    constructor(mainDivTitle,textDivTitle, mainID, transcenderID){


        this.nbBitcoin = 0;

            this.isRunning = true;

            this.mainContainer = document.getElementById(mainID);

            this.mainDiv = document.getElementById(mainDivTitle);
            this.coinImage = this.mainDiv.getElementsByTagName('img')[0];

            this.textDiv = document.getElementById(textDivTitle);
            this.textCoin = this.textDiv.getElementsByTagName('p')[0];

            this.transcenderDiv = document.getElementById(transcenderID);


            this.actualBonus = 1;
            this.bonusNextAscend = 0;
            this.nbAscend = 0;
            this.upgrade = {}
            this.clickPower = 1;

    }


    async save(){
        setInterval(()=>{
            this.setCoockie("isRegister", true, 999999);
            this.setCoockie("coins", Math.round(this.getCoin()), 999999);
            this.setCoockie("bonus", Math.round(this.getBonus()), 999999);
            for(let i in Upgrade.allInstances){
                this.setCoockie(Upgrade.allInstances[i].getName(), Math.round(Upgrade.allInstances[i].getNumberOfUpgrade()), 999999);
            }
        },3000);
    }

    getCoockie(name){
            let decodedCookie = decodeURIComponent(document.cookie);
            let cookies = decodedCookie.split(';');
            for(let i in cookies){
                if(cookies[i].split("=")[0] == name){
                    return cookies[i].split("=")[1];
                }else{
                }
            }
          
    }

    setCoockie(name,value,days){
        var d = new Date();
        d.setTime(d.getTime() + (days*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = `${name}=${value};${expires};path=/`;
    }

    restoreData(){
        let isRegister = this.getCoockie(' isRegister')
        let coockieCoins = this.getCoockie(' coins')
        let bonus = this.getCoockie(' bonus');

        if(isRegister != undefined){
            this.isRegister = true;
        }
        if(!isNaN(coockieCoins)){
            this.setCoin(parseInt(coockieCoins))
        }
        if(!isNaN(bonus)){
            this.setBonus(parseInt(bonus))
        }

        console.log("before for: ");
        console.log(Upgrade.allInstances);
        for(let i in Upgrade.allInstances){
            let upgradeName =  Upgrade.allInstances[i].getName();
            let upgradeQuantity = this.getCoockie(' ' + upgradeName);
            console.log("name: " + upgradeName + "quantité: " + Math.round(upgradeQuantity));
            if(!isNaN(Math.round(upgradeQuantity))){
                Upgrade.allInstances[i].setNbUpgrade(Math.round(upgradeQuantity))
                Upgrade.allInstances[i].rewriteUpgrade();
            }
        }
        console.log("after for");
    }


    click(){
        if(this.isRunning){
            this.nbBitcoin += 1*this.clickPower*this.actualBonus;
            this.updateNbOfCoin();
            this.CoinAnimationClick();  
        }
    }

    transcenderConfirmation(){
        if(this.isRunning){
        let alertT = new window.Alert(window.game,'main','Êtes-vous sur ?', 'Vous allez perdre tout vos coins et vos améliorations pour un bonus de '+ Math.round(this.getBonusNext()) +'% ?', "Oui !", 60, 40, 2, 1,"Non")
        let confirmation = () => this.transcender();
        alertT.addConfirmButton(20,confirmation);
        alertT.addCancelButton(80);
        alertT.afficherPopUp();
        }
    }

    transcender(){
        //TODO
        this.OMGAnimation();
        console.log("gg !");
        this.setBonus(this.getBonusNext())
        this.setBonusNext(0)
        this.setCoin(0)


        for(let i in Upgrade.allInstances){
            Upgrade.allInstances[i].setNbUpgrade(0);
            Upgrade.allInstances[i].rewriteUpgrade();
        }
        
        //this.coinImage.classList.remove('wowAnimationClass');   


    }

    OMGAnimation(){
        this.coinImage.style.zIndex
        this.coinImage.classList.add('wowAnimationClass');
        this.removeClass(5000);
    }

    async removeClass(time){
        setTimeout(()=>{
            this.coinImage.classList.remove('wowAnimationClass');
        },time)
    }

    CoinAnimationClick(){
        this.mainDiv.animate([
            {
              transformOrigin: "center",
            },
            {
                transformOrigin: "center",
                transform: 'translate(-50%,-50%) rotate(-5deg)',
            },
            {
                transformOrigin: "center",
                transform: 'translate(-50%,-50%) rotate(10deg)',
            },
            {
                transformOrigin: "center",
                transform: 'translate(-50%,-50%) rotate(-5deg)',
            }
          ], {duration:1000});
    }

    CoinAnimation(){
        if(this.isRunning){
        this.mainDiv.animate([
            {
              transformOrigin: "center",
            },
            {
                transformOrigin: "center",
                transform: 'translate(-50%,-50%) scale(0.95)',
            },
            {
                transformOrigin: "center",
                transform: 'translate(-50%,-50%) scale(1)',
            }
          ], {duration:1000});
        }
    }

    updateAscendBonus(){
        let bonusPercent = -1;
        if((this.bonusNextAscend) < 0){
            bonusPercent = 0;
        }else{
            bonusPercent = Math.round(this.bonusNextAscend);
        }
        this.transcenderDiv.getElementsByTagName('p')[0].innerHTML = `Voulez vous transcender vers un autre monde et obtenir un bonus de +${bonusPercent}% ? `
    }
    updateNbOfCoin(){
        this.textDiv.innerHTML  = `<p>Nombre de DogeCoin : ${Math.round(this.nbBitcoin)}.</p>`
    }

    //forme: [[ameliorationID, ameliorationName, imageSRC, customIDText (for special css)],[same, same,same]]
    pause(){
        console.log("jeu en pause !");
        this.isRunning = false;
    }
    resume(){
        this.isRunning = true;
    }

    getIfisRunning(){
        return this.isRunning;
    }

    getUpgrade(){
        return this.upgrade;
    }

    setUpgrade(upgrade){
        this.upgrade = upgrade;
    }

    getCoin(){
        return this.nbBitcoin;
    }

    setCoin(coin){
        this.nbBitcoin = coin;
    }

    addCoin(coin){
        this.nbBitcoin += coin;
    }

    getClickPower(){
        return this.clickPower;
    }
    setClickPower(clickpower){
        this.clickPower += clickpower;
    }

    getBonusNext(){
        return this.bonusNextAscend;
    }

    setBonusNext(bonusNextAscend){
        this.bonusNextAscend = bonusNextAscend;
    }

    getBonus(){
        if(this.actualBonus){
            return this.actualBonus;
        }else{
            return 1;
        }
    }

    setBonus(actualBonus){
        this.actualBonus = actualBonus;
    }

}


class Upgrade{
    constructor(game, divID, name, prix, multiplicateurClick, coinPerSeconds){
        Upgrade.allInstances.push(this);

        this.divID = divID;
        this.game = game;
        this.div = document.getElementById(divID);

        this.text = this.div.getElementsByTagName('p')[0];
        this.buttonBuy = this.div.getElementsByClassName('buyButton')[0];
        this.buttonSell = this.div.getElementsByClassName('sellButton')[0];
        this.addListener();


        this.name = name;
        this.prix = prix;
        this.multiplicateurClick = multiplicateurClick;
        this.coinPerSeconds = coinPerSeconds;

        this.numberOfUpgrade = 0;
        this.rewriteUpgrade();
        this.interval();
    }

    sayHello(){
        console.log(this.name + "vous salut!");
    }
    addListener(){
        this.buttonBuy.addEventListener("click", () => {this.addUpgrade(1)})
        this.buttonSell.addEventListener("click", () => {this.removeUpgrade(1)})
    }

    addUpgrade(nb){
        if(this.game.getIfisRunning()){
        if(this.game.getCoin() >= this.prix){
            this.game.addCoin(-this.prix);
            this.game.updateNbOfCoin();
            this.game.setClickPower((this.multiplicateurClick-1))
            this.numberOfUpgrade += nb;
            this.rewriteUpgrade();
        }else{
            let alert = new Alert(this.game, "main", "Action Impossible", "Vous n'avez pas assez d'argent. Il vous faut " + this.prix + " DOGE", "Ok...",30,20,1.5,2)
            alert.addConfirmButton();
            alert.afficherPopUp();
        }

        }
    }
    removeUpgrade(nb){
        if(this.game.getIfisRunning()){
        if(this.numberOfUpgrade>0){
            this.game.addCoin(this.prix/2);
            this.game.updateNbOfCoin();
            this.game.setClickPower(1-this.multiplicateurClick)
            this.numberOfUpgrade -= nb;
            this.rewriteUpgrade();
        }else{
            let alert = new Alert(this.game,"main","Action Impossible","Vous ne pouvez pas faire ça...","Ok...",30,20,1,1.5)
            alert.addConfirmButton();
            alert.afficherPopUp();
        }
    }
    }

    rewriteUpgrade(){
        let upgrade = this.game.getUpgrade();
        upgrade['name'] = this.numberOfUpgrade;
        this.text.innerHTML = this.name + ': ' + this.numberOfUpgrade;
    }

    getNumberOfUpgrade(){
        return this.numberOfUpgrade;
    }
    setNbUpgrade(nb){
        console.log("on change le nombre d'upgrade de " + this.name + " pour " + nb);
        this.numberOfUpgrade = nb;
    }

    getName(){
        return this.name;
    }

    async interval(){
        setInterval(() => {
            this.game.addCoin((this.coinPerSeconds/5) * this.numberOfUpgrade * this.game.getBonus())
            this.game.updateNbOfCoin();

            this.game.setBonusNext(Math.sqrt(this.game.getCoin()/100000));

            this.game.updateAscendBonus();
        },200);
    }
    
}
async function refreshText(object){
    setInterval(() => {
        object.updateNbOfCoin();
        object.updateAscendBonus();
    },100)
}


export{Game,Upgrade,refreshText}