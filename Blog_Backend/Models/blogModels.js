import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: [10, "Blog Title must be contain at least 10 characters"],
        maxLength: [40, "Blog Title cannot exceed 40 characters"],
    },
    mainImage: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        }
    },
    secondaryImageOne: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        }
    },
    secondaryImageTwo: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        }
    },
    paraOneIntro: {
        type: String,
        required: true,
        minLength: [250, "Blog Intro must contain at least 250 characters"],
    },
    paraOneTitle: {
        type: String,
    },
    paraOneDescription: {
        type: String,
        minLength: [50, "Paragraph one description must contain at least 50 characters"],
    },
    paraTwoTitle: {
        type: String,
    },
    paraTwoIntro: {
        type: String,
        minLength: [150, "Blog Intro must contain at least 150 characters"],
    },
    paraTwoDescription: {
        type: String,
        minLength: [50, "Paragraph two description must contain at least 50 characters"],
    },
    paraThreeTitle: {
        type: String,
    },
    paraThreeIntro: {
        type: String,
        minLength: [150, "Blog Intro must contain at least 150 characters"],
    },
    paraThreeDescription: {
        type: String,
        minLength: [50, "Paragraph three description must contain at least 50 characters"],
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
        required: true,
    },
    published: {
        type: Boolean,
        default: false,
    },
    
},
{timestamps:true});

const blogModel = mongoose.model('Blog', blogSchema);
export default blogModel;
