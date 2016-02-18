$(document).ready(function() {
  $(".name").text(users.name);
  $(".username").text(users.login);
  $(".date-joined-text").text(users.created_at);
  $(".stat-number-followers").text(users.followers);
  // $(".stat-number-starred").text(users.starred_url) //couldn't figure this out?
  $(".stat-number-following").text(users.following);
  $(".profile-pic").attr("src",users.avatar_url);
});
