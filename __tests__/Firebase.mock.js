jest.mock('../Firebase', () => {
    return {
        auth: function() {
            return {
                currentUser: {uid: 'asdfasdfasdfasf'}
            }
        }
    }
});