import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            Activity.deleteMany({}),
            Leaderboard.deleteMany({}),
            Team.deleteMany({}),
            User.deleteMany({}),
            Workout.deleteMany({}),
        ]);
        const users = await User.create([
            {
                username: 'maya-chen',
                email: 'maya.chen@example.com',
                name: 'Maya Chen',
                avatarUrl: 'https://i.pravatar.cc/150?img=47',
            },
            {
                username: 'liam-ortiz',
                email: 'liam.ortiz@example.com',
                name: 'Liam Ortiz',
                avatarUrl: 'https://i.pravatar.cc/150?img=12',
            },
            {
                username: 'sofia-patel',
                email: 'sofia.patel@example.com',
                name: 'Sofia Patel',
                avatarUrl: 'https://i.pravatar.cc/150?img=32',
            },
        ]);
        const teams = await Team.create([
            {
                name: 'Dawn Patrol',
                description: 'Early risers building consistent habits together.',
                members: [users[0]._id, users[1]._id],
            },
            {
                name: 'Weekend Warriors',
                description: 'A friendly team for strong weekend sessions.',
                members: [users[1]._id, users[2]._id],
            },
        ]);
        await Activity.create([
            { user: users[0]._id, type: 'Running', durationMinutes: 32, points: 320, completedAt: new Date('2026-09-20T07:15:00Z') },
            { user: users[1]._id, type: 'Cycling', durationMinutes: 45, points: 450, completedAt: new Date('2026-09-21T09:00:00Z') },
            { user: users[2]._id, type: 'Strength training', durationMinutes: 38, points: 380, completedAt: new Date('2026-09-22T17:30:00Z') },
        ]);
        await Leaderboard.create([
            { user: users[1]._id, points: 1240, rank: 1 },
            { user: users[0]._id, points: 980, rank: 2 },
            { user: users[2]._id, points: 760, rank: 3 },
        ]);
        await Workout.create([
            {
                name: 'Starter Full Body',
                description: 'A balanced introduction to strength training.',
                difficulty: 'beginner',
                durationMinutes: 20,
                exercises: [
                    { name: 'Bodyweight squat', repetitions: 12 },
                    { name: 'Incline push-up', repetitions: 10 },
                    { name: 'Plank', durationSeconds: 30 },
                ],
            },
            {
                name: 'Tempo Intervals',
                description: 'Short running intervals to build cardio capacity.',
                difficulty: 'intermediate',
                durationMinutes: 30,
                exercises: [
                    { name: 'Warm-up jog', durationSeconds: 300 },
                    { name: 'Fast run', durationSeconds: 60, repetitions: 6 },
                    { name: 'Recovery walk', durationSeconds: 90, repetitions: 5 },
                ],
            },
        ]);
        const counts = await Promise.all([
            User.countDocuments(),
            Team.countDocuments(),
            Activity.countDocuments(),
            Leaderboard.countDocuments(),
            Workout.countDocuments(),
        ]);
        console.log(`Seeded users=${counts[0]}, teams=${counts[1]}, activities=${counts[2]}, leaderboard=${counts[3]}, workouts=${counts[4]}`);
        console.log('Database seeding complete');
        await mongoose.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
