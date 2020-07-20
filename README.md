 # Assignment3.2 - Frontend development 
 
 <img src="https://github.com/SISE-Web-Development-Environments/assignment-3-2-oran_chen/blob/master/download.jpg" height="80">

### Submitted by:
* Oran Shichman - id: 203388426
* Chen Galed - id: 311123541

## Updated API link:
https://app.swaggerhub.com/apis/Oranshich/Assignment3.1/1.0.2#/

## Part 3.2:
https://github.com/SISE-Web-Development-Environments/assignment-3-2-oran_chen

Info:
-----
This is the frontend of our Recipes website. It was designed and implemented to match the backend which was programmed in part 3.2 and based on the API we've created in swaggerhub for part 3.1.

We've created in advance two users, whom we've inserted to the database:
1. username: chen, password: 123456
2. username: oransh, password: Aa123456

Each of these users own 3 personal recipes and 3 family recipes.


## Changes performed in the backend part after submission (commited after Jun 8, 2020):
- Fixed cors according to Eran's instructions
- Changed cookie parameters  according to Eran's instructions
- Removed unneccesary validation for the register form in validator.js (since they are being done in the front)
- Added id parameter to the returned object in family recipes
- Added extended ingridients to family recipes
- Chneged SQL query to getRecipesByUser to full family recipes and personal recipes

