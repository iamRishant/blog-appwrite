// hm log sbb jgh import.meta.enn. etc etc nhi kar skte aur agar kar bhi diya to glti se agar string format me nhi rha to gnda error
// deta hai to usko avoid krne ke liye sara environment variables ko yha lakr string me convert krke export maar do

const config={
    appwriteUrl:String(import.meta.env.VITE_APPWRITE_URL),
    projectId:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    databaseId:String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    collectionId:String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    bucketId:String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    editorApi:String(import.meta.env.VITE_TINY_MCE_API),
}

export default config;