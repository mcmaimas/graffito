# MOSAIC MEDIA
.dev .io .org
Until October 2025
update: there is some actors agency out of LA that is called mosaic media so I may have wasted $200 on domains

## Styles ToDo's
### Create new post scrolling issue
### Post Preview content should be center better

## Functional ToDo's:
### Replace Mosaic Store with context
### Comment/replies
- Still a long way before i care about other peoples interaction

### Recently Done:
- All Post Types are loosely supported
- colors for square freshness/staleness
- Navigating is fine

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
