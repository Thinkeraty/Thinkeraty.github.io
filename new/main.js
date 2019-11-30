//Code By Samyak Jain
//Thinkeraty Labs License 2019
//Published By Thinkeraty Labs
//Terms and Conditions Apply

const TypeWriter = function(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
}

//Type Method
TypeWriter.prototype.type = function() {
    //Current index of words
    const current = this.wordIndex % this.words.length;
    //Get full text of current words
    const fullTxt = this.words[current];

    //Check if deleting
    if(this.isDeleting) {
        //Remove char
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        //Add char
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    //  insterting text
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`

    //Initial Type Speed
    let typeSpeed = 300;

    if(this.isDeleting) {
        typeSpeed /= 2;
    }

    //If the word is complete
    if(!TouchList.isDeleting && this.txt === fullTxt) {
        //pause at the end
        typeSpeed = this.wait; 
        //Set deleting to true
        this.isDeleting = true;
    } else if(this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        //To the next word
        this.wordIndex++;
        //Pause before typing
        typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
}
//Init on DOM load
document.addEventListener('DOMContentLoaded', init);

//init
function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    //init typewriter
    new TypeWriter(txtElement, words, wait);
}