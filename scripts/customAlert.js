class Alert{
    constructor(game, mainContainerID, AlertTitle,text,acceptText,height,width, size, divFactor, cancelText){
        this.AlertTitle = AlertTitle;
        this.text = text;
        this.game = game;
        this.acceptText = acceptText;
        this.size = size;
        this.divFactor = divFactor;
        this.cancelText = cancelText;

        this.mainContainer = document.getElementById(mainContainerID);



        this.popUp = document.createElement('div');
        this.popUp.className = 'CustomAlert';
        this.popUp.style.height = height+'%'
        this.popUp.style.width = width+'%'
        this.popUp.style.zIndex = 1000;
        document.body.appendChild(this.popUp);

        this.popUp.style.visibility = 'hidden';
        this.popUp.innerHTML += '<h2>'+this.AlertTitle+'</h2>'

        
        this.divLine = document.createElement('div');
        this.divLine.className = 'CustomAlertLine'
        this.divLine.id = 'mainLine';
        this.divLine.style.top = 15*divFactor+'%';

        this.popUp.appendChild(this.divLine)



        this.popUp.innerHTML += '<canvas id="canvas_line"></canvas>'
        this.popUp.innerHTML += '<br><p>'+this.text+'</p>'

        this.popUp.getElementsByTagName('h2')[0].style.fontSize = this.size +'vw'
        console.log("new size: " + (this.size / 2));
        this.popUp.getElementsByTagName('p')[0].style.fontSize = (this.size /2)+'vw'


    }

    addConfirmButton(leftP, callback){
        let left;
        if(!leftP){ left = 50} 
        else{ left = leftP}
        this.callback = callback;
        console.log("LEFT: " + left);
        this.buttonAccept = document.createElement('BUTTON');
        this.buttonAccept.className = 'alertButton';
        this.buttonAccept.innerHTML = this.acceptText;
        this.popUp.appendChild(this.buttonAccept)
        this.popUp.getElementsByTagName('button')[0].style.fontSize = (this.size /2)+'vw'
        this.popUp.getElementsByTagName('button')[0].style.left = left+'%'
        this.buttonAccept.addEventListener("click", () => {this.retirerPopUp()})
    }

    addCancelButton(rightP){
        let right;
        if(!rightP){right = 50} 
        else{ right = rightP}
        console.log("RIGHT: " + right);
        this.buttonCancel = document.createElement('BUTTON');
        this.buttonCancel.className = 'alertButtonCancel';
        this.buttonCancel.innerHTML = this.cancelText;
        this.popUp.appendChild(this.buttonCancel)
        this.popUp.getElementsByTagName('button')[1].style.fontSize = (this.size /2)+'vw'
        this.popUp.getElementsByTagName('button')[1].style.left = right+'%'
        this.buttonCancel.addEventListener("click", () => {this.cancel()})
    }


    sayHello(){
        console.log("hello !");
    }

    afficherPopUp(){
            if(this.game){
                this.game.pause();
            }
            this.mainContainer.style.opacity = 0.5;
            this.popUp.style.opacity = 1;
            this.popUp.style.visibility = 'visible';
    }

    retirerPopUp(){
        if(this.game){
            this.game.resume()
        }

        this.buttonAccept.style.transitionDuration = 0+'ms';
        this.buttonAccept.style.visibility = 'hidden';

        if(this.buttonCancel){
            this.buttonCancel.style.transitionDuration = 0+'ms';
            this.buttonCancel.style.visibility = 'hidden';
        }

        this.popUp.style.visibility = 'hidden';
        this.mainContainer.style.opacity = 1;

        if(this.callback){
            this.callback();
        }
    }

    cancel(){
        console.log("ANNULATION");
        if(this.game){
            this.game.resume()
        }
        this.buttonAccept.style.transitionDuration = 0+'ms';
        this.buttonAccept.style.visibility = 'hidden';
        if(this.buttonCancel){
            this.buttonCancel.style.transitionDuration = 0+'ms';
            this.buttonCancel.style.visibility = 'hidden';
        }
        this.popUp.style.visibility = 'hidden';
        this.mainContainer.style.opacity = 1;
    }
}



export{Alert}