// function to reverse a string
function reverseStr(str) {
  let inputCharList = str.split('');
  let reversedCharList = inputCharList.reverse();
  let reversedString = reversedCharList.join('');
  return reversedString;
}


// function to check if the given string is palinndrome or not
function isPalindrome(str) {
  let reversedStr = reverseStr(str);
  return str === reversedStr;
}



// function to convert date from number type to string type
function convertDateToString(date) {
  let dateInString = { day: '', month: '', year: '' };

  if (date.day < 10) {
    dateInString.day = "0" + date.day;
  } else {
    dateInString.day = date.day.toString();
  }

  if (date.month < 10) {
    dateInString.month = "0" + date.month;
  } else {
    dateInString.month = date.month.toString();
  }

  dateInString.year = date.year.toString();

  return dateInString;
}


// function to return all variations of a date e.g. (DD-MM-YYYY, MM-DD-YYYY, YYYY-MM-DD, DD-MM-YY,      MM-DD-YY, YY-MM-DD)
function getAllDateFormats(date) {
  let dateStr = convertDateToString(date);
  let ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  let mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  let yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  let ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  let mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  let yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

//function to check palindrome for all date formats
function checkPalindromeForAllDateFormats(date) {
  let allDateFormats = getAllDateFormats(date);
  let flag = false;

  for (let i = 0; i < allDateFormats.length; i++) {
    if (isPalindrome(allDateFormats[i])) {
      flag = true;
      break;
    }
  }
  return flag;
}


//******* functions to find the next palindrome date, ********//

// function to check leap year
function isLeapYear(year) {
  if (year % 400 === 0) return true;
  if (year % 100 === 0) return false;
  if (year % 4 === 0) return true;
  return false;
}


// function to get the next date
function nextDateIs(date) {
  let day = date.day + 1;
  let month = date.month;
  let year = date.year;

  let daysInMonthList = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  } else {
    if (day > daysInMonthList[month - 1]) {
      day = 1;
      month++;
    }
  }

  if (month > 12) {
    month = 1;
    year++;
  }

  return { day: day, month: month, year: year };
}


// function to get the next palindrome date
function nextPalindromeDateIs(date) {
  let nextDate = nextDateIs(date);
  let daysCounter = 0;

  while (1) {
    daysCounter++;
    let palindromeList = checkPalindromeForAllDateFormats(nextDate);
      if (palindromeList) {
        break;
      }
    nextDate = nextDateIs(nextDate);
  }
  return [daysCounter, nextDate];
}


//******* ------------------------------------------ ********//

//******* functions to find the previous palindrome date, ********//

// function to get the previous date
function previousDateIs(date) {
  let day = date.day - 1;
  let month = date.month;
  let year = date.year;

  let daysInMonthList = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (day === 0) {
    month--;
    if (month === 0) {
      month = 12;
      day = 31;
      year--;
    } else if (month === 2) {
      if (isLeapYear(year)) {
        day = 29;
      } else {
        day = 28;
      }
    } else {
      day = daysInMonthList[month - 1];
    }
  }

  return { day: day, month: month, year: year };
}



// function to get the previous palindrome date
function previousPalindromeDateIs(date) {
  let prevDate = previousDateIs(date);
  let daysCounter = 0;

  while (1) {
    daysCounter++;
    let palindromeList = checkPalindromeForAllDateFormats(prevDate);

      if (palindromeList) {
        break;
    }
    prevDate = previousDateIs(prevDate);
  }
  return [daysCounter, prevDate];
}



//******* ------------------------------------------ ********//


const inputDate = document.querySelector('#input-date');
const showBtn = document.querySelector('#show-button');
const showOutput = document.querySelector('#show-output');

showBtn.addEventListener('click', showOnClick);

function showOnClick(){
  
  let bdayString = inputDate.value;

  if(bdayString !== ''){
    let dateArr = bdayString.split('-');
   
    let date = {
      day : Number(dateArr[2]),
      month : Number(dateArr[1]),
      year : Number(dateArr[0])
    }

    
    let isPalindrome = checkPalindromeForAllDateFormats(date);
    
    if(isPalindrome){
      showOutput.textContent = `Yay! your birthday is palindrome`;
    }else{
      let [daysCounter1, nextDate] = nextPalindromeDateIs(date);
      let [daysCounter2, prevDate] = previousPalindromeDateIs(date);
      
      if(daysCounter1 > daysCounter2){
        showOutput.textContent = `nearest palindrome is ${prevDate.day}-${prevDate.month}-${prevDate.year}. You missed it by ${daysCounter2} ${dayOrDays(daysCounter2)}`;
      }else{
        showOutput.textContent = `nearest palindrome is ${nextDate.day}-${nextDate.month}-${nextDate.year}. You missed it by ${daysCounter1} ${dayOrDays(daysCounter1)}`;
      }
    }

}
}

function dayOrDays(daysNumber){
  let oneDay = 'day';
  let moreThanOneDay = 'days';
  return daysNumber === 1 ? oneDay : moreThanOneDay;
}