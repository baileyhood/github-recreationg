$(document).ready(function() {
    $(".profile-pic").attr("src", users.avatar_url);
    $(".nav-profile-pic").attr("src", users.avatar_url);
    $(".name").text(users.name);
    $(".username").text(users.login);
    $(".date-joined-text").text(users.created_at);
    $(".stat-number-followers").text(users.followers);
    // $(".stat-number-starred").text(users.starred_url) //couldn't figure this out?
    $(".stat-number-following").text(users.following);
    $(".org").attr("src", orgs[0].avatar_url);

});


//toggling for main nav
var navItem = $('.sub-navigation').find('a');
navItem.click(function(event) {
    event.preventDefault();
    var selectedPage = "." + $(this).attr('rel');
    window.glob = $(selectedPage);
    $(selectedPage).siblings('div').addClass('inactive');
    $(selectedPage).removeClass('inactive');
});


//Pulling Repos Data

var sortRepos = function(repos) { //sorting by date
    return _.sortBy(repos, 'updated_at').reverse();
};
var repoDataList = "";
_.each(sortRepos(repos), function(el) {
    repoDataList += "<div class = 'repoContainer'>";
    repoDataList += "<div class = 'repoContainer-leftcol'>";
    repoDataList += "<div class='repoTitle'> <p> " + el.name + "</p></div>"; //need to add link
    repoDataList += "<div class =  'repoDescrip'>" + el.description + "</div>";
    repoDataList += "<div class =  'updatedAt'>" + "Updated on " + el.updated_at + "</div>";
    repoDataList += "</div>";
    repoDataList += "<div class = 'repoContainer-rightcol'>";
    repoDataList += "<div class = 'progLang'>" + el.language + //write if/else to remove null
        "<a href='' class ='stargazers-url'>" + "<span class='octicon octicon-star'>" + el.stargazers_count +
        "</span>" + "<a>";
    repoDataList += "<a href='' class ='forks-url'>" +
        "<span class='octicon octicon-repo-forked'></span>" + el.forks_count + "</span>" +
        "</div>" + "<a>";
    repoDataList += "</div>";
    repoDataList += "</div>";
});
$('.mini-repo-list').append(repoDataList);




//Pulling Events Data


var eventsObj = events.map(function(el) {
    if (el.payload.commits) {
      var commitMsg = el.payload.commits[0].message;
    } else {
      var commitMsg = "";
    }
    return {
        username: el.actor.login,
        time: el.created_at,
        master: el.payload.master_branch,
        repoName: el.repo.name,
        profilePic: el.actor.avatar_url,
        commitNum: el.payload.head,
        message: commitMsg,
    };
});

// var sortEvents = function(events) { //sorting by date //Sort last
//     return _.sortBy(events, 'created_at').reverse();
// };

var eventsDataList="";
eventsObj.forEach (function(el) {
  eventsDataList+= "<div class ='alert-push'>";
  eventsDataList+= "<div class = 'icon-wrapper'>";
  eventsDataList+= "<span class='mega-octicon octicon-git-commit'></span>";
  eventsDataList+= "</div>";
  eventsDataList+= "<div class = 'events-right-col'>";
  eventsDataList+= "<div class = 'events-right-col-title'>";
  eventsDataList+= "<div class= 'events-time'> <p>" + el.time + "</p></div>";
  eventsDataList+= "<div class= 'events-username'> <p>" + el.username + " pushed to " + "</p></div>";
  eventsDataList+= "<div class= 'events-master'> <p>" + el.master + "</p></div>";
  eventsDataList+= "<div class= 'events-repoName'> <p>" + "at " + el.repoName + "</p></div>";
eventsDataList+= "</div>";
  eventsDataList+= "<img class= 'events-profilePic' src='"  + el.profilePic +  "' alt=''/>";
  eventsDataList+= "<span class='octicon octicon-mark-github'></span>";
  eventsDataList+= "<div class ='events-commits'<p>" + el.commitNum + "</p></div>";
  eventsDataList+= "<div class ='events-message'<p>" + el.message + "</p></div>";
  eventsDataList+= "</div>";
  eventsDataList+= "</div>"; //end of 'alert push div'

});
$('.alert-create-simple').append(eventsDataList);
