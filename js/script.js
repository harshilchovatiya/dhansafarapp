// Function to toggle the display of the popup form
function togglePopup() {
    var popup = document.getElementById("popupFormOverlay");
    popup.style.display = "block";
    document.body.style.overflow = "hidden";
}

// Function to close the popup form
function closePopup() {
    var popup = document.getElementById("popupFormOverlay");
    popup.style.display = "none";
    document.body.style.overflow = "auto";
}

// Event listener to open the popup form when the download button is clicked
document.getElementById("downloadButton").addEventListener("click", function (event) {
    event.preventDefault();
    togglePopup();
});

// Event listener to close the popup form when the close button is clicked
document.getElementById("closeButton").addEventListener("click", function (event) {
    event.preventDefault();
    closePopup();
});

function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-group error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Show success outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-group success';
}


// Function to validate the form fields
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(
            input,
            `${getFieldName(input)} must be at least ${min} characters`
        );
    } else if (input.value.length > max) {
        showError(
            input,
            `${getFieldName(input)} must be less than ${max} characters`
        );
    } else {
        showSuccess(input);
    }
}
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
function checkRequired(inputArr) {
    let isRequired = false;
    inputArr.forEach(function (input) {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
            isRequired = true;
        } else {
            showSuccess(input);
        }
    });

    return isRequired;
}

function downloadApk() {
    var apkFilePath = 'https://harshilchovatiya.github.io/dhansafarapp/apk/dhansafar.apk';
    fetch(apkFilePath)
        .then(response => response.blob())
        .then(blob => {
            var apkUrl = URL.createObjectURL(blob);
            var anchor = document.createElement('a');
            anchor.href = apkUrl;
            anchor.download = 'DhanSafar.apk';
            document.body.appendChild(anchor);
            anchor.click();
            document.body.removeChild(anchor);
        })
        .catch(error => {
            console.error('Error fetching APK file:', error);
        });
}

// Event listener to validate the form when submitted
document.getElementById("downloadForm").addEventListener("submit", function (event) {
    event.preventDefault();

    var name = document.getElementById("name");
    var phoneNumber = document.getElementById("phoneNumber");
    var businessName = document.getElementById("businessName");
    if (!checkRequired([name, phoneNumber, businessName])) {
        checkLength(name, 2, 15);
        checkLength(phoneNumber, 10, 10);

        if (!document.querySelectorAll('.error').length) {
            submitForm(name.value, phoneNumber.value, businessName.value);
            document.getElementById("downloadForm").reset();
            closePopup();
            downloadApk();
        }
    }
});

function submitForm(name, phoneNumber, businessName) {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();
    const formData = `Type:Download Inquiry\nDate and Time: ${formattedDate}\nName: ${name}\nPhone Number: ${phoneNumber}\nBusiness Name: ${businessName}`;
    telegramMessage(formData);
}


// SUBSCRIPTION PLANS
function toggleSubscriptionPopup() {
    var popup = document.getElementById("subscriptionFormOverlay");
    popup.style.display = "block";
}

// Function to close the popup form
function closeSubscriptionPopup() {
    var popup = document.getElementById("subscriptionFormOverlay");
    popup.style.display = "none";
    document.getElementById("subscriptionForm").reset();
}

// Event listener to open the popup form when the "Select plan" button is clicked
document.querySelectorAll(".select-plan").forEach(button => {
    button.addEventListener("click", function (event) {
        event.preventDefault();
        var selectedPlan = this.getAttribute("data-plan");
        document.getElementById("selectedPlan").value = selectedPlan;
        toggleSubscriptionPopup();
    });
});

// Event listener to close the popup form when the "Close" button is clicked
document.getElementById("closeSubscriptionButton").addEventListener("click", function (event) {
    event.preventDefault();
    closeSubscriptionPopup();
});

// Event listener to handle form submission
document.getElementById("subscriptionForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();

    // Get form data
    const name = document.getElementById("sub-name");
    const phoneNumber = document.getElementById("sub-phoneNumber");
    const businessName = document.getElementById("sub-businessName");
    const selectedPlan = document.getElementById("selectedPlan").value;

    if (!checkRequired([name, phoneNumber, businessName])) {
        checkLength(name, 2, 15);
        checkLength(phoneNumber, 10, 10);
        if (!document.querySelectorAll('.error').length) {
            const formData = `Type: Subscription Inquiry\nDate and Time: ${formattedDate}\nName: ${name.value}\nPhone Number: ${phoneNumber.value}\nBusiness Name: ${businessName.value}\nSelected Plan: ${selectedPlan}`;
            console.log(formData);
            telegramMessage(formData);
            closeSubscriptionPopup();
        }
    }
});

// CONTACT FORM

document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Get form values
    var name = document.getElementById("con-name").value;
    var email = document.getElementById("con-email").value;
    var phone = document.getElementById("con-phone").value;
    var message = document.getElementById("con-message").value;

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();
    const formData = `Type: Contact Form Submission\nDate and Time: ${formattedDate}\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`;

    telegramMessage(formData);


    document.getElementById("contactForm").reset();


});



// SUBMIT DATA

function telegramMessage(formData) {
    const botToken = '7175435528:AAHxcKfpqSFM9ChSpfHAMpoa8gnUdhTsPkw';
    const channelID = '-1002016218483';

    fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${channelID}&text=${encodeURIComponent(formData)}`, {
        method: 'GET',
    })
        .then(response => {
            if (!response.ok) {
                console.error('Error sending message to Telegram:', response.statusText);
                alert('Error sending message. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error sending message to Telegram:', error);
            alert('Error sending message. Please try again.');
        });
}

