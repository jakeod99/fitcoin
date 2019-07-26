(function() {
  const Inbox = {
    inboxFunction: async function(){
      console.log('inbox function')

      if (false) {
      list_html = betManager.ongoingBets.reduce(function(accumulator, name) {
        entry_html = `
          <div class="card page-card">
            <div class="card-header card-title">
              <h5 class="card-title">Request To: ${'username'}</h5>
            </div>
            <div class="card-body">
              <p class="card-text">Date Sent: ${'date'}</p>
              <p class="card-text">Date of Competition: ${'date'}</p>
              <p class="card-text">Wager: ${'wager'} Ethereum</p>
              <a href="#" class="btn btn-secondary ">Cancel</a>
            </div>
          </div>
        `;
        return accumulator + entry_html;
        }, "");
        // document.getElementById("usernameList").innerHTML = list_html;
      }
    },
  };

  $(document).ready(function(){

  });

  window.Inbox = Inbox;
  Inbox.inboxFunction();

})();