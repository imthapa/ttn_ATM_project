var filePath = "./logFile.txt";
//var fs = require('fs');

function	Atm(){
    this.twoK = 0;
    this.fiveHundred = 0;
    this.oneHundred = 0;
    this.currentAmount = 0;
    this.fifty = 0;

    this.add = function(transaction)
    {

        if(transaction.twoK > 0)
            this.twoK = this.twoK + transaction.twoK;
        if(transaction.fiveHundred > 0)
            this.fiveHundred = this.fiveHundred + transaction.fiveHundred;
        if(transaction.oneHundred > 0)
            this.oneHundred = this.oneHundred + transaction.oneHundred;
        if(transaction.fifty > 0)
            this.fifty = this.fifty + transaction.fifty;

    }

    var i = 1;
    this.updates = function(){
        var ww=document.getElementById("usr").value;
        var ss=("<tr bgcolor='red' style='color: white'><td>"+ (i+1) +"</td><td>" + ww +"</td><td>"+ this.twoK+"</td><td>"+
        this.fiveHundred+"</td><td>"+ this.oneHundred+"</td><td>"+ this.fifty+"</td><td>"+ this.currentAmount+"</td></tr>");

        $('#tab_logic').append(ss);
        i++;
    }

    this.disp = function(){
        this.currentAmount = this.twoK*(2000)+this.fiveHundred*(500)+this.oneHundred*(100)+this.fifty*(50);
        document.getElementById("curAmt").innerHTML="₹"+this.currentAmount;
    }

    this.withdraw = function(withdrawAmount)
    {
        var withdrawAmount2 = withdrawAmount;
        var count = [this.twoK, this.fiveHundred,this.oneHundred,this.fifty];
        var denomination = [2000,500,100,50];
        if(withdrawAmount == 0 || withdrawAmount % 50 != 0)
        {
            document.getElementById("msg").innerHTML="Please enter the amount which is multiple of 100 & 50";
            $("#msg").css("background-color","red");
            logger =new Date() +">>>>>> user tried to withdraw invalid amount i.e. "+withdrawAmount2 + "from atm";
            log(logger);
            return;
        }

        if(this.currentAmount < withdrawAmount)    //cahnged
        {
            document.getElementById("msg").innerHTML="ATM doesn't have enough money";
            $("#msg").css("background-color","red");
            logger =new Date() +">>>>>> Atm did not have sufficient amount against user transaction "+withdrawAmount2;
            log(logger);
            return;
        }

        for (var i = 0; i < 4; i++)
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
                    else
                    {
                        withdrawAmount-=count[i]*denomination[i];
                        count[i]=0;
                    }
                }
            }
        }
        if(withdrawAmount != 0)
        {
            // alert("Error");
            document.getElementById("msg").innerHTML="the amount you entered isn't availabe in currency"
            $("#msg").css("background-color","red");
            logger =new Date() +">>>>>> Atm did not have sufficient amount against user transaction "+withdrawAmount2;
            log(logger)
        }
        else
        {
            this.currentAmount -= withdrawAmount2;
            this.twoK = count[0];
            this.fiveHundred = count[1];
            this.oneHundred = count[2];
            this.fifty = count[3];
            atmObj.updates();
            document.getElementById("msg").innerHTML="₹" + withdrawAmount2 + " withdrawn successfully from ATM";
            $("#msg").css("background-color","green");
            logger =new Date() +">>>>>> "+ document.getElementById('userName').value +" >>>>>>>>> withdrew "+withdrawAmount2+ " successfully from ATM";
            log(logger);
        }
        console.log("hello",this.twoK,this.fiveHundred,this.oneHundred);
    }
}
var atmObj = new Atm();






function Transaction(two,five,one,fifty) {
    this.twoK = two;
    this.fiveHundred = five;
    this.oneHundred = one;
    this.fifty=fifty;
    this.amount = 0;

    this.computeTotalAmt = function(){
        var totAmt = (this.twoK)*2000+(this.fiveHundred)*500+(this.oneHundred)*100+(this.fifty)*50;
        return totAmt;
    }

    var i = 0;
    this.update = function(){
        var ss=("<tr bgcolor='green' style='color: white'><td>"+ (i+1) +"</td><td>" + atmObj.currentAmount +"</td><td>"+ this.twoK+"</td><td>"
        + this.fiveHundred+"</td><td>"+ this.oneHundred+"</td><td>"+ this.fifty+"</td><td>"+ atmObj.currentAmount+"</td></tr>");

        $('#tab_logic').append(ss);
        i++;
    }

}

var max = 0;
var logger =""
function transact() {
    max = document.getElementById("max").value;
    if(max == '' || parseInt(max) < 50){
        document.getElementById("msg").innerHTML="please enter max. amount user can get(should be greater than or equal to 100)";
        $("#msg").css("background-color","red");
        logger =new Date() +">>>>>> an error occured >>>>>>>>> bank tried to add "+max+ "amount which was less than least denomination i.e.100";
        log(logger);
        exit;
    }
    document.getElementById("msg").innerHTML="";
    max = parseInt(max);

    //.value is removed because null can also be there
    var two = document.getElementById("two-thousand").value;
    if(two == '')  //akhil
        two = 0;
    else if(parseInt(two) >= 0) {
        two = parseInt(two);
    }
    else {
        document.getElementById("msg").innerHTML="Denomination can't be negative";
        $("#msg").css("background-color","red");
        logger =new Date() +">>>>>> an error occured >>>>>>>>> bank tried to add "+two+ "notes of ₹2000";
        log(logger);
        exit;
    }
    var five = document.getElementById("five-hundred").value;
    if(five == '')    //akhil
        five = 0;
    else if(parseInt(five)>= 0) {
        five = parseInt(five);
    }
    else {
        document.getElementById("msg").innerHTML="Denomination can't be negative";
        $("#msg").css("background-color","red");
        logger =new Date() +">>>>>> an error occured >>>>>>>>> bank tried to add "+five+ "notes of ₹500";
        log(logger);
        exit;
    }
    var one = document.getElementById("one-hundred").value;
    if(one == '')   //akhil
        one = 0;
    else if(parseInt(one)>= 0) {
        one = parseInt(one);
    }
    else{
        document.getElementById("msg").innerHTML="Denomination can't be negative";
        $("#msg").css("background-color","red");
        logger =new Date() +">>>>>> an error occured >>>>>>>>> bank tried to add "+one+ "notes of ₹100";
        log(logger)
        exit;
    }
    var fifty = document.getElementById("fifty").value;
    if(fifty == '')    //akhil
        fifty = 0;
    else if(parseInt(fifty)>= 0) {
        fifty = parseInt(fifty);
    }
    else {
        document.getElementById("msg").innerHTML="Denomination can't be negative";
        $("#msg").css("background-color","red");
        logger =new Date() +">>>>>> an error occured >>>>>>>>> bank tried to add "+fifty+ "notes of ₹50";
        log(logger)
        exit;
    }



    if(one == 0 && two == 0 && five == 0 && fifty == 0){
        document.getElementById("msg").innerHTML="atleast one note should be entered";
        $("#msg").css("background-color","red");
        logger =new Date() +">>>>>> an error occured >>>>>>>>> bank tried to add 0 notes of ₹2000, ₹500, ₹100, ₹50";
        log(logger)
        exit;
    }

    $('#money').attr('disabled', true);		//Validation added by Jitender
    $('#max').attr('disabled', true);

    var obj = new Transaction(two,five,one,fifty);
    obj.amount = obj.computeTotalAmt();
    atmObj.add(obj)
    atmObj.disp();
    obj.update();
    document.getElementById("msg").innerHTML="₹" + obj.amount + " added successfully to ATM";
    $("#msg").css("background-color","green");
    logger =new Date() +">>>>>> bank has successfully added ₹" + obj.amount + ".Now the amount left is "+ atmObj.currentAmount;
    log(logger);

}

var withdrawalAmt = 0;
var uname;
function withdrawMoney(){
    withdrawalAmt = document.getElementById("usr").value;
    uname =document.getElementById('userName').value;
    if(uname== '')
    {
        document.getElementById("msg").innerHTML = "Name can't be left blank";
        $("#msg").css("background-color", "red");
        logger =new Date() +">>>>>> user tried to withdraw  amount without giving his name ";
        log(logger);
        exit;
    }
    if(withdrawalAmt==''){
        withdrawalAmt=0;
        document.getElementById("msg").innerHTML = "Cant be left blank";
        $("#msg").css("background-color", "red");
        logger =new Date() +">>>>>> user tried to withdraw invalid amount i.e. "+withdrawalAmt + "from atm";
        log(logger);
    }

    else {
        withdrawalAmt=parseInt(withdrawalAmt);
        if (withdrawalAmt <= 0) {
            document.getElementById("msg").innerHTML = "Please enter valid amount";
            $("#msg").css("background-color", "red");
            logger =new Date() +">>>>>>"+ document.getElementById('userName').value +">>>>>>>>> tried to withdraw "+withdrawalAmt+ " from ATM which was invalid";
            //}
            log(logger);

        }
        else if (max >= withdrawalAmt) {
            atmObj.withdraw(withdrawalAmt);
            atmObj.disp();
        }
        else {
            $("#msg").css("background-color", "red");
            // if(max == 0)
            // 	document.getElementById("msg").innerHTML="ATM doesn't have cash";
            // else {
            document.getElementById("msg").innerHTML = "Withdrawl Amount is greater than limit defined";
            logger =new Date() +">>>>>> "+ document.getElementById('userName').value +" >>>>>>>>> tried to withdraw "+withdrawalAmt+ " from ATM which was greater defined limit";
            //}
            log(logger);
            //}
        }
    }

}
//submit and onclick() together not working
//so did this
//but then error came in line 124 that null.value can't
// var btn = $('#money');
// btn.on('click', transact());
var abc="";
function log(logg){
    abc+=logg+"\n";
    console.log(logg);
}

function showlogs() {
    $('#akhil').append(abc);
    console.log("aaaaaaaaadfghjcvjbknlj;")
}

function commingsoon() {
    alert("functionality comming soon");
}

var textFile = filePath;
var makeTextFile = function (text) {
	var data = new Blob([text], {type: 'text/plain'});
	// If we are replacing a previously generated file we need to
	// manually revoke the object URL to avoid memory leaks.
	if (textFile !== null) {
		window.URL.revokeObjectURL(textFile);
	}
	textFile = window.URL.createObjectURL(data);
	return textFile;
};

//var create = document.getElementById('logger');

function makes() {
    var link = document.getElementById('downloadlink');
    link.href = makeTextFile(abc);
    link.style.display = 'block';
}

