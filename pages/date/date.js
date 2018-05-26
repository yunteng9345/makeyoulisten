const DateTime = (date1,date2) => {
  var start_date = new Date(date1);
  var end_date = new Date(date2);
  var days = end_date.getTime() - start_date.getTime();
  var day = parseInt(days / (1000 * 60 * 60 * 24));
  return day
}
module.exports = {
  DateTime: DateTime
}
