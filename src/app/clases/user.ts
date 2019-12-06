export class User 
{
    public uid: string;
    public email: string;
    public displayName: string;
    public photoURL: string;
    public emailVerified: boolean;

    constructor(
        uid?: string,
        email?: string,
        displayName?: string,
        photoURL?: string,
        emailVerified?: boolean)
    {
        this.uid = uid;
        this.email = email;
        this.displayName = displayName;
        this.photoURL = photoURL;
        this.emailVerified = emailVerified;
    }
}
