$(document).ready(function() {
  $(".profile-pic").attr("src",users.avatar_url);
  $(".nav-profile-pic").attr("src",users.avatar_url);
  $(".name").text(users.name);
  $(".username").text(users.login);
  $(".date-joined-text").text(users.created_at);
  $(".stat-number-followers").text(users.followers);
  // $(".stat-number-starred").text(users.starred_url) //couldn't figure this out?
  $(".stat-number-following").text(users.following);
  $(".org").attr("src",orgs[0].avatar_url);

});

var names = function(repos){
    return _.pluck(repos, 'name');
};


//Adding Repos to page
var mappedRepo = repos.map (function(el) {
    return {
      name: el.name,
      descrip: el.description,
      updated: el.updated_at,
    };
});

var repoHTML ="";
mappedRepo.forEach(function(el){
  repoHTML += "<p>" + el.name  + "<p>";
  repoHTML += "<p>" + el.descrip + "<p>";
  repoHTML += "<p>" + el.updated + "<p>";
  repoHTML += "<p>" + el.language + "<p>";
});

document.getElementById("repos").innerHTML =  repoHTML;
