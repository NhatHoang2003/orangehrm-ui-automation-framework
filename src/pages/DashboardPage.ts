import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../core/BasePage';

export class DashboardPage extends BasePage {

    readonly sidebarMenuItems: Locator;
    readonly sidebarMenuNames: Locator;
    readonly searchInput: Locator;
    readonly avatarUserDropdown: Locator;
    readonly menuAvatarDropdown: Locator;

    readonly clientBrandBanner: Locator;

    readonly dashboardPath = '/web/index.php/dashboard/index';

    constructor(page: Page) {
        super(page);

        this.sidebarMenuItems = page.locator('.oxd-main-menu-item-wrapper a.oxd-main-menu-item');
        this.sidebarMenuNames = page.locator('.oxd-main-menu-item-wrapper span.oxd-main-menu-item--name');
        this.searchInput = page.getByPlaceholder('Search');
        this.avatarUserDropdown = page.locator('.oxd-userdropdown-name');
        this.menuAvatarDropdown = page.getByRole('menuitem');

        this.clientBrandBanner = page.getByAltText('client brand banner');
    }

    async getSideBarMenuNames(): Promise<string[]> {

        await this.sidebarMenuNames.first().waitFor();

        return ( await this.sidebarMenuNames.allTextContents())
            .map(name => name.trim())
            .filter(Boolean)
    }

    getSidebarMenu(menuName: string): Locator {
        return this.sidebarMenuNames.filter({
            hasText: menuName
        })
    }

    async searchSidebarMenu(menuName: string): Promise<Locator>{

        await this.fill(
            this.searchInput,
            menuName
        )

        return this.sidebarMenuNames.filter({
                hasText: menuName
        });
    }

    async clickSidebarMenu(menuName: string): Promise<void> {
        await this.click(
            this.getSidebarMenu(menuName)
        );
    }

    async clickAvatarDropdown(): Promise<void> {
        await this.avatarUserDropdown.click();
    }

    async clickAvatarDropdownMenu(dropdownName: string): Promise<void> {
        await this.menuAvatarDropdown
            .filter({
                hasText: dropdownName
            })
            .click();
    }

    async logout(): Promise<void> {
        await this.clickAvatarDropdown();
        await this.clickAvatarDropdownMenu('Logout');
    }
}