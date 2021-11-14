# Inspiration

Social media is a powerful tool but can have damaging effects on mental health. We have noticed that many of the bigger companies are not putting in the effort in trying to stop or prevent cyberbullying and toxicity. According to ConnectSafely.org, 2021, Girls are also three times as likely to be cyberbullied than boys. In a fast-paced world, with many social media displaying flashy videos to attract attention for the sake of earning revenue, with social media putting profit over people, it’s hard to find ways to slow down, rewind, reflect, and connect.
So we want to create a positive online environment for girls and gender minorities to support each other through letter writing. The website will be completely ad-free, saving the time and cost compared to actual letter delivery.

As a young girl, you don’t have to feel forced to put up an image or live up to a certain standard, and can feel free to speak your mind and express your insecurities in a healthy way. The letters you write and respond to are anonymous, which helps protect privacy. We also use additional tools like the Perspective Analyzer to limit general toxicity that we’ll mention later.

Since this is the beta version of the app, it’s going to be invite-only—Existing users can invite others to join them on the platform. This is another step in creating a healthy atmosphere.

# What it does

**Warm Letters:** An online platform for girls and gender minorities, where thoughts can be shared anonymously through the form of letter writing. They can also give encouraging replies after reading the letters to help build a stronger sense of community.

With the Perspective Comment Analyzer API, we ensure against toxicity and scam online, and we never share data with anyone.

# App walkthrough

1. Users start by logging in after authentication via their email and password.
2. Each session of the user login uses encrypted authentication via Google Firebase which helps maintain a secure environment for their activity on the website.
3. After the login page, the user enters the main page of the platform. They can write and send letters here.
4. This is also where they can read a letter that’s assigned to them. The letter system uses a queue: The oldest unanswered letter has the highest priority to be assigned to someone.
5. If you click “Reply,” it sends you to a page where you view the letter in larger size and can compose your reply.
6. Once you’re done, it sends you back to the Dashboard.
7. If you’d like to view the replies to your letters, you click “Replies to Me.” at the top. Here you can read all the letters you’ve received.
8. Both letters and responses use the Perspective Comment Analyzer API to limit toxicity and spam submissions.

**Our goal is to create an inclusive online community to support girls and gender minorities world-wide, one letter at a time.**

# How we built it

## Tech Tools Used:

**Mock-up:** Fresco- mock-ups are done digitally, with hand-written letterheads and warm color-scheme to promote a warm and homey aesthetic.

**Front-end:** The front-end is built using React with Typescript to enforce strict typings, using state hooks and components for regular state management, and React Query to handle asynchronous state-management.
All data displayed is fully dynamic and fetches the respective information using queries from the backend.

**Back-end:** The back-end consists of two main pieces: Firebase Authentication for sign-up, authentication, and authorization, and Firebase Firestore as a NoSQL database where the letters and responses are stored.

**Misc:** Google Cloud Perspective Comment Analyzer API to combat submission of hate comments, toxicity, and spam.
Deployment: Vercel
Challenges we ran into
Half of the team hacked for the first time. It was a challenging but rewarding experience.

# Accomplishments that we're proud of

- Working effectively and remotely with teammates.
- Constantly collaborated and kept other members informed, provided and took help when needed.

# What we learned

- Learned how to divide & delegate tasks as a team and to be accountable for it.
- Planning work, setting reporting times, and deadlines.
- Communicating remotely with teammates.

# What's next for Warm Letters

Add images, audio, and video clips
Save drafts for later
Send virtual postcards and greeting cards
Night mode to prevent eye strain

# How to build

1. Add your respective Google Perspective Comment Analyzer API key to the environment variables.
2. Run `yarn build`
