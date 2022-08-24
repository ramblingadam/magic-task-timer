## ![Logo](./public/favicon-32x32.png)Magic Task Timer

**"Take control of how you spend your time be becoming aware of how you use it."** -Adam Morsa, Software Engineer

**Magic Task Timer** is a timeclock for your life.

Track the time you spend each day on projects, tasks, freelancing, getting fit, needlework, chores, socializing, breakdancing, dragon slaying- whatever you want. 

**Magic Task Timer** makes it easy to visualize the time you spend on things, empowering you to make better time management decisions while providing a simple and beautiful way to track the amount of time you've spent working on any task, project, or goal you can imagine.

**Check it out here:** [https://task-magic.netlify.app/](https://task-magic.netlify.app/)

![Screenshot of Magic Task Timer](./public/screenshot.png)

---

## How It's Made
**Tech used:** React, React-Icons, JSX, HTML, CSS, JavaScript

I've been wanting to building an app like this since I first started studying web development- a simple-to-use, visually pleasing way to track the amount of time I spend on various projects each day, with the ability to easily view the history of my time spent on each project over time.

When I started learning React, I realized it was the perfect 'framework' with which to build this app. With only a few short video tutorials under my belt, I decided to dive in and start building, figuring I'd pick the rest up on the way.

In order to build a strong foundation for understanding React-ful thinking, I built each component from scratch, hand-coding every line of JavaScript and CSS.

As the project grew I became comfortable with the concept of state and React hooks, making extensive use of <code>useState</code> and <code>useEffect</code> throughout.

I am particularly proud of building the Github-style task history heatmaps and the theming system from scratch.

### Features

| *Feature*|*Description*|
|---|---|
| **Add A Task** | Users can add as many tasks as they can imagine. |
| **Multitasking** | The user may have any number of task timers running simultaneously. |
| **Toggle Timer Timeframe** | The timer can be switched between showing time spent on that task today and total overall time spent on that task. |
| **Categorize Your Tasks** | Users can add their tasks to custom categories, and swap tasks between them. |
| **Sort Your Tasks** | Users can manually sort their tasks up and down as desired. |
| **Dividers** | Users can add horizontal dividers to their task lists, providing one more level of organization within a category. |
| **View Task History** | Users can view a complete history of all the time they have spent on a given task via Github-style heatmap or the history table. |
| **Edit Task History** | Users can edit the time spent on any task for any date. Left the timer running, or worked on a task when you didn't have the app handy? No problem! |
| **Customization** | Users can choose from several striking visual themes to make Magic Task Timer their own. In addition, there are several other options to tweak the app to the user's liking within the Settings menu. |
| **Data Privacy** | The user's data is stored locally in their browser's localStorage. Your data is not collected or stored anywhere else. |


---


## Optimizations

If/when time permits, there are several optimizations and improvements that I'd like to integrate into Magic Task Timer.

As is, the application accesses the user's data in localStorage quite often- a result of the app growing far beyond my initial conceptualization. This frequent storage access could be refactored to occur only once per render by holding the user's data in an app-level piece of state, and passing that state down to all descendant components for them to use.

I am also aware of many array operations which are repeated verbatim across different components. I would like to separate these WET functions into modules(or define them at the app-level and pass them down as props), so that when I change one function I don't have to track down and change them all. I believe this will improve the app's performance in the case of a user with many tasks by drastically cutting down on the number of similar operations run on every app render. This would also make some of the extremely complex template literal ternary operations within the JSX less difficult for a normal human to parse.

I'd also like to add custom input forms instead of relying on window.prompt() calls when a user edits a task's name or category.

Also, more themes! I find that the amount of joy I feel while using an app is directly correlated with how beautiful it is. I believe a stellar presentation can make even a modest app really shine, and increase the odds that a user will connect emotionally to an application.

## Lessons Learned:

I entered this project as a React newbie. Over the 80+ hours I've spent on Magic Task Timer, I've come to understand why React is so popular for building single-page web applications.

In the beginning, I was confused when my component-scoped variables wouldn't reflect changes- until I realized that those variables are re-defined with every component re-render. I suddenly understood why state was important, and made EXTENSIVE use of useState() and useEffect() to build the app. While arcane at first, I am thrilled to say I am now quite comfortable using these two critically important React hooks, using them to manage user/application data and the content of controlled input fields.

In addition, while I was already familiar with CSS variables, I hadn't used them in a project until I set out to build my own theming system for Magic Task Timer. The more CSS variables I used, the more I loved using them- and I had an absolute blast hand-designing every theme in the app.

## Other Projects:
Take a look at these other awesome projects from my portfolio:

**Animal Crossing: New Horizons Database:** [https://github.com/ramblingadam/acnh](https://github.com/ramblingadam/acnh)

![Screenshot of ACNH Database](https://user-images.githubusercontent.com/96756923/170849487-39d5a25f-0ad3-4494-a325-d4502610b54e.gif)

**X-Wing VS TIE Fighter:** [https://github.com/ramblingadam/tic-tac-starwars](https://github.com/ramblingadam/tic-tac-starwars)

![Screenshot of X-Wing VS TIE Fighter](https://user-images.githubusercontent.com/96756923/170849366-e1b8d33b-6236-46f1-8dd9-b38fd2c27380.gif)

**NASA Astronomy Photo/Video Browser:** [https://github.com/ramblingadam/nasapod](https://github.com/ramblingadam/nasapod)

![Screenshot of NASA Astronomy Photo/Video Browser](https://user-images.githubusercontent.com/96756923/170848850-67f872fc-b92e-438b-add6-47d83673d3c9.gif)

---

## Run Locally

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

> Runs the app in the development mode.  
> Open [http://localhost:3000](http://localhost:3000) to view it in the browser.  
> The page will reload if you make edits.  
> You will also see any lint errors in the console.

### `npm test`

> Launches the test runner in the interactive watch mode.  
> See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

> Builds the app for production, minifying the code and optimizing it for the best performance.
> Exports production version to the `build` folder.  
