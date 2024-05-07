


'NODEJS LEARNING COMPLETE PROJECT'

# Node.js Image Upload with Cloudinary Backup: Ensuring Data Integrity and Availability"

where users can upload images. To ensure data integrity and availability, I'm implementing a strategy where uploaded images are initially stored in a temporary folder (public/temp) on the server. This step acts as a safety net in case a user loses their internet connection during the upload process.

Once the images are safely stored in the temporary folder on the server, they are then asynchronously uploaded to Cloudinary for permanent storage. Cloudinary serves as our cloud storage solution, providing scalability and reliability for hosting these images.

This approach helps mitigate potential data loss or interruptions caused by network issues, ensuring a seamless experience for users when uploading their images."

'NODEJS COMPLETE LEARNING PROJECT'

> > > > > > > cb60a696c3afcc0bd128ae1dc256eb1d4a2b69c1

# Process

In Node.js, the process object is a global object provided by the Node.js runtime environment. It provides information and control over the current Node.js process. Some of the commonly used properties and methods of the process

# "Managing Cookies in Express: Simplified CRUD Operations"

1.Accessing Cookies from Server: You can read cookies sent by the user's browser.

2.Setting Cookies from Server: You can send new or updated cookies back to the browser.

3.CRUD Operations on Cookies: You can create, read, update, or delete cookies from the server.

4.Secure Cookies: You can make cookies secure so only the server can access or delete them.

# Stack trace

Stack traces in JavaScript provide critical insights into program errors. They show the sequence of function calls leading to an error, with the topmost frame indicating the error location. Each frame includes context like function names and line numbers. Understanding stack traces is essential for debugging and pinpointing issues accurately, aiding in the resolution of errors effectively.

# plugins

In the context of Mongoose, a plugin is a reusable piece of Mongoose schema middleware that adds additional functionality to your Mongoose models.

# Cryptography

bcrypt ensures robust password storage by hashing passwords, while jsonwebtoken provides secure token-based authentication and data exchange in web applications, bolstering overall system security.

# Mongoose hooks

Mongoose hooks are functions that allow you to execute custom code at specific points in the lifecycle of a Mongoose model. These hooks enable you to perform actions such as validation, modification, or logging before or after certain operations on the model, such as saving, updating, or removing documents.

# Bearer Token

Bearer Token JWT is a JWT used as an access token in token-based authentication schemes, where the token is included in the Authorization header of HTTP requests to authenticate users.

# schema.methods

In Mongoose, schema.methods is a property that allows you to add custom instance methods to your Mongoose model. Instance methods are methods that are available on individual documents created from your model. These methods are useful for performing operations specific to individual documents, such as manipulating data, performing calculations, or interacting with related documents.

# Multer

We're using multer middleware to handle file uploads. The uploaded files are temporarily stored in the 'uploads/' directory on the local server.

When a file is uploaded, we first store it temporarily on the local server (Step 1).

Then, we use the Cloudinary SDK to upload the file to Cloudinary (Step 2).

After the file is successfully uploaded to Cloudinary, we delete the temporary file from the local server using fs.unlinkSync(localFilePath).

Finally, we send a response with the Cloudinary upload response to the client.

# Route declaration

app.use("api/v1/users", userRouter)
When request goes to any URL and if the prefix of url will be the first arg we are passing (for ex. "api/v1/users") then the control will be taken by userRouter which is passed as a second argument.

# some facts

When in Controlers we req.body from user that not present in user schema , so in this scenario backend is asking for help from frontend , so what backend req.body that not present in schema that developer needs to send in body while hitting the endpoint.
For example: change password , where backend request for old password and new password from the user to comapsre the password which is store in database and change the password.

# { new: true }

In Mongoose, { new: true } is an option that you can pass to the findOneAndUpdate() or findByIdAndUpdate() methods. Here's what it does:

Returning the Updated Document: By default, when you use findOneAndUpdate() or findByIdAndUpdate() to update a document in MongoDB, Mongoose returns the original document (the document as it was before the update) unless you specify otherwise.

{ new: true } to the Rescue: If you include { new: true } as an option, Mongoose will return the modified document rather than the original one. This means that after the update operation is performed, the method will return the document as it is after the modifications have been applied.
