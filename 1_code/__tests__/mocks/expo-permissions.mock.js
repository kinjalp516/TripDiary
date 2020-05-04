jest.mock('expo-permissions', () => {
    return {
        askAsync: async function(permissions) {
            return {status: 'granted'};
        },
        LOCATION: 'asd',
    }
});


// export const askAsync = async function(permissions) { 
//     return {status: 'granted'}; 
// }
// export let LOCATION = 'asd';