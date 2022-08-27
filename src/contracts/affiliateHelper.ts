export const getAccountName = async (contract:any, addr:string) => {
    return await contract.methods.getAccountName(addr).call();
}

export const getChildCounts = async (contract:any, addr:string) => {
    return await contract.methods.getChildCounts(addr).call();
}

export const getLevelOnes = async (contract:any, addr:string) => {
    return await contract.methods.getLevelOnes(addr).call();
}

export const getParent = async (contract:any, addr:string) => {
    return await contract.methods.getParent(addr).call();
}

export const getParentName = async (contract:any, addr:string) => {
    return await contract.methods.getParent(addr).call();
}

export const setAccountName = async (contract:any, addr:string, name:string) => {
    await contract.methods.setAccountName(addr, name).send({from: addr});
}

export const setParent = async (contract:any, child:string, parent:string, name:string) => {
    await contract.methods.setParent(child, parent, name).send({from: child});

}