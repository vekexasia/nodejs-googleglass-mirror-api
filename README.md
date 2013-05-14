Nodejs Google Glass Api
=============================

A Nodejs library that helps Google Glass developers to perform Google Mirror Api requests.

# Big Disclaimer
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
### getContact (userAuthToken, contactId, callback)
Method that retrieves the info of a contact given the contact Id

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
*Output*: If successful, this method returns a [Contacts resource](https://developers.google.com/glass/v1/reference/contacts#resource) in the response body.

### deleteContact (userAuthToken, contactId, callback)
Method that deletes a contact 

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
*Output*: If successful, this method returns an empty response body.


### insertContact (userAuthToken, contactResource, callback)
Inserts a contact. The 2nd Parameter should be a json object. Reference can be found here https://developers.google.com/glass/v1/reference/contacts#resource

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

### listContacts (userAuthToken,  callback)
List contacts

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
*Output*: If successful, this method returns a response body with the following structure:
```json
{
  "kind": "mirror#contacts",
  "items": [
    contacts Resource
  ]
}


```
### patchContact (userAuthToken, contactId, contactResource, callback)
Inserts a contact. The 3rd Parameter should be a json object. Reference can be found here https://developers.google.com/glass/v1/reference/contacts#resource

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
*Output*: If successful, this method returns a [Contacts resource](https://developers.google.com/glass/v1/reference/contacts#resource) in the response body.



## Timeline api
### getTimeline (userAuthToken, timelineId, callback)
Retrieves a single timeline by ID.

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


### deleteTimeline (userAuthToken, timelineId, callback)
Deletes a single timeline entry 

Example: 
```javascript
mMirrorApiInstance.deleteTimeline( myToken, timelineId, function(err, data) {
  if (err) {
    console.log(err.statusCode); // err will also contain other usefull infos like response headers
    console.log(data); //string - contains the response body
  } else {
    // timeline erased.
    // data variable should be an empty string
    // ...
  }
});
```
*Output Result*: output should be empty if successfull 


### insertTimeline (userAuthToken, timelineResource, callback)
Inserts a single timeline entry. the 2nd parameter is the [timeline resource](https://developers.google.com/glass/v1/reference/timeline#resource) you would like to insert

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


### insertTimelineWithMedia (userAuthToken, timelineResource, mimeType, mediaData, callback) 
Inserts a single timeline entry along with a media entry. `mediaData` is an utf8 string representation of the video/image

Example: 
```javascript
mMirrorApiInstance.insertTimelineWithMedia(
  myToken, timelineResource, mimeType, mediaData, function(err, data) {
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


### listTimeline (userAuthToken, queryObj, callback)
List timeline items for the authenticated user. `queryObj` is a jsobj: keys and values could be evinced by reading the "Parameters" section of [this page](https://developers.google.com/glass/v1/reference/timeline/list)

Example: 
```javascript
mMirrorApiInstance.listTimeline(userAuthToken, {'maxResults':10}, function(err, data) {
    if (err) {
      console.log(err.statusCode); // err will also contain other usefull infos like response headers
      console.log(data); //string - contains the response body
    } else {
      // data contains a string that should be parsed as json
      var dataObj = JSON.parse(data);
      // the resulting object is contains an item key which is an array of timeline resource.
    }
  }
);
```
*Output Result*: If successful, this method returns a response body with the following structure:
```json
{
  "kind": "mirror#timeline",
  "nextPageToken": string,
  "items": [
    timeline Resource
  ]
}
```

### patchTimeline (userAuthToken, timelineId, timelineResource, callback)
Patches inline a timeline. You can pass a jsonobject with only the field you need to patch. see [Timeline resource](https://developers.google.com/glass/v1/reference/timeline#resource) for a list of key=>values

Example: 
```javascript
mMirrorApiInstance.patchTimeline(myToken, timelineIdToPatch, {'text':'New text for this timelineid'}, function(err, data) {
    if (err) {
      console.log(err.statusCode); // err will also contain other usefull infos like response headers
      console.log(data); //string - contains the response body
    } else {
      // data is string. Should be converted to json before using it
      var dataObj = JSON.parse(data);
      // now dataObj should be a timelineResource with the mods applied
    }
  }
);
```
*Output Result*: If successful, this method returns a [Timeline resource](https://developers.google.com/glass/v1/reference/timeline#resource) in the response body. The timeline resource should contain the patch.


## Subscriptions
### deleteSubscription  (userAuthToken, id, callback)
Deletes a subscription

Example: 
```javascript
mMirrorApiInstance.deleteSubscription(myToken, subscriptionId, function(err, data) {
    if (err) {
      console.log(err.statusCode); // err will also contain other usefull infos like response headers
      console.log(data); //string - contains the response body
    } else {
      // subscription removed data should be empty
      
    }
  }
);
```
*Output Result*: If successful, this method returns an empty response


### insertSubscription (userAuthToken, subscriptionResource, callback)
Inserts a subscription resource. The `subscriptionResource` parameter is a JsObject formatted following the doc here: https://developers.google.com/glass/v1/reference/subscriptions#resource

Example: 
```javascript
mMirrorApiInstance.insertSubscription(myToken, subscriptionResource, function(err, data) {
    if (err) {
      console.log(err.statusCode); // err will also contain other usefull infos like response headers
      console.log(data); //string - contains the response body
    } else {
      // subscription inserted data is a string and should contain the subscriptionresource 
      var dataObj = JSON.parse(data);
      
    }
  }
);
```
*Output Result*: If successful, this method returns a [Subscriptions resource](https://developers.google.com/glass/v1/reference/subscriptions#resource) in the response body.


### listSubscriptions (userAuthToken, queryObj, callback)
List subscription items for the authenticated user. The `queryObj` parameter is used to supply extra `HTTP GET` parameters to the endpoint. Valid parameters can be found [here](https://developers.google.com/glass/v1/reference/timeline/list)

Example: 
```javascript
mMirrorApiInstance.listSubscriptions(myToken, {'includeDeleted':true}, function(err, data) {
    if (err) {
      console.log(err.statusCode); // err will also contain other usefull infos like response headers
      console.log(data); //string - contains the response body
    } else {
      // data contains a custom formatted json. 
      var dataObj = JSON.parse(data);
      var timelineEntries = dataObj.items;
      // ...
    }
  }
);
```
*Output Result*: If successful, this method returns a json string formatted as follows
```json
{
  "kind": "mirror#timeline",
  "nextPageToken": string,
  "items": [
    timelineRes1,
    timelineRes2,
    ....
  ]
}
```

### updateSubscription (userAuthToken, subscriptionId, subscriptionResource, callback)
Updates the subscription  given the new resource and the `subscriptionId`

Example: 
```javascript
mMirrorApiInstance.updateSubscription(userAuthToken, subscriptionId, newSubscriptionResource, function(err, data) {
    if (err) {
      console.log(err.statusCode); // err will also contain other usefull infos like response headers
      console.log(data); //string - contains the response body
    } else {
      // subscription updated data is a string and should contain the subscriptionresource 
      var dataObj = JSON.parse(data);
      
    }
  }
);
```


## Locations

### getLocation (userAuthToken, locationId, callback)
Retrieves a single location by ID.

Example: 
```javascript
mMirrorApiInstance.getLocation(userAuthToken, locationId, function(err, data) {
    if (err) {
      console.log(err.statusCode); // err will also contain other usefull infos like response headers
      console.log(data); //string - contains the response body
    } else {
      // subscription updated data is a string and should contain the subscriptionresource 
      var dataObj = JSON.parse(data);
      
    }
  }
);
```
*Output Result*: If successful, this method returns a [Locations resource](https://developers.google.com/glass/v1/reference/locations#resource) in the response body.


### listLocations (userAuthToken, queryObj, callback)
List location items for the authenticated user. The `queryObj` is unused now. Just pass null

Example: 
```javascript
mMirrorApiInstance.listLocations(myToken,  function(err, data) {
    if (err) {
      console.log(err.statusCode); // err will also contain other usefull infos like response headers
      console.log(data); //string - contains the response body
    } else {
      // data contains a custom formatted json. 
      var dataObj = JSON.parse(data);
      var timelineEntries = dataObj.items;
      // ...
    }
  }
);
```
*Output Result*: If successful, this method returns a json string formatted as follows
```json
{
  "kind": "mirror#locationsList",
  "items": [
    locationResource1,
    locationResource2,
    ....
  ]
}
```

## Timeline Attachments

### getTimelineAttachment (userAuthToken, timelineId, attachmentId, callback)
Retrieves an attachment on a timeline item by item ID and attachment ID.

Example: 
```javascript
mMirrorApiInstance.getTimelineAttachment(userAuthToken, timelineId, attachmentId, function(err, data) {
    if (err) {
      console.log(err.statusCode); // err will also contain other usefull infos like response headers
      console.log(data); //string - contains the response body
    } else {
      // data contains a custom formatted json. 
      var dataObj = JSON.parse(data);
      var contentUrl = dataObj.contentUrl; // the url of the content
      // ...
    }
  }
);
```
*Output Result*: If successful, this method returns a json string formatted as follows
```json
{
  "id": string,
  "contentType": string,
  "contentUrl": string,
  "isProcessingContent": boolean
}
```


### deleteTimelineAttachment (userAuthToken, timelineId, attachmentId, callback)
Deletes an attachment from a timeline item.

Example: 
```javascript
mMirrorApiInstance.deleteTimelineAttachment(userAuthToken, timelineId, attachmentId, function(err, data) {
    if (err) {
      console.log(err.statusCode); // err will also contain other usefull infos like response headers
      console.log(data); //string - contains the response body
    } else {
      // the attachment should be now deleted. data should be empty.
      // ...
    }
  }
);
```
*Output Result*: If successful, this method returns an empty response

### insertTimelineAttachment (userAuthToken, timelineId, mimeType, attachment, callback)
Adds a new attachment to a timeline item.
 * Maximum file size: 10MB
 * Accepted Media MIME types: image/* , audio/* , video/*

Example: 
```javascript
mMirrorApiInstance.insertTimelineAttachment(userAuthToken, timelineId, 'image/jpeg', imageData, function(err, data) {
    if (err) {
      console.log(err.statusCode); // err will also contain other usefull infos like response headers
      console.log(data); //string - contains the response body
    } else {
      // the return data should be a custom formatted json
      // ...
    }
  }
);
```
*Output Result*: If successful, this method returns a custom formatted json
```json
{
  "id": string,
  "contentType": string,
  "contentUrl": string,
  "isProcessingContent": boolean
}
```

### listTimelineAttachment (userAuthToken, timelineId, callback)
Returns a list of attachments for a timeline item.

Example: 
```javascript
mMirrorApiInstance.listTimelineAttachment(userAuthToken, timelineId, function(err, data) {
    if (err) {
      console.log(err.statusCode); // err will also contain other usefull infos like response headers
      console.log(data); //string - contains the response body
    } else {
      // the return data should be a custom formatted json
      // each attachment should be accessed using the dataObj.items array
      var dataObj = JSON.parse(data);
      dataObj.items[0]; // First item
    }
  }
);
```
*Output Result*: If successful, this method returns a custom formatted json
```json
{
  "kind": "mirror#attachmentsList",
  "items": [
    {
      "id": string,
      "contentType": string,
      "contentUrl": string,
      "isProcessingContent": boolean
    },
    {
      "id": string,
      "contentType": string,
      "contentUrl": string,
      "isProcessingContent": boolean
    },
    ...
  ]
}
```

# Todo
 * Get Google glass so that I can test the library
 * test the library :)

# Authors
 * Andrea Baccega <me@andreabaccega.com> 
