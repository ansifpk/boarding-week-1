import jwt from 'jsonwebtoken'

export const createAccessAndRefreshTocken = async(_id:string) => {
    try {
        const accessTocken = jwt.sign({_id},process.env.JWT_ACCESS_SECRET!)
        const refreshTocken = jwt.sign({_id},process.env.JWT_REFRESH_SECRET!)
        return {accessTocken,refreshTocken}
    } catch (error) {
        console.error(error)
    }
}

export const verifyAccessTocken = async(_id:string) => {
    try {
        const accessTocken = jwt.verify(_id,process.env.JWT_ACCESS_SECRET!)
        return accessTocken
    } catch (error) {
        console.error(error)
    }
}
export const verifyRefreshTocken = async(userId:string) => {
    try {
        const refreshTocken = jwt.verify(userId,process.env.JWT_REFRESH_SECRET!)
        return refreshTocken
    } catch (error) {
        console.error(error)
    }
}

