// WIP
var studioid = location.href.replace(/\D+/g, '');

if(!location.href.endsWith("/curators/")) alert("Please click the bookmark on the curators tab of a studio. If you're already in the curators tab, press ''curators'' again and click the bookmark again.");
else {
  if(document.getElementById("curator-action-bar")) {
    var div = document.createElement("span");
    div.innerHTML = '<div class="button grey small" style="margin-left:10px;color:red;font-weight:bold;" id="WLpromote"><span>Promote curator</span></div><div class="button grey small" style="margin-left:10px;color:red;font-weight:bold;" id="WLremove"><span>Remove curator</span></div><div class="button grey small" style="margin-left:10px;color:red;font-weight:bold;" id="WLleave"><span>Leave studio</span></div>';
    document.getElementById("curator-action-bar").appendChild(div);

    document.getElementById("WLpromote").onclick = function() {
      var user = prompt("User to promote? (leave empty to cancel)");
      if(!user) return;
      $.ajax({type: "PUT",url: "https://scratch.mit.edu/site-api/users/curators-in/" + studioid + "/promote/?usernames=" + user});
      alert("Promoted " + user + " from studio. Refresh to see updated changes.");
    }

    document.getElementById("WLremove").onclick = function() {
      var user = prompt("User to remove? (leave empty to cancel)");
      if(!user) return;
      $.ajax({type: "PUT",url: "https://scratch.mit.edu/site-api/users/curators-in/" + studioid + "/remove/?usernames=" + user});
      alert("Removed " + user + " from studio. Refresh to see updated changes.");
    }

      document.getElementById("WLleave").onclick = function() {
      var confirmation = confirm("Leave studio? Please confirm");
      if(!confirmation) return;
      $.ajax({type: "PUT",url: "https://scratch.mit.edu/site-api/users/curators-in/" + studioid + "/remove/?usernames=" + Scratch.INIT_DATA.LOGGED_IN_USER.model.username});
      location.reload();
    }
  } else {
    var x = confirm("You are not a manager in this studio. Only possible action is to leave. If you want to leave, please press OK");
    if(x) {
      var y = confirm("Leave studio? Please confirm");
      if(y) {
        $.ajax({type: "PUT",url: "https://scratch.mit.edu/site-api/users/curators-in/" + studioid + "/remove/?usernames=" + Scratch.INIT_DATA.LOGGED_IN_USER.model.username});
        location.reload();
      }
    }
  }
}
