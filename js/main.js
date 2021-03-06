/*
Singleton - Bilder: create Year[] -> Month[] -> Days
*/
let Calendar = {
    start_year: 1919,
    year_interval: 200,
    /*
    Create Days: return <div> for all day of select month
    */
    days: function (month, year) {
        let _days = [];
        let dateObjCurrent = new Date(year, month, 1),
            _yearCurrent = dateObjCurrent.getFullYear(),
            _monthCurrent = dateObjCurrent.getMonth(),
            _wdayCurrent = dateObjCurrent.getDay(),
            _lastDayCurrent = 32 - new Date(_yearCurrent, _monthCurrent, 32).getDate();
        let dateObjPrev = new Date(year, month - 1, 1),
            _yearPrev = dateObjPrev.getFullYear(),
            _monthPrev = dateObjPrev.getMonth(),
            _lastDayPrev = 32 - new Date(_yearPrev, _monthPrev, 32).getDate();
        let dateObjFollow = new Date(year, month + 1, 1),
            _yearFollow = dateObjFollow.getFullYear(),
            _monthFollow = dateObjFollow.getMonth();
        let d, d1, m, y;

        if (_wdayCurrent === 0) {
            _wdayCurrent = 7;
        }
        /*
        Create Days: return array of days for select month in <div> with css-class
        */
        let _day = 2 - _wdayCurrent;
        for (let i = 0; i < 42; i++) {
            if (_day < 1) {
                d1 = (_lastDayPrev + _day);
                d = d1 < 10 ? '0' + d1 : d1;
                m = _monthPrev < 9 ? '0' + (_monthPrev + 1) : _monthPrev + 1;
                y = _yearPrev;
                _days[i] = '<div class="cells prev" ' +
                    'data-date="' + d1 + '" ' +
                    'data-month="' + _monthPrev + '" ' +
                    'data-year="' + _yearPrev + '" ' +
                    'data-full_date="' + y + '-' + m + '-' + d + '">' + d1 + '</div>';
                _day++;
            } else if (_day > _lastDayCurrent) {
                d1 = (_day - _lastDayCurrent);
                d = d1 < 10 ? '0' + d1 : d1;
                m = _monthFollow < 9 ? '0' + (_monthFollow + 1) : _monthFollow + 1;
                y = _yearFollow;
                _days[i] = '<div class="cells foll" ' +
                    'data-date="' + d1 + '" ' +
                    'data-month="' + _monthFollow + '" ' +
                    'data-year="' + _yearFollow + '" ' +
                    'data-full_date="' + y + '-' + m + '-' + d + '">' + d1 + '</div>';
                _day++;
            } else {
                d1 = _day;
                d = _day < 10 ? '0' + _day : _day;
                m = _monthCurrent < 9 ? '0' + (_monthCurrent + 1) : _monthCurrent + 1;
                y = _yearCurrent;
                _days[i] = '<div class="cells curr" ' +
                    'data-date="' + d1 + '" ' +
                    'data-month="' + _monthCurrent + '" ' +
                    'data-year="' + y + '" ' +
                    'data-full_date="' + y + '-' + m + '-' + d + '">' + d1 + '</div>';
                _day++;
            }
        }
        return _days;
    },
    /*
    Create Months: return array of month for select Year
    */
    months: function (kol_month, year) {
        let arr_months = [];
        for (let i = 0; i < kol_month; i++) {
            arr_months[i] = this.days(i, year);
        }
        return arr_months;
    },
    /*
    Create Years: return array of years for the specified interval
    */
    years: function () {
        let _years = [];
        for (let i = this.start_year; i < this.start_year + this.year_interval; i++) {
            _years[i] = this.months(12, i);
        }
        return _years;
    }
};

let Year = Calendar.years();
const TemplateHead = "<div class='button btn_left'>&#9664</div>" +
    "<div class='name-date'>day.month.year</div><div class='button btn_right'>&#9654;</div>" +
    "<br>" + "<div class='name-wday'></div>";
const TemplateWeek =
    "<div class='wday'>пн</div>" +
    "<div class='wday'>вт</div>" +
    "<div class='wday'>ср</div>" +
    "<div class='wday'>чт</div>" +
    "<div class='wday'>пт</div>" +
    "<div class='wday weekday'>сб</div>" +
    "<div class='wday weekday'>вс</div>" + "<br>";
const TemplateDay = "<div class='call_cells'>days of month</div>";
let nameMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

let TempDate = new Date();
let $call_cells;

let DateSelect1 = '';
let DateSelect2 = '';
let DateFlag1 = false;
let MonthFlag = false;

//JQuery
$(() => {

//Create Days
    let _baseTemplateDays = function (months) {
        let $name_date = $("div.name-date");
        let $name_wday = $("div.name-wday");
        $name_date.text(nameMonths[TempDate.getMonth()] + ' ' + TempDate.getFullYear());
        $name_wday.html(TemplateWeek);
        $call_cells.html('');
        let days = months;
        let el_div = '';
        let a = 0;
        for (let i = 0; i < 6; i++) {
            el_div = '';
            for (let j = 0; j < 7; j++) {
                el_div += days[a++];
            }
            $call_cells.append(el_div + '<br>');
        }
    };
//Create Months
    let _baseTemplateMonths = function () {
        let $name_date = $("div.name-date");
        let $name_wday = $("div.name-wday");
        $name_wday.html('');
        let y = TempDate.getFullYear();
        $name_date.text(y);
        $call_cells.html('');
        let el_div = '';
        let a = 0;
        let mon = 'curr';
        for (let i = 0; i < 4; i++) {
            el_div = '';
            for (let j = 0; j < 4; j++) {
                el_div += '<div class="months ' + mon + '" data-year="' + y + '" data-month="' + a + '">' + nameMonths[a++] + '</div>';
            }
            $call_cells.append(el_div + '<br>');
            if (a > 11) {
                ++y;
                a = 0;
                mon = 'foll';
            }
        }
    };

//Add CSS Class current-day
    function CurrentDate() {
        let newDate = new Date();
        let $newDate = $('[data-year=' + newDate.getFullYear() + '][data-month=' + newDate.getMonth() +
            '][data-date=' + newDate.getDate() + ']');
        $newDate.addClass('-current-date-');
    }

//Add CSS Class current-month
    function CurrentMonth() {
        let newDate = new Date();
        let $newDate = $('[data-year=' + newDate.getFullYear() + '][data-month=' + newDate.getMonth() + ']');
        $newDate.addClass('-current-month-');
    }

//Add CSS Class DateSelect1
    function AddSelectDate1() {
        if (DateSelect1) {
            let $newDate = $('[data-year=' + DateSelect1.getFullYear() + '][data-month=' + DateSelect1.getMonth() +
                '][data-date=' + DateSelect1.getDate() + ']');
            if (DateFlag1) {
                $newDate.addClass('-select-');
            } else $newDate.addClass('-DateSelect1-');
        }
    }

//Add CSS Class DateSelect2
    function AddSelectDate2() {
        if (DateSelect2 && !DateFlag1) {
            let $newDate = $('[data-year=' + DateSelect2.getFullYear() + '][data-month=' + DateSelect2.getMonth() +
                '][data-date=' + DateSelect2.getDate() + ']');
            $newDate.addClass('-DateSelect2-');
        }
    }

//Delete CSS Class DateSelect* and focus-select-interval
    function DeleteSelection() {
        $('.-DateSelect1-').removeClass('-DateSelect1-');
        $('.-DateSelect2-').removeClass('-DateSelect2-');
        $('.-select-').removeClass('-select-');
        $('.-focus-select-interval-').removeClass('-focus-select-interval-');
    }

// Add Class to auto select interval from SelectDate1 to current element
    function SetFocusInterval(start, end, myClass) {
        let $newDate;
        let startDate = new Date(start);
        let endDate = new Date(end);
        let first = new Date($call_cells.children().eq(0).data("full_date"));
        let last = new Date($call_cells.children().eq(-2).data("full_date"));

        startDate = (startDate < first) ? first : startDate;
        endDate = (endDate > last) ? last : endDate;

        while (startDate <= endDate) {
            $newDate = $('[data-year=' + startDate.getFullYear() + '][data-month=' + startDate.getMonth() +
                '][data-date=' + startDate.getDate() + ']');
            $newDate.addClass(myClass);
            startDate = new Date(startDate.setDate(startDate.getDate() + 1));
        }
    }

//  _baseTemplateDays for months+step
    function getHTML(views, step) {
        switch (views) {
            case 'year':
                break;
            case 'month':
                TempDate = new Date(TempDate.setFullYear(TempDate.getFullYear() + step));
                _baseTemplateMonths();
                CurrentMonth();
                MonthFlag = true;
                break;
            case 'days':
                TempDate = new Date(TempDate.setMonth(TempDate.getMonth() + step));
                let month = TempDate.getMonth();
                let year = TempDate.getFullYear();
                let months = Year[year];

                $call_cells = $("div.call_cells");
                _baseTemplateDays(months[month]);
                CurrentDate();
                AddSelectDate1();
                AddSelectDate2();
                if (!DateFlag1) {
                    SetFocusInterval(DateSelect1, DateSelect2, '-focus-select-interval-');
                }
                MonthFlag = false;
                break;
            default:
                break;
        }
    }

//--------------------------------------
// Create Template HTML - Start Function
    (function _baseTemplateHead() {
        let $el = $("div.inner");
        $el.html(TemplateHead + TemplateDay);
        getHTML('days', 0);
    })();
//--------------------------------------
//Events
//--------------------------------------
//Click on  to current element
    $call_cells.on('click', 'div.cells', function (event) {
        let $el = $(event.target);
        let date = new Date($el.data("full_date"));

        if (!DateFlag1) {
            DeleteSelection();
            DateSelect1 = date;
            DateFlag1 = true;
            $el.addClass('-select-');
        } else {
            DateSelect2 = date;
            if (DateSelect1 > DateSelect2) {
                let a = DateSelect1;
                DateSelect1 = DateSelect2;
                DateSelect2 = a;
                $('.-select-').addClass('-DateSelect2-').removeClass('-select-');
                $el.addClass('-DateSelect1-');
            } else if (DateSelect1 < DateSelect2) {
                $('.-select-').addClass('-DateSelect1-').removeClass('-select-');
                $el.addClass('-DateSelect2-');
            }
            $("input:text").val(DateSelect1.toLocaleDateString() + ' - ' + DateSelect2.toLocaleDateString());
            SetFocusInterval(DateSelect1, DateSelect2, '-focus-select-interval-');
            DateFlag1 = false;
        }
    });
//Click on  to current element
    $call_cells.on('click', 'div.months', function (event) {
        let $el = $(event.target);
        let year = $el.data("year");
        let month = $el.data("month");
        TempDate = new Date(year, month, 1);
        getHTML('days', 0);
    });

//Add Focus to current element
    $call_cells.on('mousemove focus', 'div', function (event) {
        let $el = $(event.target);
        $el.addClass('-focus-');
    });
//Remove Focus from current element
    $call_cells.on('mouseout blur', 'div', function (event) {
        $(event.target).removeClass('-focus-');
        $('.-focus-select-').removeClass('-focus-select-');
    });
//Select interval from DsteSelect1 to current elemets
    $call_cells.on('mouseover', 'div', function (event) {
        let $el = $(event.target);
        if (DateFlag1) {
            let year = DateSelect1.getFullYear();
            let month = DateSelect1.getMonth();
            let date = DateSelect1.getDate();
            let Date1 = new Date(year, month, date);
            let target_div = new Date($el.data("full_date"));

            if (target_div < Date1) {
                SetFocusInterval(target_div, Date1, '-focus-select-');
            } else {
                SetFocusInterval(Date1, target_div, '-focus-select-');
            }
        }
    });
//Select interval from DsteSelect1 to current elemets
    $("div.name-date").on('click', function () {
        getHTML('month', 0);
    });
//Bottom for change Months or Years
//Click on <button class="butt_right">
    $('.btn_left').on('click', function () {
        if (MonthFlag) {
            getHTML('month', -1);
        } else {
            getHTML('days', -1);
        }
    });
//Click on <button class="butt_right">
    $('.btn_right').on('click', function () {
        if (MonthFlag) {
            getHTML('month', +1);
        } else {
            getHTML('days', +1);
        }
    });
});
