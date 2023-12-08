# MOSAIC MEDIA
.dev .io .org
Until October 2025
update: there is some actors agency out of LA that is called mosaic media so I may have wasted $200 on domains

## Functional ToDo's:
### Replace Mosaic Store with context
### Setup all post types
- DONE: Text Post
- DONE: Image Post
- DONE: Link Post
### Colors. Do I set them on the backend or should I have a function on the frontend
- GO with a frontend function for now
### Scrolling is f'd. It's laggy and not always centered
- DONE... for now
- ctrl zooming was a pain so I cut it and built a new way to nav
- the cursor pans the screen and scrolling zooms in and out
- it's counter intuitive since it's non-traditioanl, but now the mouse gives full control without having to use keys
### Comment/replies
- Still a long way before i care about other peoples interaction

## Tech Debt ToDo:
### make repo private
### refactor to vite: This is more of a pain than I thought
### host the UI on firebase so it's live
### Fix npm issues
- Use this flag when installing depependencies because of conflicts (--legacy-peer-deps)
### Find diff package
- npm i @react-hook/size


<!-- This is outdated. Need to update this -->
## DB Planning
User Table
- id
- resource key
- username
- posts
- emails
- color preference
- user stats 

Post Table
- id
- resource key
- post content
- replies
- likes
- create timestamp
- parent board id
- parent user id

Reply Table
- id
- resource key
- text
- timestamp
- parent user id
- parent post id

Likes
- id
- resource ket
- timestamp
- parent user id
- parent post id
- parent reply id

Board Table
- id
- resource key
- dimensions
- rules 
- posts
