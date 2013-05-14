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
mMirrorApiInstance.insertContact( 
  myToken, 
  {
    'id':'abaccega', 
    'displayName':'Andrea Baccega', 
    'imageUrls': ['https://plus.google.com/s2/photos/profile/109217393200753135791?sz=75"']
  
  }, 
  function(err, data) {
    if (err) {
      console.log(err.statusCode); // err will also contain other usefull infos like response headers
      console.log(data); //string - contains the response body
    } else {
      // contact inserted.
      // since data is string 
      var dataObj = JSON.parse(data);
      // ...
    }
  }
);
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

**patchContact**: Inserts a contact. The 3rd Parameter should be a json object. Reference can be found here https://developers.google.com/glass/v1/reference/contacts#resource
Example: 
```javascript
mMirrorApiInstance.patchContact( 
  myToken,
  'abaccega', // the contact id //
  {
    'displayName':'Mr. Andrea Baccega', 
  }, 
  function(err, data) {
    if (err) {
      console.log(err.statusCode); // err will also contain other usefull infos like response headers
      console.log(data); //string - contains the response body
    } else {
      // contact patched.
      // since data is string 
      var dataObj = JSON.parse(data);
      // ...
    }
  }
);
```

## Timeline api
**getTimeline**: Retrieves a single timeline by ID.
Example: 
```javascript
mMirrorApiInstance.getTimeline( myToken, timelineId, function(err, data) {
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
*Output Result*: If successful, this method returns a [Timeline resource](https://developers.google.com/glass/v1/reference/timeline#resource) in the response body.


**deleteTimeline**: Deletes a single timeline entry 
Example: 
```javascript
mMirrorApiInstance.deleteTimeline( myToken, timelineId, function(err, data) {
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
*Output Result*: output should be empty if successfull 


**insertTimeline**: Inserts a single timeline entry. the 2nd parameter is the [timeline resource](https://developers.google.com/glass/v1/reference/timeline#resource) you would like to insert
Example: 
```javascript
mMirrorApiInstance.insertTimeline(
  myToken, 
  {
    "text": "Hello world",
    "menuItems": [
      { "action": "REPLY" },
      {
        "action": "CUSTOM",
        "id": "complete"
        "values": [{
          "displayName": "Complete",
          "iconUrl": "http://example.com/icons/complete.png"
        }]
      }
    ]
  }, function(err, data) {
    if (err) {
      console.log(err.statusCode); // err will also contain other usefull infos like response headers
      console.log(data); //string - contains the response body
    } else {
      // timeline added. dataStr should contain a timeline resource which should be ~ equal to the one we passed.
      // since data is string 
      var dataObj = JSON.parse(data);
      // ...
    }
  }
);
```
*Output Result*: If successful, this method returns a [Timeline resource](https://developers.google.com/glass/v1/reference/timeline#resource) in the response body.


**insertTimelineWithMedia**: Inserts a single timeline entry along with a media entry. 
Example: 
```javascript
mMirrorApiInstance.insertTimelineWithMedia(
  myToken, timelineResource, mimeType, imageData, function(err, data) {
    if (err) {
      console.log(err.statusCode); // err will also contain other usefull infos like response headers
      console.log(data); //string - contains the response body
    } else {
      // timeline added. dataStr should contain a timeline resource which should be ~ equal to the one we passed.
      // since data is string 
      var dataObj = JSON.parse(data);
      // ...
    }
  }
);
```
*Output Result*: If successful, this method returns a [Timeline resource](https://developers.google.com/glass/v1/reference/timeline#resource) in the response body.


**listTimeline**: List timeline items for the authenticated user. `queryObj` is a jsobj: keys and values could be evinced by reading the "Parameters" section of [this page](https://developers.google.com/glass/v1/reference/timeline/list)
Example: 
```javascript
mMirrorApiInstance.insertTimelineWithMedia(myToken, timelineResource, mimeType, imageData, function(err, data) {
    if (err) {
      console.log(err.statusCode); // err will also contain other usefull infos like response headers
      console.log(data); //string - contains the response body
    } else {
      // timeline added. dataStr should contain a timeline resource which should be ~ equal to the one we passed.
      // since data is string 
      var dataObj = JSON.parse(data);
      // ...
    }
  }
);
```
*Output Result*: If successful, this method returns an object containing `nextPageToken` and `items` (which is an array of [Timeline resource](https://developers.google.com/glass/v1/reference/timeline#resource) ) in the response body.

