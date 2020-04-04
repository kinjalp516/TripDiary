jest.mock('../../photos/model/Photo', () => {
    return {
        fetchPhotos: async function(tripId) {
            return [];
        },
    }
});