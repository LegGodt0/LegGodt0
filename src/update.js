const path = require("path");
const fetch = require("node-fetch");
const fs = require("fs");

let stars = 0,
    page = 1;

let special;

const CountStars = async () => {
    let StarsData = await fetch(
    `https://api.github.com/users/LegGodt0/starred?per_page=100&page=${page}`
    ).then((res) => res.json());
    stars += StarsData.length;
    page++;
    if (StarsData.length === 100) CountStars();
    else WriteReadMe();
};

const WriteReadMe = async () => {
  //Get ReadMe path
    const ReadMe = path.join(__dirname, "..", "README.md");
    const date = new Date();

  //Season Based Emoji
    let dd = date.getDate(), mm = date.getMonth() + 1
    
    if(mm === 12)special = ["⛄", "❄", "🎄"]
    else if(mm === 9 && dd === 29) special = ["🎉", "🎈", "🎊"]

  //Fetching Info From Github API
    let UserData = await fetch("https://api.github.com/users/LegGodt0").then(
    (res) => res.json()
    );

  //Creating the text what we gonna save on ReadMe file
    const text = `## Hi there 👋 <img align="right" src="https://avatars.githubusercontent.com/u/93236678?v=4" width="200" />
I'm **LegGodt**, An developer from somewhere in the planet. I like to code web applications and games. I have worked on some projects in my past, Some of my open source projects are pinned below make sure to check them out.

Thanks for visiting my github profile!~

<h2 align="center"> ${special?special[0]:"✨"} About Me ${special?special[0]:"✨"}</h2>

\`\`\`js
const LegGodt0 = {
    FavouriteLanguage: "PythonC",
    OpenedIssues: 0,
    OpenedPullRequests: 3,
    TotalCommits: 85,
    Stars: ${stars},
    Repositories: {
        Created: 6,
        Contributed: 0
    },
}; //I'm an Object, uwu
\`\`\`

<h2 align="center"> ${special?special[1]:"🚀"} My Stats ${special?special[1]:"🚀"}</h2>
<p align="center">
<img src="https://github-readme-streak-stats.herokuapp.com/?user=LegGodt0&theme=tokyonight">
</p>
<details>
    <summary>
        Even more stats
    </summary>
    <p align="center">
    <img src="https://github-profile-trophy.vercel.app/?username=LegGodt0&theme=dracula">
    <img src="https://github-readme-stats.vercel.app/api?username=LegGodt0&theme=tokyonight&count_private=true&show_icons=true&include_all_commits=true">
    </p>
</details>

<!-- Last updated on ${date.toString()} ;-;-->
<i>Last updated on ${date.getDate()}${
    date.getDate() === 1
        ? "st"
        : date.getDate() === 2
        ? "nd"
        : date.getDate() === 3
        ? "rd"
        : "th"
} ${
    [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ][date.getMonth()]
    } ${date.getFullYear()} using magic</i> ${special?special[2]:"✨"} ${(mm === 9 && dd === 29)?"and... today is my birthday":""}`;

  //Saving on readme.md
    fs.writeFileSync(ReadMe, text);
};

(() => {
    CountStars();
})()
