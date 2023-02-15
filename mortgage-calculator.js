function calculatMortgagePayment(homeValue, interestRate, loanDuration, additionalPayment){
    //Interest rate conversion to decimal
    interestRate = interestRate / 100 / 12;

    //Payment duration conversion to months
    loanDuration = loanDuration * 12;

    //Monthly Payment Calculation
    var x = Math.pow(1 + interestRate, loanDuration);
    var monthlyPayment = homeValue * interestRate * x / (x - 1);
    //Addition Payment inclusion
    monthlyPayment += additionalPayment;
    return monthlyPayment;
}

function calculateMortgage() {
    // Read user input
    var clientName = document.getElementById("clientName").value;
    var homePrice = document.getElementById("homeValue").value;
    var downPayment = document.getElementById("downPayment").value;
    var interestRate = document.getElementById("interestRate").value;
    var loanDuration = document.getElementById("loanDuration").value;
    var additionalPayment = document.getElementById("additionalPayment").value;

    // Calculate principal
    var loanAmount = homePrice - downPayment;

    // Calculate monthly payment
    var monthlyPayment = calculatMortgagePayment(loanAmount, interestRate, loanDuration, additionalPayment);

    // Display result table
    var result = "<table><tr><th>Month</th><th>Payment</th><th>Interest</th><th>Principal</th><th>Balance</th></tr>";
    var balance = loanAmount;
    var paymentTotal = 0;
    var interestTotal = 0;
    var principalTotal = 0;
    for (var i = 1; i <= loanDuration * 12; i++) {
        var interest = balance * (interestRate/100) / 12;
        var principalPaid = monthlyPayment - interest;
        balance -= principalPaid;
        paymentTotal += monthlyPayment;
        interestTotal += interest;
        principalTotal += principalPaid;
        result += "<tr><td>" + i + "</td><td>$" + Number(monthlyPayment).toFixed(2) + "</td><td>$" + interest.toFixed(2) + "</td><td>$" + principalPaid.toFixed(2) + "</td><td>$" + balance.toFixed(2) + "</td></tr>";
    }
    result += "</table>";
    document.getElementById("monthlyPay").innerHTML = "$" + Number(monthlyPayment).toFixed(2);
    document.getElementById("result").innerHTML = result;
    displayGraph(interestTotal, principalTotal, clientName);
 }
 
 function clearForm() {
    document.getElementById("myForm").reset();
    document.getElementById("result").innerHTML = "";
}

function clearPieChart() {
    var canvas = document.getElementById("myChart");
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
}

 function displayGraph(interestTotal, principalTotal, clientName) {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ["Interest", "Principal"],
        datasets: [
        {
          data: [interestTotal.toFixed(2), principalTotal.toFixed(2)],
          backgroundColor: ["#1e7145", "#ffb331b2"],
          hoverBackgroundColor: ["#f10101", "#b6fe31b2"],
        }
      ]
      },
      options: {
        title: {
            responsive: true,
            display: true,
            text: `Hello ${clientName}, Here is a pie chart of your Payment Breakdown`,
            fontColor: "rgb(218, 218, 218)",
            fontSize: "18"
        }
    }
    });
  }
