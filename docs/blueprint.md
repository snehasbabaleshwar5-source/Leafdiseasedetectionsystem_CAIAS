# **App Name**: Leaf Disease Detector

## Core Features:

- Image Input & Storage: Users can capture plant leaf images using their device camera or upload them from their gallery. A preview is shown before submission. The image is then uploaded to Firebase Storage, and its URL is saved in Firestore.
- AI Disease Prediction: Uploaded images are sent to a Flask API, which utilizes a trained Convolutional Neural Network (CNN) model to predict the disease class. The API returns the predicted disease name, a confidence score, a suggested solution, and climate information in a JSON format.
- Prediction Result Display: The application clearly displays the captured image alongside the prediction results, including the disease name, confidence score, suggested treatment, and relevant climate conditions, presented in an animated, card-based user interface.
- Prediction History Management: All prediction results (image URL, detected disease, and timestamp) are saved to Firestore, allowing users to conveniently view and access a history of their past plant health scans on a dedicated page.

## Style Guidelines:

- The visual design will adopt a light color scheme to evoke freshness and clarity, aligning with the app's nature-themed purpose. The background color, #F0F5F0, is a highly desaturated green, providing a subtle hint of nature.
- The primary color is a calming, verdant green, #339933, chosen for its association with health and growth, ensuring strong contrast against the light background while maintaining a natural feel.
- The accent color, a vibrant lime green #99E052, will be used to highlight key interactive elements and provide visual interest, complementing the primary palette with a touch of brightness.
- The application will use 'Inter' (sans-serif) for all text. Its modern, neutral, and highly readable design is suitable for both headlines and body content, ensuring a clean and accessible user experience.
- Illustrative, nature-related icons, such as various leaf shapes, will be used throughout the interface to reinforce the application's theme and enhance visual appeal, ensuring a consistent design language.
- The interface will feature a clean, intuitive layout with prominent card-based elements for displaying prediction results and historical scans. A mobile-responsive design will ensure optimal usability across various devices.
- Subtle animations, such as floating leaf motifs and gentle CSS-animated birds, will be incorporated to add dynamism and an organic feel. Animations will also be used for smooth transitions and state changes within the card-based UI, providing a polished user experience.