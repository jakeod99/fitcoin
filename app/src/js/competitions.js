(function() {
  const Competitions = {
    progressBarUpdate: async function(){
      var ms_per_day = 60 * 60 * 24 * 100;
      var midnight = new Date();
      var today = new Date(midnight);
      var msSinceMidnight = today - midnight.setHours(0,0,0,0);

      percentage = (ms_per_day / msSinceMidnight) * 100;
      $('#progress-bar').attr('style', `width: ${percentage}%`);
      $('#progress-bar').attr('aria-valuenow', percentage);
    },
  };

  $(document).ready(function(){

  });

  window.Competitions = Competitions;
  Competitions.progressBarUpdate();

})();