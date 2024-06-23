import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { PostPageComponent } from './post-page/post-page.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LogoutComponent } from './logout/logout.component';
import { IdeaPageComponent } from './homepage/idea-page/idea-page.component';
import { authGuard } from './_guards/auth/auth.guard';

export const routes: Routes = [
    {
        path: "home",
        component: HomepageComponent,
        title: "HiveMind",
        canActivate: [authGuard]
    },
    {
        path: "profile",
        component: ProfilePageComponent,
        title: "Profile",
        canActivate: [authGuard]
    },
    {
        path: "post",
        component: PostPageComponent,
        title: "Post",
        canActivate: [authGuard]
    },
    {
        path: "welcome",
        component: WelcomePageComponent,
        title: "HiveMind"
    },
    {
        path: "login",
        component: LoginComponent,
        title: "Login"
    },
    {
        path: "signup",
        component: SignupComponent,
        title: "Sign up"
    },
    {
        path: "logout",
        component: LogoutComponent,
        title: "Log out"
    },
    {
        path: "idea/:id",
        component: IdeaPageComponent,
        title: "Idea",
        canActivate: [authGuard]
    },
    {
        path: "", 
        redirectTo: "/welcome",
        pathMatch: "full"
    },
    {
        path: "**",
        redirectTo: "/welcome",
        pathMatch: "full"
    }
];


