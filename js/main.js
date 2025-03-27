// Lesson management
class LessonManager {
    constructor() {
        this.lessons = JSON.parse(localStorage.getItem('lessons')) || this.initializeDefaultLessons();
    }

    initializeDefaultLessons() {
        const defaultLessons = [
            {
                id: 1,
                title: 'Introduction to Environmental Pollution',
                description: 'Learn about different types of pollution and their impact on our planet',
                points: 100,
                content: `
                    <h3>What is Environmental Pollution?</h3>
                    <p>Environmental pollution is the contamination of the physical and biological components of the earth/atmosphere system to such an extent that normal environmental processes are adversely affected.</p>
                    
                    <h3>Major Types of Pollution</h3>
                    <ul>
                        <li><strong>Air Pollution:</strong> Contamination of air by harmful gases, dust, and smoke</li>
                        <li><strong>Water Pollution:</strong> Contamination of water bodies by chemicals, plastics, and waste</li>
                        <li><strong>Soil Pollution:</strong> Contamination of soil due to chemicals and improper waste disposal</li>
                        <li><strong>Plastic Pollution:</strong> Accumulation of plastic products in the environment</li>
                    </ul>
                    
                    <h3>Impact of Pollution</h3>
                    <p>Pollution has severe effects on environmental and human health, including:</p>
                    <ul>
                        <li>Climate change and global warming</li>
                        <li>Loss of biodiversity</li>
                        <li>Health issues in humans and animals</li>
                        <li>Destruction of ecosystems</li>
                    </ul>
                `,
                image: 'https://images.unsplash.com/photo-1604187351574-c75ca79f5807?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80'
            },
            {
                id: 2,
                title: 'Proper Waste Separation Techniques',
                description: 'Learn how to properly sort and separate different types of waste',
                points: 150,
                content: `
                    <h3>Why Separate Waste?</h3>
                    <p>Waste separation is crucial for effective recycling and reducing the amount of waste that ends up in landfills.</p>
                    
                    <h3>Common Waste Categories</h3>
                    <ul>
                        <li><strong>Recyclables:</strong> Paper, cardboard, clean plastic containers, glass bottles, aluminum cans</li>
                        <li><strong>Organic Waste:</strong> Food scraps, yard trimmings, compostable materials</li>
                        <li><strong>Electronic Waste:</strong> Batteries, old electronics, light bulbs</li>
                        <li><strong>Hazardous Waste:</strong> Paint, chemicals, medical waste</li>
                        <li><strong>Non-recyclable Waste:</strong> Items that cannot be recycled or composted</li>
                    </ul>
                    
                    <h3>Tips for Effective Waste Separation</h3>
                    <ul>
                        <li>Clean recyclable containers before sorting</li>
                        <li>Keep hazardous materials separate from regular trash</li>
                        <li>Use separate bins for different categories</li>
                        <li>Learn your local recycling guidelines</li>
                        <li>Compost organic waste when possible</li>
                    </ul>
                `,
                image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80'
            },
            {
                id: 3,
                title: 'Plastic Pollution: A Global Crisis',
                description: 'Understanding the impact of plastic waste on our oceans and environment',
                points: 200,
                content: `
                    <h3>The Plastic Problem</h3>
                    <p>Plastic pollution has become one of the most pressing environmental issues, as rapidly increasing production of disposable plastic products overwhelms the world's ability to deal with them.</p>
                    
                    <h3>Facts About Plastic Pollution</h3>
                    <ul>
                        <li>More than 8.3 billion tons of plastic has been produced since the 1950s</li>
                        <li>Only about 9% of plastic waste has been recycled</li>
                        <li>Plastic takes 400+ years to degrade</li>
                        <li>8 million tons of plastic end up in our oceans every year</li>
                        <li>Microplastics have been found in 94% of tap water samples in the US</li>
                    </ul>
                    
                    <h3>Solutions to Plastic Pollution</h3>
                    <ul>
                        <li>Reduce single-use plastic consumption</li>
                        <li>Use reusable alternatives (bags, bottles, containers)</li>
                        <li>Participate in beach and community clean-ups</li>
                        <li>Support plastic bans and regulations</li>
                        <li>Proper recycling of plastic products</li>
                    </ul>
                `,
                image: 'https://images.unsplash.com/photo-1605600659453-259d7bc51831?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80'
            }
        ];
        localStorage.setItem('lessons', JSON.stringify(defaultLessons));
        return defaultLessons;
    }

    getFeaturedLessons() {
        return this.lessons.slice(0, 3);
    }

    getLessonById(id) {
        return this.lessons.find(lesson => lesson.id === id);
    }

    completeLesson(userId, lessonId) {
        const lesson = this.getLessonById(lessonId);
        if (lesson) {
            userManager.addPoints(userId, lesson.points);
            return true;
        }
        return false;
    }
}

// Leaderboard management
class LeaderboardManager {
    getTopUsers(limit = 5) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        return users
            .sort((a, b) => b.points - a.points)
            .slice(0, limit);
    }

    updateLeaderboardDisplay() {
        const topLearners = document.getElementById('topLearners');
        if (topLearners) {
            const topUsers = this.getTopUsers(3);
            topLearners.innerHTML = topUsers.length > 0 
                ? topUsers
                    .map((user, index) => `
                        <div class="leaderboard-item">
                            <span class="rank">#${index + 1}</span>
                            <div class="user-info">
                                <img src="${user.profilePicture || 'https://via.placeholder.com/40'}" alt="${user.username}" class="user-avatar">
                                <span class="username">${user.username}</span>
                            </div>
                            <span class="points">${user.points} points</span>
                        </div>
                    `)
                    .join('')
                : '<p>No users on the leaderboard yet. Be the first!</p>';
        }
    }
}

// Trash submission management
class TrashSubmissionManager {
    constructor() {
        this.submissions = JSON.parse(localStorage.getItem('trashSubmissions')) || [];
        this.trashTypes = [
            { id: 'plastic', name: 'Plastic', points: 10, image: 'https://images.unsplash.com/photo-1572964734607-0051976fac79?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
            { id: 'paper', name: 'Paper', points: 5, image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
            { id: 'glass', name: 'Glass', points: 15, image: 'https://www.leeglass.com/wp-content/uploads/2019/08/iStock-1081866910.jpg' },
            { id: 'metal', name: 'Metal', points: 20, image: 'https://previews.123rf.com/images/vovashevchuk/vovashevchuk1407/vovashevchuk140700065/30485772-rusty-metal-garbage-as-a-texture.jpg' },
            { id: 'ewaste', name: 'E-Waste', points: 30, image: 'https://www.treehugger.com/thmb/LvSRRu3lVNEJhR6EBffMjuTeeVs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/computer--metal-and-iron-dump---11-172261628-cb98d1a1079745e9a13a25f240b8e2f1.jpg' },
            { id: 'organic', name: 'Organic', points: 5, image: 'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' }
        ];
    }

    getTrashTypes() {
        return this.trashTypes;
    }

    getTrashTypeById(id) {
        return this.trashTypes.find(type => type.id === id);
    }

    getUserSubmissions(userId) {
        return this.submissions.filter(sub => sub.userId === userId);
    }

    addSubmission(submission) {
        submission.id = Date.now();
        submission.status = 'pending';
        submission.createdAt = new Date().toISOString();
        this.submissions.push(submission);
        this.saveSubmissions();
        return submission.id;
    }

    approveSubmission(submissionId) {
        const submission = this.submissions.find(s => s.id === submissionId);
        if (submission) {
            submission.status = 'approved';
            submission.approvedAt = new Date().toISOString();
            
            // Award points to user
            const user = userManager.getUserById(submission.userId);
            if (user) {
                user.points += submission.points;
                user.trashCollected += submission.weight;
                userManager.updateUser(user);
                
                // Trigger achievements check
                this.checkAchievements(user, submission);
            }
            
            this.saveSubmissions();
            return true;
        }
        return false;
    }

    checkAchievements(user, submission) {
        const achievements = [];
        
        // Check total trash collected milestones
        const totalCollected = user.trashCollected;
        if (totalCollected >= 100) achievements.push('100kg_collected');
        if (totalCollected >= 500) achievements.push('500kg_collected');
        if (totalCollected >= 1000) achievements.push('1000kg_collected');
        
        // Check streak achievements
        const streak = this.calculateStreak(user.id);
        if (streak >= 7) achievements.push('week_streak');
        if (streak >= 30) achievements.push('month_streak');
        
        // Award new achievements
        achievements.forEach(achievement => {
            if (!user.achievements.includes(achievement)) {
                user.achievements.push(achievement);
                this.notifyAchievement(achievement);
            }
        });
        
        userManager.updateUser(user);
    }

    notifyAchievement(achievement) {
        const notifications = {
            '100kg_collected': {
                title: 'Eco Warrior!',
                message: 'You\'ve collected 100kg of trash! Keep up the great work!'
            },
            '500kg_collected': {
                title: 'Environmental Champion!',
                message: 'Amazing! You\'ve collected 500kg of trash!'
            },
            // Add more achievements...
        };

        const notification = notifications[achievement];
        if (notification) {
            this.showNotification(notification.title, notification.message);
        }
    }

    showNotification(title, message) {
        // Create notification element
        const notif = document.createElement('div');
        notif.className = 'achievement-notification';
        notif.innerHTML = `
            <div class="achievement-content">
                <i class="fas fa-trophy"></i>
                <div class="achievement-text">
                    <h4>${title}</h4>
                    <p>${message}</p>
                </div>
            </div>
        `;

        document.body.appendChild(notif);
        
        // Animate notification
        setTimeout(() => {
            notif.classList.add('show');
            setTimeout(() => {
                notif.classList.remove('show');
                setTimeout(() => notif.remove(), 300);
            }, 3000);
        }, 100);
    }

    saveSubmissions() {
        localStorage.setItem('trashSubmissions', JSON.stringify(this.submissions));
    }
}

class RewardSystem {
    constructor() {
        this.rewards = {
            wasteTypes: {
                plastic: { points: 10, multiplier: 1.0, name: "Plastic" },
                paper: { points: 8, multiplier: 1.0, name: "Paper" },
                metal: { points: 15, multiplier: 1.0, name: "Metal" },
                glass: { points: 12, multiplier: 1.0, name: "Glass" },
                electronic: { points: 25, multiplier: 1.0, name: "E-Waste" },
                organic: { points: 5, multiplier: 1.0, name: "Organic" }
            },
            streakBonuses: {
                weekly: { days: 7, multiplier: 1.5, name: "Weekly Warrior" },
                monthly: { days: 30, multiplier: 2.0, name: "Monthly Master" }
            },
            tiers: [
                { name: "Novice Collector", requirement: 0, badge: "seedling" },
                { name: "Eco Enthusiast", requirement: 500, badge: "leaf" },
                { name: "Green Guardian", requirement: 1000, badge: "tree" },
                { name: "Earth Protector", requirement: 2500, badge: "globe-americas" },
                { name: "Environmental Champion", requirement: 5000, badge: "crown" }
            ],
            specialAchievements: {
                first_submission: { points: 50, name: "First Steps" },
                hundred_kg: { points: 200, name: "Century Collector" },
                consistent_weekly: { points: 100, name: "Dedication Award" },
                community_leader: { points: 500, name: "Community Champion" }
            }
        };
    }

    calculatePoints(submission) {
        const basePoints = this.rewards.wasteTypes[submission.wasteType].points;
        let multiplier = this.rewards.wasteTypes[submission.wasteType].multiplier;
        
        // Apply streak bonuses
        if (this.hasWeeklyStreak(submission.userId)) {
            multiplier *= this.rewards.streakBonuses.weekly.multiplier;
        }
        if (this.hasMonthlyStreak(submission.userId)) {
            multiplier *= this.rewards.streakBonuses.monthly.multiplier;
        }

        // Calculate final points
        const points = Math.round(basePoints * submission.weight * multiplier);
        return points;
    }

    getUserTier(totalPoints) {
        for (let i = this.rewards.tiers.length - 1; i >= 0; i--) {
            if (totalPoints >= this.rewards.tiers[i].requirement) {
                return this.rewards.tiers[i];
            }
        }
        return this.rewards.tiers[0];
    }

    checkAchievements(user, submission) {
        const newAchievements = [];

        // Check first submission
        if (user.submissions.length === 1) {
            newAchievements.push(this.rewards.specialAchievements.first_submission);
        }

        // Check total collection weight
        const totalWeight = user.submissions.reduce((sum, sub) => sum + sub.weight, 0);
        if (totalWeight >= 100 && !user.achievements.includes('hundred_kg')) {
            newAchievements.push(this.rewards.specialAchievements.hundred_kg);
        }

        // Check weekly streak
        if (this.hasWeeklyStreak(user.id) && !user.achievements.includes('consistent_weekly')) {
            newAchievements.push(this.rewards.specialAchievements.consistent_weekly);
        }

        return newAchievements;
    }

    hasWeeklyStreak(userId) {
        // Implementation for checking weekly streak
        const submissions = this.getLastWeekSubmissions(userId);
        return submissions.length >= 7;
    }

    hasMonthlyStreak(userId) {
        // Implementation for checking monthly streak
        const submissions = this.getLastMonthSubmissions(userId);
        return submissions.length >= 30;
    }
}

// Initialize managers
const lessonManager = new LessonManager();
const leaderboardManager = new LeaderboardManager();
const trashSubmissionManager = new TrashSubmissionManager();

// Update UI on page load
document.addEventListener('DOMContentLoaded', () => {
    // Update featured lessons
    const featuredLessons = document.getElementById('featuredLessons');
    if (featuredLessons) {
        const lessons = lessonManager.getFeaturedLessons();
        featuredLessons.innerHTML = lessons
            .map(lesson => `
                <div class="lesson-card">
                    <img src="${lesson.image}" alt="${lesson.title}">
                    <h3>${lesson.title}</h3>
                    <p>${lesson.description}</p>
                    <p class="points">${lesson.points} points</p>
                    <a href="pages/lessons.html?id=${lesson.id}" class="btn">Start Learning</a>
                </div>
            `)
            .join('');
    }

    // Update leaderboard
    leaderboardManager.updateLeaderboardDisplay();
}); 