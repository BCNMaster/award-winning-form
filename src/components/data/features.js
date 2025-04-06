// Features for each site type
const features = {
  informational: [
    { id: 'about', label: 'About Us Section', points: 5 },
    { id: 'services', label: 'Services Showcase', points: 10 },
    { id: 'team', label: 'Team Profiles', points: 10 },
    { id: 'testimonials', label: 'Testimonials', points: 15 },
    { id: 'contact', label: 'Contact Form', points: 5 },
    { id: 'map', label: 'Interactive Map', points: 10 },
    { id: 'blog', label: 'Blog Integration', points: 15 },
    { id: 'faq', label: 'FAQ Section', points: 10 },
    { id: 'gallery', label: 'Image Gallery', points: 10 },
    { id: 'video', label: 'Video Background', points: 15 },
    { id: 'animation', label: 'Animated Elements', points: 15 },
    { id: 'multilingual', label: 'Multilingual Support', points: 20 }
  ],
  ecommerce: [
    { id: 'products', label: 'Product Catalog', points: 10 },
    { id: 'cart', label: 'Shopping Cart', points: 15 },
    { id: 'payment', label: 'Payment Processing', points: 20 },
    { id: 'accounts', label: 'Customer Accounts', points: 15 },
    { id: 'wishlist', label: 'Wishlist Function', points: 10 },
    { id: 'reviews', label: 'Product Reviews', points: 15 },
    { id: 'filters', label: 'Advanced Search & Filters', points: 20 },
    { id: 'inventory', label: 'Inventory Management', points: 20 },
    { id: 'discounts', label: 'Coupons & Discounts', points: 15 },
    { id: 'shipping', label: 'Shipping Calculators', points: 15 },
    { id: 'tax', label: 'Tax Calculation', points: 10 },
    { id: 'related', label: 'Related Products', points: 10 },
    { id: 'cross-sell', label: 'Cross-selling Features', points: 15 },
    { id: 'abandoned', label: 'Abandoned Cart Recovery', points: 20 }
  ],
  booking: [
    { id: 'calendar', label: 'Interactive Calendar', points: 15 },
    { id: 'availability', label: 'Real-time Availability', points: 20 },
    { id: 'payments', label: 'Online Payments', points: 20 },
    { id: 'reminders', label: 'Automated Reminders', points: 15 },
    { id: 'scheduling', label: 'Staff Scheduling', points: 20 },
    { id: 'rescheduling', label: 'Rescheduling Options', points: 15 },
    { id: 'cancellation', label: 'Cancellation Policy', points: 10 },
    { id: 'resources', label: 'Resource Management', points: 15 },
    { id: 'buffer', label: 'Buffer Times', points: 10 },
    { id: 'recurring', label: 'Recurring Bookings', points: 15 }
  ],
  portfolio: [
    { id: 'gallery', label: 'Image Gallery', points: 10 },
    { id: 'projects', label: 'Project Showcase', points: 15 },
    { id: 'case-studies', label: 'Case Studies', points: 20 },
    { id: 'video', label: 'Video Integration', points: 15 },
    { id: 'filtering', label: 'Category Filtering', points: 15 },
    { id: 'modal', label: 'Modal Previews', points: 10 },
    { id: 'before-after', label: 'Before/After Sliders', points: 20 },
    { id: 'testimonials', label: 'Client Testimonials', points: 15 },
    { id: 'process', label: 'Process Documentation', points: 15 },
    { id: 'downloadable', label: 'Downloadable Samples', points: 10 }
  ],
  blog: [
    { id: 'articles', label: 'Article Management', points: 10 },
    { id: 'categories', label: 'Categories & Tags', points: 10 },
    { id: 'comments', label: 'Comment System', points: 15 },
    { id: 'newsletter', label: 'Newsletter Integration', points: 20 },
    { id: 'search', label: 'Advanced Search', points: 15 },
    { id: 'social', label: 'Social Sharing', points: 10 },
    { id: 'authors', label: 'Multiple Authors', points: 15 },
    { id: 'related', label: 'Related Posts', points: 10 },
    { id: 'featured', label: 'Featured Posts', points: 10 },
    { id: 'seo', label: 'SEO Optimization', points: 20 },
    { id: 'analytics', label: 'Content Analytics', points: 15 },
    { id: 'rss', label: 'RSS Feed', points: 10 }
  ]
};

export default features;