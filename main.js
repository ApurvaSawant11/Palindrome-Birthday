function reverseStr(str){
  return str.split('').reverse().join('');
}

function isStringPalindrome(str){
  var reversedStr = reverseStr(str);
  return str===reversedStr;
}

function convertDateToStr(date){
  var dateStr = {day:'', month:'', year:''}

  if(date.day<10){
    dateStr.day='0'+date.day;
  }
  else{
    dateStr.day=date.day.toString();
  }

  if(date.month<10){
    dateStr.month='0'+date.month;
  }
  else{
    dateStr.month=date.month.toString();
  }

  dateStr.year=date.year.toString();

return dateStr;
}

function generateDateFormats(date){

  var ddmmyyyy = date.day + date.month + date.year;
  var mmddyyyy = date.month + date.day + date.year;
  var yyyymmdd = date.year + date.month +  date.day;
  var ddmmyy = date.day + date.month + date.year.slice(-2);
  var mmddyy = date.month + date.day + date.year.slice(-2);
  var yymmdd = date.year.slice(-2) + date.month +  date.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];

}

function checkIfPalindromeFoundForAllFormats(date){

  var listOfPalindromeDates = generateDateFormats(date);

  var listOfPalindromesFound = [];

  for(var i=0; i < listOfPalindromeDates.length; i++)
  {
    var result = isStringPalindrome(listOfPalindromeDates[i])
    listOfPalindromesFound.push(result);
  }

  return listOfPalindromesFound;

}

function isLeapYear(year) {

  if (year % 400 === 0){ return true; }

  if (year % 100 === 0){ return false; }

  if (year % 4 === 0){ return true; }

  return false;
}
  
function findNextDate(date) {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;
  
  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month = 3;
      }
    } 
    else {
      if (day > 28) {
        day = 1;
        month = 3;
      }
    }
  } 
  else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }
  
  if (month > 12) {
    month = 1;
    year++;
  }
  
  return { day: day, month: month, year: year};
}
  
function findNextPalindromeDate(date) {
  var nextDate = findNextDate(date);
  var counter = 0;
  
  while (1) {
    counter++;
    var dateStr = convertDateToStr(nextDate);
    var resultList = checkIfPalindromeFoundForAllFormats(dateStr);
  
    for (var i = 0; i < resultList.length; i++) {
      if (resultList[i]) {
        return [counter, nextDate];
      }
    }
    nextDate = findNextDate(nextDate);
  }
}
  
function findPreviousDate(date) {
  var day = date.day - 1;
  var month = date.month;
  var year = date.year;
  
  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
  if (day === 0) {
    month--;
  
    if (month === 0) {
      month = 12;
      day = 31;
      year--;
    } 
    else if (month === 2) {
      if (isLeapYear(year)) {
        day = 29;
      } 
      else {
        day = 28;
      }
    } 
    else {
      day = daysInMonth[month - 1];
    }
  }
  
  return { day: day, month: month, year: year};
}
  
function findPreviousPalindromeDate(date) {
  var previousDate = findPreviousDate(date);
  var counter = 0;
  
  while (1) {
    counter++;
    var dateStr = convertDateToStr(previousDate);
    var resultList = checkIfPalindromeFoundForAllFormats(dateStr);
  
    for (let i = 0; i < resultList.length; i++) {
      if (resultList[i]) {
        return [counter, previousDate];
      }
    }
    previousDate = findPreviousDate(previousDate);
    }
}
  
var inputDate = document.querySelector("#inputDate");
var checkBtn = document.querySelector("#checkBtn");
var outputDiv = document.querySelector(".output");

function clickHandler(e) {
  e.preventDefault();
  var bdayString = inputDate.value;
  
  if (bdayString !== "") {
    var date = bdayString.split("-");
    var yyyy = date[0];
    var mm = date[1];
    var dd = date[2];
  
    var date = {
      day: Number(dd),
      month: Number(mm),
      year: Number(yyyy),
    };
  
    var dateStr = convertDateToStr(date);
    var list = checkIfPalindromeFoundForAllFormats(dateStr);
    var isPalindrome = false;
  
    for (let i = 0; i < list.length; i++) {
      if (list[i]) {
        isPalindrome = true;
        break;
      }
    }
  
    if (!isPalindrome) {
      const [counter1, nextDate] = findNextPalindromeDate(date);
      const [counter2, previousDate] = findPreviousPalindromeDate(date);
  
      if (counter1 > counter2) {
        outputDiv.innerText = `The nearest palindrome date is ${previousDate.day}-${previousDate.month}-${previousDate.year}, you missed by ${counter2} days.`;
      } 
      else {
        outputDiv.innerText = `The nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed by ${counter1} days.`;
      }
    } 
    else {
       outputDiv.innerText = "Yay! Your birthday is palindrome!";
    }
  }
}
  
checkBtn.addEventListener("click", clickHandler);