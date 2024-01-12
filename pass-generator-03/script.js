const lengthSlider = document.querySelector(".pass-length input");
const options = document.querySelectorAll(".option input");
const copyIcon = document.querySelector(".input-box span");
const passWordInput = document.querySelector(".input-box input");
const passIndicator = document.querySelector(".pass-indicator");
const generateBtn = document.querySelector(".generate-btn");

const characteres = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!@#$%&*(){}[],.;:<>~^`+-",
};

const generatePassword = () => {
    
    let staticPassWord = "",
        randomPassWord = "",
        excludeDuplicate = false,
        passLength = lengthSlider.value;

    options.forEach( option => {
        if (option.checked) {
            if (option.id !== "exc-duplicate" && option.id !== "spaces") {
                staticPassWord = staticPassWord + characteres[option.id];
            }
            else if (option.id === "spaces" ) {
                staticPassWord = staticPassWord + `  ${staticPassWord}  `;
            }
            else {
                excludeDuplicate = true;
            }
        }
    });

    for (let i = 0; i < passLength; i++) {
        
        let randomChar = staticPassWord[Math.floor(Math.random() * staticPassWord.length )];
        
        if (excludeDuplicate) {
            !randomPassWord.includes(randomChar) || randomChar == " " ? randomPassWord = randomPassWord + randomChar : i--;
        }
        else {
            randomPassWord = randomPassWord + randomChar;
        }
    }

    passWordInput.value = randomPassWord;

}

const updatePassIndicator = () => {
    passIndicator.id = lengthSlider.value <= 8 ? "weak" : lengthSlider.value <= 16 ? "medium" : "strong";
}

const updateSlider = () => {
    document.querySelector(".pass-length span").innerText = lengthSlider.value;
    generatePassword();
    updatePassIndicator();
}

const copyPassword = () => {
    navigator.clipboard.writeText(passWordInput.value);
    copyIcon.innerText = "check";
    copyIcon.style.color = "#4285f4";

    setTimeout( () => {
        copyIcon.innerText = "copy_all";
        copyIcon.style.color = "#707070";
    }, 1500);
}

copyIcon.addEventListener("click", copyPassword);
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);
