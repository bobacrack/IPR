export const fetchChats = (onCompleteCallback) => {
    const url = 'http://localhost:6969/api/v1/chat'; // Adjust the URL according to your API endpoint

    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error fetching chats');
            }
            return response.json(); // Read the response body as text
        })
        .then((body) => {

            const data = body; // Attempt to parse the response body as JSON
            onCompleteCallback(data, null);
        })
        .catch((error) => {
            onCompleteCallback(null, error.message);
        });


};