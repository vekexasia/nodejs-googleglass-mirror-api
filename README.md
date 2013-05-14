Nodejs Google Glass Api
=============================

A Nodejs library that helps Google Glass developers to perform Google Mirror Api requests.

# Big Disclaymer
Since i don't own Google Glass :(  I was unable to trigger even a single test to try out the library. I wrote it down by strictly following the [Official documentation](https://developers.google.com/glass/v1/reference/)

## Installation ##
Since this was not tested I didn't feel right to make it available through `npm`. 

You can still install it by downloading the [zip archive](https://github.com/vekexasia/nodejs-googleglass-mirror-api/archive/master.zip) or by triggering the following shell commands
```bash
cd your/project/root/foolder
cd node_modules
git clone git://github.com/vekexasia/nodejs-googleglass-mirror-api.git mirrorapi
```
once installed inside node_modules you can require it by doing
```javascript
var MirrorApi = require('mirrorapi');
var mApiInstance = new MirrorApi('my user agent');
```

## SourceCode
The code is all located inside the index.js file. All methods are well documented and you can take a look at the code if something is unclear.

# Documentation
## Intro
You should take care of the authentication flow by yourself. There are some good node.js oauth2 modules out there. :)

## Contacts api
**getContact**: Retrieves the info from a contact
Example: 
```javascript
mMirrorApiInstance.getContact( myToken, contactId, function(err, data) {
  if (err) {
    console.log(err.statusCode); // err will also contain other usefull infos like response headers
    console.log(data); //string - contains the response body
  } else {
    // since data is string 
    var dataObj = JSON.parse(data);
    // ...
  }
});
```

**deleteContact**: Deletes a contact 
Example: 
```javascript
mMirrorApiInstance.deleteContact( myToken, contactId, function(err, data) {
  if (err) {
    console.log(err.statusCode); // err will also contain other usefull infos like response headers
    console.log(data); //string - contains the response body
  } else {
    // contact erased.
    // since data is string 
    var dataObj = JSON.parse(data);
    // ...
  }
});
```

**insertContact**: Inserts a contact. The 2nd Parameter should be a json object. Reference can be found here https://developers.google.com/glass/v1/reference/contacts#resource
Example: 
```javascript
mMirrorApiInstance.insertContact( myToken, {'id':'abaccega', 'displayName':'Andrea Baccega', 'imageUrls': ['https://plus.google.com/s2/photos/profile/109217393200753135791?sz=75"']}, function(err, data) {
  if (err) {
    console.log(err.statusCode); // err will also contain other usefull infos like response headers
    console.log(data); //string - contains the response body
  } else {
    // contact inserted.
    // since data is string 
    var dataObj = JSON.parse(data);
    // ...
  }
});
```

**listContacts**: List contacts
Example: 
```javascript
mMirrorApiInstance.listContacts( myToken, function(err, data) {
  if (err) {
    console.log(err.statusCode); // err will also contain other usefull infos like response headers
    console.log(data); //string - contains the response body
  } else {
    // since data is string 
    var dataObj = JSON.parse(data);
    // ...
  }
});
```
