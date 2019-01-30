import { NavigationSidenavLink } from 'src/app/shared/navigation/navigation.service';

export const sections_links: Array<NavigationSidenavLink> = [
    new NavigationSidenavLink('Perfiles', 'profiles', 'account_circle'),
    new NavigationSidenavLink('Campos', 'fields', 'wb_sunny'),
    new NavigationSidenavLink('Tareas', 'tasks', 'assignment'),
    new NavigationSidenavLink('Herramientas', 'tools', 'build'),
];
