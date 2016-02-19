$(document).ready(function() {
    $(".profile-pic").attr("src", users.avatar_url);
    $(".nav-profile-pic").attr("src", users.avatar_url);
    $(".name").text(users.name);
    $(".username").text(users.login);
    $(".date-joined-text").prepend("<span class='octicon octicon-clock'></span>").text("Joined on ").append(moment(users.created_at).format('ll'));
    $(".stat-number-followers").text(users.followers);
    // $(".stat-number-starred").text(users.starred_url)
    $(".stat-number-following").text(users.following);
    $(".org").attr("src", orgs[0].avatar_url);




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
    repoDataList += "<div class =  'updatedAt'>" + "Updated " + moment(el.updated_at,"YYYYMMDDH").fromNow() + "</div>";
    repoDataList += "</div>";
    repoDataList += "<div class = 'repoContainer-rightcol'>";
    repoDataList += "<div class = 'progLang'>" + el.language  + //write if/else to remove null
        "<a href='' class ='stargazers-url'>" + "<span class='octicon octicon-star'>" + el.stargazers_count +
        "</span>" + "<a>";
    repoDataList += "<a href='' class ='forks-url'>" +
        "<span class='octicon octicon-repo-forked'></span>" + el.forks_count + "</span>" +
        "</div>" + "<a>";
    repoDataList += "</div>";
    repoDataList += "</div>";
});
$('.mini-repo-list').append(repoDataList);


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
            eventsDataList += "<div class= 'events-time'> <p>" + moment(el.created_at,"YYYYMMDDH").fromNow() + "</p></div>";
            eventsDataList += "<a href='" + el.actor.url + "' + class= 'events-username'> <p>" + el.actor.login + "</p></a>";
            eventsDataList += "<p>"  +  " pushed to "  + "</p>";
            eventsDataList += "<div class= 'events-master'> <p>" + el.payload.ref.slice(11)+
                "</p></div>";
            eventsDataList += "<p>" + " "+" at  " + "</p>";
            eventsDataList += "<div class= 'events-repoName'> <p>" + " " + el.repo.name +
                "</p></div>";
            eventsDataList += "</div>";
            eventsDataList += "<img class= 'events-profilePic' src='" + el.actor.avatar_url+
                "' alt=''/>";
            eventsDataList += "<div class = 'events-descrip-container'";
            eventsDataList += "<span class='octicon octicon-bookmark'></span>";
            eventsDataList += "<div class ='events-commits'<p>" + el.payload.head.slice(-7) +
                "</p></div>";
            eventsDataList += "<div class ='events-message'<p>" + el.payload.commits[0].message +
                "</p></div>";
            eventsDataList += "</div>";
            eventsDataList += "</div>";
            eventsDataList += "</div>"; //end of 'alert push div'
        }
      else if (el.type === "CreateEvent" && el.payload.ref_type === "repository")  {
        eventsDataList += "<div class = 'eventsRepoWrapper'>";
        eventsDataList += "<div class = 'icon-wrapper-events-repo'>";
        eventsDataList += "<span class='octicon octicon-repo'</span>";
        eventsDataList += "</div>";
        eventsDataList += "<div class = 'events-right-col-create-repo'>";
        eventsDataList += "<div class= 'events-create-username'> <p>" + el.actor.login + "</p></div>";
        eventsDataList +=  "<p>" + " created repository " + "</p>";
        eventsDataList += "<div class= 'events-create-url'> <p>" + el.repo.name  + "</p></div>";
        eventsDataList += "<div class= 'events-create-time'> <p>" + moment(el.created_at, "YYYYMMDDH").fromNow() + "</p></div>";
        eventsDataList += "</div>"; //end of 'events-right-col-create-repo'
        eventsDataList += "</div>"; //end of 'eventsRepoWrapper'
      }

      else if (el.type == "CreateEvent" && el.payload.ref_type === "branch") {
        eventsDataList += "<div class = 'eventsBranchWrapper'>";
        eventsDataList += "<div class = 'icon-wrapper-events-branch'>";
        eventsDataList += "<span class='octicon octicon-git-branch'></span>";
        eventsDataList += "</div>";
        eventsDataList += "<div class = 'events-right-col-create-branch'>";
        eventsDataList += "<div class= 'events-create-username'> " + el.actor.login + "</div>";
        eventsDataList += "<p> " + " created branch " + "</p>";
        eventsDataList += "<div class= 'events-create-branch'> <p>" +  el.payload.master_branch + " at " + "</p></div>";
        eventsDataList += "<div class= 'events-create-repourl'> <p>" +  el.repo.name +  "</p></div>";
        eventsDataList += "<div class= 'events-create-time'> <p>" + moment(el.created_at, "YYYYMMDDH").fromNow() + "</p></div>";
        eventsDataList += "</div>";
        eventsDataList += "</div>";
      }
    });
    $('.alert-create-simple').append(eventsDataList);
}
eventsHTML(events);
});
