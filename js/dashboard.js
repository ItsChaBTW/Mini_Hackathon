document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    // Update user profile information
    updateUserProfile(currentUser);
    
    // Initialize dashboard data
    initializeDashboard(currentUser);
    
    // Event listeners
    document.getElementById('editProfileBtn').addEventListener('click', function() {
        // Redirect to profile edit page or show modal
        alert('Profile editing will be implemented in a future update.');
    });

    initializeNavigation();
});

function updateUserProfile(user) {
    // Update profile picture
    const profilePic = document.getElementById('userProfilePic');
    if (user.profilePicture) {
        profilePic.src = user.profilePicture;
    }
    
    // Update user information
    document.getElementById('userDisplayName').textContent = user.username;
    document.getElementById('userEmail').textContent = user.email;
    document.getElementById('userPoints').textContent = user.points;
    
    // Format date for member since
    const memberSince = new Date(user.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    document.getElementById('memberSince').textContent = memberSince;
}

function initializeDashboard(user) {
    // For demo purposes, we'll use random data
    // In a real app, this would come from the server
    
    // Activity stats
    document.getElementById('reportsCount').textContent = Math.floor(Math.random() * 10);
    document.getElementById('verifiedCount').textContent = Math.floor(Math.random() * 5);
    document.getElementById('userRank').textContent = Math.floor(Math.random() * 100) + 1;
    
    // Environmental impact
    document.getElementById('co2Saved').textContent = (Math.random() * 100).toFixed(1);
    document.getElementById('treesEquivalent').textContent = Math.floor(Math.random() * 10);
    document.getElementById('wasteRecycled').textContent = (Math.random() * 50).toFixed(1);
    
    // Generate sample reports
    generateSampleReports();
}

function generateSampleReports() {
    const reportsList = document.getElementById('userReportsList');
    const reportCount = Math.floor(Math.random() * 3);
    
    if (reportCount === 0) {
        return; // Keep the "No reports" message
    }
    
    // Clear the "No reports" message
    reportsList.innerHTML = '';
    
    const reportTypes = ['Plastic Waste', 'Air Pollution', 'Water Pollution', 'Illegal Dumping'];
    const statuses = ['pending', 'approved', 'rejected'];
    const statusTexts = {
        'pending': 'Pending Review',
        'approved': 'Approved',
        'rejected': 'Rejected'
    };
    
    for (let i = 0; i < reportCount; i++) {
        const reportType = reportTypes[Math.floor(Math.random() * reportTypes.length)];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const date = new Date();
        date.setDate(date.getDate() - Math.floor(Math.random() * 30));
        
        const reportItem = document.createElement('div');
        reportItem.className = 'report-item';
        reportItem.innerHTML = `
            <div class="report-image">
                <img src="images/placeholder-${i+1}.jpg" alt="${reportType}">
            </div>
            <div class="report-info">
                <h4>${reportType}</h4>
                <p>Location: Sample Location ${i+1}</p>
                <span class="report-status ${status}">${statusTexts[status]}</span>
                <p class="report-date">Reported on ${date.toLocaleDateString()}</p>
            </div>
        `;
        
        reportsList.appendChild(reportItem);
    }
}

// Add this function to handle the dropdown menu
function initializeNavigation() {
    const profileDropdown = document.getElementById('profileDropdown');
    const profileMenu = document.getElementById('profileMenu');
    
    profileDropdown.addEventListener('click', function() {
        profileMenu.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        if (!profileDropdown.contains(event.target) && !profileMenu.contains(event.target)) {
            profileMenu.classList.remove('active');
        }
    });
}