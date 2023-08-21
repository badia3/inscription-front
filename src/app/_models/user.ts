export interface User{
    nom:String | undefined;
    prenom:String | undefined;
    email:String | undefined;
    telephone:Number | undefined;
    motDePasse: String | undefined;
    role?: string;
}