//ex 1
function reversedStr(str){
    let reversedString = str.split('').reverse().join('')
    return reversedString
}
// console.log(reversedStr('hello'))


//ex 2
function checkPalindrome(str){
    let reversed = reversedStr(str)
    return str === reversed
}
// console.log(checkPalindrome('121'))

// ex 3


function convertDateToStr(date){
    let dateStr= {
        day:'',
        month:'',
        year:''
    }
if(date.day<10){
         dateStr.day = '0' + date.day
    }
    else{
         dateStr.day = date.day.toString()
    }
    
    if(date.month<10){
         dateStr.month = '0' + date.month
    }
    else{
         dateStr.month = date.month.toString()
    }

    dateStr.year = date.year.toString()
     return dateStr

}

// ex 4

 function getDateInAllFormats(date){
    let dateStr = convertDateToStr(date)
    let ddmmyyyy = dateStr.day + dateStr.month + dateStr.year
    let mmddyyyy = dateStr.month + dateStr.day + dateStr.year
    let yyyymmdd = dateStr.year + dateStr.month + dateStr.day
    let ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2)
    let mmddyy = dateStr.month + dateStr.day  + dateStr.year.slice(-2)
    let yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day

    return [ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd]

 }

 // ex 5

 function checkPAlindromeForAllFormats(date){
    let listOfPalindrome = getDateInAllFormats(date)

    let flag = false
    for(let i = 0; i<listOfPalindrome.length;i++){
        if(checkPalindrome(listOfPalindrome[i])){
            flag = true
            break
        }

    }
    return flag

 }

    // ex 6

 function isLeapYear(year){
    if(year%400===0){
        return true
    }
    else if(year%100===0){
        return false
    }
    else if(year % 4===0){
        return true
    }
 }

 function getNextDate(date){
    let day  = date.day + 1 //incrementing the day
    let month = date.month
    let year = date.year

    let daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31]

    if(month === 2){
        if(isLeapYear(year)){ //check for leap year
            if(day>29){
                day = 1
                month = 3
            }
        }else{
            if(day>28){
                day = 1
                month =3
            }
        }

    }
    else{
        //check if the days exceed the max days in month
        if(day>daysInMonth[month-1]){ 
            day = 1
            month = month+1
        }
    }
    if(month>12){
        month = 1
        year = year +1
    }
    return{
        day:day,
        month:month,
        year:year
    }
    

 }


function getNextPalindromeDate(date){
    let counter = 0
    let nextDate = getNextDate(date)

    while(1){
        counter++
        var isPalindrome =checkPAlindromeForAllFormats(nextDate)
        if(isPalindrome){
            break
        }
        nextDate  = getNextDate(nextDate)
    }
    return [counter, nextDate]

} 

let dateInput = document.querySelector('#date-input')
let showBtn = document.querySelector('#btn-check')
let outputDiv = document.querySelector('#outputDiv')
 

function clickHandler(e){
    let bdayStr = dateInput.value
    if(bdayStr!==''){
       let listOfDate =  bdayStr.split('-')
       let date = {
        day: Number(listOfDate[2]),
        month:Number(listOfDate[1]),
        year:Number(listOfDate[0])
       }
       let isPalindrome = checkPAlindromeForAllFormats(date)
       if(isPalindrome){
        outputDiv.innerText = `yay! your birthday is palindrome 😃`
       }
       else{
        let [counter, nextDate] = getNextPalindromeDate(date)
        outputDiv.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${counter} days 😐`
    }
    }
    else {
        outputDiv.innerText = "Please enter date to show results.";
    }

}

showBtn.addEventListener('click', clickHandler)
