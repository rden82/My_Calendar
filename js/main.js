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
    createTable (index){
        let day_table = document.getElementsByClassName("table" + index)[0];
        let last_prev = this.MyCal0.last_day;

        let first_wday = this.MyCal1.first_wday;
        if (first_wday === 0) {first_wday=7;}

        let last_curr = this.MyCal1.last_day;

        let MyTable = "<caption>" + this.MyCal1.day + "." + (this.MyCal1.month + 1) + "." + this.MyCal1.year + "</caption>";

        MyTable += "<tr class='weekday'><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr>";

        let a = 2-first_wday;
        let b = 0;

        for (let i = 0; i < 6; i++) {
            MyTable += "<tr>";
            for (let j = 0; j < 7; j++) {
                if (a < 1) {
                    b = last_prev + a;
                    MyTable += "<td class='not_current'>" + b + "</td>";
                    a++;
                } else if (a > last_curr) {
                    b = a - last_curr;
                    MyTable += "<td class='not_current'>" + b + "</td>";
                    a++;
                } else {
                    MyTable += "<td class='current'>" + a + "</td>";
                    a++;
                }
            }
            MyTable += "</tr>";
        }
        day_table.innerHTML = MyTable;
    }
}

function getValue (step) {
    let Input_Date = document.getElementById("input_form").value;
    let kk, m;
    if (Input_Date === "") {
        Input_Date = new Date(); //Input_Date = "2024-09-17";
        kk = Input_Date.getMonth();
        if ( kk < 10) {kk = "0" + kk.toString()};
        //console.log(kk);
        m = Input_Date.getFullYear() + "-" + kk + "-" + Input_Date.getDate();
        document.getElementById("input_form").value = m;
        get(m);
    } else {
        if (step !== undefined) {
            step = 0;
        }
        console.log(Input_Date);
        let Arr = Input_Date.split("-");
        Arr[1] = +Arr[1] + step;

        if (+Arr[1] > 12) {
            Arr[1] = "01";
            Arr[0] = +Arr[0] + 1;
        }
        if (+Arr[1] < 1) {
            Arr[1] = 12;
            Arr[0] = +Arr[0] - 1;
        }

        Input_Date = Arr.join("-");
        Input_Date = Input_Date.split("-").join(", ");

        kk = Date(Input_Date.split(", "));
        if (kk[1] < 10) {
            kk[1] = "0" + kk[1].toString()
        }
        document.getElementById("input_form").value = kk.join("-");
        get(Input_Date);
    }
}

function get(Input_Date) {

    let month_curr;
    let month_prev;

    Input_Date = Input_Date.split("-").join(", ");
    month_curr = new Date(Input_Date);
    month_prev = new Date(Input_Date);

    month_prev.setMonth((month_prev.getMonth() - 1));

    let MyCal_prev = new MyCalendar(month_prev);
    let MyCal_curr = new MyCalendar(month_curr);

        //let table1 = new BilderTable(MyCal_prev, MyCal_curr);
    let tab = new BilderTable(MyCal_prev, MyCal_curr);

          tab.createTable(1);
}
//Click on <td>

$(() => {
    getValue();
    let $table = $('table');

    $table.click(function (event) {
        console.log($(event.target).text());

    });
//Click on <button class="butt_left">
    $('.butt_left').click(function(){
        getValue(-1);
    });
//Click on <button class="butt_right">
    $('.butt_right').click(function(){
        getValue(+1);
    });
});

