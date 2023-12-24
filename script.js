document.addEventListener('DOMContentLoaded', function() {
    const bmiForm = document.getElementById('bmiForm');
    const calculateButton = document.querySelector('button[type="submit"]');
    const resultDiv = document.getElementById('result');
    const weightInput = document.getElementById('weight');
    const heightInput = document.getElementById('height');
    let originalButtonText = calculateButton.innerText;

    weightInput.focus();

    heightInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            calculateBMI();
            heightInput.blur();
        }
    });

    bmiForm.addEventListener('submit', function(event) {
        event.preventDefault();
        calculateBMI();
    });

    function calculateBMI() {
        let weightInputValue = weightInput.value.trim();
        let heightInputValue = heightInput.value.trim();
        let weight = parseFloat(weightInputValue.replace(',', '.'));
        let height = parseFloat(heightInputValue.replace(',', '.')) / 100;

        if (isNaN(weight) || isNaN(height) || weight < 20 || weight > 500 || height <= 0 || height > 2.5) {
            weightInput.value = '';
            heightInput.value = '';
            resultDiv.innerHTML = '';
            calculateButton.innerText = originalButtonText;
            weightInput.focus();
            return;
        }

        let bmi = weight / (height * height);
        resultDiv.innerHTML = "Formula: BMI = weight (kg) / height (m)²<br>" +
            "Calculation: BMI = " + weight + " / " + (height * height).toFixed(2) + "<br>" +
            "Your BMI: " + bmi.toFixed(2) + "<br>" +
            "You have: " + describeBMI(bmi);

        bmiForm.reset();

        if (calculateButton.innerText === "Clear Result") {
            calculateButton.innerText = originalButtonText;
        } else {
            originalButtonText = calculateButton.innerText;
            calculateButton.innerText = "Clear Result";
        }
    }

    function describeBMI(bmi) {
        if (bmi < 18.5) {
            return 'underweight';
        } else if (bmi >= 18.5 && bmi <= 24.99) {
            return 'normal weight';
        } else if (bmi >= 25.0 && bmi <= 29.9) {
            return 'overweight';
        } else if (bmi >= 30.0 && bmi <= 34.99) {
            return 'obesity class I';
        } else if (bmi >= 35.0 && bmi <= 39.99) {
            return 'obesity class II';
        } else {
            return 'obesity class III';
        }
    }
});

