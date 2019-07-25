(function() {
  const Inbox = {
    setDates: async function(){
      var today = new Date();
      var tomorrow = new Date();
      var one_week = new Date();
      
      tomorrow.setDate(today.getDate() + 1)
      one_week.setDate(tomorrow.getDate() + 7)

      $('#date').attr('min', tomorrow.toISOString().substring(0,10));
      $('#date').attr('max', one_week.toISOString().substring(0,10));
    },
  };

  window.Inbox = Inbox;
})();