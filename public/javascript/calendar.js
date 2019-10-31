module.exports = function() {
  const getLeapYear = function(year) {
    return (
      Math.floor(year / 4) - Math.floor(year / 100) + Math.floor(year / 400)
    );
  };

  const hasLeapYear = function(year) {
    if (year % 4 === 0) return true;
    else if (year % 100 !== 0) return false;
    return year % 400 === 0;
  };

  const gregorianCalendar = 1583; //그레고리력
  const gregoridayOfWeek = 6; //1월 1일 요일
  const leapYearUntilGregorian = 383; //1583까지 윤년 갯수
  let monthOfYear = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  return {
    get: function(json) {
      if (hasLeapYear(json.year)) {
        monthOfYear[1] = 29;
      }

      const countOfYears = json.year - gregorianCalendar;
      const leapYear = getLeapYear(json.year) - leapYearUntilGregorian;
      const commonYear = countOfYears - leapYear;
      const moveDay = (commonYear + leapYear * 2) % 7;
      const dayUntilMonth = monthOfYear
        .slice(0, json.month - 1)
        .reduce((a, b) => a + b);
      const startIndex = (gregoridayOfWeek + moveDay + dayUntilMonth) % 7;
      let lastDayOfMonthPrev = monthOfYear[json.month - 2];

      const days = [];
      for (let i = startIndex - 1; i >= 0; i--) {
        days.push(lastDayOfMonthPrev - i);
      }

      for (let i = 1; i <= monthOfYear[json.month - 1]; i++) {
        days.push(i);
      }

      const leftDays = 35 - monthOfYear[json.month - 1] - startIndex;
      for (let i = 1; i <= leftDays; i++) {
        days.push(i);
      }

      return {
        days,
        startIndex
      };
    }
  };
};
