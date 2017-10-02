links to the relevant tutorials:
[mongo basics](https://github.com/ga-students/WDI_LDN_22_LESSON_NOTES/tree/master/w04d03_mongo-nosql-intro-lesson)

Notes from the above tutorial:
MongoDB was designed from the ground up with application development in mind. More specifically, what can and can't be done in regards to data is enforced in your application, not the database itself (like in a SQL database).

Here are a few things to keep in mind:

For performance and simplicity reasons, lean toward embedding over referencing.
Prefer the reference approach when the amount of child data is unbound.
Prefer the reference approach when multiple parent documents access the same child document and that child's document changes frequently.
Obtaining referenced documents requires multiple queries by your application.
In the references approach, depending upon your application's needs, you may choose to maintain links to the related document's _id in either document, or both.
For more details regarding data modeling in MongoDB, start with this section of mongoDB's documentation or this hour long YouTube video.

[mongo models](https://github.com/ga-students/WDI_LDN_22_LESSON_NOTES/tree/master/w04d03_nosqlES6-models-with-mongoose)

Notes from the above tutorial:
Mongoose is just a bridge to use MongoDB inside a NodeJS environment. There are a lot of options when creating a schema with Mongoose, we've just seen a few for the moment.
