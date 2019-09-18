export const helper = {
    verifyIndexAndContainer(state, indexName, containerName) {
        if(typeof state[indexName] !== "object") {
            throw new Error("Index with name "+indexName+" is not an object in state.");
        } 

        if(!(state[containerName] instanceof Array)) {
            throw new Error("Container with name "+containerName+" is not an array in state.");
        }
    }
}