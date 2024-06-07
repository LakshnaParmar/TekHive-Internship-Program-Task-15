document.getElementById('loan-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // UI elements
    const amount = document.getElementById('amount').value;
    const interest = document.getElementById('interest').value;
    const years = document.getElementById('years').value;
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    // Calculations
    const principal = parseFloat(amount);
    const calculatedInterest = parseFloat(interest) / 100 / 12;
    const calculatedPayments = parseFloat(years) * 12;

    // Compute monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
        monthlyPayment.innerHTML = `Monthly Payment: $${monthly.toFixed(2)}`;
        totalPayment.innerHTML = `Total Payment: $${(monthly * calculatedPayments).toFixed(2)}`;
        totalInterest.innerHTML = `Total Interest: $${((monthly * calculatedPayments) - principal).toFixed(2)}`;
    } else {
        showError('Please check your numbers');
    }
});

function showError(error) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    errorDiv.appendChild(document.createTextNode(error));

    const calculator = document.querySelector('.calculator');
    const form = document.getElementById('loan-form');

    calculator.insertBefore(errorDiv, form);

    setTimeout(clearError, 3000);
}

function clearError() {
    document.querySelector('.error').remove();
}
