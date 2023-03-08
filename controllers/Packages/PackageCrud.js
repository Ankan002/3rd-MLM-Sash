
export const PackageCrud = (req, res) => {


    if (req.method == "get") {
        getPackage()
    } else if (req.method == "post") {
        postPackage()
    } else if (req.method == "put") {
        putPackage()
    } else if (req.method == "patch") {
        patchPackage()
    } else if (req.method == "delete") {
        deletePackage()
    }
}


const getPackage = async() =>{

// handle to get packages

}

const postPackage = async() =>{
    
// handle to post packages

}

const putPackage = async() =>{
    
// handle to put packages

}

const patchPackage = async() =>{
    
// handle to patch packages

}

const deletePackage = async() =>{
    
// handle to delete packages

}






