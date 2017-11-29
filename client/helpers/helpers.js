
Template.registerHelper( 'equals', ( a1, a2 ) => {
  return a1 === a2;
});


Template.registerHelper('formatDate', function(timestamp) {
     return new Date(timestamp).toLocaleDateString("pt-BR");
});



Date.prototype.yyyymmdd = function() {
  var d = this,
  month = '' + (d.getMonth() + 1),
  day = '' + d.getDate(),
  year = d.getFullYear();

if (month.length < 2) month = '0' + month;
if (day.length < 2) day = '0' + day;

return [year, month, day].join('-');
};