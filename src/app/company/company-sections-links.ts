import { NavigationSidenavLink } from 'src/app/shared/navigation/navigation.service';

export const sections_links: Array<NavigationSidenavLink> = [
    new NavigationSidenavLink('Staff', 'profiles', 'account_circle'),
    new NavigationSidenavLink('Fields', 'fields', 'wb_sunny'),
    new NavigationSidenavLink('Tasks', 'tasks', 'assignment'),
    new NavigationSidenavLink('Tools', 'tools', 'build'),
];
