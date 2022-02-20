// select all the inputs
const inputs = document.querySelectorAll('input[type="text"],' +
    'input[type="email"], input[type="password"]');
// console.log(inputs);
const progressBar = document.getElementById("progress-bar");
const form = document.querySelector("form");
let pseudo, email, password, passwordConfirm;

// display function
const errorDisplay = (tag, message, valid) => {
    const container = document.querySelector("." + tag + "-container");
    const span = document.querySelector("." + tag + "-container > span");

    if (!valid) {
        container.classList.add("error");
        span.textContent = message;
    } else {
        container.classList.remove("error");
        span.textContent = "";
    }
};

// inputs functions

const pseudoChecker = (value) => {
    progressBar.classList = "";

    if (value.length > 0 && (value.length < 3 || value.length > 20)) {
        errorDisplay("pseudo", "The pseudo must be between 3 and 20 characters");
        pseudo = null;
    } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
        errorDisplay("pseudo", "The pseudo mustn't contain any special characters");
        pseudo = null;
    } else {
        errorDisplay("pseudo", "", true);
        pseudo = value;
    }
};

const emailChecker = (value) => {
    if (!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
        errorDisplay("email", "Invalid email");
        email = null;
    } else {
        errorDisplay("email", "", true);
        email = value;
    }
};

const passwordChecker = (value) => {
    if (!value.match(/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/)) {
        errorDisplay("password", "Minimum 8 characters, one capital letter," +
            "one number and one special character");
        progressBar.classList.add("progressBarRed");
        password = null;
    } else if (value.length < 12) {
        errorDisplay("password", "", true);
        progressBar.classList.add("progressBarBlue");
        password = value;
    } else {
        errorDisplay("password", "", true);
        progressBar.classList.add("progressBarGreen");
        password = value;
    }
    if (value.length < 1) {
        errorDisplay("password", "");
        progressBar.classList = "";
        password = null;
    }
    if (passwordConfirm)  passwordConfirmChecker(passwordConfirm)
};

const passwordConfirmChecker = (value) => {
    if (value !== password) {
        // console.log("test");
        errorDisplay("password-confirm", "The passwords do not match");
        passwordConfirm = false;
    } else {
        errorDisplay("password-confirm", "", true);
        passwordConfirm = true;
    }
};

// eventlistener on all the inputs
inputs.forEach((input) => {
    input.addEventListener("input", (e) => {
        switch (e.target.id) {
            case "pseudo":
                pseudoChecker(e.target.value);
                break;
            case "email":
                emailChecker(e.target.value);
                break;
            case "password":
                passwordChecker(e.target.value);
                break;
            case "passwordConfirm":
                passwordConfirmChecker(e.target.value);
                break;
            default:
                null;
        }
    });
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (pseudo && email && password && passwordConfirm) {
        const data = {
            pseudo,
            email,
            password,
        };
        console.log(data);
        form.reset();
        progressBar.classList = "";
        alert("You are now registred");
    } else {
        alert("Please fill in all the fields as it should");
    }
});

