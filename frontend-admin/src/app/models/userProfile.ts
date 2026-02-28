export interface UserProfile {
    userId: number;
    fname: string;
    lname: string;
    experienceText: string;
    profilePic: string;
    authuserid: string;

}

export interface CreateUserProfileRequest {
    fname: string;
    lname: string;
    experienceText: string;
}

export interface UpdateUserProfileRequest {
    fname?: string;
    lname?: string;
    experienceText?: string;
}


export function mapUserProfileFromApi(data: any): UserProfile {
    return {
        userId: data.userId,
        fname: data.fname,
        lname: data.lname,
        experienceText: data.experienceText,
        profilePic: data.profilePic,
        authuserid: data.authuserid,
    };
}

export function mapUserProfileListFromApi(data: any[]): UserProfile[] {
    return data.map(mapUserProfileFromApi);
}
