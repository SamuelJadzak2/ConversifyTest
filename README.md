# Setup

1. Clone the repo
2. Navigate to the root
3. Run:
    ```sh
    npm install
    VAPI_PUBLIC_KEY=<your_key> VAPI_ASSISTANT_ID=<your_id> npm run android
    ```

# Design

I tried to split up the call components for readability. I also wanted to split up the components that handle the UI from the ones that handle the API functionality to more closely follow React development practices. I put most of the API functionality inside of a context because I imagined that the functions might be used across multiple components, making it easier to manage and maintain the code.

# If I had more time...

VAPI provides an event listener for messages. I would have liked to provide a chat-like interface where you can see messages as they are being transcribed. Given the purpose of the app, I think that allowing a user to restart the conversation from a certain message in the conversation would be a neat feature. They would scroll to that message, tap it, and then restart the interaction.
