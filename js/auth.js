// User management with localStorage
class UserManager {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('users')) || [];
        this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
        this.updateAuthUI();
    }

    register(username, email, password, profilePicture = null) {
        if (this.users.find(user => user.email === email)) {
            throw new Error('Email already registered');
        }

        const user = {
            id: Date.now(),
            username,
            email,
            password, // In a real app, this should be hashed
            profilePicture,
            points: 0,
            createdAt: new Date().toISOString()
        };

        this.users.push(user);
        localStorage.setItem('users', JSON.stringify(this.users));
        return user;
    }

    login(email, password) {
        const user = this.users.find(u => u.email === email && u.password === password);
        if (user) {
            this.currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.updateAuthUI();
            return user;
        }
        throw new Error('Invalid credentials');
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        this.updateAuthUI();
    }

    updateAuthUI() {
        const loginBtn = document.getElementById('loginBtn');
        const signupBtn = document.getElementById('signupBtn');
        const logoutBtn = document.getElementById('logoutBtn');

        if (this.currentUser) {
            if (loginBtn) loginBtn.style.display = 'none';
            if (signupBtn) signupBtn.style.display = 'none';
            if (logoutBtn) logoutBtn.style.display = 'block';
        } else {
            if (loginBtn) loginBtn.style.display = 'block';
            if (signupBtn) signupBtn.style.display = 'block';
            if (logoutBtn) logoutBtn.style.display = 'none';
        }
    }

    updateUserProfile(userId, updates) {
        const userIndex = this.users.findIndex(u => u.id === userId);
        if (userIndex !== -1) {
            this.users[userIndex] = { ...this.users[userIndex], ...updates };
            localStorage.setItem('users', JSON.stringify(this.users));
            if (this.currentUser && this.currentUser.id === userId) {
                this.currentUser = this.users[userIndex];
                localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            }
        }
    }

    addPoints(userId, points) {
        const user = this.users.find(u => u.id === userId);
        if (user) {
            user.points += points;
            this.updateUserProfile(userId, { points: user.points });
        }
    }
}

// Initialize user manager
const userManager = new UserManager();

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            userManager.logout();
            window.location.href = 'index.html';
        });
    }
}); 