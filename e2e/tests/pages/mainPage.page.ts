import type { Page } from '@playwright/test'

export class MainPage {

	readonly page: Page
	mainPage: string

	constructor(page: Page) {
		this.page = page
		this.mainPage = "h1[id='homePage']"
	}

	async waitforpage() {
		return await this.page.waitForSelector("h1[id='homePage']")
	}

}
