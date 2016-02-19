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

//
function eventsMap (list) {
var eventsObj = list.map(function(el) {
  if (el.type === "PushEvent") {
    return {
        username: el.actor.login,
        time: el.created_at,
        master: el.payload.ref,
        repoName: el.repo.name,
        profilePic: el.actor.avatar_url,
        commitNum: el.payload.head,
        message: el.payload.commits[0].message,
    };
}
});
}
// var sortEvents = function(events) { //sorting by date //Sort last
//     return _.sortBy(events, 'created_at').reverse();
// };
    function eventsHTML(eventsData) {
    var eventsDataList = "";
    eventsData.forEach(function(el) {
        if (el.type === "PushEvent") {
            eventsDataList += "<div class ='alert-push'>";
            eventsDataList += "<div class = 'icon-wrapper'>";
            eventsDataList += "<span class='mega-octicon octicon-git-commit'></span>";
            eventsDataList += "</div>";
            eventsDataList += "<div class = 'events-right-col'>";
            eventsDataList += "<div class = 'events-right-col-title'>";
            eventsDataList += "<div class= 'events-time'> <p>" + el.created_at + "</p></div>";
            eventsDataList += "<div class= 'events-username'> <p>" + el.actor.login +
                " pushed to " + "</p></div>";
            eventsDataList += "<div class= 'events-master'> <p>" + el.payload.ref+
                "</p></div>";
            eventsDataList += "<div class= 'events-repoName'> <p>" + "at " + el.repo.name +
                "</p></div>";
            eventsDataList += "</div>";
            eventsDataList += "<img class= 'events-profilePic' src='" + el.actor.avatar_url+
                "' alt=''/>";
            eventsDataList += "<span class='octicon octicon-mark-github'></span>";
            eventsDataList += "<div class ='events-commits'<p>" + el.payload.head +
                "</p></div>";
            eventsDataList += "<div class ='events-message'<p>" + el.payload.commits[0].message +
                "</p></div>";
            eventsDataList += "</div>";
            eventsDataList += "</div>"; //end of 'alert push div'
        }
      else if (el.type === "CreateEvent" && el.payload.ref_type === "repository")  {
        eventsDataList += "<div class = 'eventsRepoWrapper'>";
        eventsDataList += "<div class= 'events-create-username'> <p>" + el.actor.login + "</p></div>";
        eventsDataList +=  "<p>" + " created repository " + "</p>";
        eventsDataList += "<div class= 'events-create-url'> <p>" + el.repo.name  + "</p></div>";
        eventsDataList += "<div class= 'events-create-time'> <p>" + moment(el.created_at, "YYYYMMDDH").fromNow() + "</p></div>";
        eventsDataList += "</div>"; //end of 'eventsRepoWrapper'
      }

      else if (el.type == "CreateEvent" && el.payload.ref_type === "branch") {
        eventsDataList += "<div class= 'events-create-username'> <p>" + el.actor.login + " created branch " + "</p></div>";
        eventsDataList += "<div class= 'events-create-branch'> <p>" +  el.payload.ref_type + " at " + "</p></div>";
        eventsDataList += "<div class= 'events-create-repourl'> <p>" +  el.repo.url +  "</p></div>";
        eventsDataList += "<div class= 'events-create-time'> <p>" + moment(el.created_at, "YYYYMMDDH").fromNow() + "</p></div>";
      }
    });
    $('.alert-create-simple').append(eventsDataList);
}
eventsHTML(events);
