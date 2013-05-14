var rest   = require('restler');
var url    = require('url');
var MirrorApi = function() {
	function MirrorApi(userAgent) {
		this.userAgent = userAgent;
    }

// Contacts stuff
    /**
     * Retrieves the infos from a contact.
     * @param {string} token - the bearer token
     * @param {string} id - the id of the contact you want to get the info from
     * @param {function} callback - (err, data)  . If error is null then it suceeded. data will contain the resulting data
     */
    MirrorApi.prototype.getContact = function (token, id, callback) {
        rest.get('https://www.googleapis.com/mirror/v1/contacts/'+id, {
        	'headers': {
        		'User-Agent': this.userAgent,
        		'Authorization': 'Bearer '+token
        	}
        }).on('complete',function(data, response) {
        	if (response.statusCode == 200) {
        		process.nextTick(function() {
        			callback(null, data);	
        		});
        	} else {
        		process.nextTick(function() {
        			callback(response, data); });
        	}
        })
    };

    /**
     * Deletes a contact
     * @param {string} token - the bearer token
     * @param {string} id - the id of the contact you want to delete
     * @param {function} callback - (err, data)  . If error is null then it suceeded. data will contain the returning data from the google endpoint.

     */
    MirrorApi.prototype.deleteContact = function (token, id, callback) {
        rest.del('https://www.googleapis.com/mirror/v1/contacts/'+id, {
        	'headers': {
        		'User-Agent': this.userAgent,
        		'Authorization': 'Bearer '+token
        	}
        }).on('complete',function(data, response) {
        	if (response.statusCode == 200) {
        		process.nextTick(function() {
        			callback(null, data);	
        		})
        	} else {
        		callback(response, data);
        	}
        })
    };

    /**
     * Inserts a contact
     * @param {string} token - the bearer token
     * @param {object} contactResource - the contact resource object as specified by google here: https://developers.google.com/glass/v1/reference/contacts#resource
     * @param {function} callback - (err, data)  . If error is null then it suceeded. data will contain the returning data from the google endpoint.
     */
    MirrorApi.prototype.insertContact = function (token, contactResource, callback) {
        rest.postJson('https://www.googleapis.com/mirror/v1/contacts/', contactResource, {
        	'headers': {
        		'User-Agent': this.userAgent,
        		'Authorization': 'Bearer '+token
        	}
        }).on('complete',function(data, response) {
        	if (response.statusCode == 201) {
        		process.nextTick(function() {
        			callback(null, data);	
        		})
        	} else {
        		callback(response, data);
        	}
        })
    };

    /**
     * List contacts for the authenticated user.
     * @param {string} token - the bearer token
     * @param {function} callback - (err, data)  . If error is null then it suceeded. data will contain the resulting data
     */
    MirrorApi.prototype.listContacts = function (token,  callback) {
        rest.get('https://www.googleapis.com/mirror/v1/contacts', {
        	'headers': {
        		'User-Agent': this.userAgent,
        		'Authorization': 'Bearer '+token
        	}
        }).on('complete',function(data, response) {
        	if (response.statusCode == 200) {
        		process.nextTick(function() {
        			callback(null, data);	
        		});
        	} else {
        		process.nextTick(function() {
        			callback(response, data);	
        		});
        	}
        })
    };

	/**
     * Patches a contact
     * @param {string} token - the bearer token
     * @param {string} id - the id of the contact resource you want to patch
     * @param {object} contactResource - the contact resource object as specified by google here: https://developers.google.com/glass/v1/reference/contacts#resource
     * @param {function} callback - (err, data)  . If error is null then it suceeded. data will contain the returning data from the google endpoint.
     */
    MirrorApi.prototype.patchContact = function (token, id, contactResource, callback) {
        rest.request('https://www.googleapis.com/mirror/v1/contacts/'+id, {
        	'headers': {
        		'User-Agent': this.userAgent,
        		'Authorization': 'Bearer '+token,
        		'Content-Type': 'application/json'
        	},
        	'method': 'patch',
        	'data': JSON.stringify(contactResource)
        }).on('complete',function(data, response) {
        	if (response.statusCode == 201) {
        		process.nextTick(function() {
        			callback(null, data);	
        		})
        	} else {
        		callback(response, data);
        	}
        })
    };

    /**
     * Updates a contact in place.
     * @param {string} token - the bearer token
     * @param {string} contactId - The ID of the contact.
     * @param {object} contactResource - Contact object.
     * @param {function} callback - (err, data)  . If error is null then it suceeded. data will contain the resulting data
     */
    MirrorApi.prototype.updateContact = function (token, contactId, contactResource, callback) {
        rest.postJson('https://www.googleapis.com/mirror/v1/contacts/'+contactId, {
            'headers': {
                'User-Agent': this.userAgent,
                'Authorization': 'Bearer '+token
            }
        }).on('complete',function(data, response) {
            if (response.statusCode == 200) {
                process.nextTick(function() {
                    callback(null, data);   
                });
            } else {
                process.nextTick(function() {
                    callback(response, data);   
                });
            }
        })
    };


/// Timeline stuff

	/**
     * Retrieves the a single timeline by ID.
     * @param {string} token - the bearer token
     * @param {string} id - the id of the timeline item you want to get the info from
     * @param {function} callback - (err, data)  . If error is null then it suceeded. data will contain the resulting data
     */
    MirrorApi.prototype.getTimeline = function (token, id, callback) {
        rest.get('https://www.googleapis.com/mirror/v1/timeline/'+id, {
        	'headers': {
        		'User-Agent': this.userAgent,
        		'Authorization': 'Bearer '+token
        	}
        }).on('complete',function(data, response) {
        	if (response.statusCode == 200) {
        		process.nextTick(function() {
        			callback(null, data);	
        		});
        	} else {
        		process.nextTick(function() {
        			callback(response, data);	
        		});
        	}
        })
    };

    /**
     * Deletes a timeline
     * @param {string} token - the bearer token
     * @param {string} id - the id of the timeline you want to delete
     * @param {function} callback - (err, data)  . If error is null then it suceeded. data will contain the returning data from the google endpoint.

     */
    MirrorApi.prototype.deleteTimeline = function (token, id, callback) {
        rest.del('https://www.googleapis.com/mirror/v1/timeline/'+id, {
        	'headers': {
        		'User-Agent': this.userAgent,
        		'Authorization': 'Bearer '+token
        	}
        }).on('complete',function(data, response) {
        	if (response.statusCode == 200) {
        		process.nextTick(function() {
        			callback(null, data);	
        		})
        	} else {
        		callback(response, data);
        	}
        })
    };

    /**
     * Inserts a timerline object
     * @param {string} token - the bearer token
     * @param {object} timelineResource - the timeline resource object as specified by google here: https://developers.google.com/glass/v1/reference/contacts#resource
     * @param {function} callback - (err, data)  . If error is null then it suceeded. data will contain the returning data from the google endpoint.
     */
    MirrorApi.prototype.insertTimeline = function (token, timelineResource, callback) {
        rest.postJson('https://www.googleapis.com/mirror/v1/timeline/', timelineResource, {
        	'headers': {
        		'User-Agent': this.userAgent,
        		'Authorization': 'Bearer '+token
        	}
        }).on('complete',function(data, response) {
        	if (response.statusCode == 201) {
        		process.nextTick(function() {
        			callback(null, data);	
        		})
        	} else {
        		callback(response, data);
        	}
        })
    };

    /**
     * Inserts a timerline object with media
     * @param {string} token - the bearer token
     * @param {object} timelineResource - the timeline resource object as specified by google here: https://developers.google.com/glass/v1/reference/contacts#resource
     * @param {string} mimeType - the mimetype of the thing to upload
     * @param {string} mediaData - the utf8 string representation of the media to upload.
     * @param {function} callback - (err, data)  . If error is null then it suceeded. data will contain the returning data from the google endpoint.
     */
    MirrorApi.prototype.insertTimelineWithMedia = function (token, timelineResource, mimeType, mediaData, callback) {
    	var multipartData = "--gshab\n"; //gsab = Google Should Hire A. B. :) 
    	multipartData += "Content-Type: application/json; charset=UTF-8\n\n";
    	multipartData += JSON.stringify(timelineResource)+"\n\n";
    	multipartData += "--gshab\n"
    	multipartData += "Content-Type: "+mimeType+"\n\n";
    	multipartData += mediaData+"\n\n";
    	multipartData += "--gshab--"
        rest.request('https://www.googleapis.com/upload/mirror/v1/timeline?uploadType=multipart', {
        	'headers': {
        		'User-Agent': this.userAgent,
        		'Authorization': 'Bearer '+token,
        		'Content-Type': 'multipart/related; boundary="gshab"',
        	},
        	'data': multipartData
        }).on('complete',function(data, response) {
        	if (response.statusCode == 201) {
        		process.nextTick(function() {
        			callback(null, data);	
        		})
        	} else {
        		callback(response, data);
        	}
        })
    };

    /**
     * List timeline items for the authenticated user.
     * @param {string} token - the bearer token
     * @param {object} queryObj - if needed you can supply extra get parameters. this should be an object like {'param1':'value', 'param2':'value'}  - Reference: https://developers.google.com/glass/v1/reference/timeline/list
     * @param {function} callback - (err, data)  . If error is null then it suceeded. data will contain the resulting data
     */
    MirrorApi.prototype.listTimeline = function (token, queryObj, callback) {
        var urlToCall = url.format({
            'protocol': 'https',
            'host':     'www.googleapis.com',
            'pathname': '/mirror/v1/timeline',
            'query':    queryObj
        });
        rest.get(urlToCall, {
        	'headers': {
        		'User-Agent': this.userAgent,
        		'Authorization': 'Bearer '+token
        	}
        }).on('complete',function(data, response) {
        	if (response.statusCode == 200) {
        		process.nextTick(function() {
        			callback(null, data);	
        		});
        	} else {
        		process.nextTick(function() {
        			callback(response, data);	
        		});
        	}
        })
    };

	/**
     * Patches a timeline
     * @param {string} token - the bearer token
     * @param {string} id - the id of the timelineresource you want to patch
     * @param {object} timelineResource - the timeline resource object as specified by google here: https://developers.google.com/glass/v1/reference/contacts#resource
     * @param {function} callback - (err, data)  . If error is null then it suceeded. data will contain the returning data from the google endpoint.
     */
    MirrorApi.prototype.patchTimeline = function (token, id, timelineResource, callback) {
        rest.request('https://www.googleapis.com/mirror/v1/timeline/'+id, {
        	'headers': {
        		'User-Agent': this.userAgent,
        		'Authorization': 'Bearer '+token,
        		'Content-Type': 'application/json'
        	},
        	'method': 'patch',
        	'data': JSON.stringify(contactResource)
        }).on('complete',function(data, response) {
        	if (response.statusCode == 201) {
        		process.nextTick(function() {
        			callback(null, data);	
        		})
        	} else {
        		callback(response, data);
        	}
        })
    };

// Subscription stuff.
    /**
     * Deletes a subscription
     * @param {string} token - the bearer token
     * @param {string} id - the id of the subscription you want to delete
     * @param {function} callback - (err, data)  . If error is null then it suceeded. data will contain the returning data from the google endpoint.

     */
    MirrorApi.prototype.deleteSubscription = function (token, id, callback) {
        rest.del('https://www.googleapis.com/mirror/v1/subscriptions/'+id, {
            'headers': {
                'User-Agent': this.userAgent,
                'Authorization': 'Bearer '+token
            }
        }).on('complete',function(data, response) {
            if (response.statusCode == 200) {
                process.nextTick(function() {
                    callback(null, data);   
                })
            } else {
                callback(response, data);
            }
        })
    };

    /**
     * Inserts a subscription object
     * @param {string} token - the bearer token
     * @param {object} subscriptionResource - the subscription resource object as specified by google here: https://developers.google.com/glass/v1/reference/subscriptions#resource
     * @param {function} callback - (err, data)  . If error is null then it suceeded. data will contain the returning data from the google endpoint.
     */
    MirrorApi.prototype.insertSubscription = function (token, subscriptionResource, callback) {
        rest.postJson('https://www.googleapis.com/mirror/v1/subscriptions/', subscriptionResource, {
            'headers': {
                'User-Agent': this.userAgent,
                'Authorization': 'Bearer '+token
            }
        }).on('complete',function(data, response) {
            if (response.statusCode == 201) {
                process.nextTick(function() {
                    callback(null, data);   
                })
            } else {
                callback(response, data);
            }
        })
    };
    
    /**
     * List subscription items for the authenticated user.
     * @param {string} token - the bearer token
     * @param {object} queryObj - if needed you can supply extra get parameters. this should be an object like {'param1':'value', 'param2':'value'}  - Reference: https://developers.google.com/glass/v1/reference/timeline/list
     * @param {function} callback - (err, data)  . If error is null then it suceeded. data will contain the resulting data
     */
    MirrorApi.prototype.listSubscriptions = function (token, queryObj, callback) {
        var urlToCall = url.format({
            'protocol': 'https',
            'host':     'www.googleapis.com',
            'pathname': '/mirror/v1/subscriptions',
            'query':    queryObj
        });
        rest.get(urlToCall, {
            'headers': {
                'User-Agent': this.userAgent,
                'Authorization': 'Bearer '+token
            }
        }).on('complete',function(data, response) {
            if (response.statusCode == 200) {
                process.nextTick(function() {
                    callback(null, data);   
                });
            } else {
                process.nextTick(function() {
                    callback(response, data);   
                });
            }
        })
    };


    /**
     * Updates a subscription
     * @param {string} token - the bearer token
     * @param {string} id - the id of the subscription resource you want to update
     * @param {object} subscriptionResource - the subscription resource object as specified by google here: https://developers.google.com/glass/v1/reference/contacts#resource
     * @param {function} callback - (err, data)  . If error is null then it suceeded. data will contain the returning data from the google endpoint.
     */
    MirrorApi.prototype.updateSubscription = function (token, id, subscriptionResource, callback) {
        rest.put('https://www.googleapis.com/mirror/v1/subscriptions/'+id, {
            'headers': {
                'User-Agent': this.userAgent,
                'Authorization': 'Bearer '+token,
                'Content-Type': 'application/json'
            },
            'data': JSON.stringify(contactResource)
        }).on('complete',function(data, response) {
            if (response.statusCode == 201) {
                process.nextTick(function() {
                    callback(null, data);   
                })
            } else {
                callback(response, data);
            }
        })
    };
   

// Locations stuff
    /**
     * Retrieves the a single location by ID.
     * @param {string} token - the bearer token
     * @param {string} id - the id of the location item you want to get the info from
     * @param {function} callback - (err, data)  . If error is null then it suceeded. data will contain the resulting data
     */
    MirrorApi.prototype.getLocation = function (token, id, callback) {
        rest.get('https://www.googleapis.com/mirror/v1/locations/'+id, {
            'headers': {
                'User-Agent': this.userAgent,
                'Authorization': 'Bearer '+token
            }
        }).on('complete',function(data, response) {
            if (response.statusCode == 200) {
                process.nextTick(function() {
                    callback(null, data);   
                });
            } else {
                process.nextTick(function() {
                    callback(response, data);   
                });
            }
        })
    };

    /**
     * List locations items for the authenticated user.
     * @param {string} token - the bearer token
     * @param {object} queryObj - (can be null) - if needed you can supply extra get parameters. this should be an object like {'param1':'value', 'param2':'value'}  - Reference: https://developers.google.com/glass/v1/reference/timeline/list
     * @param {function} callback - (err, data)  . If error is null then it suceeded. data will contain the resulting data
     */
    MirrorApi.prototype.listLocations = function (token, queryObj, callback) {
        if (typeof(callback) === 'undefined')  {
            callback = queryObj;
            queryObj = null;
        }
        var urlToCall = url.format({
            'protocol': 'https',
            'host':     'www.googleapis.com',
            'pathname': '/mirror/v1/locations',
            'query':    queryObj
        });
        rest.get(urlToCall, {
            'headers': {
                'User-Agent': this.userAgent,
                'Authorization': 'Bearer '+token
            }
        }).on('complete',function(data, response) {
            if (response.statusCode == 200) {
                process.nextTick(function() {
                    callback(null, data);   
                });
            } else {
                process.nextTick(function() {
                    callback(response, data);   
                });
            }
        })
    };

// Timeline attachments
    
    /**
     * Retrieves an attachment on a timeline item by item ID and attachment ID
     * @param {string} token - the bearer token
     * @param {string} itemId - The ID of the timeline item the attachment belongs to.
     * @param {string} attachmentId - The ID of the timeline item the attachment belongs to.
     * @param {function} callback - (err, data)  . If error is null then it suceeded. data will contain the resulting data
     */
    MirrorApi.prototype.getTimelineAttachment = function (token, itemId, attachmentId, callback) {
        rest.get('https://www.googleapis.com/mirror/v1/timeline/'+itemId+'/attachments/'+attachmentId, {
            'headers': {
                'User-Agent': this.userAgent,
                'Authorization': 'Bearer '+token
            }
        }).on('complete',function(data, response) {
            if (response.statusCode == 200) {
                process.nextTick(function() {
                    callback(null, data);   
                });
            } else {
                process.nextTick(function() {
                    callback(response, data);   
                });
            }
        })
    };

    /**
     * Deletes an attachment
     * @param {string} token - the bearer token
     * @param {string} itemId - The ID of the timeline item the attachment belongs to.
     * @param {string} attachmentId - The ID of the timeline item the attachment belongs to.
     * @param {function} callback - (err, data)  . If error is null then it suceeded. data will contain the returning data from the google endpoint.
     */
    MirrorApi.prototype.deleteTimelineAttachment = function (token, itemId, attachmentId, callback) {
        rest.del('https://www.googleapis.com/mirror/v1/timeline/'+itemId+'/attachments/'+attachmentId, {
            'headers': {
                'User-Agent': this.userAgent,
                'Authorization': 'Bearer '+token
            }
        }).on('complete',function(data, response) {
            if (response.statusCode == 200) {
                process.nextTick(function() {
                    callback(null, data);   
                })
            } else {
                callback(response, data);
            }
        })
    };

    /**
     * Inserts timeline attachment
     * @param {string} token - the bearer token
     * @param {string} itemId - The ID of the timeline item the attachment belongs to.
     * @param {string} mimeType - the mime type of the attachemnt accepted are image/*, audio/*, video/*
     * @param {string} attachment - the utf8 string representation of the data.
     * @param {function} callback - (err, data)  . If error is null then it suceeded. data will contain the returning data from the google endpoint.
     */
    MirrorApi.prototype.insertTimelineAttachment = function (token, itemId, mimeType, attachment, callback) {
        rest.post('https://www.googleapis.com/mirror/v1/timeline/'+itemId+'/attachments', {
            'headers': {
                'User-Agent': this.userAgent,
                'Content-Type': mimeType,
                'Authorization': 'Bearer '+token
            },
            'data': attachment
        }).on('complete',function(data, response) {
            if (response.statusCode == 201) {
                process.nextTick(function() {
                    callback(null, data);   
                })
            } else {
                callback(response, data);
            }
        })
    };

    /**
     * List timeline attachment
     * @param {string} token - the bearer token
     * @param {string} itemId - The ID of the timeline item the attachment belongs to.
     * @param {function} callback - (err, data)  . If error is null then it suceeded. data will contain the resulting data
     */
    MirrorApi.prototype.listTimelineAttachment = function (token, itemId, callback) {
        rest.get('https://www.googleapis.com/mirror/v1/timeline/'+itemId+'/attachments', {
            'headers': {
                'User-Agent': this.userAgent,
                'Authorization': 'Bearer '+token
            }
        }).on('complete',function(data, response) {
            if (response.statusCode == 200) {
                process.nextTick(function() {
                    callback(null, data);   
                });
            } else {
                process.nextTick(function() {
                    callback(response, data);   
                });
            }
        })
    };

    return MirrorApi;
}();

module.exports = MirrorApi;
