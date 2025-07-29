-- Insert Categories
INSERT INTO categories (name, slug, icon, description) VALUES
('Electronics', 'electronics', '📱', 'Smartphones, laptops, gadgets and electronic devices'),
('Fashion', 'fashion', '👕', 'Clothing, shoes, accessories and fashion items'),
('Home & Kitchen', 'home-kitchen', '🏠', 'Home appliances, kitchen items and furniture'),
('Books', 'books', '📚', 'Books, e-books and educational materials'),
('Travel', 'travel', '✈️', 'Flight tickets, hotels and travel packages'),
('Food', 'food', '🍕', 'Food delivery, restaurants and grocery items');

-- Insert Stores
INSERT INTO stores (name, slug, logo_url, website_url) VALUES
('Amazon', 'amazon', '/logos/amazon.png', 'https://amazon.in'),
('Flipkart', 'flipkart', '/logos/flipkart.png', 'https://flipkart.com'),
('Myntra', 'myntra', '/logos/myntra.png', 'https://myntra.com'),
('Nykaa', 'nykaa', '/logos/nykaa.png', 'https://nykaa.com'),
('MakeMyTrip', 'makemytrip', '/logos/makemytrip.png', 'https://makemytrip.com'),
('Swiggy', 'swiggy', '/logos/swiggy.png', 'https://swiggy.com');

-- Insert Sample Admin User
INSERT INTO users (email, password_hash, first_name, last_name, role) VALUES
('admin@dealhunt.com', '$2b$10$example_hash', 'Admin', 'User', 'admin');

-- Insert Sample Deals
INSERT INTO deals (
    title, description, original_price, discounted_price, discount_percentage,
    deal_url, image_url, category_id, store_id, badge, status, expires_at,
    rating, review_count, submitted_by
) VALUES
(
    'iPhone 15 Pro Max 256GB',
    'Latest iPhone with titanium design and advanced camera system',
    159900, 134900, 16,
    'https://amazon.in/iphone-15-pro-max',
    '/placeholder.svg?height=200&width=200',
    1, 1, 'Loot Deal', 'approved',
    CURRENT_TIMESTAMP + INTERVAL '2 days',
    4.8, 1250, 1
),
(
    'Nike Air Max 270 Running Shoes',
    'Comfortable running shoes with air cushioning technology',
    12995, 7797, 40,
    'https://myntra.com/nike-air-max-270',
    '/placeholder.svg?height=200&width=200',
    2, 3, 'Best Deal', 'approved',
    CURRENT_TIMESTAMP + INTERVAL '5 hours',
    4.5, 890, 1
),
(
    'Samsung 55" 4K Smart TV',
    'Crystal UHD 4K TV with HDR and smart features',
    89999, 54999, 39,
    'https://flipkart.com/samsung-55-4k-tv',
    '/placeholder.svg?height=200&width=200',
    1, 2, 'Just In', 'approved',
    CURRENT_TIMESTAMP + INTERVAL '1 day',
    4.3, 567, 1
),
(
    'Instant Pot Duo 7-in-1 Pressure Cooker',
    'Multi-functional electric pressure cooker for quick cooking',
    15999, 9599, 40,
    'https://amazon.in/instant-pot-duo',
    '/placeholder.svg?height=200&width=200',
    3, 1, 'Best Deal', 'approved',
    CURRENT_TIMESTAMP + INTERVAL '3 days',
    4.6, 2340, 1
),
(
    'Adidas Ultraboost 22 Shoes',
    'Premium running shoes with boost technology',
    17999, 12599, 30,
    'https://myntra.com/adidas-ultraboost-22',
    '/placeholder.svg?height=200&width=200',
    2, 3, 'Just In', 'approved',
    CURRENT_TIMESTAMP + INTERVAL '6 hours',
    4.7, 445, 1
),
(
    'MacBook Air M2 13-inch',
    'Apple MacBook Air with M2 chip and 8GB RAM',
    119900, 99900, 17,
    'https://flipkart.com/macbook-air-m2',
    '/placeholder.svg?height=200&width=200',
    1, 2, 'Loot Deal', 'approved',
    CURRENT_TIMESTAMP + INTERVAL '4 days',
    4.9, 789, 1
);

-- Insert Sample User
INSERT INTO users (email, password_hash, first_name, last_name, phone, total_savings) VALUES
('john.doe@example.com', '$2b$10$example_hash', 'John', 'Doe', '+91 9876543210', 15000);

-- Insert Sample Notifications
INSERT INTO notifications (user_id, title, message, type, category) VALUES
(2, '🔥 iPhone 15 Pro Max - Massive Discount!', 'Get 16% off on iPhone 15 Pro Max. Limited time offer!', 'deal', 'Electronics'),
(2, '⚡ Flash Sale Alert - Nike Shoes', '40% off on Nike Air Max shoes. Hurry, only few left!', 'flash', 'Fashion'),
(2, '💰 Your Savings Update', 'You''ve saved ₹15,000 this month with DealHunt!', 'savings', 'Account');

-- Insert User Notification Settings
INSERT INTO user_notification_settings (user_id) VALUES (2);

-- Insert Sample Favorites
INSERT INTO user_favorites (user_id, deal_id) VALUES
(2, 1),
(2, 5);

-- Insert Sample Click Data
INSERT INTO deal_clicks (deal_id, user_id, clicked_at) VALUES
(1, 2, CURRENT_TIMESTAMP - INTERVAL '1 hour'),
(2, 2, CURRENT_TIMESTAMP - INTERVAL '2 hours'),
(3, 2, CURRENT_TIMESTAMP - INTERVAL '3 hours');

-- Update deal click counts
UPDATE deals SET click_count = (
    SELECT COUNT(*) FROM deal_clicks WHERE deal_clicks.deal_id = deals.id
);
