import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: [10, "Blog Title must be contain at least 10 character"],
        maxLength: [40, "Blog Title cannot exceed 40 character!"],
    },
    mainImage: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    },
    intro: {
        type: String,
        required: true,
        minLength: [250, "Blog Intro must be contain at least 250 character"],
    },
    paraOneTitle: {
        type: String,
    },
    paraOneImage: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        }
    },
    paraOneIntro: {
        type: String,
        minLength: [150, "Blog Intro must be contain at least 250 character"],
    },
    paraOneDescription: {
        type: String,
        minLength: [50, "paragraph one description must be contain at least 250 character"],
    },
    paraTwoTitle: {
        type: String,
    },
    paraTwoImage: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        }
    },
    paraTwoIntro: {
        type: String,
        minLength: [150, "Blog Intro must be contain at least 250 character"],
    },
    paraTwoDescription: {
        type: String,
        minLength: [50, "paragraph one description must be contain at least 250 character"],
    },
    paraThreeTitle: {
        type: String,
    },
    paraThreeImage: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        }
    },
    paraThreeIntro: {
        type: String,
        minLength: [150, "Blog Intro must be contain at least 250 character"],
    },
    paraThreeDescription: {
        type: String,
        minLength: [50, "paragraph one description must be contain at least 250 character"],
    },
    category: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    authorName: {
        type: String,
        required: true,
    },
    authorAvatar: {
        type: String,
    },
    published: {
        type: Boolean,
        default: false,
    },

})

const blogModel = new mongoose.model("Blog", blogSchema);
export default blogModel;