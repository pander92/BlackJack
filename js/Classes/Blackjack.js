class Blackjack {
    constructor(elem) {
        this.app = document.getElementById(elem);
        
        let values = ["Ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King"];
        let suits = ["Clubs", "Diamonds", "Hearts", "Spades"];
        this.deck = [];
        
        for(let i = 0; i < values.length; i++) {
            for(let j = 0; j < suits.length; j++){
                
                let numVal = 0
                if(values[i] == "Ace"){
                    numVal = 11
                } else if(typeof(values[i]) == "string"){
                    numVal = 10
                } else {
                    numVal = values[i]
                }
                let card = {
                    value: values[i],
                    fileName: values[i] + "-of-" + suits[j] +".png",
                    numValue: numVal
                } //end card object
                this.deck.push(card);
            }//suits loop
        }//values loop
        
        //make a 6 deck show for gameplay
        this.shoe = [...this.deck, ...this.deck, ...this.deck, ...this.deck, ...this.deck, ...this.deck];
        
        
        
        //RANDOMIZATION
        //this code works, but hard to understand. the expanded version below with a similar functionality.
//        this.shoe.sort((a, b) =>{
//            return 0.5 - Math.random()
//        });
        for(let i=0; i <this.shoe.length; i++){
            let tempItem = this.shoe[i]
            let randomItem = Math.floor(Math.random()*this.shoe.length)
            this.shoe[i] = this.shoe[randomItem]
            this.shoe[randomItem] = tempItem
            }
        
        //TEST: display only the filenames, then only the filenames of hearts cards
        //this.app.innerHTML = this.shoe.map((e) => e.fileName).filter((e) => e.endsWith("Hearts.png"));
        
        //Make the DOM elements
        //start with header
        this.header = document.createElement('header')
        document.body.insertBefore(this.header, document.body.firstChild)
        
        //Deal button
        this.btnDeal = document.createElement('button')
        this.btnDeal.innerHTML = "DEAL"
        this.btnDeal.addEventListener('click', this.deal.bind(this))
        this.header.appendChild(this.btnDeal)
        
        //Hit button
        this.btnHit = document.createElement('button')
        this.btnHit.innerHTML = "HIT"
        this.btnHit.addEventListener('click', this.hit.bind(this))
        this.header.appendChild(this.btnHit)
        
        //Stand button
        this.btnStand = document.createElement('button')
        this.btnStand.innerHTML = "STAND"
        this.btnStand.addEventListener('click', this.stand.bind(this))
        this.header.appendChild(this.btnStand)
        
        //Add divs for score, message, money, etc.
        this.messageBox = document.createElement('div')
        this.messageBox.innerHTML = "CLICK DEAL TO BEGIN"
        this.messageBox.className= "scoreBox"
        this.messageBox.style.cssText = "width:200px; background-color:transparent; color:white; border:0; font-size:1.3rem;"
        this.header.appendChild(this.messageBox)
        
        //Dealer score
        this.dealerScoreBox = document.createElement('div')
        this.dealerScoreBox.innerHTML = 'Dealer: '
        this.header.appendChild(this.dealerScoreBox)
        
        //player score
        this.playerScoreBox = document.createElement('div')
        this.playerScoreBox.innerHTML = "Player: "
        this.header.appendChild(this.playerScoreBox)
        
        //money for bets
        this.myMoney = 500;
        this.moneyBox = document.createElement('div')
        this.moneyBox.innerHTML = "$" + this.myMoney;
        this.header.appendChild(this.moneyBox)
        
        //dealers cards
        this.dealerCardBox = document.createElement('div')
        this.app.appendChild(this.dealerCardBox)
        
        //players cards
        this.playerCardBox = document.createElement('div')
        this.app.appendChild(this.playerCardBox)
        
        this.playerScore = 0;
        this.dealerScore = 0;
        this.player = [];
        this.dealer = [];
        this.playerAce11 = 0;
        this.dealerAce11 = 0;
        this.soft17 = false;
        
    } //close constructor()
    
    deal() {
        //reset the card box and scores
        this.btnHit.disabled = false;
        this.btnStand.disabled = false;
        this.playerScore = 0;
        this.dealerScore = 0;
        this.playerCardBox.innerHTML = "";
        this.dealerCardBox.innerHTML = "";
        this.playerScoreBox.innerHTML = "Player: " + this.playerScore;
        this.dealerScoreBox.innerHTML = "Dealer: " ;
        this.messageBox.innerHTML = "Good Luck!"
        
        //Deal player card 1
        setTimeout(() => {
            this.player[0] = this.shoe.pop()
            let cardPic = new Image(100, 200);
            cardPic.src = "images/cards350px/" + this.player[0].fileName;
            this.playerCardBox.appendChild(cardPic);
            this.playerScore += this.player[0].numValue;
            this.playerScoreBox.innerHTML = "Player: " + this.playerScore;
            if(this.player[0].value == "Ace"){
               this.playerAce11 += 1;
               }
        }, 1000);
        
        //deal dealer card 1
        setTimeout(() => {
            this.dealer[0] = this.shoe.pop()
            let cardPic = new Image(100, 200);
            cardPic.src = "images/cards350px/" + this.dealer[0].fileName;
            this.dealerCardBox.appendChild(cardPic);
            this.dealerScore += this.dealer[0].numValue;
            this.dealerScoreBox.innerHTML = "Dealer: " + this.dealer[0].value;
            if(this.dealer[0].value == "Ace"){
               this.dealerAce11 += 1;
               }
        }, 2000);
        
        //deal player card 2
        setTimeout(() => {
            this.player[1] = this.shoe.pop()
            let cardPic = new Image(100, 200);
            cardPic.src = "images/cards350px/" + this.player[1].fileName;
            this.playerCardBox.appendChild(cardPic);
            this.playerScore += this.player[1].numValue;
            this.playerScoreBox.innerHTML = "Player: " + this.playerScore;
            if(this.player[1].value == "Ace"){
               this.playerAce11 += 1;
               }
        }, 3000);
        
        //deal dealer card 2 (face down)
        setTimeout(() => {
            this.dealer[1] = this.shoe.pop()
            let cardPic = new Image(100, 200);
            cardPic.src = "images/cards350px/0-Back-of-Card-Red.png";
            cardPic.id = "faceDown";
            this.dealerCardBox.appendChild(cardPic);
            this.dealerScore += this.dealer[1].numValue;
            this.dealerScoreBox.innerHTML +=  " + ?";
            if(this.dealer[1].value == "Ace"){
               this.dealerAce11 += 1;
               }
        }, 4000);
        
        setTimeout(()=>{
        if(this.playerScore == 22){
            this.playerScore -= 10;
            this.playerAce11 -= 1;
        } 
        if(this.dealerScore == 22){
            this.dealerScore -= 10;
            this.dealerAce11 -= 1;
        }
            
        if(this.playerScore == 21 && this.dealerScore == 21){
            this.messageBox.innerHTML = "It's a tie!"
            //turn over dealer's second card for proof
            document.getElementById("faceDown").src = "images/cards350px/" + this.dealer[1].fileName
            
        } else if(this.playerScore == 21){
            this.messageBox.innerHTML = "Congratulations, you win!";
            //take winnings
            this.myMoney += 15;
            this.moneyBox.innerHTML = "$" + this.myMoney;
            
            //if the dealer has a face card or 10, turn over his other card to prove he did not win
            if(this.dealer[0].numValue >= 10){
            document.getElementById("faceDown").src = "images/cards350px/" + this.dealer[1].fileName
            }
            
        } else if(this.dealerScore == 21){
            this.messageBox.innerHTML = "Dealer has Blackjack!";
            
            //dealer takes bet money
            this.myMoney -= 10;
            this.moneyBox.innerHTML = "$" + this.myMoney;
            
            //turn over dealers second card for proof of win
            document.getElementById("faceDown").src = "images/cards350px/" + this.dealer[1].fileName
            
        } else {
            this.messageBox.innerHTML = "Select Hit or Stand to continue"
        }
        
    }, 4500) //end if else to determine preliminary outcome
    }// End Deal function
    
    hit(){
        let hitCard = this.shoe.pop()
        let cardPic = new Image(100,200);
        cardPic.src = "images/cards350px/" + hitCard.fileName;
        this.playerCardBox.appendChild(cardPic);
        this.playerScore += hitCard.numValue;
        this.playerScoreBox.innerHTML = "Player: " + this.playerScore;
        if(hitCard.value == "Ace"){
            this.playerAce11 += 1;
        }
        
        if(this.playerScore > 21){
                if(this.playerAce11 > 0){
                    this.playerAce11 -= 1;
                    this.playerScore -= 10;
                    this.playerScoreBox.innerHTML = "Player: " + this.playerScore;
                } else {
                    this.messageBox.innerHTML = "Busted! Dealer wins!"
                    this.btnHit.disabled = true;
                    this.btnStand.disabled = true;
                    this.myMoney -= 10;
                    this.moneyBox.innerHTML = "$" + this.myMoney;
                }
        } else if(this.playerScore == 21){
            this.messageBox.innerHTML = "Congratulations, you win!";
            this.btnHit.disabled = true;
            this.btnStand.disabled = true;
            //take winnings
            this.myMoney += 15;
            this.moneyBox.innerHTML = "$" + this.myMoney;
        }
    }
    
    stand(){
        setTimeout(() =>{
        this.btnHit.disabled = true;
        this.btnStand.disabled = true;
        document.getElementById("faceDown").src = "images/cards350px/" + this.dealer[1].fileName;
        this.dealerScoreBox.innerHTML = "Dealer: " + this.dealerScore;
        
        if(this.dealerScore <= 16 || (this.dealerAce11 > 0 && this.dealerScore == 17)){
            
            let hitCard = this.shoe.pop();
            
            if(hitCard.value == "Ace"){
            this.dealerAce11 += 1;
        }
            let cardPic = new Image(100, 200);
            cardPic.src = "images/cards350px/" + hitCard.fileName;
            this.dealerCardBox.appendChild(cardPic);
            this.dealerScore += hitCard.numValue;
            
            if(this.dealerScore > 21){
                if(this.dealerAce11 > 0){
                    this.dealerAce11 -= 1;
                    this.dealerScore -= 10;
                } else {
                    this.messageBox.innerHTML = "Dealer Busted! You win!"
                    
                    this.myMoney += 15;
                    this.moneyBox.innerHTML = "$" + this.myMoney;
                    return;
                }
            }
            
            this.dealerScoreBox.innerHTML = "Dealer: " + this.dealerScore;
            this.stand();

        } else {
            //compare scores
            if(this.dealerScore > this.playerScore){
                 this.messageBox.innerHTML = "Dealer wins! Press Deal to play again."
                    
                    this.myMoney -= 10;
                    this.moneyBox.innerHTML = "$" + this.myMoney;
            } else if(this.playerScore > this.dealerScore){
                 this.messageBox.innerHTML = "You win! Press Deal to play again."
                    
                    this.myMoney += 15;
                    this.moneyBox.innerHTML = "$" + this.myMoney;
            } else if(this.playerScore == this.dealerScore){
                this.messageBox.innerHTML = "Push"
            }
        }
    }, 1500)
}
}//close class

