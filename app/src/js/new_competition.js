(function() {
  const NewCompetition = {
    setDates: async function(){
      var today = new Date();
      var tomorrow = new Date();
      var one_week = new Date();
      
      tomorrow.setDate(today.getDate() + 1);
      one_week.setDate(tomorrow.getDate() + 7);

      $('#date').attr('min', tomorrow.toISOString().substring(0,10));
      $('#date').attr('max', one_week.toISOString().substring(0,10));
    },

    selectUsername: async function(username){
      console.log(username);
      document.getElementById("searchOpponents").value = username;
      document.getElementById("usernameList").innerHTML = "";
    },

    validateUsername: async function(){
      usernames = ["Julia", "Jake", "Julian", "Jessica"];
      username = document.getElementById("searchOpponents").value;
      verified = usernames.includes(username)
      if (!verified) {
        
      }
    },
  };

  $(document).ready(function(){
    $("#searchOpponents").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      if (value.length == 0) {
        document.getElementById("usernameList").innerHTML = "";
      } else if (value.length >= 1) {
        usernames = ["Julia", "Jake", "Julian", "Jessica"];
        list_html = usernames.reduce(function(accumulator, name) {
          entry_html = "<li class='list-group-item' onclick=\"NewCompetition.selectUsername('" + name + "')\">" + name + "</li> ";
          console.log(entry_html);
          return accumulator + entry_html;
        }, "");
        document.getElementById("usernameList").innerHTML = list_html;
      }
      $("#usernameList li").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });

  window.NewCompetition = NewCompetition;

})();