# FS blogs

In part 3 I had to modify the files "api_ch3.test.js" and "helper.js" because my routes were a little different
- To create a new user my route is: /api/users/new
- To view the authors my route is: /api/blogs/authors
- To login my route is: /api/users/login

In part 4 I had to modifiy the files "api_ch3.test.js" because the tests were not sending the tokens, I basically only added this to the axios requests:
```
 headers: { Authorization: `Bearer ${integrationToken}` } 
 ```