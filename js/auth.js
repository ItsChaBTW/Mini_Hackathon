// User management with localStorage
class UserManager {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('users')) || [];
        this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
        this.isAdmin = localStorage.getItem('isAdmin') === 'true';
        this.updateAuthUI();
        this.initializeAdmin();
    }
    
    initializeAdmin() {
        // Create admin account if it doesn't exist
        const adminExists = this.users.some(user => user.email === 'admin@pollutogo.com');
        if (!adminExists) {
            const adminUser = {
                id: 'admin-' + Date.now(),
                username: 'Admin',
                email: 'admin@pollutogo.com',
                password: 'admin', // This would be hashed in a real application
                profilePicture: null,
                points: 0,
                isAdmin: true,
                createdAt: new Date().toISOString()
            };
            
            this.users.push(adminUser);
            localStorage.setItem('users', JSON.stringify(this.users));
        }
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
            isAdmin: false,
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
            this.isAdmin = user.isAdmin || false;
            localStorage.setItem('isAdmin', this.isAdmin);
            this.updateAuthUI();
            // Redirect to dashboard after successful login
            window.location.href = 'dashboard.html';
            return user;
        }
        throw new Error('Invalid credentials');
    }

    logout() {
        this.currentUser = null;
        this.isAdmin = false;
        localStorage.removeItem('currentUser');
        localStorage.removeItem('isAdmin');
        this.updateAuthUI();
    }

    updateAuthUI() {
        const loginBtn = document.getElementById('loginBtn');
        const signupBtn = document.getElementById('signupBtn');
        const logoutBtn = document.getElementById('logoutBtn');
        const adminLink = document.getElementById('adminLink');

        if (this.currentUser) {
            if (loginBtn) loginBtn.style.display = 'none';
            if (signupBtn) signupBtn.style.display = 'none';
            if (logoutBtn) logoutBtn.style.display = 'block';
            if (adminLink) adminLink.style.display = this.isAdmin ? 'block' : 'none';
        } else {
            if (loginBtn) loginBtn.style.display = 'block';
            if (signupBtn) signupBtn.style.display = 'block';
            if (logoutBtn) logoutBtn.style.display = 'none';
            if (adminLink) adminLink.style.display = 'none';
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