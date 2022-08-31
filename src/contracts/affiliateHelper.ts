export const getAccountName = async (contract:any, addr:string) => {
    return await contract.methods.getAccountName(addr.toLowerCase()).call();
}

export const getChildCounts = async (contract:any, addr:string) => {
    return await contract.methods.getChildCounts(addr.toLowerCase()).call();
}

export const getLevelOnes = async (contract:any, addr:string) => {
    return await contract.methods.getLevelOnes(addr.toLowerCase()).call();
}

export const getParent = async (contract:any, addr:string) => {
    return await contract.methods.getParent(addr.toLowerCase()).call();
}

export const getParentName = async (contract:any, addr:string) => {
    return await contract.methods.getParentName(addr.toLowerCase()).call();
}

export const setAccountName = async (contract:any, addr:string, name:string) => {
    await contract.methods.setAccountName(addr.toLowerCase(), name).send({from: addr});
}

export const setParent = async (contract:any, child:string, parent:string, name:string) => {
    await contract.methods.setParent(child, parent, name).send({from: child});

}