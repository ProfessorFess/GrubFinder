GrubFinder
The "Tinder for Food" App

TUNNEL TESTING COMMAND:
npx expo start --clear --tunnel 

Overview
FoodSwipe is a mobile application designed to solve the "What do I want to eat?" dilemma. It presents nearby restaurants in a swipeable card deck. Users can swipe right to "Like" or left to "Pass." When a user decides on a meal, the app uses deep linking to instantly open that restaurant in delivery apps (Uber Eats/DoorDash) to complete the order.

Key Features
Swipe Interface: Intuitive card-stack animation (Swipe Right/Left).

Smart Data: Fetches real-time restaurant photos, ratings, and price levels via Google Places API (New).

Direct Ordering: No middle-man menus. Clicking "Order" deep-links directly to the specific restaurant in the Uber Eats or DoorDash app on the user's phone.

Cost Efficient: Optimized API requests designed to stay within Google's free-tier credits.

Tech Stack
Frontend: [React Native OR Flutter] (We will update this line once you choose)

Data Source: Google Places API (New)

Navigation: Deep Linking (URL Schemes)

Getting Started
1. Prerequisites

Google Maps Platform API Key (with "Places API (New)" enabled).

2. Installation

Clone the repository.

Install dependencies (instructions will be added here once framework is chosen).

3. Configuration

Create a file named .env in the root directory.

Add your API Key to keep it secure:

GOOGLE_API_KEY=your_copied_api_key_here
Future Roadmap
"Saved" List: View a history of restaurants you swiped right on.

Filters: Filter by price ($, $$, $$$) or radius.

Share: Send a restaurant card to a friend.

Maybe implement some LangChain features?