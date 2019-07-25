
// $(function setMinDate(){
//   var dtToday = new Date();

//   var month = dtToday.getMonth() + 1;
//   var day = dtToday.getDate();
//   var year = dtToday.getFullYear();

//   if(month < 10)
//       month = '0' + month.toString();
//   if(day < 10)
//       day = '0' + day.toString();

//   var maxDate = year + '-' + month + '-' + day;    
//   $('#txtDate').attr('max', maxDate);
// });

// var today = new Date();
// var tomorrow = new Date();
// tomorrow.setDate(today.getDate()+1);



// $(document).ready(function(){
//   $(".nav-tabs a").click(function(){
//     $(this).tab('show');
//   });
// });

(function() {
  const Inbox = {
    setMinDate: async function(){
      var currentDate = new Date();
      console.log("currentDate" + currentDate);
      var tomorrow = currentDate.setDate(currentDate.getDate() + 1);
      console.log("tomorrow" + tomorrow);
    },
  };

  window.Inbox = Inbox;
})();