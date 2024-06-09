const mongoose = require("mongoose");

(async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/pascal");
        console.log("connected to mongodb");

        const courseSchema = new mongoose.Schema({
            name: String,
            author: String,
            tags: [String],
            date: { type: Date, default: Date.now },
            ispublished: Boolean
        })
        const Course = mongoose.model("Course", courseSchema)
        const course = new Course({
            name: "nodejs",
            author: "pascal",
            tags: ["backend", "API"],
            ispublished: true
        })
        // inserting document into the database
        // const results = await course.save();
        // console.log(results);
        // querying document into the database
        const getResults = await Course.find({
            name: "nodejs",
            author: "pascal"
        })
            .limit(10)
            .sort({ name: 1 })
            .select({ name: 1, tags: 1 })
            console.log("the found results is ",getResults)

    } catch (err) {
        console.error("not connected", err);
    }
})();
