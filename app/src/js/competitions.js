(function() {
  const Competitions = {
    progressBarUpdate: async function(){
      console.log('competitions function')

      var ms_per_day = 60 * 60 * 24 * 100;
      var midnight = new Date();
      var today = new Date(midnight);
      var msSinceMidnight = today - midnight.setHours(0,0,0,0);

      percentage = (msSinceMidnight / ms_per_day) * 100;
      $('#progress-bar').attr('aria-valuenow', percentage).css(`width: ${percentage}%`);
    },
  };

  $(document).ready(function(){

  });

  window.Competitions = Competitions;
  Competitions.progressBarUpdate();

})();