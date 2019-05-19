const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/playgroundDataBase', {useNewUrlParser: true})
    .then(() => console.log('connect to MongoDB...'))
    .catch((err) => console.log('could not to connect to mongodb...', err))

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 55,
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: ["web", "mobile", "network"],
        lowercase: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        uppercase: true,
        trim: true,
        minlength: 2,
        maxlength: 55
    },
    tags: {
        type: Array,
        validate: {
            validator: function (v) {
                return v && v.length > 0;
            },
            message: 'A course should have at least one tag'
        }
    },
    date: {type: Date, default: Date.now},
    isPublished: Boolean,
    price: {
        type: Number,
        required: function () {
            return this.isPublished;
        }
    }
});


const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: "Nodejs Course",
        category: "web",
        author: "Mosh Hamedani",
        tags: ['nodejs', 'backend'],
        isPublished: true,
        price: 20
    });

    try {
        //Course.validate();
        const result = await course.save()
        console.log(result)
    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message);
    }

}

createCourse();


//1
async function getUpdate(id) {
    const course = await Course
        .findOne({_id: id})
    if (!course) return console.log('course not exist')
    course.set({
        isPublished: true,
        author: "Another Author"
    });
    const result = await course.save()
    console.log(result)

}

//getUpdate("5c7be379e41fd72c4b29ebef")


//2
async function updateCourse(name) {
    const result = await Course.updateOne({name: name}, {
        $set: {
            author: 'Anita',
            isPublished: false
        }
    });
    console.log(result)
}

//updateCourse("Angular Course")


//3
async function updateCourse2(id) {
    const result = await Course.findByIdAndUpdate(id, {
        $set: {
            author: 'Anita',
            isPublished: true
        }
    }, {new: true})
    console.log(result)
}

//updateCourse2("5c7be5befcb2102d0f5612e9")


async function removeCourse(id) {
    // const result = await Course.deleteOne({ _id: id });
    const result = await Course.findByIdAndDelete({_id: id})
    console.log(result);
}

//removeCourse("5c7ae88423b52a73a0d2e037")































