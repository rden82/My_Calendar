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
                        'data-fulldate="' + d + '.' + m + '.' + y + '">' + d1 + '</div>';
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
                        'data-fulldate="' + d + '.' + m + '.' + y + '">' + d1 + '</div>';
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
                        'data-fulldate="' + d + '.' + m + '.' + y + '">' + d1 + '</div>';
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
let TempDate = new Date();
let $call_cells;

let DateSelect1 = '';
let DateSelect2 = '';
let DateFlag = false;

let nameMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let _baseTemplateDays = function (months) {
        let $name_date = $("div.name-date");
        $name_date.text( nameMonths[TempDate.getMonth()] + ' ' + TempDate.getFullYear() );
        $call_cells = $("div.call_cells");
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



    let SetFocusInterval = function (start, end, myClass) {
        let newDate, $newDate;
        newDate = start;
        while (newDate < end) {
            newDate = new Date(newDate.setDate(newDate.getDate() + 1));
            $newDate = $('[data-year=' + newDate.getFullYear() + '][data-month=' + newDate.getMonth() +
                '][data-date=' + newDate.getDate() + ']');
            $newDate.addClass(myClass);
        }
    };

    /* Create Template HTML - Footer
    */
    function getHTML (views, step) {
        let day = TempDate.getDate();
        let month = TempDate.getMonth() + step ;
        let year = TempDate.getFullYear();
        TempDate = new Date (year, month, day);
        month = TempDate.getMonth() ;
        year = TempDate.getFullYear();

        let months = Year[year];
        switch(views) {
            case 'year':
                break;
            case 'month':
                break;
            case 'days':
                _baseTemplateDays(months[month]);

                break;
            default:
                break;
        }
    }


    $(() => {
        (function _baseTemplateHead () {
            let $el = $("div.inner");
            let Head = "<div class='button btn_left'>&#9664</div>" +
                "<div class='name-date'>day.month.year</div><div class='button btn_right'>&#9654;</div>" +
                "<br>" +
                "<div class='wday'>пн</div>" +
                "<div class='wday'>вт</div>" +
                "<div class='wday'>ср</div>" +
                "<div class='wday'>чт</div>" +
                "<div class='wday'>пт</div>" +
                "<div class='wday weekday'>сб</div>" +
                "<div class='wday weekday'>вс</div>" + "<br>" +
                "<div class='call_cells'>пн</div>";
            $el.html(Head);
        })();

        getHTML('days', 0);

        $(document).ready(function() {
            let newDate = new Date();
            let $newDate = $('[data-year=' + newDate.getFullYear() + '][data-month=' + newDate.getMonth() +
                '][data-date=' + newDate.getDate() + ']');
            $newDate.addClass('-current-date-');
        });

        $call_cells.on('click', 'div', function () {
            let $el = $(this);
            let year = $el.data("year");
            let month = $el.data("month");
            let date = $el.data("date");
            let day = new Date(year, month, date);
            if (DateFlag === false) {
                $('.-DateSelect1-').removeClass('-DateSelect1-');
                $('.-DateSelect2-').removeClass('-DateSelect2-');
                $('.-focus-select-interval-').removeClass('-focus-select-interval-');
                DateSelect1 = day;
                $el.addClass('-select-');
                DateFlag = true;
            } else {
                DateSelect2 = day;
                if (DateSelect1 > DateSelect2) {
                    let a = DateSelect1;
                    DateSelect1 = DateSelect2;
                    DateSelect2 = a;
                    $('.-select-').addClass('-DateSelect2-').removeClass('-select-');
                    $el.addClass('-DateSelect1-');
                } else {
                    $('.-select-').addClass('-DateSelect1-').removeClass('-select-');
                    $el.addClass('-DateSelect2-');
                }

                $("input:text").val(DateSelect1.toLocaleDateString() + ' - ' + DateSelect2.toLocaleDateString());
                SetFocusInterval(DateSelect1, DateSelect2, '-focus-select-interval-');
                DateFlag = false;
            }
        });

        $call_cells.on('mousemove focus', 'div',  function (event) {
            let $el = $(event.target);
            $el.addClass('-focus-');
        });

        $call_cells.on('mouseout blur', 'div', function (event) {
            $(event.target).removeClass('-focus-');
            $('.-focus-select-').removeClass('-focus-select-');
        });

        $call_cells.on('mouseover', 'div', function (event) {
            let $el = $(event.target);
            if (DateFlag) {

                let year1 = DateSelect1.getFullYear();
                let month1 = DateSelect1.getMonth();
                let date1 = DateSelect1.getDate();

                let year2 = $el.data("year");
                let month2 = $el.data("month");
                let date2 = $el.data("date");

                let start = new Date(year1, month1, date1);
                let end = new Date(year2, month2, date2);

                if (end < start) {
                    SetFocusInterval(end, new Date(year1, month1, date1 - 1), '-focus-select-');
                } else {
                    SetFocusInterval(start, new Date(year2, month2, date2 - 1), '-focus-select-');
                }
            }
        });

        //Click on <button class="butt_right">
        $('.btn_left').on('click', function () {
            getHTML('days', -1);
        });
//Click on <button class="butt_right">
        $('.btn_right').on('click', function () {
            getHTML('days', +1);
        });

   });
