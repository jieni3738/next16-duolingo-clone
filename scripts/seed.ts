import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema });

const main = async () => {
  try {
      console.log("Seeding database");

      await db.delete(schema.courses);
      await db.delete(schema.userProgress);
      await db.delete(schema.units);
      await db.delete(schema.lessons);
      await db.delete(schema.challenges);
      await db.delete(schema.challengeProgress);
      await db.delete(schema.userSubscription);

      // 1. Insert courses first
      await db.insert(schema.courses).values([
        {
          id: 1,
          title: "Spanish",
          imageSrc: "/es.svg",
        },
        {
          id: 2,
          title: "Italian",
          imageSrc: "/it.svg",
        },
        {
          id: 3,
          title: "French",
          imageSrc: "/fr.svg",
        },
        {
          id: 4,
          title: "Croatian",
          imageSrc: "/hr.svg",
        },
      ]);

      // 2. Insert units second
      await db.insert(schema.units).values([
        {
          id: 1,
          courseId: 1, //Spanish
          title: "Unit 1",
          description: "Learn the basics of Spanish",
          order: 1,
        }
      ])

      // 3. Insert lessons last
      await db.insert(schema.lessons).values([
        {
          id: 1,
          unitId: 1,
          order: 1,
          title: "Nouns",
        },
        {
          id: 2,
          unitId: 1,
          order: 2,
          title: "Verbs",
        },
        {
          id: 3,
          unitId: 1,
          order: 3,
          title: "Verbs",
        },
        {
          id: 4,
          unitId: 1,
          order: 4,
          title: "Verbs",
        },
        {
          id: 5,
          unitId: 1,
          order: 5,
          title: "Verbs",
        },
      ]);

      await db.insert(schema.challenges).values([
        {
          id: 1,
          lessonId: 1,
          type: "SELECT",
          order: 1,
          question: 'Which one of the these is the "the man" ?',
        },
        {
          id: 2,
          lessonId: 1,
          type: "SELECT",
          order: 2,
          question: 'Which one of the these is the "the woman" ?',
        },
        {
          id: 3,
          lessonId: 1,
          type: "SELECT",
          order: 3,
          question: 'Which one of the these is the "the boy"?',
        },
        {
          id: 4,
          lessonId: 1,
          type: "ASSIST",
          order: 4,
          question: '"the man"?',
        },
        {
          id: 5,
          lessonId: 1,
          type: "SELECT",
          order: 5,
          question: 'Which one of the these is the "the zombie"?',
        },
      ]);

      await db.insert(schema.challengeOptions).values([
        {
          challengeId: 1,
          imgSrc: "/man.svg",
          correct: true,
          text: "el hombre",
          audioSrc: "/es_man.mp3",
        },
        {
          challengeId: 1,
          imgSrc: "/woman.svg",
          correct: false,
          text: "la mujer",
          audioSrc: "/es_women.mp3",
        },
        {
          challengeId: 1,
          imgSrc: "/boy.svg",
          correct: false,
          text: "es chico",
          audioSrc: "/es_boy.mp3",
        },
      ]);

      await db.insert(schema.challengeOptions).values([
        {
          challengeId: 2,
          imgSrc: "/woman.svg",
          correct: true,
          text: "la mujer",
          audioSrc: "/es_women.mp3",
        },
        {
          challengeId: 2,
          imgSrc: "/man.svg",
          correct: false,
          text: "el hombre",
          audioSrc: "/es_man.mp3",
        },
        {
          challengeId: 2,
          imgSrc: "/robot.svg",
          correct: false,
          text: "la robot",
          audioSrc: "/es_robot.mp3",
        },
      ]);

       await db.insert(schema.challengeOptions).values([
        {
          challengeId: 3,
          imgSrc: "/robot.svg",
          correct: false,
          text: "el robot",
          audioSrc: "/es_robot.mp3",
        },
        {
          challengeId: 3,
          imgSrc: "/man.svg",
          correct: false,
          text: "el hombre",
          audioSrc: "/es_man.mp3",
        },
        {
          challengeId: 3,
          imgSrc: "/boy.svg",
          correct: true,
          text: "es chico",
          audioSrc: "/es_boy.mp3",
        },
      ]);

      await db.insert(schema.challengeOptions).values([
        {
          challengeId: 4,
          correct: false,
          text: "la mujer",
          audioSrc: "/es_women.mp3",
        },
        {
          challengeId: 4,
          correct: true,
          text: "el hombre",
          audioSrc: "/es_man.mp3",
        },
        {
          challengeId: 4,
          correct: false,
          text: "es chico",
          audioSrc: "/es_boy.mp3",
        },
      ]);

      await db.insert(schema.challengeOptions).values([
        {
          challengeId: 5,
          imgSrc: "/woman.svg",
          correct: false,
          text: "la mujer",
          audioSrc: "/es_women.mp3",
        },
        {
          challengeId: 5,
          imgSrc: "/zombie.svg",
          correct: true,
          text: "el zombie",
          audioSrc: "/es_zombie.mp3",
        },
        {
          challengeId: 5,
          imgSrc: "/boy.svg",
          correct: false,
          text: "es chico",
          audioSrc: "/es_boy.mp3",
        },
      ]);


      await db.insert(schema.challenges).values([
        {
          id: 6,
          lessonId: 2,
          type: "SELECT",
          order: 1,
          question: 'Which one of the these is the "the girl"?',
        },
        {
          id: 7,
          lessonId: 2,
          type: "SELECT",
          order: 2,
          question: 'Which one of the these is the "the robot"?',
        },
        {
          id: 8,
          lessonId: 2,
          type: "ASSIST",
          order: 3,
          question: '"the girl"?',
        },
      ]);

      await db.insert(schema.challengeOptions).values([
        {
          challengeId: 6,
          imgSrc: "/girl.svg",
          correct: true,
          text: "la nina",
          audioSrc: "/es_girl.mp3",
        },
        {
          challengeId: 6,
          imgSrc: "/zombie.svg",
          correct: false,
          text: "el zombie",
          audioSrc: "/es_zombie.mp3",
        },
        {
          challengeId: 6,
          imgSrc: "/boy.svg",
          correct: false,
          text: "es chico",
          audioSrc: "/es_boy.mp3",
        },
      ]);

      await db.insert(schema.challengeOptions).values([
        {
          challengeId: 7,
          imgSrc: "/boy.svg",
          correct: false,
          text: "es chico",
          audioSrc: "/es_boy.mp3",
        },
        {
          challengeId: 7,
          imgSrc: "/girl.svg",
          correct: false,
          text: "la nina",
          audioSrc: "/es_girl.mp3",
        },
        {
          challengeId: 7,
          imgSrc: "/robot.svg",
          correct: true,
          text: "el robot",
          audioSrc: "/es_robot.mp3",
        },
        
      ]);

       await db.insert(schema.challengeOptions).values([
        {
          challengeId: 8,
          correct: false,
          text: "la mujer",
          audioSrc: "/es_women.mp3",
        },
        {
          challengeId: 8,
          correct: false,
          text: "el hombre",
          audioSrc: "/es_man.mp3",
        },
        {
          challengeId: 8,
          correct: true,
          text: "la nina",
          audioSrc: "/es_girl.mp3",
        },
      ]);

      console.log("Seeding finished");

  }catch (error){
    console.error(error);
    throw new Error("Failed to seed the database");
  }
};
main();