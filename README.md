# MOSAIC MEDIA
.dev .io .org
Until October 2025


## Tech Debt

### Fix npm issues
- Use this flag when installing depependencies because of conflicts
- --legacy-peer-deps

### Cut Tailwind
- tailwind is fine, but I'm just uncomfortable and slower with it
- if it's more performant i will switch to it eventually

Good example of passing props to keyframes
- https://www.appsloveworld.com/reactjs/100/7/how-to-pass-props-to-keyframes-in-styled-component-with-react

BL00MYbloomybloomberg


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