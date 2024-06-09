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
        // const course = new Course({
        //     name: "nodejs",
        //     author: "pascal",
        //     tags: ["backend", "API"],
        //     ispublished: true
        // })
        // // inserting document into the database
        // const results = await course.save();
        // console.log(results);
        // // querying document into the database
        // const getResults = await Course.find({
        //     name: "nodejs",
        //     author: "pascal"
        // })
        //     .limit(10)
        //     .sort({ name: 1 })
        //     .select({ name: 1, tags: 1 })
        //     console.log("the found results is ",getResults)
        // //  comparison query operators
        //         const course = new Course({
        //             name: "nodejs",
        //                 author: "mugisha",
        //                 tags: ["backend", "API"],
        //                 ispublished: true
        //         })
        //         const results=await course.save()
        //         console.log(results)
        //         const foundResults=await Course.find({
        //             author:{$in :["pascal"]}
        //         })
        // console.log("found results are : ",foundResults)

        // // logical query operator
        const course1 = new Course({
            name: "Nodejs",
            author: "pascal",
            tags: ["backend", "API"],
            ispublished: true
          });
          const course2 = new Course({
            name: "Reactjs",
            author: "pascal",
            tags: ["props", "components"],
            ispublished: true
          });
      
          // Save each Course instance separately
          const results1 = await course1.save();
          console.log("Course 1 saved:", results1);
      
          const results2 = await course2.save();
          console.log("Course 2 saved:", results2);
      
      
        const foundResults=await Course.find().or([{name:"Reactjs"},{name: "Nodejs"}])
        console.log("found results : ",foundResults)
    } catch (err) {
        console.error("not connected", err);
    }
})();
