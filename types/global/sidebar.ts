import { DocumentTextIcon, HeartIcon, TagIcon } from '@heroicons/react/outline'

export interface SidebarApp {
  label: string;
  icon: any;
  to: string;
}
export type SidebarApps = SidebarApp[];

export default class Apps {
  static navigation: SidebarApps = [
    {
      label: 'All Jots',
      icon: DocumentTextIcon,
      to: '/',
    },
    {
      label: 'Favorites',
      icon: HeartIcon,
      to: '/favorites',
    },
    {
      label: 'Tags',
      icon: TagIcon,
      to: '/tags',
    },
  ]
}
