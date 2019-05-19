const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/playgroundDataBase',{ useNewUrlParser: true })
.then(() => console.log('connect to MongoDB...'))
.catch((err) => console.log('could not to connect to mongodb...', err))

// schema in mongoose
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});


//convert schema to a models
//1. make a model of Schema 2.make a instance of model and save that on DataBase
const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        author: 'Mosh',
        tags: ['angular', 'frontend'],
        isPublished: true
    });

    const result = await course.save();
    console.log(result);

}

//createCourse()

async function getCourses(){
    const pageNumber = 2;
    const pageSize = 6;

   const courses = await Course
       .find({ author:"Mosh", isPublished: true })
       .skip((pageNumber - 1 ) * pageSize)
       .limit(pageSize)
       .sort({ name: 1 })
       //.countDocuments()
       .select({name: 1, author: 1 })
   console.log(courses)
}

//getCourses();

