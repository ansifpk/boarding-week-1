import jwt from 'jsonwebtoken'
interface paylod{
    _id:string
}
export const createAccessAndRefreshTocken = async(_id:string) => {
    try {
        const accessTocken = jwt.sign({_id},process.env.JWT_ACCESS_SECRET!,{
            expiresIn:'15m'
        })
        const refreshTocken = jwt.sign({_id},process.env.JWT_REFRESH_SECRET!,{
            expiresIn:'30d'
        })
        return {accessTocken,refreshTocken}
    } catch (error) {
        console.error(error)
    }
}

export const verifyAccessTocken = async(_id:string) => {
    try {
        const accessTocken = jwt.verify(_id,process.env.JWT_ACCESS_SECRET!) as paylod
        return accessTocken
    } catch (error) {
        console.error(error)
        
    }
}
export const verifyRefreshTocken = async(userId:string) => {
    try {
        const refreshTocken = jwt.verify(userId,process.env.JWT_REFRESH_SECRET!) as paylod
        return refreshTocken 
    } catch (error) {
        console.error(error)
    }
}

