//var filePath = "./logFile.txt";
//var fs = require('fs');

function	Atm(){
	this.twoK = 0;
	this.fiveHundred = 0;
	this.oneHundred = 0;
	this.currentAmount = 0;

	this.add = function(transaction)
	{
		if(transaction.twoK > 0)
		this.twoK = this.twoK + transaction.twoK;
		if(transaction.fiveHundred > 0)
		this.fiveHundred = this.fiveHundred + transaction.fiveHundred;
		if(transaction.oneHundred > 0)
		this.oneHundred = this.oneHundred + transaction.oneHundred;

	}

	var i = 1;
	this.updates = function(){
		var ww=document.getElementById("usr").value;
		var ss=("<tr bgcolor='red' style='color: white'><td>"+ (i+1) +"</td><td>" + ww +"</td><td>"+ this.twoK+"</td><td>"+
		this.fiveHundred+"</td><td>"+ this.oneHundred+"</td><td>"+ this.currentAmount+"</td></tr>");

		$('#tab_logic').append(ss);
		i++;
	}

	this.disp = function(){
		this.currentAmount = this.twoK*(2000)+this.fiveHundred*(500)+this.oneHundred*(100);
		document.getElementById("curAmt").innerHTML="₹"+this.currentAmount;
	}

	this.withdraw = function(withdrawAmount)
	{
		var withdrawAmount2 = withdrawAmount;
		var count = [this.twoK, this.fiveHundred,this.oneHundred];
		var denomination = [2000,500,100];
		if(withdrawAmount == 0 || withdrawAmount % 100 != 0)
		{
			document.getElementById("msg").innerHTML="Please enter the amount which is multiple of 100";
			$("#msg").css("background-color","red");

			return;
		}

		if(this.currentAmount <= withdrawAmount)    //cahnged
		{
			document.getElementById("msg").innerHTML="ATM doesn't enough money";
			$("#msg").css("background-color","red");

			return;
		}

		for (var i = 0; i < 3; i++)
		{
			console.log(withdrawAmount);
			if (denomination[i] <= withdrawAmount)
			{
				var noteCount = parseInt(withdrawAmount /denomination[i] );
				//console.log(noteCount)
				console.log("note count ",noteCount);
				if(count[i] > 0)
				{
					if(noteCount <= count[i])
					{
						withdrawAmount -= noteCount * denomination[i];
						count[i] =  count[i] - noteCount;
					}
				}
			}
		}
		if(withdrawAmount != 0)
		{
			// alert("Error");
			document.getElementById("msg").innerHTML="the amount you entered isn't availabe in currency"
			$("#msg").css("background-color","red");

		}
		else
		{
			this.currentAmount -= withdrawAmount2;
			this.twoK = count[0];
			this.fiveHundred = count[1];
			this.oneHundred = count[2];
			atmObj.updates();
			document.getElementById("msg").innerHTML="₹" + withdrawAmount2 + " withdrawn successfully from ATM";
			$("#msg").css("background-color","green");

		}
		console.log("hello",this.twoK,this.fiveHundred,this.oneHundred);
	}
}
var atmObj = new Atm();






function Transaction(two,five,one) {
	this.twoK = two;
	this.fiveHundred = five;
	this.oneHundred = one;
	this.amount = 0;

	this.computeTotalAmt = function(){
		var totAmt = (this.twoK)*2000+(this.fiveHundred)*500+(this.oneHundred)*100;
		return totAmt;
	}

	var i = 0;
	this.update = function(){
		var ss=("<tr bgcolor='green' style='color: white'><td>"+ (i+1) +"</td><td>" + atmObj.currentAmount +"</td><td>"+ this.twoK+"</td><td>"
		+ this.fiveHundred+"</td><td>"+ this.oneHundred+"</td><td>"+ atmObj.currentAmount+"</td></tr>");

		$('#tab_logic').append(ss);
		i++;
	}

}

var max = 0;
function transact() {
	max = document.getElementById("max").value;
	if(max == '' || parseInt(max) < 100){
		document.getElementById("msg").innerHTML="please enter max. amount user can get(should be greater than or equal to 100)";
		$("#msg").css("background-color","red");

		exit;
	}
	document.getElementById("msg").innerHTML="";
	max = parseInt(max);

	//.value is removed because null can also be there
	var two = document.getElementById("two-thousand").value;
	//alert(two);
	//asr
	var five = document.getElementById("five-hundred").value;
	//asr
	var one = document.getElementById("one-hundred").value;
	//asr
	$('#money').attr('disabled', true);		//Validation added by Jitender
	$('#max').attr('disabled', true);
	var obj = new Transaction(two,five,one);

	obj.amount = obj.computeTotalAmt();
	//  console.log(obj);
	atmObj.add(obj)
	atmObj.disp();
	obj.update();
	document.getElementById("msg").innerHTML="₹" + obj.amount + " added successfully to ATM";
	$("#msg").css("background-color","green");

}

var withdrawalAmt = 0;
function withdrawMoney(){
	withdrawalAmt = parseInt(document.getElementById("usr").value);
	if(withdrawalAmt < 0){
		document.getElementById("msg").innerHTML="Please enter valid amount";
		$("#msg").css("background-color","red");

	}
	else if(max >= withdrawalAmt){
		atmObj.withdraw(withdrawalAmt);
		atmObj.disp();
	}
	else {
		$("#msg").css("background-color","red");
		// if(max == 0)
		// 	document.getElementById("msg").innerHTML="ATM doesn't have cash";
		// else {
		document.getElementById("msg").innerHTML="Withdrawl Amount is greater than limit defined";
		//}
	}
}
//submit and onclick() together not working
//so did this
//but then error came in line 124 that null.value can't
// var btn = $('#money');
// btn.on('click', transact());
