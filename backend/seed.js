const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const skillSchema = new mongoose.Schema({
  title:       String,
  category:    String,
  description: String,
  tags:        [String],
  icon:        String,
  members:     { type: Number, default: 0 },
}, { timestamps: true });

const Skill = mongoose.model("Skill", skillSchema);

const skills = [
  { title: "Web Development",     category: "Technology", description: "Learn HTML, CSS, JavaScript and modern frameworks from experienced developers.",         tags: ["HTML", "CSS", "React"],           icon: "ti-code",          members: 124 },
  { title: "Data Science",        category: "Technology", description: "Python, pandas, ML models — learn data science from real practitioners.",               tags: ["Python", "ML", "Pandas"],         icon: "ti-chart-bar",     members: 156 },
  { title: "Mobile App Dev",      category: "Technology", description: "Build iOS and Android apps using Flutter or React Native from scratch.",                tags: ["Flutter", "React Native"],        icon: "ti-device-mobile", members: 98  },
  { title: "Cybersecurity",       category: "Technology", description: "Ethical hacking, network security and penetration testing basics.",                     tags: ["Hacking", "Networking", "Linux"], icon: "ti-shield-lock",   members: 74  },
  { title: "Cloud Computing",     category: "Technology", description: "AWS, Azure and Google Cloud — deploy and manage real applications.",                    tags: ["AWS", "Azure", "DevOps"],         icon: "ti-cloud",         members: 88  },
  { title: "UI/UX Design",        category: "Design",     description: "Master Figma, design systems and user research from real designers.",                   tags: ["Figma", "Wireframing"],           icon: "ti-palette",       members: 89  },
  { title: "Video Editing",       category: "Design",     description: "Premiere Pro, After Effects, color grading — become a pro video editor.",              tags: ["Premiere", "After Effects"],      icon: "ti-video",         members: 91  },
  { title: "Graphic Design",      category: "Design",     description: "Create stunning visuals using Photoshop, Illustrator and Canva.",                      tags: ["Photoshop", "Illustrator"],       icon: "ti-brush",         members: 113 },
  { title: "3D Modeling",         category: "Design",     description: "Learn Blender and Cinema 4D to create stunning 3D art and animations.",                tags: ["Blender", "Cinema 4D"],           icon: "ti-box",           members: 62  },
  { title: "Motion Graphics",     category: "Design",     description: "Create eye-catching animations and motion graphics for social media.",                  tags: ["After Effects", "Animation"],     icon: "ti-augmented-reality", members: 55 },
  { title: "Guitar Lessons",      category: "Music",      description: "From beginner chords to advanced fingerpicking — learn at your own pace.",             tags: ["Acoustic", "Electric"],          icon: "ti-music",         members: 67  },
  { title: "Music Production",    category: "Music",      description: "Beat making, mixing and mastering using FL Studio or Ableton Live.",                   tags: ["FL Studio", "Ableton"],          icon: "ti-player-play",   members: 84  },
  { title: "Piano / Keyboard",    category: "Music",      description: "Learn piano from scratch — notes, chords, and your favourite songs.",                  tags: ["Piano", "Music Theory"],         icon: "ti-piano",         members: 59  },
  { title: "Singing & Vocals",    category: "Music",      description: "Improve your vocal range, pitch and performance with expert singers.",                  tags: ["Vocals", "Breathing"],           icon: "ti-microphone",    members: 47  },
  { title: "Spanish Language",    category: "Language",   description: "Conversational Spanish with native speakers — fast-track your fluency.",               tags: ["Beginner", "Conversational"],    icon: "ti-language",      members: 203 },
  { title: "French Language",     category: "Language",   description: "Learn French from basics to fluency with real native speakers.",                       tags: ["French", "Grammar"],             icon: "ti-language",      members: 134 },
  { title: "Japanese Language",   category: "Language",   description: "Hiragana, Katakana, Kanji and conversational Japanese — step by step.",                tags: ["Japanese", "Kanji"],             icon: "ti-language",      members: 118 },
  { title: "Public Speaking",     category: "Business",   description: "Overcome stage fear and speak confidently in front of any audience.",                  tags: ["Communication", "Confidence"],   icon: "ti-speakerphone",  members: 92  },
  { title: "Digital Marketing",   category: "Business",   description: "SEO, social media, ads and content strategy — grow any brand online.",                 tags: ["SEO", "Social Media", "Ads"],    icon: "ti-trending-up",   members: 145 },
  { title: "Entrepreneurship",    category: "Business",   description: "From idea to startup — learn how to build, launch and grow your business.",            tags: ["Startup", "Business"],           icon: "ti-rocket",        members: 77  },
  { title: "Sketching & Drawing", category: "Art",        description: "Learn sketching, shading and illustration from professional artists.",                 tags: ["Sketching", "Illustration"],     icon: "ti-pencil",        members: 101 },
  { title: "Photography",         category: "Art",        description: "Master composition, lighting and editing to take stunning photos.",                    tags: ["Camera", "Editing", "Lighting"], icon: "ti-camera",        members: 138 },
  { title: "Painting",            category: "Art",        description: "Watercolour, acrylic and oil painting techniques for all skill levels.",               tags: ["Watercolour", "Acrylic"],        icon: "ti-brush",         members: 83  },
];

async function seed() {
  await Skill.deleteMany({});
  await Skill.insertMany(skills);
  console.log("✅ 23 skills added to MongoDB!");
  mongoose.disconnect();
}

seed();