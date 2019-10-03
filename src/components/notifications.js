function differences(lastLogin, currentMonth){
    let number = [];
    let ll = new Date(lastLogin).getTime();
    let days = currentMonth.days;
    for(let i = 0; i < days.length; i++){
        let comments = days[i].comments;
        for(let j = 0; j < comments.length; j++){
            console.log("udjem2222")
            let diff = new Date(comments[j].dateOfPost).getTime() - ll;
            console.log(diff);
            if(diff > 0){
                console.log("i");
                console.log(i)
                console.log("prvi dan")
                console.log(days[0].date)
                let freshComment = {
                    comment: days[i].date,
                    name: comments[j].name
                }
                console.log("udjem");
                console.log(i)
                number.push(freshComment); 
            }
        }
    }
    return number;
}

function numberOfNewComments(employee, month){
    //let currentMonthId = employee.currentMonth;
    let lastLogin = employee.lastLogin;
    let num;
    num = differences(lastLogin, month);
    return num;
  } 



export {numberOfNewComments}