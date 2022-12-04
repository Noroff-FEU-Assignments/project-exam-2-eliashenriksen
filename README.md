# Elias Henriksen Noroff Project Exam 2

## Setup & Run Project Locally

There are no special requirements to run the project locally. This is a NextJS project made with create next app.

1. Install the required packades - `npm install`
2. Run the local dev server - `npm run dev`
3. Open the local application in your browser - [http://localhost:3000](http://localhost:3000)

## My Project Description

The original full project brief is included at the bottom of this readme.

### Description Of Solution

For our last project exam of our Frontend Studies, we were tasked with creating a new front end for a social media application. We had a set list of requirements in the form of user stories, and this was basically the complete list of obligatory required functionality. We were provided an API created by our school, and this API had all the required functionality to cover the user stories and some more functionality ontop of that. I have aimed to have all the required functionality (clearly haha) ontop of adding as much extra functionality that the API was capable of providing. I have added pretty much everything that i set out to, apart from probably the single functionality that was left out due to time constraints, which was being able to look up posts based on tags and everything that was involved around the social media post tags. After finding out that our task for our last exam was to create a social media application, i fairly quickly realized that my goal was to make a fully functioning social media website with all the possible functionality that entails, therefore i chose to implement pretty much everything the API had to offer. Below i shall list all the extra functionality that was implemented, that was not specifically required by the exam but that was possible with the API.

1. The possibility to search for a user profile by name directly
2. The abillity to see if a comment is reply to another comment
3. The abillity to reply to comments
4. The abillity to see posts ONLY from users that the signed in user is following (A personal feed type of page)
5. The abillity to see which users are following a specific profile
6. The abillity to see which users a specific profile is following

There is some functionality that i wish was possible and would have liked to have implemented, but there was no easy way to achieve this from the API. The biggest being the possibility to browse through pages of returned results instead of a set limit of 200 results ascending or descending based on your flags. This is not really a problem when it comes to the posts themselves because you can simply show the most recent ones first, but for the user list its not ideal to only be able to show 200 users. I would also have liked some more search functionality.

My solution is called Intouch and was loosely inspired by Twitter / Facebook and a tiny bit of Instagram. It is a simple social media platform where a registered user can create posts, either text only or with an image attached that is showcased in the middle of the post. Users can comment on posts and reply to comments. Follow profiles, view followers and followed profiles. Users can react to posts. When it comes to reactions, i wanted to solve this requirement in the best and most BROAD way possible. Since the API accepts any type of symbol to be posted as a reaction, i thought it would be silly to only have a handful of possible reaction emojis. Yes i could have simply displayed the emojis that my solution implemented as possible reactions, on posts and hide the rest, but i did not want to add limits simply because it was easier. With my solution, you can react to a post with any emoji possible. I have chosen to implement Emoji Mart and customize it somewhat to fit the aesthetic of the website. Emoji Mart is basically an HTML emoji picker component that works exactly how an emoji selector would work for a phone (Note: Sometimes a bug happens with this component that i have not been able to reproduce which flags "illegal constructor", this happens very rarely and i am yet to figure out exactly why, from research it appears it might have something to do with experimental browser functionality).

Although i believe my website has had good navigational UX from the get go, after doing some user testing, i have spent a bit of time polishing the UX involved in regular user stories and journeys. Some stuff that i became somewhat blind to after working on the website for a while was easily brought to light when i got some friends to try it out. The biggest improvements were points of uncertainty. For example, post comments used to simply have a number id on them #123, but this id is based on ALL the comments made on the platform, so a post could have 3 comments but the comment id's would be something like #221 #432 etc. This could cause some confusion as the user was wondering why the comments number was 300 when there are only 3 comments on the post. This was solved by simply specifying that its the comment ID. Similar confusion points have been solved when it comes to creating posts, registering and loging in, in the form of much better and descriptive error messages and validation messages. Also more specific error handling to give more specified and correct error messages.

Responsiveness has had a bit of time put into it towards the end of the project and i have tested a lot more different viewports than ive done before. Thankfully, bootstrap makes it real easy to create a well responsive and accesible solution.

### Start Of Project

When it comes to the start of the project, the very start was delegated to understanding the full scope of the project and jotting down any ideas that instantly sprung to mind. It did not take long to plan for the project as after having gone through a few of these now, i know pretty well how long it should take me to do stuff and the different tasks involved. A bit of the planning time went into actually planning out the solution and how it was going to work. Innsight work at the start is something i usually do on any project and gathering information and researching the subject i find is very benefitial. Simply looking at "competitors" is a great way to get an idea of the norms and what users would expect out of your solution. Having used social media for many years now as anyone else also comes benefitial in giving me an idea of what do's and dont's are here, especially in regards to UX and logic. I have a belief that UX is all about logic and easy flow of tasks with as little confusion as possible for the user. Things should not be able to be mistaken, a user should not have to wonder how to do something or what to do next and get good useful feedback back when something is incorrect. This is obviously something that can always be improved but i did my best at trying to allocate sufficient time for this.

### Design

The design of this project i am very happy with. Fairly early in the project, i pretty much knew that this project was perfect for me to finally test out some new design trends that i have known about for a while but never gotten around trying. As i mentioned in my style guide, the general design style i have gone for is called Glassmorphism, but i have also uniquely (as far as i know) implemented elements of Neumorphism into the design aswell (mostly on inputs). A lot of the design for Intouch is based on the "classic" Glassmorphism recipe, although not fully. The general idea is having a foreground that is transparent and blurred, made look like frosted glass (the best kind). But only having this glass foreground would achieve nothing if it was on a single coloured background, because then you could not really tell that it was blurred and glass like. That is where the movement and colours come in. You have a gradient background (most commonly 4 way gradient) ontop of having some type of abstract elements infront of the gradient background to add even more distinction that can be blurred behind the glass. Now having a static gradient background with some circles on it is fine and dandy, but thats not THE BEST we can do. Therefore i chose to add movement into the mix to really make it all come together. Firstly, we have the whole gradient in the back moving around (the gradient is an image being moved around, mostly because 4 way gradients are complicated in CSS), ontop of that, we have pulled in the TSparticles package that was absolutely perfect for this. The TSparticles package is a very powerful background particle package that i have used to create and move the circles in the background. You can create some SUPER complex and cool backgrounds with this tool, but simple circles did the trick in this case, i had to do some tweaking with the particle options file to get it exactly right, moving super slow etc. It took some time to get this working, but it was actually one of the first things i did in the project because i wanted to know if it was possible to achieve what i was looking for.

The colors and everything else is as mentioned mostly using the Glassmorphism "rulebook" and creating something unique. For example, the gradients used for glassmorphism are often "washed out" as in the colours are not extremely vibrant, something i have gone for aswell. I took inspiration from other glassmorphic designs aswell, and some neumorphic ones too. Some online resources like CSS tricks articles and online neumorphism generator helped.

The logo was designed in photoshop pretty early on, and everything else that needed any tweaking design wise was done in photoshop.

Even though i really like how the design turned out, if i had more time and had to work on the design, i would probably most certainly work on the buttons. I like how the primary CTA button type and the danger button type turned out but im not a huge fan of the secondary button type, mainly due to the on-hover button text color being changed to the turquiose branded color, i could not really find any good alternative out of the colors that were selected for the design.

### Coding

For the most fun part. I think the first thing that has to be said is that i learned A LOT over the course of this project in regards to react/nextjs. I went into it with a decent understanding of NextJS but there were for sure things in the required user stories that i was not fully sure how i was going to implement on day 1. Compared to my earlier big projects throughout the studies, it was actually a lot smoother sailing. There were a few problems that were very annoying but they all got solved at the end, and today, compared to day 1 of the project i think i have tremendously more understanding of react and nextjs than i did back then. Core principles like state, hydration, how the pages are rendered etc. I think i learned so much mostly because i had my mind set on implementing functionality exactly as envisioned, with no compromises, so when i ended up with a hurdle i just banged my head into it researching the topic untill it was solved the way i wanted it. And, thankfully most of the stuff that i had to learn to solve my problems seems like i managed to understand fairly quickly.

I would like to say i am satisfied by the coding part of this project and as far as i understand i believe i have done a good job. There are a few things though that i can definitely probably point out that could be improved upon. The biggest few are probably, creating more generic and re-useable components. Creating MORE components in general, as some of the components i made ended up being fairly complex which is probably what you want to avoid, which is also the third one, splitting my components up more into smaller components.

# Project Brief Below

## Goal

To take the skills learned over the last two years and take on an extensive project where the finished product should reflect the candidate's general development capabilities, in addition to visual and technical skills.

## Brief

An existing Social Media company has approached you to create a brand new front end for their application. While they have a list of required features, the design and user experience has not been specified. Working with the official API documentation, plan, design and build a modern front end social media application.

## Requirements

> All admin functionality is managed by an existing application. This project only covers the front-end application for the API.

## API

The API you are using for this project can be found under Social EndPoints in the [Noroff API documentation](https://noroff-api-docs.netlify.app/).

### Resources

[API Guide](https://noroff-api-docs.netlify.app/social-endpoints/authentication)
[API Documentation](https://nf-api.onrender.com/docs)

### User Stories

The client has specified the following requirements in the form of _User Stories_:

1. A user with a `stud.noroff.no` email may register
2. A registered user may login
3. A registered user may update their avatar and banner
4. A registered user may logout
5. A registered user may view a list of `Posts`
6. A registered user may view a list of `Profiles`
7. A registered user may view a single `Post` by `id`
8. A registered user may view a single `Profile` by `name`
9. A registered user may create a `Post`
10. A registered user may update a `Post` they own
11. A registered user may delete a `Post` they own
12. A registered user may create a `Comment` on any `Post`
13. A registered user may `react` to any `Post` with an emoji
14. A registered user may `follow` and `unfollow` another `Profile`

### Technical Restrictions

The company CTO has set the following technical restrictions:

1. Must use an approved `JavaScript Framework`
2. Must use an approved `CSS Framework`
3. Must be hosted on an approved `Static Host`
4. Must use an approved `Design Application`
5. Must use an approved `Planning Application`

### Required Links

The Product Owner has requested links to the following:

1. A Gantt chart for project timing
2. A design prototype
3. A style guide
4. A kanban project board
5. A repository link
6. A hosted application demo link

## Approved Resources

This list covers libraries and services that have been vetted by the company and approved for use.

### JavaScript Frameworks

- React (>16)

### CSS Frameworks

- Bootstrap (>5)
- Tailwind (>3)
- MUI (>5)
- Styled Components
- CSS Modules

### Hosting Services

- GitHub Pages
- Netlify

### Design Applications

- Adobe XD
- Figma
- Sketch

### Planning Applications

- Trello
- GitHub Projects

## Delivery

Include the required links in the Moodle delivery window using [this template format](delivery-template.html).

All final changes must be merged into the default branch `main` or `master`. Other branches will not be checked.

Ensure that the `readme.md` file describes your project thoroughly, including how to setup and run the project locally and any special instructions for testers.
