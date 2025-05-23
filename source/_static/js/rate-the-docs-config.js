window.rateTheDocs = {
  // Send events to your existing GA property
  onRate: function(rating, page) {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'rate_documentation', {
        'rating': rating,
        'page_title': document.title,
        'page_location': window.location.href,
        'custom_parameter': 'helpful_' + (rating > 3 ? 'yes' : 'no')
      });
    }
  },
  
  onFeedback: function(feedback, rating, page) {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'documentation_feedback', {
        'feedback_text': feedback.substring(0, 100), // Truncate for GA
        'rating': rating,
        'page_title': document.title,
        'page_location': window.location.href
      });
    }
  }
};