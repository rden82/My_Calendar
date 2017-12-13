'use strict';


class MyCalendar {
    constructor(startDate) {
        this.startDate = startDate;
        this.year = this.startDate.getFullYear();
        this.month = this.startDate.getMonth();
        this.day = this.startDate.getDate();
        this.wday = this.startDate.getDay();
        this.first_day = new Date(this.year,this.month,1);
        this.first_wday = this.first_day.getDay();
        this.last_day = 32 - new Date(this.year,this.month,32).getDate();
    };
}

class BilderTable {
    constructor(MyCal_prev, MyCal_curr) {
        this.MyCal0 = MyCal_prev;
        this.MyCal1 = MyCal_curr;
    }
    createTable (){

        let day_table = document.createElement("table");
        day_table.id = "Month";
        let Mybody = document.getElementsByClassName("body1")[0];
        Mybody.appendChild(day_table);
        let MyTable = "<tr class='weekday'><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr>";

        let last_prev = this.MyCal0.last_day;

        let first_wday = this.MyCal1.first_wday;
        if (first_wday === 0) {first_wday=7;}

        let last_curr = this.MyCal1.last_day;

        let a = 2-first_wday;
        let b = 0;
        for (let i = 0; i < 6; i++) {
            MyTable += "<tr>";
            for (let j = 0; j < 7; j++) {
                if (a < 1) {
                    b = last_prev + a;
                    MyTable += "<td>" + b + "</td>";
                    a++;
                } else if (a > last_curr) {
                    b = a - last_curr;
                    MyTable += "<td>" + b + "</td>";
                    a++;
                } else {
                    MyTable += "<td>" + a + "</td>";
                    a++;
                }
            }
            MyTable += "</tr>";
        }
        day_table.innerHTML = MyTable;
    }
}

function getValue() {
    let Input_Date = document.getElementById("input_form").value;  //let Input_Date = "2024, 09, 17";
    let month_curr;
    let month_prev;
    if (Input_Date !== "") {
        Input_Date = Input_Date.split("-").join(", ");
        month_curr = new Date(Input_Date);
        month_prev = new Date(Input_Date);
    } else {
        month_curr = new Date();
        month_prev = new Date();
        document.getElementById("input_form").value = month_curr.getFullYear() + "-" + month_curr.getMonth() +
            "-" + month_curr.getDate();
    }

        month_prev.setMonth((month_prev.getMonth() - 1));

        let MyCal_prev = new MyCalendar(month_prev);
        let MyCal_curr = new MyCalendar(month_curr);

        let table1 = new BilderTable(MyCal_prev, MyCal_curr);

    table1.createTable();
}


