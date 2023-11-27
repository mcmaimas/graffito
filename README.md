# MOSAIC MEDIA
.dev .io .org
Until October 2025

## Functional ToDo's:
### Replace Mosaic Store with context
### Setup all post types
- DONE: Text Post
- DONE: Image Post
- DONE: Link Post
### Colors. Do I set them on the backend or should I have a function on the frontend
### Scrolling is f'd. It's laggy and not always centered
### Comment/replies

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
