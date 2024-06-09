const mongoose = require("mongoose");

(async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/pascal");
        console.log("connected to mongodb");

        const courseSchema = new mongoose.Schema({
          
        });

        const Course = mongoose.model("Course", courseSchema);

        const course = new Course({
        
        });

        const results = await course.save();
        console.log(results);
    } catch (err) {
        console.error("not connected", err);
    }
})();
