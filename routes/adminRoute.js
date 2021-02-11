// const express = require('express');
// const { check, validationResult } = require('express-validator');

// const { BlobServiceClient } = require('@azure/storage-blob');
// const uuidv1 = require('uuid/dist/v1');

// const azureAccountName = 'ttcphotos';
// const azureKey = 'tebOthY59ahNhlfyByS+T5mU8Q5/qrWrZtYoPK7g0u/d7GZxiDvpsDNeMJlK4vWYzSpKhrFkIxfi5BLbRIjeTg==';
// const connectionString = 'DefaultEndpointsProtocol=https;AccountName=ttcphotos;AccountKey=tebOthY59ahNhlfyByS+T5mU8Q5/qrWrZtYoPK7g0u/d7GZxiDvpsDNeMJlK4vWYzSpKhrFkIxfi5BLbRIjeTg==;EndpointSuffix=core.windows.net';

// const fs = require('fs');
// const path = require('path');

// const router = express.Router();

// /* Handler function to wrap each route. */
// function asyncHandler(cb)
// {
//   return async(req, res, next) => {
//     try 
//     {
//       await cb(req, res, next)
//     } 
//     catch(error) // Catch error thrown
//     {
//       // send error to global error handler
//       next(error);
//     }
//   }
// }

// async function execute() 
// {
	
//     console.log('Azure Blob storage v12 - JavaScript quickstart sample');

    

// }



// /* GET cheesecake type route will show the list of cheesecake types in the database. */
// router.post('/api/uploadpicture', async (req, res) => 
// {
    
//     // Get the user from the request body.
//     const data = req.body;

//     // Create the BlobServiceClient object which will be used to create a container client
//     const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

//     // Get a reference to a container
//     const containerClient = blobServiceClient.getContainerClient('photos');

//     console.log('\nListing blobs...');
//     // List the blob(s) in the container.
//     for await (const blob of containerClient.listBlobsFlat()) 
//     {
//         console.log('\t', blob.name);
//     }

//     console.log('\nCreating new blob...');

//     var matches = data.pictureData.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
//     var type = matches[1];
//     var buffer = new Buffer.from(matches[2], 'base64');

//     const blockBlobClient = containerClient.getBlockBlobClient(data.fileName);
//     await blockBlobClient.upload(buffer, buffer.byteLength);
//     await blockBlobClient.setHTTPHeaders({'blobContentType': type});
//     console.log(blockBlobClient.url);
    

//     res.status(200).end();
    
// });

// // export router

// module.exports = router;