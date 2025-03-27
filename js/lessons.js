function startLesson(lessonId) {
    // Store the current lesson ID
    localStorage.setItem('currentLesson', lessonId);
    
    // Navigate to the lesson content
    window.location.href = `lesson-content.html?id=${lessonId}`;
}

// Add this to your existing lessons page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = '../login.html';
        return;
    }
    
    // Load completed lessons if any
    const completedLessons = JSON.parse(localStorage.getItem('completedLessons') || '[]');
    
    // Update UI to show completed lessons
    completedLessons.forEach(lessonId => {
        const lessonCard = document.querySelector(`[data-lesson-id="${lessonId}"]`);
        if (lessonCard) {
            lessonCard.classList.add('completed');
        }
    });
}); 